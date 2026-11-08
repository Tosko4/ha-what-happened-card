import type { HassEntity, Tone } from "./types";

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

/** HA palette variables with hex fallbacks for themes that do not define them. */
const PALETTE = {
  red: "var(--red-color, #f44336)",
  pink: "var(--pink-color, #e91e63)",
  purple: "var(--purple-color, #926bc7)",
  deepPurple: "var(--deep-purple-color, #6e41ab)",
  indigo: "var(--indigo-color, #3f51b5)",
  blue: "var(--blue-color, #2196f3)",
  lightBlue: "var(--light-blue-color, #03a9f4)",
  cyan: "var(--cyan-color, #00bcd4)",
  teal: "var(--teal-color, #009688)",
  green: "var(--green-color, #4caf50)",
  lightGreen: "var(--light-green-color, #8bc34a)",
  amber: "var(--amber-color, #ffc107)",
  orange: "var(--orange-color, #ff9800)",
  deepOrange: "var(--deep-orange-color, #ff6f22)",
  brown: "var(--brown-color, #795548)",
  blueGrey: "var(--blue-grey-color, #607d8b)",
  primary: "var(--primary-color, #03a9f4)",
};

const DOMAIN_COLORS: Record<string, string> = {
  light: PALETTE.amber,
  switch: PALETTE.orange,
  input_boolean: PALETTE.orange,
  group: PALETTE.orange,
  fan: PALETTE.cyan,
  climate: PALETTE.deepOrange,
  humidifier: PALETTE.lightBlue,
  water_heater: PALETTE.deepOrange,
  cover: PALETTE.indigo,
  valve: PALETTE.indigo,
  lock: PALETTE.green,
  alarm_control_panel: PALETTE.red,
  siren: PALETTE.red,
  binary_sensor: PALETTE.teal,
  sensor: PALETTE.blue,
  person: PALETTE.purple,
  device_tracker: PALETTE.purple,
  media_player: PALETTE.pink,
  vacuum: PALETTE.teal,
  lawn_mower: PALETTE.green,
  automation: PALETTE.purple,
  script: PALETTE.deepPurple,
  scene: PALETTE.pink,
  button: PALETTE.lightGreen,
  input_button: PALETTE.lightGreen,
  event: PALETTE.lightGreen,
  update: PALETTE.blue,
  sun: PALETTE.amber,
  weather: PALETTE.lightBlue,
  timer: PALETTE.brown,
  calendar: PALETTE.red,
  camera: PALETTE.blueGrey,
  homeassistant: PALETTE.blue,
};

export const ACTOR_COLORS = {
  user: PALETTE.primary,
  automation: PALETTE.purple,
  script: PALETTE.deepPurple,
  scene: PALETTE.pink,
  service: PALETTE.blueGrey,
  entity: PALETTE.teal,
  other: PALETTE.blueGrey,
  trigger: PALETTE.orange,
} as const;

export function accentFor(domain: string, tone: Tone, colorful: boolean): string {
  if (!colorful) return tone === "alert" ? PALETTE.red : PALETTE.primary;
  if (tone === "alert") return PALETTE.red;
  if (tone === "inactive") return "var(--state-inactive-color, var(--grey-color, #9e9e9e))";
  return DOMAIN_COLORS[domain] ?? PALETTE.primary;
}

export const ACTOR_ICONS = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline",
} as const;

/** Pick an icon that hints at the kind of trigger ("state of ...", "time", ...). */
export function triggerIcon(trigger: string): string {
  const t = trigger.toLowerCase();
  if (t.startsWith("numeric state")) return "mdi:chart-line";
  if (t.startsWith("state")) return "mdi:swap-horizontal";
  if (t.startsWith("time pattern")) return "mdi:timer-sand";
  if (t.startsWith("time")) return "mdi:clock-outline";
  if (t.startsWith("sun")) return "mdi:white-balance-sunny";
  if (t.startsWith("event")) return "mdi:flash";
  if (t.startsWith("webhook")) return "mdi:webhook";
  if (t.startsWith("mqtt")) return "mdi:access-point-network";
  if (t.startsWith("zone")) return "mdi:map-marker-radius";
  if (t.startsWith("homeassistant")) return "mdi:home-assistant";
  if (t.startsWith("calendar")) return "mdi:calendar";
  if (t.startsWith("tag")) return "mdi:nfc-variant";
  return "mdi:flash-outline";
}
