import { truncate } from "./noise";
import type { HomeAssistant } from "./types";

/**
 * What an automation or script actually did, read from its run trace. The logbook cannot say
 * that a speaker was told something or that a notification was sent, but the trace of the
 * run holds the rendered service call, including the spoken text.
 */

export interface TraceRunInfo {
  run_id: string;
  timestamp: { start: string; finish?: string };
}

interface ServiceParams {
  domain?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  target?: Record<string, unknown>;
}

export interface TraceData {
  trace?: Record<string, Array<{ result?: { params?: ServiceParams } }>>;
}

const MAX_TEXT = 200;

/** Something an automation did that leaves no state change of its own. */
export interface ActionEvent {
  kind: "say" | "notify";
  text: string;
  title?: string;
  /** For "say": the speakers it was said on. */
  speakers: string[];
  service: string;
}

function ids(value: unknown): string[] {
  if (typeof value === "string") return value.split(",").map((v) => v.trim());
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? truncate(value.trim(), MAX_TEXT) : undefined;
}

/**
 * The spoken text and notifications of a run. Anything else an automation does (switching a
 * light, setting a helper) shows up as its own change in the logbook, or is not worth a line.
 */
export function extractActions(trace: TraceData): ActionEvent[] {
  const actions: ActionEvent[] = [];
  for (const [path, steps] of Object.entries(trace.trace ?? {})) {
    if (!path.startsWith("action/") && !path.startsWith("sequence/")) continue;
    for (const step of steps) {
      const params = step.result?.params;
      if (!params?.domain || !params.service) continue;
      const data = params.service_data ?? {};
      const message = text(data.message);
      if (!message) continue;
      const service = `${params.domain}.${params.service}`;

      if (params.domain === "tts") {
        const speakers = [
          ...ids(data.media_player_entity_id),
          ...ids(data.entity_id),
          ...ids(params.target?.entity_id),
        ].filter((id) => id.startsWith("media_player."));
        actions.push({ kind: "say", text: message, speakers: [...new Set(speakers)], service });
      } else if (params.domain === "notify" || params.domain === "persistent_notification") {
        actions.push({
          kind: "notify",
          text: message,
          title: text(data.title),
          speakers: [],
          service,
        });
      }
    }
  }
  return actions;
}

/** The run that started shortly before `whenMs` (nearest start wins). */
export function pickRun(
  runs: TraceRunInfo[],
  whenMs: number,
  before: number,
  after = 5_000,
): TraceRunInfo | undefined {
  let best: TraceRunInfo | undefined;
  let bestGap = Infinity;
  for (const run of runs) {
    const start = Date.parse(run.timestamp.start);
    if (Number.isNaN(start) || start > whenMs + after || whenMs - start > before) continue;
    const gap = Math.abs(whenMs - start);
    if (gap < bestGap) {
      best = run;
      bestGap = gap;
    }
  }
  return best;
}

const LIST_TTL_MS = 45_000;
const RETRY_MS = 60_000;

export class TraceCache {
  private lists = new Map<string, { at: number; runs: TraceRunInfo[] }>();
  private details = new Map<string, TraceData>();
  private tried = new Map<string, number>();
  private inflight = new Map<string, Promise<void>>();

  constructor(private hass: HomeAssistant) {}

  setHass(hass: HomeAssistant): void {
    this.hass = hass;
  }

  private item(entityId: string): { domain: "automation" | "script"; itemId: string } | undefined {
    const [domain, objectId] = entityId.split(".");
    if (domain === "script") return { domain, itemId: objectId };
    if (domain === "automation") {
      const id = this.hass.states[entityId]?.attributes.id;
      return typeof id === "string" || typeof id === "number"
        ? { domain, itemId: String(id) }
        : undefined;
    }
    return undefined;
  }

  /** The trace of the run behind something that happened at `whenMs`, if it is already loaded. */
  lookup(entityId: string, whenMs: number, before: number): TraceData | undefined {
    const target = this.item(entityId);
    const list = target && this.lists.get(`${target.domain}|${target.itemId}`);
    const run = list && pickRun(list.runs, whenMs, before);
    return target && run
      ? this.details.get(`${target.domain}|${target.itemId}|${run.run_id}`)
      : undefined;
  }

  /** Load what `lookup` needs. Resolves when done; failures (no admin rights, no trace) are quiet. */
  ensure(entityId: string, whenMs: number, before: number): Promise<void> | undefined {
    const target = this.item(entityId);
    if (!target) return undefined;
    const listKey = `${target.domain}|${target.itemId}`;
    const list = this.lists.get(listKey);
    const run = list && pickRun(list.runs, whenMs, before);
    if (run && this.details.has(`${listKey}|${run.run_id}`)) return undefined;

    const taskKey = `${listKey}|${run?.run_id ?? Math.floor(whenMs / 60_000)}`;
    const last = this.tried.get(taskKey);
    if (last && Date.now() - last < RETRY_MS) return undefined;
    const running = this.inflight.get(taskKey);
    if (running) return running;

    const task = (async () => {
      this.tried.set(taskKey, Date.now());
      try {
        let current = this.lists.get(listKey);
        if (!current || Date.now() - current.at > LIST_TTL_MS) {
          const runs = await this.hass.callWS<TraceRunInfo[]>({
            type: "trace/list",
            domain: target.domain,
            item_id: target.itemId,
          });
          current = { at: Date.now(), runs: Array.isArray(runs) ? runs : [] };
          this.lists.set(listKey, current);
        }
        const found = pickRun(current.runs, whenMs, before);
        if (found && !this.details.has(`${listKey}|${found.run_id}`)) {
          const trace = await this.hass.callWS<TraceData>({
            type: "trace/get",
            domain: target.domain,
            item_id: target.itemId,
            run_id: found.run_id,
          });
          this.details.set(`${listKey}|${found.run_id}`, trace);
        }
      } catch {
        /* traces need admin rights and may be switched off: the card works without them */
      } finally {
        this.inflight.delete(taskKey);
      }
    })();
    this.inflight.set(taskKey, task);
    return task;
  }
}
