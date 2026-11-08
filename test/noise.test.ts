import { describe, expect, it } from "vitest";
import { friendlyTrigger } from "../src/context";
import { buildTimeline } from "../src/timeline";
import type { ActionEvent } from "../src/trace";
import type { LogbookEntry, WhatHappenedConfig } from "../src/types";
import { NOW, entry, makeHass, state } from "./helpers";

const cfg = (c: Partial<WhatHappenedConfig> = {}): WhatHappenedConfig => ({
  type: "custom:what-happened-card",
  ...c,
});
const hass = makeHass(
  [
    state("sensor.date_time", "2026-11-08, 15:19", { friendly_name: "Date & Time" }),
    state("automation.ai", "on", { friendly_name: "AI summaries" }),
    state("light.kitchen", "on", { friendly_name: "Kitchen light" }),
    state("switch.led", "off", { friendly_name: "Status LED" }),
    state("person.jan", "home", { friendly_name: "Jan" }),
  ],
  {
    entities: {
      "switch.led": { entity_id: "switch.led", entity_category: "diagnostic" },
      "light.kitchen": { entity_id: "light.kitchen" },
    },
  },
);
const items = (e: LogbookEntry[], c: Partial<WhatHappenedConfig> = {}) =>
  buildTimeline(hass, e, cfg({ hours_to_show: 24, activity: "everything", ...c }), NOW).flatMap(
    (g) => g.items,
  );

const clock = Array.from({ length: 40 }, (_, i) =>
  entry({
    ago: 60 * (i + 1),
    entity_id: "sensor.date_time",
    name: "Date & Time",
    state: `15:${i}`,
  }),
);

describe("chatty entities", () => {
  it("summarizes a clock that changes every minute into one entry", () => {
    const result = items([
      ...clock,
      entry({ ago: 5, entity_id: "person.jan", name: "Jan", state: "home" }),
    ]);
    expect(result).toHaveLength(2);
    const summary = result.find((i) => i.name === "Date & Time")!;
    expect(summary.verb).toBe("changed 40 times");
    expect(summary.details?.[0]).toMatch(/^latest: changed to/);
  });

  it("can hide them completely or show everything", () => {
    expect(items(clock, { chatty: "hide" })).toHaveLength(0);
    expect(
      items(clock, { chatty: "show", collapse_repeats: false, max_entries: 100 }),
    ).toHaveLength(40);
  });

  it("summarizes an automation that runs every 15 minutes", () => {
    const runs = Array.from({ length: 12 }, (_, i) =>
      entry({
        ago: 900 * (i + 1),
        entity_id: "automation.ai",
        domain: "automation",
        name: "AI summaries",
        message: "triggered by time pattern",
        source: "time pattern",
      }),
    );
    const result = items(runs, { automation_runs: "all" });
    expect(result).toHaveLength(1);
    expect(result[0].verb).toBe("was triggered 12 times");
    expect(result[0].cause?.trigger).toBe("time pattern");
  });

  it("does not summarize a lamp that was just switched ten times over a day", () => {
    const day = Array.from({ length: 10 }, (_, i) =>
      entry({
        ago: 7000 * (i + 1),
        entity_id: "light.kitchen",
        name: "Kitchen light",
        state: i % 2 ? "on" : "off",
      }),
    );
    expect(items(day, { collapse_repeats: false })).toHaveLength(10);
  });

  it("leaves ordinary activity alone", () => {
    const few = Array.from({ length: 6 }, (_, i) =>
      entry({
        ago: 3000 * (i + 1),
        entity_id: "light.kitchen",
        name: "Kitchen light",
        state: i % 2 ? "on" : "off",
      }),
    );
    expect(items(few)).toHaveLength(6);
  });
});

describe("bursts", () => {
  it("groups many entities doing the same thing in the same second", () => {
    const updates = Array.from({ length: 20 }, (_, i) =>
      entry({ ago: 120, entity_id: `update.thing_${i}`, name: `Thing ${i} Update`, state: "off" }),
    );
    const result = items(updates);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("20 updates");
    expect(result[0].verb).toBe("were turned off");
    expect(result[0].details?.[0]).toContain("and 14 more");
  });

  it("does not call one button pressed three times a burst of buttons", () => {
    const presses = [100, 101, 102].map((ago) =>
      entry({ ago, entity_id: "button.bell", name: "Doorbell", state: "2026-11-08T14:00:00" }),
    );
    expect(items(presses, { collapse_repeats: false })).toHaveLength(3);
  });

  it("does not group two entities or things far apart in time", () => {
    const two = [
      entry({ ago: 100, entity_id: "light.a", name: "A", state: "on" }),
      entry({ ago: 101, entity_id: "light.b", name: "B", state: "on" }),
    ];
    expect(items(two)).toHaveLength(2);
    const spread = [100, 400, 900, 1500].map((ago, i) =>
      entry({ ago, entity_id: `light.s${i}`, name: `S${i}`, state: "on" }),
    );
    expect(items(spread)).toHaveLength(4);
  });
});

describe("diagnostic entities", () => {
  const led = entry({ ago: 30, entity_id: "switch.led", name: "Status LED", state: "on" });
  it("are hidden by default and can be included", () => {
    expect(items([led])).toHaveLength(0);
    expect(items([led], { show_diagnostic: true })).toHaveLength(1);
  });
  it("are shown when picked by name", () => {
    expect(items([led], { target: { entity_id: "switch.led" } })).toHaveLength(1);
  });
});

describe("friendlyTrigger", () => {
  it("reads naturally", () => {
    expect(friendlyTrigger("event 'automation_triggered'")).toBe("another automation");
    expect(friendlyTrigger("time pattern")).toBe("time pattern");
  });
});

describe("meaningful activity (default)", () => {
  const meaningful = (e: LogbookEntry[], c: Partial<WhatHappenedConfig> = {}) =>
    buildTimeline(hass, e, cfg(c), NOW).flatMap((g) => g.items);

  it("leaves out clocks, text sensors and update entities", () => {
    const noise = [
      ...clock,
      entry({ ago: 50, entity_id: "update.card", name: "Card Update", state: "on" }),
      entry({ ago: 30, entity_id: "text.summary", name: "AI Summary", state: "A long text" }),
    ];
    expect(meaningful(noise)).toHaveLength(0);
  });

  describe("automation runs", () => {
    const run = entry({
      ago: 40,
      entity_id: "automation.visitor",
      domain: "automation",
      name: "Announce visitor",
      message: "triggered by state of binary_sensor.door",
      source: "state of binary_sensor.door",
    });
    const door = entry({
      ago: 41,
      entity_id: "binary_sensor.door",
      name: "Front door",
      state: "on",
    });
    const say: ActionEvent = {
      kind: "say",
      text: "Someone is at the front door",
      speakers: ["media_player.kitchen"],
      service: "tts.speak",
    };
    const speakerHass = makeHass([
      state("media_player.kitchen", "idle", { friendly_name: "Kitchen speaker" }),
      state("binary_sensor.door", "on", { friendly_name: "Front door", device_class: "door" }),
      state("automation.visitor", "on", { friendly_name: "Announce visitor" }),
    ]);
    const build = (
      e: LogbookEntry[],
      c: Partial<WhatHappenedConfig> = {},
      actions?: ActionEvent[],
    ) =>
      buildTimeline(speakerHass, e, cfg(c), NOW, undefined, undefined, () => actions).flatMap(
        (g) => g.items,
      );

    it("shows what a run said as its own entry, with who and why", () => {
      const [item] = build([run, door], {}, [say]);
      expect(item.name).toBe("Kitchen speaker");
      expect(item.verb).toBe("said “Someone is at the front door”");
      expect(item.cause?.actor?.name).toBe("Announce visitor");
      expect(item.cause?.trigger).toBe("Front door was opened");
      expect(build([run, door], {}, [say])).toHaveLength(1); // run and sensor are folded in
    });

    it("shows a sent notification", () => {
      const [item] = build([run], {}, [
        {
          kind: "notify",
          text: "Visitor at the door",
          title: "Door",
          speakers: [],
          service: "notify.x",
        },
      ]);
      expect(item.name).toBe("Notification");
      expect(item.verb).toBe("sent “Door: Visitor at the door”");
    });

    it("hides a run that said and sent nothing, and one whose trace is not loaded yet", () => {
      expect(build([run], {}, [])).toHaveLength(0);
      expect(build([run], {}, undefined)).toHaveLength(0);
    });

    it("does not also list the speaker starting to play", () => {
      const playing = entry({
        ago: 39,
        entity_id: "media_player.kitchen",
        name: "Kitchen speaker",
        state: "playing",
        context_event_type: "automation_triggered",
        context_entity_id: "automation.visitor",
      });
      expect(build([run, playing], {}, [say])).toHaveLength(1);
    });

    it("can show every run, or nothing at all", () => {
      expect(build([run], { automation_runs: "all" }, [])).toHaveLength(1);
      expect(build([run], { automation_runs: "none" }, [say])).toHaveLength(0);
      expect(build([run], { show_actions: false }, [say])).toHaveLength(0);
    });

    it("still summarizes a run that fires all the time when every run is shown", () => {
      const runs = Array.from({ length: 14 }, (_, i) => ({
        ...run,
        when: NOW / 1000 - 900 * (i + 1),
      }));
      const result = build(runs, { automation_runs: "all" }, []);
      expect(result).toHaveLength(1);
      expect(result[0].verb).toBe("was triggered 14 times");
    });
  });

  it("keeps what people care about", () => {
    const real = [
      entry({ ago: 50, entity_id: "light.kitchen", name: "Kitchen light", state: "on" }),
      entry({ ago: 40, entity_id: "person.jan", name: "Jan", state: "home" }),
      entry({ ago: 30, entity_id: "lock.front", name: "Front door lock", state: "locked" }),
    ];
    expect(meaningful(real)).toHaveLength(3);
  });

  it("brings noise back on request, or when an entity is picked by name", () => {
    expect(meaningful(clock, { activity: "everything" }).length).toBeGreaterThan(0);
    expect(
      meaningful(clock.slice(0, 2), { target: { entity_id: "sensor.date_time" } }),
    ).toHaveLength(2);
  });

  it("shows helpers and buttons only when a person used them", () => {
    const h = makeHass([
      state("input_boolean.guest", "on", { friendly_name: "Guest mode" }),
      state("button.repairs", "unknown", { friendly_name: "Repairs" }),
      state("device_tracker.phone", "home", { friendly_name: "Phone" }),
      state("binary_sensor.todo", "on", { friendly_name: "Todo" }),
    ]);
    const shown = (e: LogbookEntry) =>
      buildTimeline(h, [e], cfg(), NOW).flatMap((g) => g.items).length;
    const byPerson = { context_user_id: "u1", context_event_type: "call_service" };
    const byAutomation = {
      context_event_type: "automation_triggered",
      context_entity_id: "automation.x",
    };
    const helper = (c = {}) =>
      entry({ ago: 30, entity_id: "input_boolean.guest", name: "Guest mode", state: "on", ...c });
    expect(shown(helper(byPerson))).toBe(1);
    expect(shown(helper(byAutomation))).toBe(0);
    expect(shown(helper())).toBe(0);
    const press = (c = {}) =>
      entry({ ago: 30, entity_id: "button.repairs", name: "Repairs", state: "2026-11-08", ...c });
    expect(shown(press())).toBe(0);
    expect(shown(press(byPerson))).toBe(1);
    // a tracker only repeats its person; a class-less binary sensor needs a known cause
    expect(
      shown(entry({ ago: 30, entity_id: "device_tracker.phone", name: "Phone", state: "home" })),
    ).toBe(0);
    const todo = (c = {}) =>
      entry({ ago: 30, entity_id: "binary_sensor.todo", name: "Todo", state: "on", ...c });
    expect(shown(todo())).toBe(0);
    expect(shown(todo(byAutomation))).toBe(1);
  });

  it("filters binary sensors by what they report", () => {
    const h = makeHass([
      state("binary_sensor.door", "on", { device_class: "door" }),
      state("binary_sensor.wifi", "on", { device_class: "connectivity" }),
    ]);
    const run = (id: string) =>
      buildTimeline(
        h,
        [entry({ ago: 30, entity_id: id, name: id, state: "on" })],
        cfg(),
        NOW,
      ).flatMap((g) => g.items);
    expect(run("binary_sensor.door")).toHaveLength(1);
    expect(run("binary_sensor.wifi")).toHaveLength(0);
  });
});
