import type { HassEntity, HomeAssistant, LogbookEntry } from "../src/types";

export function state(
  entity_id: string,
  stateValue: string,
  attributes: HassEntity["attributes"] = {},
): HassEntity {
  return { entity_id, state: stateValue, attributes };
}

export function makeHass(states: HassEntity[], extra: Partial<HomeAssistant> = {}): HomeAssistant {
  return {
    states: Object.fromEntries(states.map((s) => [s.entity_id, s])),
    connection: { subscribeMessage: async () => () => undefined },
    ...extra,
  };
}

export const NOW = new Date("2026-11-08T12:00:00").getTime();

export function entry(partial: Partial<LogbookEntry> & { ago?: number }): LogbookEntry {
  const { ago = 60, ...rest } = partial;
  return { when: NOW / 1000 - ago, ...rest };
}
