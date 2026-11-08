import type { HomeAssistant, LogbookEntry, WhatHappenedConfig } from "./types";

/**
 * What counts as "something that happened" for a person looking at a dashboard: things
 * that were switched, opened, locked, armed, started or that people did and arrived.
 * Clocks, text and number sensors, update entities and the internal runs of automations
 * are not, so by default the card leaves them out (`activity: everything` shows them).
 */
export const MEANINGFUL_DOMAINS = new Set([
  "light",
  "switch",
  "fan",
  "cover",
  "lock",
  "climate",
  "humidifier",
  "water_heater",
  "valve",
  "siren",
  "alarm_control_panel",
  "media_player",
  "vacuum",
  "lawn_mower",
  "person",
  "device_tracker",
  "scene",
  "input_boolean",
  "button",
  "input_button",
  "doorbell",
  "event",
  "timer",
  "remote",
  "group",
  "binary_sensor",
  "automation",
  "script",
  "homeassistant",
]);

/** Binary sensors that report something happening, as opposed to plumbing. */
const MEANINGFUL_BINARY_CLASSES = new Set([
  "door",
  "garage_door",
  "opening",
  "window",
  "lock",
  "motion",
  "moving",
  "occupancy",
  "presence",
  "smoke",
  "gas",
  "carbon_monoxide",
  "moisture",
  "problem",
  "safety",
  "tamper",
  "vibration",
  "sound",
  "plug",
]);

export function isRunEntry(entry: LogbookEntry): boolean {
  const domain = entry.domain ?? entry.entity_id?.split(".")[0];
  return (
    (domain === "automation" || domain === "script") &&
    entry.state === undefined &&
    entry.message !== undefined
  );
}

export function isMeaningful(
  entry: LogbookEntry,
  config: WhatHappenedConfig,
  hass: HomeAssistant | undefined,
): boolean {
  const domain = entry.domain ?? entry.entity_id?.split(".")[0] ?? "homeassistant";
  const picked = [config.target?.entity_id ?? []].flat();
  if (entry.entity_id && picked.includes(entry.entity_id)) return true;
  if (config.include_domains?.length) return true; // the user chose domains explicitly

  if (isRunEntry(entry)) return config.show_runs === true;
  if (!MEANINGFUL_DOMAINS.has(domain)) return false;
  if (domain === "binary_sensor" && entry.entity_id) {
    const deviceClass = hass?.states[entry.entity_id]?.attributes.device_class;
    return !deviceClass || MEANINGFUL_BINARY_CLASSES.has(deviceClass);
  }
  return true;
}
