import type { ActorKind, Tone } from "./types";

/**
 * Icons are normally rendered with <ha-state-icon>, which picks the icon from the
 * entity and its state (as the HA design guidelines ask). These plain icons are
 * only used for things that are not entities.
 */
export const FALLBACK_ICON = "mdi:information-outline";

export const ACTOR_ICONS: Record<ActorKind, string> = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline",
};

export function fallbackIcon(domain: string, entryIcon?: string): string {
  if (entryIcon) return entryIcon;
  return domain === "homeassistant" ? "mdi:home-assistant" : FALLBACK_ICON;
}

/**
 * State colors follow the theme, exactly like tile cards do: the variable lookup
 * order from the HA design guidelines, no colors of our own.
 */
export function stateColor(
  domain: string,
  deviceClass: string | undefined,
  state: string | undefined,
  tone: Tone,
  enabled: boolean,
): string {
  const neutral = "var(--state-icon-color, var(--primary-text-color))";
  if (!enabled) return tone === "unavailable" ? "var(--state-unavailable-color)" : neutral;
  switch (tone) {
    case "unavailable":
      return "var(--state-unavailable-color, var(--disabled-text-color))";
    case "alert":
      return "var(--error-color)";
    case "inactive":
      return `var(--state-${domain}-inactive-color, var(--state-inactive-color, ${neutral}))`;
    case "active": {
      const active = `var(--state-${domain}-active-color, var(--state-active-color, ${neutral}))`;
      const byState = state ? `var(--state-${domain}-${state}-color, ${active})` : active;
      return deviceClass && state
        ? `var(--state-${domain}-${deviceClass}-${state}-color, ${byState})`
        : byState;
    }
    default:
      return neutral;
  }
}
