/** Dev-only stand-in for <ha-state-icon>, which picks icons inside Home Assistant itself. */
import type { HassEntity } from "../src/types";

/** Default icon per domain (used when the entity does not define its own). */
const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch-variant",
  fan: "mdi:fan",
  cover: "mdi:window-shutter",
  climate: "mdi:thermostat",
  humidifier: "mdi:air-humidifier",
  lock: "mdi:lock",
  alarm_control_panel: "mdi:shield-home",
  binary_sensor: "mdi:radiobox-blank",
  sensor: "mdi:eye",
  person: "mdi:account",
  device_tracker: "mdi:cellphone",
  media_player: "mdi:cast",
  vacuum: "mdi:robot-vacuum",
  lawn_mower: "mdi:robot-mower",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  button: "mdi:gesture-tap-button",
  input_button: "mdi:gesture-tap-button",
  input_boolean: "mdi:toggle-switch-outline",
  input_select: "mdi:format-list-bulleted",
  select: "mdi:format-list-bulleted",
  update: "mdi:package-up",
  sun: "mdi:white-balance-sunny",
  weather: "mdi:weather-partly-cloudy",
  timer: "mdi:timer-outline",
  calendar: "mdi:calendar",
  camera: "mdi:video",
  siren: "mdi:bullhorn",
  valve: "mdi:valve",
  water_heater: "mdi:water-boiler",
  event: "mdi:calendar-star",
  group: "mdi:google-circles-communities",
  homeassistant: "mdi:home-assistant",
  zone: "mdi:map-marker-radius",
  schedule: "mdi:calendar-clock",
};

const DEVICE_CLASS_ICONS: Record<string, [string, string]> = {
  // [on icon, off icon]
  door: ["mdi:door-open", "mdi:door-closed"],
  garage_door: ["mdi:garage-open", "mdi:garage"],
  opening: ["mdi:square-outline", "mdi:square"],
  window: ["mdi:window-open", "mdi:window-closed"],
  motion: ["mdi:motion-sensor", "mdi:motion-sensor-off"],
  moving: ["mdi:octagon", "mdi:octagon-outline"],
  occupancy: ["mdi:home", "mdi:home-outline"],
  presence: ["mdi:home", "mdi:home-outline"],
  smoke: ["mdi:smoke", "mdi:smoke-detector-variant"],
  gas: ["mdi:alert-circle", "mdi:check-circle"],
  carbon_monoxide: ["mdi:smoke", "mdi:check-circle"],
  moisture: ["mdi:water", "mdi:water-off"],
  problem: ["mdi:alert-circle", "mdi:check-circle"],
  safety: ["mdi:alert-circle", "mdi:check-circle"],
  tamper: ["mdi:alert-circle", "mdi:check-circle"],
  connectivity: ["mdi:check-network-outline", "mdi:close-network-outline"],
  plug: ["mdi:power-plug", "mdi:power-plug-off"],
  power: ["mdi:flash", "mdi:flash-off"],
  battery: ["mdi:battery-alert", "mdi:battery"],
  battery_charging: ["mdi:battery-charging", "mdi:battery"],
  cold: ["mdi:snowflake", "mdi:thermometer"],
  heat: ["mdi:fire", "mdi:thermometer"],
  light: ["mdi:brightness-7", "mdi:brightness-5"],
  sound: ["mdi:music-note", "mdi:music-note-off"],
  vibration: ["mdi:vibrate", "mdi:crop-portrait"],
  running: ["mdi:play", "mdi:stop"],
  lock: ["mdi:lock-open", "mdi:lock"],
  update: ["mdi:package-up", "mdi:package"],
};

const STATE_ICONS: Record<string, Record<string, string>> = {
  lock: { locked: "mdi:lock", unlocked: "mdi:lock-open-variant", jammed: "mdi:lock-alert" },
  cover: { open: "mdi:window-shutter-open", closed: "mdi:window-shutter" },
  person: { home: "mdi:account", not_home: "mdi:account-arrow-right" },
  device_tracker: { home: "mdi:cellphone", not_home: "mdi:cellphone-arrow-down" },
  light: { off: "mdi:lightbulb-off", on: "mdi:lightbulb-on" },
  switch: { off: "mdi:toggle-switch-variant-off", on: "mdi:toggle-switch-variant" },
  media_player: { playing: "mdi:play-circle", paused: "mdi:pause-circle", off: "mdi:power" },
  alarm_control_panel: { disarmed: "mdi:shield-off", triggered: "mdi:bell-ring" },
  vacuum: { docked: "mdi:home-import-outline", cleaning: "mdi:robot-vacuum" },
};

export function iconFor(
  domain: string,
  stateObj: HassEntity | undefined,
  state: string | undefined,
  entryIcon?: string,
): string {
  const custom = stateObj?.attributes.icon ?? entryIcon;
  if (custom) return custom;
  const deviceClass = stateObj?.attributes.device_class;
  if (domain === "binary_sensor" && deviceClass && DEVICE_CLASS_ICONS[deviceClass]) {
    return DEVICE_CLASS_ICONS[deviceClass][state === "on" ? 0 : 1];
  }
  const byState = state ? STATE_ICONS[domain]?.[state] : undefined;
  if (byState) return byState;
  return DOMAIN_ICONS[domain] ?? "mdi:circle-medium";
}
