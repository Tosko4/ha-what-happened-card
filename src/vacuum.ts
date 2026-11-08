import { ALERT_COLOR, stateColor } from "./appearance";
import type { Actor, Cause, HomeAssistant, TimelineItem, WhatHappenedConfig } from "./types";

/**
 * Support for the TapoVac-ADV integration (`tapo_rv30`). The logbook only knows that the
 * vacuum went "cleaning" and "docked". The integration itself knows which rooms, how
 * long, how much area, who or what started it and why, so those are folded into a
 * single entry per cleaning run.
 */

export const TAPO_PLATFORM = "tapo_rv30";

export interface PlannerLogEntry {
  ts: number; // epoch seconds
  kind: string;
  text: string;
}

export interface HistoryRun {
  started: number; // epoch seconds
  minutes?: number | null;
  area?: number | null;
  emptied_bin?: boolean | number | null;
  error?: number | null;
  start_type?: number | null;
  rule_name?: string | null;
}

export interface VacuumData {
  entityId: string;
  log: PlannerLogEntry[];
  runs: HistoryRun[];
}

export const START_TYPES: Record<number, string> = {
  0: "the robot button",
  1: "the Tapo app",
  2: "Alexa",
  3: "Google Assistant",
  4: "the robot's schedule",
  5: "an automation",
  6: "IFTTT",
  7: "Alice",
};

/** Logbook state changes that the richer per-run entries replace. */
export const REPLACED_STATES = new Set(["cleaning", "returning", "docked", "paused", "idle"]);

/** Planner log kinds worth a timeline entry. `wait`, `pending`, `preview` and `config` are noise. */
const LOG_KINDS = new Set(["start", "done", "override", "return", "docked", "skip", "error"]);

const MATCH_WINDOW_S = 300;

export function findTapoVacuums(hass: HomeAssistant): string[] {
  return Object.values(hass.entities ?? {})
    .filter((e) => e.platform === TAPO_PLATFORM && e.entity_id.startsWith("vacuum."))
    .map((e) => e.entity_id);
}

interface ParsedStart {
  names?: string;
  why?: string;
  byUser: boolean;
}

/** "You started cleaning Kitchen and Hallway. Kitchen: due; nobody home." */
export function parseStart(text: string): ParsedStart {
  const m = text.match(/^(You started|Started) cleaning (.+?)\.(?: (.+))?$/s);
  if (!m) return { byUser: text.startsWith("You") };
  return { byUser: m[1] === "You started", names: m[2], why: m[3]?.replace(/\.$/, "") };
}

function nearestStart(log: PlannerLogEntry[], startedS: number, used: Set<PlannerLogEntry>) {
  let best: PlannerLogEntry | undefined;
  for (const entry of log) {
    if (entry.kind !== "start" || used.has(entry)) continue;
    const gap = Math.abs(entry.ts - startedS);
    if (gap <= MATCH_WINDOW_S && (!best || gap < Math.abs(best.ts - startedS))) best = entry;
  }
  return best;
}

function plannerActor(): Actor {
  return { kind: "other", name: "Cleaning planner", icon: "mdi:calendar-clock" };
}

function userActor(hass: HomeAssistant): Actor {
  return { kind: "user", name: hass.user?.name ?? "You" };
}

function runDetails(run: HistoryRun): string[] {
  const details: string[] = [];
  if (run.minutes != null) details.push(`${run.minutes} min`);
  if (run.area != null) details.push(`${run.area} m²`);
  if (run.rule_name) details.push(`preset “${run.rule_name}”`);
  if (run.emptied_bin) details.push("bin emptied");
  return details;
}

/** Build timeline items for one robot from its planner log and clean history. */
export function vacuumItems(
  hass: HomeAssistant,
  data: VacuumData,
  config: WhatHappenedConfig,
): TimelineItem[] {
  const stateObj = hass.states[data.entityId];
  const name = stateObj?.attributes.friendly_name ?? data.entityId;
  const useColor = config.state_color ?? true;
  const items: TimelineItem[] = [];
  const used = new Set<PlannerLogEntry>();

  const base = {
    entityId: data.entityId,
    domain: "vacuum",
    name,
    isPerson: false,
    isRun: false,
    count: 1,
    rich: true,
    fixedIcon: true,
  };

  for (const run of data.runs) {
    const start = nearestStart(data.log, run.started, used);
    if (start) used.add(start);
    const parsed = start ? parseStart(start.text) : undefined;
    const failed = !!run.error;

    let cause: Cause | undefined;
    if (start && parsed) {
      cause = { actor: parsed.byUser ? userActor(hass) : plannerActor(), trigger: parsed.why };
    } else if (run.start_type != null && START_TYPES[run.start_type]) {
      cause = {
        actor: { kind: "other", name: START_TYPES[run.start_type], icon: "mdi:gesture-tap" },
      };
    }

    const tone = failed ? "alert" : "active";
    items.push({
      ...base,
      key: `vac|${data.entityId}|${run.started}`,
      when: run.started * 1000,
      verb: failed
        ? `stopped with error ${run.error}`
        : parsed?.names
          ? `cleaned ${parsed.names}`
          : "finished a cleaning run",
      tone,
      icon: failed ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      details: runDetails(run),
      cause,
      accent: failed
        ? ALERT_COLOR
        : stateColor("vacuum", undefined, "cleaning", "active", useColor),
    });
  }

  // Planner events that no finished run explains (still running, no record kept, other events).
  const covered = new Set(data.runs.map((r) => r.started));
  for (const entry of data.log) {
    if (!LOG_KINDS.has(entry.kind) || used.has(entry)) continue;
    if (entry.kind === "done" && data.runs.length > 0) continue; // the run entry covers it
    if (
      entry.kind === "start" &&
      [...covered].some((s) => Math.abs(s - entry.ts) <= MATCH_WINDOW_S)
    )
      continue;

    const parsed = entry.kind === "start" ? parseStart(entry.text) : undefined;
    const tone = entry.kind === "error" ? "alert" : entry.kind === "start" ? "active" : "neutral";
    items.push({
      ...base,
      key: `vac|${data.entityId}|log|${entry.ts}|${entry.kind}`,
      when: entry.ts * 1000,
      verb: parsed?.names ? `started cleaning ${parsed.names}` : "",
      text: parsed?.names ? undefined : entry.text.replace(/\.$/, ""),
      tone,
      icon: entry.kind === "error" ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      cause: { actor: parsed?.byUser ? userActor(hass) : plannerActor(), trigger: parsed?.why },
      accent:
        tone === "alert"
          ? ALERT_COLOR
          : stateColor(
              "vacuum",
              undefined,
              "cleaning",
              tone === "active" ? "active" : "neutral",
              useColor,
            ),
    });
  }
  return items;
}
