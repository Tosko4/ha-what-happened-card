import { pickedEntities } from "./relevance";
import type { HomeAssistant, TimelineItem, WhatHappenedConfig } from "./types";

/**
 * A person and the phone that tracks them leave in the same second, so the log holds both
 * "Pavel left home" and "moto g13 left home". Show the person, and say it was based on the
 * device. A device that changes while the person stays put (another device still says home)
 * says nothing about anyone and is left out.
 */

const WINDOW_MS = 60_000;

/** The deduplication below is part of the smart default view: choosing what to see turns it off. */
export function smartFilteringOn(config: WhatHappenedConfig): boolean {
  return (config.activity ?? "meaningful") === "meaningful" && !config.include_domains?.length;
}

export function foldTrackers(
  hass: HomeAssistant,
  items: TimelineItem[],
  config: WhatHappenedConfig,
): TimelineItem[] {
  if (!smartFilteringOn(config)) return items;
  const picked = pickedEntities(config);

  for (const person of items) {
    if (person.domain !== "person" || !person.entityId) continue;
    const trackers = hass.states[person.entityId]?.attributes.device_trackers;
    if (!Array.isArray(trackers)) continue;
    const device = items.find(
      (i) =>
        i.domain === "device_tracker" &&
        i.entityId &&
        trackers.includes(i.entityId) &&
        i.verb === person.verb &&
        Math.abs(i.when - person.when) <= WINDOW_MS,
    );
    if (!device || person.cause?.actor) continue;
    person.cause = { trigger: `device ${device.name}`, triggerEntityId: device.entityId };
  }
  return items.filter(
    (i) => !(i.domain === "device_tracker" && !(i.entityId && picked.has(i.entityId))),
  );
}
