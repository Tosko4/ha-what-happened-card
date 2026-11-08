import { describe, expect, it } from "vitest";
import { buildTimeline } from "../src/timeline";
import type { ActionEvent } from "../src/trace";
import type { LogbookEntry, WhatHappenedConfig } from "../src/types";
import { NOW, entry, makeHass, state } from "./helpers";

const hass = makeHass([
  state("person.jan", "home", { friendly_name: "Ján Dubovský", user_id: "u1" }),
  state("input_button.prid", "unknown", { friendly_name: "4 – Prídem onedlho" }),
  state("automation.code", "on", {
    friendly_name: "DevControl – Hlásenie kódu (spracovanie)",
    id: "1",
  }),
  state("media_player.echo", "idle", { friendly_name: "Atom Echo 01" }),
  state("text.b35", "Kod 4", { friendly_name: 'JadivClock 3.5" Broadcast' }),
  state("text.b43", "Kod 4", { friendly_name: 'JadivClock4.3" Jedáleň JadivClock Broadcast' }),
  state("text.b24", "Kod 4", { friendly_name: 'JadivClock 2.4" Broadcast' }),
  state("input_select.who", "Ján", { friendly_name: "Hlásenie – kto hlási" }),
  state("light.kitchen", "on", { friendly_name: "Kitchen light" }),
]);
const cfg = (c: Partial<WhatHappenedConfig> = {}): WhatHappenedConfig => ({
  type: "custom:what-happened-card",
  also_show_domains: ["text", "input_select"],
  ...c,
});

const viaCode = {
  context_event_type: "automation_triggered",
  context_entity_id: "automation.code",
  context_source: "input_button.prid was pressed",
};

// Pressing "4 – Prídem onedlho" as Ján, exactly as it appears in the real log.
const press: LogbookEntry[] = [
  entry({
    ago: 100,
    entity_id: "input_button.prid",
    name: "4 – Prídem onedlho",
    state: "2026-11-08T16:38:00",
    context_user_id: "u1",
    context_event_type: "call_service",
    context_domain: "input_button",
    context_service: "press",
  }),
  entry({
    ago: 99,
    entity_id: "automation.code",
    domain: "automation",
    name: "DevControl – Hlásenie kódu (spracovanie)",
    message: "triggered by input_button.prid was pressed",
    source: "input_button.prid was pressed",
  }),
  entry({
    ago: 98,
    entity_id: "text.b35",
    name: 'JadivClock 3.5" Broadcast',
    state: "Kod 4",
    ...viaCode,
  }),
  entry({
    ago: 98,
    entity_id: "text.b43",
    name: 'JadivClock4.3" Jedáleň JadivClock Broadcast',
    state: "Kod 4",
    ...viaCode,
  }),
  entry({
    ago: 98,
    entity_id: "text.b24",
    name: 'JadivClock 2.4" Broadcast',
    state: "Kod 4",
    ...viaCode,
  }),
  entry({
    ago: 97,
    entity_id: "input_select.who",
    name: "Hlásenie – kto hlási",
    state: "Ján",
    context_event_type: "call_service",
    context_domain: "input_select",
    context_service: "select_option",
  }),
];
const say: ActionEvent[] = [
  { kind: "say", text: "Kod 4", speakers: ["media_player.echo"], service: "tts.speak" },
];
const build = (e: LogbookEntry[], c: Partial<WhatHappenedConfig> = {}, actions = say) =>
  buildTimeline(hass, e, cfg(c), NOW, undefined, undefined, () => actions).flatMap((g) => g.items);

describe("one action, one entry", () => {
  const items = build(press);

  it("is a single entry headed by what was pressed, and by whom", () => {
    expect(items).toHaveLength(1);
    const [head] = items;
    expect(head.name).toBe("4 – Prídem onedlho");
    expect(head.cause?.actor?.name).toBe("Ján Dubovský");
    expect(head.via?.map((a) => a.name)).toEqual(["DevControl – Hlásenie kódu (spracovanie)"]);
  });

  it("lists everything it caused underneath", () => {
    const lines = items[0].effects!.map((e) => `${e.name} ${e.verb}`);
    expect(lines).toEqual([
      "Atom Echo 01 said “Kod 4”",
      "3 text entities changed to Kod 4",
      "Hlásenie – kto hlási changed to Ján",
    ]);
    expect(items[0].effects![1].details?.[0]).toContain("JadivClock 3.5");
  });

  it("is headed by the automation when nothing visible triggered it", () => {
    const timer = press
      .slice(1)
      .map((e) => ({ ...e, context_source: "time", source: "time", message: "triggered by time" }));
    const result = build(timer);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("DevControl – Hlásenie kódu (spracovanie)");
    expect(result[0].verb).toBe("ran");
    expect(result[0].cause?.trigger).toBe("time");
    expect(result[0].effects!.length).toBeGreaterThanOrEqual(2);
  });

  it("tells one effect of a person's press as press-by-person, with what it caused", () => {
    const one = [press[0], press[1]];
    const result = build(one);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("4 – Prídem onedlho");
    expect(result[0].cause?.actor?.name).toBe("Ján Dubovský");
    expect(result[0].effects!.map((e) => `${e.name} ${e.verb}`)).toEqual([
      "Atom Echo 01 said “Kod 4”",
    ]);
  });

  it("keeps one effect of a sensor as a single line", () => {
    const sensorHass = makeHass([
      state("binary_sensor.motion", "on", { friendly_name: "Hall motion", device_class: "motion" }),
      state("automation.lights", "on", { friendly_name: "Motion light" }),
      state("light.kitchen", "on", { friendly_name: "Kitchen light" }),
    ]);
    const result = buildTimeline(
      sensorHass,
      [
        entry({ ago: 60, entity_id: "binary_sensor.motion", name: "Hall motion", state: "on" }),
        entry({
          ago: 58,
          entity_id: "light.kitchen",
          name: "Kitchen light",
          state: "on",
          context_event_type: "automation_triggered",
          context_entity_id: "automation.lights",
          context_source: "state of binary_sensor.motion",
        }),
      ],
      cfg(),
      NOW,
    ).flatMap((g) => g.items);
    expect(result).toHaveLength(1);
    expect(result[0].effects).toBeUndefined();
    expect(result[0].name).toBe("Kitchen light");
    expect(result[0].cause?.trigger).toBe("Hall motion detected motion");
  });

  it("does not pull in unrelated entries, or the same thing at another time", () => {
    const other = entry({
      ago: 600,
      entity_id: "light.kitchen",
      name: "Kitchen light",
      state: "off",
    });
    expect(build([...press, other]).map((i) => i.name)).toEqual([
      "4 – Prídem onedlho",
      "Kitchen light",
    ]);
    const later = press.map((e) => ({ ...e, when: e.when - 3600 }));
    expect(build([...press, ...later])).toHaveLength(2);
  });

  it("is off when the user picks what to see", () => {
    expect(
      build(press, {
        include_domains: ["text", "input_button", "automation", "media_player", "input_select"],
      }).length,
    ).toBeGreaterThan(1);
  });
});

describe("icon colors", () => {
  const colored = (colors: WhatHappenedConfig["colors"]) =>
    buildTimeline(
      hass,
      [
        entry({ ago: 30, entity_id: "light.kitchen", name: "Kitchen light", state: "on" }),
        entry({
          ago: 40,
          entity_id: "input_select.who",
          name: "Hlásenie",
          state: "Ján",
          context_user_id: "u1",
        }),
      ],
      cfg({ colors }),
      NOW,
    )
      .flatMap((g) => g.items)
      .map((i) => [i.name, i.accent]);

  it("uses palette names, css colors, and lets an entity beat its domain", () => {
    expect(
      colored([
        { match: "light", color: "teal" },
        { match: "input_select", color: "#ff8800" },
      ]),
    ).toEqual([
      ["Kitchen light", "var(--teal-color, #009688)"],
      ["Hlásenie", "#ff8800"],
    ]);
    expect(
      colored([
        { match: "light", color: "teal" },
        { match: "light.kitchen", color: "pink" },
      ])[0][1],
    ).toBe("var(--pink-color, #e91e63)");
  });

  it("leaves everything else alone", () => {
    const plain = colored(undefined);
    expect(colored([{ match: "fan", color: "red" }])).toEqual(plain);
  });

  it("also colors the lines of a grouped entry", () => {
    const [head] = buildTimeline(
      hass,
      press,
      cfg({ colors: [{ match: "text", color: "orange" }] }),
      NOW,
      undefined,
      undefined,
      () => say,
    ).flatMap((g) => g.items);
    const text = head.effects!.find((e) => e.name.includes("text entities"))!;
    expect(text.accent).toBe("var(--orange-color, #ff9800)");
  });
});
