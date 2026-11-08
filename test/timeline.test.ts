import { describe, expect, it } from "vitest";
import { buildTimeline, passesFilters, plainSentence } from "../src/timeline";
import type { WhatHappenedConfig } from "../src/types";
import { NOW, entry, makeHass, state } from "./helpers";

const hass = makeHass([
  state("light.kitchen", "on", { friendly_name: "Kitchen light" }),
  state("person.jan", "home", { friendly_name: "Jan", entity_picture: "/jan.png", user_id: "u1" }),
  state("automation.a", "on", { friendly_name: "Auto A" }),
  state("binary_sensor.hall", "on", { friendly_name: "Hallway motion", device_class: "motion" }),
]);
const cfg = (c: Partial<WhatHappenedConfig> = {}): WhatHappenedConfig => ({
  type: "custom:what-happened-card",
  ...c,
});
const flat = (groups: ReturnType<typeof buildTimeline>) => groups.flatMap((g) => g.items);

describe("buildTimeline", () => {
  const entries = [
    entry({ ago: 60, entity_id: "light.kitchen", name: "Kitchen light", state: "on" }),
    entry({ ago: 600, entity_id: "person.jan", name: "Jan", state: "home" }),
    entry({ ago: 90_000, entity_id: "light.kitchen", name: "Kitchen light", state: "off" }),
    entry({ ago: 400_000, entity_id: "light.kitchen", name: "Kitchen light", state: "on" }),
  ];

  it("sorts newest first, applies the time window and groups by day", () => {
    const groups = buildTimeline(hass, entries, cfg({ hours_to_show: 48 }), NOW);
    expect(groups.map((g) => g.label)).toEqual(["Today", "Yesterday"]);
    expect(flat(groups)).toHaveLength(3);
    expect(flat(groups)[0].name).toBe("Kitchen light");
  });

  it("respects max_entries and oldest_first ordering", () => {
    const groups = buildTimeline(
      hass,
      entries,
      cfg({ max_entries: 2, order: "oldest_first", hours_to_show: 48 }),
      NOW,
    );
    const items = flat(groups);
    expect(items).toHaveLength(2);
    expect(items[0].when).toBeLessThan(items[1].when);
  });

  it("uses a person's picture for person events", () => {
    const item = flat(buildTimeline(hass, entries, cfg(), NOW)).find((i) => i.isPerson);
    expect(item?.picture).toBe("/jan.png");
    expect(item?.verb).toBe("arrived home");
  });

  it("filters by entity, domain and hides unavailable", () => {
    const more = [...entries, entry({ entity_id: "light.kitchen", state: "unavailable" })];
    expect(
      flat(buildTimeline(hass, more, cfg({ exclude_entities: ["person.jan"] }), NOW)),
    ).toHaveLength(1);
    expect(flat(buildTimeline(hass, more, cfg({ include_domains: ["person"] }), NOW))).toHaveLength(
      1,
    );
    expect(flat(buildTimeline(hass, more, cfg({ exclude_domains: ["light"] }), NOW))).toHaveLength(
      1,
    );
    expect(flat(buildTimeline(hass, more, cfg({ hide_unavailable: false }), NOW))).toHaveLength(3);
  });

  it("restricts to the allowed entity set", () => {
    const items = flat(buildTimeline(hass, entries, cfg(), NOW, new Set(["person.jan"])));
    expect(items).toHaveLength(1);
  });

  it("collapses rapid repeats of the same event", () => {
    const flapping = [
      entry({ ago: 10, entity_id: "light.kitchen", state: "on", context_user_id: "u1" }),
      entry({ ago: 120, entity_id: "light.kitchen", state: "on", context_user_id: "u1" }),
      entry({ ago: 200, entity_id: "light.kitchen", state: "on", context_user_id: "u1" }),
      entry({ ago: 250, entity_id: "light.kitchen", state: "on", context_user_id: "other" }),
    ];
    const items = flat(buildTimeline(hass, flapping, cfg(), NOW));
    expect(items.map((i) => i.count)).toEqual([3, 1]);
    expect(flat(buildTimeline(hass, flapping, cfg({ collapse_repeats: false }), NOW))).toHaveLength(
      4,
    );
  });

  it("builds the automation sentence from context", () => {
    const [item] = flat(
      buildTimeline(
        hass,
        [
          entry({
            entity_id: "light.kitchen",
            state: "on",
            context_event_type: "automation_triggered",
            context_entity_id: "automation.a",
            context_source: "state of light.kitchen",
          }),
        ],
        cfg(),
        NOW,
      ),
    );
    expect(plainSentence(item)).toBe(
      "Kitchen light was turned on by Auto A, triggered by state of Kitchen light",
    );
    expect(item.cause?.actor?.icon).toBeTruthy();
  });

  it("shows automation runs with their trigger", () => {
    const [item] = flat(
      buildTimeline(
        hass,
        [
          entry({
            entity_id: "automation.a",
            name: "Auto A",
            domain: "automation",
            message: "triggered by state of light.kitchen",
            source: "state of light.kitchen",
          }),
        ],
        cfg({ automation_runs: "all" }),
        NOW,
      ),
    );
    expect(item.verb).toBe("was triggered");
    expect(item.cause?.trigger).toBe("state of Kitchen light");
  });

  it("ignores entries from the far future", () => {
    expect(
      flat(
        buildTimeline(
          hass,
          [entry({ ago: -86_400, entity_id: "light.kitchen", state: "on" })],
          cfg(),
          NOW,
        ),
      ),
    ).toHaveLength(0);
  });
});

describe("passesFilters", () => {
  it("applies the same rules used when buffering live events", () => {
    const light = entry({ entity_id: "light.kitchen", state: "on" });
    expect(passesFilters(light, cfg(), undefined)).toBe(true);
    expect(passesFilters(light, cfg({ include_domains: ["person"] }), undefined)).toBe(false);
    expect(passesFilters(light, cfg({ exclude_entities: ["light.kitchen"] }), undefined)).toBe(
      false,
    );
    expect(passesFilters(light, cfg(), new Set(["light.other"]))).toBe(false);
  });
});

describe("chain merging", () => {
  const chain = [
    entry({ ago: 60, entity_id: "binary_sensor.hall", name: "Hallway motion", state: "on" }),
    entry({
      ago: 58,
      entity_id: "automation.a",
      domain: "automation",
      name: "Auto A",
      message: "triggered by state of binary_sensor.hall",
      source: "state of binary_sensor.hall",
    }),
    entry({
      ago: 57,
      entity_id: "light.kitchen",
      name: "Kitchen light",
      state: "on",
      context_event_type: "automation_triggered",
      context_entity_id: "automation.a",
      context_source: "state of binary_sensor.hall",
    }),
  ];

  it("folds sensor, automation run and device into a single entry", () => {
    const items = flat(buildTimeline(hass, chain, cfg(), NOW));
    expect(items).toHaveLength(1);
    expect(plainSentence(items[0])).toBe(
      "Kitchen light was turned on by Auto A, triggered by Hallway motion detected motion",
    );
  });

  it("keeps a plain automation run only when asked for every run", () => {
    expect(flat(buildTimeline(hass, [chain[1]], cfg(), NOW))).toHaveLength(0);
    const items = flat(buildTimeline(hass, [chain[1]], cfg({ automation_runs: "all" }), NOW));
    expect(items).toHaveLength(1);
    expect(items[0].verb).toBe("was triggered");
  });

  it("keeps unrelated entries", () => {
    const other = entry({ ago: 30, entity_id: "person.jan", name: "Jan", state: "home" });
    expect(flat(buildTimeline(hass, [...chain, other], cfg(), NOW))).toHaveLength(2);
  });
});
