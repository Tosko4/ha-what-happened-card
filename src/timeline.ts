import { resolveCause, runTrigger } from "./context";
import { ACTOR_ICONS, fallbackIcon, stateColor } from "./appearance";
import { REPLACED_STATES, REPLACE_WINDOW_MS } from "./vacuum";
import { dayKey, formatDayLabel } from "./format";
import { describeState } from "./state-message";
import type {
  DayGroup,
  HomeAssistant,
  LogbookEntry,
  TimelineItem,
  WhatHappenedConfig,
} from "./types";

export const DEFAULTS = {
  hours_to_show: 24,
  max_entries: 50,
  order: "newest_first",
  show_cause: true,
  show_avatars: true,
  show_day_headers: true,
  state_color: true,
  compact: false,
  time_display: "both",
  tap_action: "more-info",
  vacuum_details: true,
  hide_unavailable: true,
  collapse_repeats: true,
} as const;

export const LIMITS = { hours: [1, 720], entries: [1, 500] } as const;

const CHAIN_WINDOW_MS = 60 * 1000;
const COLLAPSE_WINDOW_MS = 10 * 60 * 1000;
const FUTURE_TOLERANCE_MS = 5 * 60 * 1000;

export function entryKey(entry: LogbookEntry): string {
  return [entry.when, entry.entity_id ?? entry.name, entry.state ?? entry.message, entry.context_id]
    .map((v) => v ?? "")
    .join("|");
}

function clamp(value: unknown, [min, max]: readonly [number, number], fallback: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function effectiveHours(config: WhatHappenedConfig): number {
  return clamp(config.hours_to_show, LIMITS.hours, DEFAULTS.hours_to_show);
}

export function effectiveMaxEntries(config: WhatHappenedConfig): number {
  return clamp(config.max_entries, LIMITS.entries, DEFAULTS.max_entries);
}

function domainOf(entry: LogbookEntry): string {
  return entry.domain ?? entry.entity_id?.split(".")[0] ?? "homeassistant";
}

/** Config filters shared by the live buffer (ingest) and the timeline builder. */
export function passesFilters(
  entry: LogbookEntry,
  config: WhatHappenedConfig,
  allowed: Set<string> | undefined,
): boolean {
  const domain = domainOf(entry);
  if (allowed && (!entry.entity_id || !allowed.has(entry.entity_id))) return false;
  if (entry.entity_id && config.exclude_entities?.includes(entry.entity_id)) return false;
  if (config.include_domains?.length && !config.include_domains.includes(domain)) return false;
  if (config.exclude_domains?.includes(domain)) return false;
  const hideUnavailable = config.hide_unavailable ?? DEFAULTS.hide_unavailable;
  if (hideUnavailable && (entry.state === "unavailable" || entry.state === "unknown")) return false;
  return true;
}

function toItem(
  hass: HomeAssistant,
  entry: LogbookEntry,
  config: WhatHappenedConfig,
): TimelineItem {
  const domain = domainOf(entry);
  const stateObj = entry.entity_id ? hass.states[entry.entity_id] : undefined;
  const name =
    entry.name ?? stateObj?.attributes.friendly_name ?? entry.entity_id ?? "Home Assistant";

  let verb: string;
  let tone: TimelineItem["tone"] = "neutral";
  let cause = resolveCause(hass, entry);

  if (entry.state !== undefined && entry.message === undefined) {
    ({ verb, tone } = describeState(hass, domain, entry.entity_id, entry.state));
  } else {
    const message = entry.message ?? "did something";
    const triggered = message.match(/^triggered(?: by (.+))?$/);
    if (triggered) {
      verb = "was triggered";
      tone = "active";
      const trigger = runTrigger(hass, entry);
      if (trigger) cause = { ...cause, trigger };
    } else {
      verb = message;
      tone = /(error|fail)/i.test(message) ? "alert" : "neutral";
    }
  }

  const actor = cause?.actor;
  if (actor && !actor.icon) actor.icon = ACTOR_ICONS[actor.kind];

  const isPerson = domain === "person";
  const picture = isPerson ? stateObj?.attributes.entity_picture : undefined;
  const useColor = config.state_color ?? DEFAULTS.state_color;

  return {
    key: entryKey(entry),
    when: entry.when * 1000,
    entityId: entry.entity_id,
    domain,
    name,
    verb,
    tone,
    icon: fallbackIcon(domain, entry.icon),
    stateValue: entry.state,
    picture,
    isPerson,
    isRun:
      entry.state === undefined && entry.message !== undefined && /^triggered/.test(entry.message),
    cause,
    count: 1,
    accent: stateColor(domain, stateObj?.attributes.device_class, entry.state, tone, useColor),
  };
}

function causeSignature(item: TimelineItem): string {
  const c = item.cause;
  return `${c?.actor?.kind ?? ""}:${c?.actor?.name ?? ""}:${c?.trigger ?? ""}`;
}

/** A vacuum's plain "cleaning"/"docked" line is dropped when the integration has its own entry for it. */
function isStandIn(
  entry: LogbookEntry,
  extra: { items: TimelineItem[]; vacuums: Set<string> } | undefined,
): boolean {
  if (!extra || !entry.entity_id || !extra.vacuums.has(entry.entity_id)) return false;
  const phase = REPLACED_STATES[entry.state ?? ""];
  if (!phase) return false;
  return extra.items.some(
    (i) =>
      i.entityId === entry.entity_id &&
      i.phase === phase &&
      Math.abs(i.when - entry.when * 1000) <= REPLACE_WINDOW_MS,
  );
}

/**
 * One thing that happened should be one entry: when a sensor triggered an
 * automation that switched a device, only the device entry is kept. It explains
 * the whole chain, so the automation run and the triggering state change are folded in.
 */
function mergeChains(items: TimelineItem[]): TimelineItem[] {
  const hidden = new Set<TimelineItem>();
  for (const effect of items) {
    const actor = effect.cause?.actor;
    if (!actor?.entityId || (actor.kind !== "automation" && actor.kind !== "script")) continue;

    for (const run of items) {
      if (
        run.isRun &&
        run.entityId === actor.entityId &&
        Math.abs(run.when - effect.when) <= CHAIN_WINDOW_MS
      ) {
        hidden.add(run);
      }
    }
    const sourceId = effect.cause?.triggerEntityId;
    if (!sourceId) continue;
    const source = items.find(
      (i) =>
        i !== effect &&
        !i.isRun &&
        i.entityId === sourceId &&
        i.when <= effect.when + 5_000 &&
        effect.when - i.when <= CHAIN_WINDOW_MS,
    );
    if (source) {
      hidden.add(source);
      effect.cause = { ...effect.cause, trigger: `${source.name} ${source.verb}` };
    }
  }
  return items.filter((i) => !hidden.has(i));
}

/**
 * Turn raw logbook entries into the grouped, filtered and limited structure the
 * card renders. Pure function so it can be unit-tested.
 */
export function buildTimeline(
  hass: HomeAssistant,
  entries: Iterable<LogbookEntry>,
  config: WhatHappenedConfig,
  now: number,
  allowed?: Set<string>,
  /** Integration-built items, and the vacuums whose plain logbook state changes they replace. */
  extra?: { items: TimelineItem[]; vacuums: Set<string> },
): DayGroup[] {
  const since = now - effectiveHours(config) * 3_600_000;
  const maxEntries = effectiveMaxEntries(config);
  const collapse = config.collapse_repeats ?? DEFAULTS.collapse_repeats;

  const sorted = [...entries]
    .filter((e) => {
      const ms = e.when * 1000;
      return ms >= since && ms <= now + FUTURE_TOLERANCE_MS;
    })
    .filter((e) => passesFilters(e, config, allowed))
    .filter((e) => !isStandIn(e, extra))
    .sort((a, b) => b.when - a.when);

  const richItems = (extra?.items ?? []).filter(
    (i) => i.when >= since && i.when <= now + FUTURE_TOLERANCE_MS,
  );
  const merged = mergeChains(
    [...sorted.map((entry) => toItem(hass, entry, config)), ...richItems].sort(
      (a, b) => b.when - a.when,
    ),
  );

  const items: TimelineItem[] = [];
  let oldestOfLast = 0;
  for (const item of merged) {
    const last = items[items.length - 1];
    if (
      collapse &&
      last &&
      !item.rich &&
      !last.rich &&
      item.entityId &&
      last.entityId === item.entityId &&
      last.verb === item.verb &&
      causeSignature(last) === causeSignature(item) &&
      oldestOfLast - item.when <= COLLAPSE_WINDOW_MS
    ) {
      last.count += 1;
      oldestOfLast = item.when;
      continue;
    }
    items.push(item);
    oldestOfLast = item.when;
    if (items.length > maxEntries) break;
  }

  const limited = items.slice(0, maxEntries);
  if ((config.order ?? DEFAULTS.order) === "oldest_first") limited.reverse();

  const groups: DayGroup[] = [];
  for (const item of limited) {
    const key = dayKey(item.when);
    let group = groups[groups.length - 1];
    if (!group || group.key !== key) {
      group = { key, label: formatDayLabel(item.when, now), items: [] };
      groups.push(group);
    }
    group.items.push(item);
  }
  return groups;
}

export function plainSentence(item: TimelineItem): string {
  let text = item.text ?? `${item.name} ${item.verb}`;
  if (item.count > 1) text += ` ${item.count} times`;
  const cause = item.cause;
  if (cause?.actor) text += ` by ${cause.actor.name}`;
  if (cause?.trigger) text += `, triggered by ${cause.trigger}`;
  if (item.details?.length) text += ` (${item.details.join(", ")})`;
  return text;
}
