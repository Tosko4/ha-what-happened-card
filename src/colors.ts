import type { ColorRule, TimelineItem, WhatHappenedConfig } from "./types";

/** Home Assistant palette names usable as `color`, with the default theme's value as fallback. */
const PALETTE: Record<string, string> = {
  red: "#f44336",
  pink: "#e91e63",
  purple: "#926bc7",
  "deep-purple": "#6e41ab",
  indigo: "#3f51b5",
  blue: "#2196f3",
  "light-blue": "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4caf50",
  "light-green": "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  "deep-orange": "#ff6f22",
  brown: "#795548",
  "light-grey": "#bdbdbd",
  grey: "#9e9e9e",
  "dark-grey": "#606060",
  "blue-grey": "#607d8b",
  black: "#000000",
  white: "#ffffff",
};

/** A palette name (`orange`), `primary`, or any CSS color (`#ff8800`, `rgb(...)`, `var(--x)`). */
export function cssColor(value: string): string {
  const v = value.trim();
  if (v in PALETTE) return `var(--${v}-color, ${PALETTE[v]})`;
  if (v === "primary") return "var(--primary-color)";
  return v;
}

/** Entity rules win over domain rules; later rules win over earlier ones. */
export function colorFor(
  rules: ColorRule[] | undefined,
  entityId: string | undefined,
  domain: string,
): string | undefined {
  if (!rules?.length) return undefined;
  let byDomain: string | undefined;
  let byEntity: string | undefined;
  for (const rule of rules) {
    if (!rule?.match || !rule.color) continue;
    if (rule.match.includes(".")) {
      if (rule.match === entityId) byEntity = rule.color;
    } else if (rule.match === domain) {
      byDomain = rule.color;
    }
  }
  const chosen = byEntity ?? byDomain;
  return chosen ? cssColor(chosen) : undefined;
}

export function applyColors(items: TimelineItem[], config: WhatHappenedConfig): TimelineItem[] {
  const rules = config.colors;
  if (!rules?.length) return items;
  for (const item of items) {
    const own = colorFor(rules, item.entityId, item.domain);
    if (own) item.accent = own;
    for (const line of item.effects ?? []) {
      const lineColor = colorFor(rules, line.entityId, line.domain);
      if (lineColor) line.accent = lineColor;
    }
  }
  return items;
}
