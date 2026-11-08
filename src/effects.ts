import { ACTOR_ICONS, stateColor } from "./appearance";
import type { Actor, EffectLine, HomeAssistant, TimelineItem } from "./types";

/**
 * One action, one entry. Pressing a button that runs an automation which speaks, sets three
 * displays and a helper used to be four lines. Now the press is the entry, with what it caused
 * listed underneath:
 *
 *   "4 – Prídem onedlho" was pressed             by Ján
 *   via DevControl – Hlásenie kódu
 *     Atom Echo 01 said “Kod 4”
 *     3 text entities changed to Kod 4
 *     Hlásenie – kto hlási changed to Ján
 *
 * Without a visible trigger entity (a timer, say) the automation heads the entry.
 */

const CLUSTER_GAP_MS = 30_000;
/** A plain service call (no person, no automation on record) this close to a cluster is part of it. */
const LOOSE_BEFORE_MS = 5_000;
const LOOSE_AFTER_MS = 10_000;

function line(item: TimelineItem): EffectLine {
  return {
    key: item.key,
    domain: item.domain,
    name: item.name,
    verb: item.verb,
    entityId: item.entityId,
    icon: item.icon,
    fixedIcon: item.fixedIcon,
    stateValue: item.stateValue,
    accent: item.accent,
    details: item.details,
  };
}

function viaOf(effects: TimelineItem[]): Actor[] {
  const seen = new Set<string>();
  const out: Actor[] = [];
  for (const e of effects) {
    const actor = e.cause?.actor;
    const key = actor?.entityId ?? actor?.name;
    if (
      actor &&
      (actor.kind === "automation" || actor.kind === "script") &&
      key &&
      !seen.has(key)
    ) {
      seen.add(key);
      out.push(actor);
    }
  }
  return out;
}

function triggerOf(cluster: TimelineItem[]) {
  const withTrigger = cluster.find((c) => c.cause?.trigger);
  return withTrigger
    ? {
        trigger: withTrigger.cause!.trigger,
        triggerEntityId: withTrigger.cause!.triggerEntityId,
      }
    : undefined;
}

/**
 * Two different triggers inside one burst (two buttons pressed within seconds) are two actions.
 * Effects that do not name their trigger join the nearest one.
 */
function splitBySource(clusters: TimelineItem[][]): TimelineItem[][] {
  return clusters.flatMap((cluster) => {
    const sources = new Map<string, TimelineItem>();
    for (const c of cluster) {
      const source = c.cause?.source;
      if (source) sources.set(source.key, source);
    }
    if (sources.size <= 1) return [cluster];
    const parts = new Map<string, TimelineItem[]>([...sources.keys()].map((k) => [k, []]));
    for (const c of cluster) {
      let key = c.cause?.source?.key;
      if (!key) {
        let best = Infinity;
        for (const [k, source] of sources) {
          const gap = Math.abs(source.when - c.when);
          if (gap < best) {
            best = gap;
            key = k;
          }
        }
      }
      parts.get(key!)!.push(c);
    }
    return [...parts.values()];
  });
}

export function groupEffects(
  hass: HomeAssistant,
  items: TimelineItem[],
  /** Entities the user asked to see: they stay rows of their own, never nested. */
  picked: ReadonlySet<string> = new Set(),
): TimelineItem[] {
  // Everything one automation or script did. Effects of one action happen within seconds of
  // each other; what each effect knows about its trigger varies (one logbook line names the
  // pressed button, the next does not), so the automation is what ties them together.
  const byKey = new Map<string, TimelineItem[]>();
  for (const item of items) {
    const cause = item.cause;
    const actor = cause?.actor;
    if (!actor?.entityId || (actor.kind !== "automation" && actor.kind !== "script")) continue;
    if (item.effects || (item.entityId && picked.has(item.entityId))) continue;
    const key = actor.entityId;
    const list = byKey.get(key);
    if (list) list.push(item);
    else byKey.set(key, [item]);
  }

  const removed = new Set<TimelineItem>();
  const added: TimelineItem[] = [];
  // A script or automation calls input_select.select_option; the log records that change as a
  // bare service call with no trace of who made it.
  const loose = items.filter(
    (i) => !i.rich && i.cause?.actor?.kind === "service" && !(i.entityId && picked.has(i.entityId)),
  );

  for (const [, all] of byKey) {
    // Split into bursts: effects of one press happen within seconds of each other.
    const sorted = [...all].sort((a, b) => a.when - b.when);
    const clusters: TimelineItem[][] = [];
    for (const item of sorted) {
      const last = clusters[clusters.length - 1];
      if (last && item.when - last[last.length - 1].when <= CLUSTER_GAP_MS) last.push(item);
      else clusters.push([item]);
    }

    for (const cluster of splitBySource(clusters)) {
      cluster.sort((a, b) => a.when - b.when);
      const source = cluster.find((c) => c.cause?.source)?.cause?.source;
      // One effect of a sensor is better told in one line; one effect of a person's press is
      // told as "pressed by Ján, which caused ...".
      if (cluster.length < 2 && source?.cause?.actor?.kind !== "user") continue;
      for (const item of loose) {
        if (
          !removed.has(item) &&
          !cluster.includes(item) &&
          item.when >= cluster[0].when - LOOSE_BEFORE_MS &&
          item.when <= cluster[cluster.length - 1].when + LOOSE_AFTER_MS
        ) {
          cluster.push(item);
        }
      }
      cluster.sort((a, b) => a.when - b.when);
      const first = cluster[0];
      const via = viaOf(cluster);
      const effects = cluster.map(line);

      let head: TimelineItem;
      if (source) {
        head = {
          ...source,
          soft: undefined,
          key: `group|${source.key}|${first.key}`,
          effects,
          via,
          count: 1,
          rich: true,
        };
      } else {
        const actor = via[0];
        const kind = actor.kind === "script" ? "script" : "automation";
        head = {
          key: `group|${first.key}`,
          when: first.when,
          entityId: actor.entityId,
          domain: kind,
          name: actor.name,
          verb: "ran",
          tone: "active",
          icon: ACTOR_ICONS[kind],
          isPerson: false,
          isRun: false,
          count: 1,
          rich: true,
          cause: triggerOf(cluster),
          effects,
          accent: stateColor(kind, undefined, "on", "active", true),
        };
      }
      for (const c of cluster) removed.add(c);
      added.push(head);
    }
  }
  void hass;
  return removed.size ? [...items.filter((i) => !removed.has(i)), ...added] : items;
}
