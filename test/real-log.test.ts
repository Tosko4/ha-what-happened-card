import { describe, expect, it } from "vitest";
import { buildTimeline } from "../src/timeline";
import type { ActionEvent } from "../src/trace";
import type { LogbookEntry } from "../src/types";
import { NOW, entry, makeHass, state } from "./helpers";

/**
 * A condensed copy of what a real installation logs. Everything here happened in the log of
 * a house running v0.1.0, which listed ~500 lines for about an hour of activity.
 */
const hass = makeHass(
  [
    state("person.pavel", "home", {
      friendly_name: "Pavel Dubovský",
      device_trackers: ["device_tracker.moto"],
    }),
    state("device_tracker.moto", "home", { friendly_name: "moto g13" }),
    state("light.dining", "off", { friendly_name: "Svetlá jedáleň" }),
    state("media_player.atom_echo", "idle", { friendly_name: "Atom Echo 01" }),
    state("switch.listen_light", "off", { friendly_name: "Atom Echo 01 Use listen light" }),
    state("script.tts_announce", "off", { friendly_name: "TTS Announce Script (Atom Echo 01)" }),
    state("automation.code", "on", { friendly_name: "DevControl – Hlásenie kódu (spracovanie)" }),
    state("automation.angel", "on", { friendly_name: "Anjel pana" }),
    state("input_button.code44", "unknown", {
      friendly_name: "44 – Onedlho sa bude vysávať (2–15 min)",
    }),
    state("input_boolean.recently", "off", { friendly_name: "Automation recntly" }),
    state("input_select.who", "iné", { friendly_name: "Hlásenie – kto hlási" }),
    state("button.repairs", "unknown", { friendly_name: "Repairs" }),
    state("binary_sensor.todo_main", "on", { friendly_name: "Main" }),
    state("sensor.date_time", "x", { friendly_name: "Date & Time" }),
    state("update.hacs", "off", { friendly_name: "HACS Update" }),
  ],
  {
    entities: {
      "switch.listen_light": { entity_id: "switch.listen_light", entity_category: "config" },
    },
  },
);
const cfg = { type: "custom:what-happened-card", hours_to_show: 24, max_entries: 200 };
const s = NOW / 1000;
const e = (ago: number, rest: Partial<LogbookEntry>): LogbookEntry => entry({ ago, ...rest });

const byCode = {
  context_event_type: "automation_triggered",
  context_entity_id: "automation.code",
  context_source: "input_button.code44 was pressed",
};

const log: LogbookEntry[] = [
  // --- Home Assistant restarted; everything restores its state without a cause
  e(3000, {
    entity_id: "homeassistant",
    domain: "homeassistant",
    name: "Home Assistant",
    message: "stopped",
  }),
  e(2900, {
    entity_id: "homeassistant",
    domain: "homeassistant",
    name: "Home Assistant",
    message: "started",
  }),
  e(2890, { entity_id: "switch.listen_light", name: "Use listen light", state: "on" }),
  e(2890, { entity_id: "light.dining", name: "Svetlá jedáleň", state: "on" }),
  e(2890, { entity_id: "binary_sensor.todo_main", name: "Main", state: "on" }),
  e(2880, { entity_id: "device_tracker.moto", name: "moto g13", state: "home" }),
  e(2870, { entity_id: "person.pavel", name: "Pavel Dubovský", state: "home" }),
  // --- plumbing
  ...Array.from({ length: 60 }, (_, i) =>
    e(60 * (i + 1), { entity_id: "sensor.date_time", name: "Date & Time", state: `15:${i}` }),
  ),
  e(1200, { entity_id: "update.hacs", name: "HACS Update", state: "off" }),
  e(1100, { entity_id: "button.repairs", name: "Repairs", state: "2026-11-08T14:00:00" }),
  e(1000, {
    entity_id: "input_boolean.recently",
    name: "Automation recntly",
    state: "on",
    context_event_type: "automation_triggered",
    context_entity_id: "automation.angel",
  }),
  // --- "Onedlho sa bude vysávať": a button starts an automation, which runs a script, which speaks
  e(420, { entity_id: "input_button.code44", name: "44 – Onedlho", state: "2026-11-08T14:00:00" }),
  e(419, { entity_id: "input_select.who", name: "Hlásenie – kto hlási", state: "iné", ...byCode }),
  e(418, {
    entity_id: "script.tts_announce",
    domain: "script",
    name: "TTS Announce Script (Atom Echo 01)",
    message: "started",
    ...byCode,
  }),
  e(418, {
    entity_id: "script.tts_announce",
    name: "TTS Announce Script (Atom Echo 01)",
    state: "on",
    ...byCode,
  }),
  e(417, {
    entity_id: "media_player.atom_echo",
    name: "Atom Echo 01",
    state: "playing",
    ...byCode,
  }),
  e(416, { entity_id: "switch.listen_light", name: "Use listen light", state: "on", ...byCode }),
  e(410, { entity_id: "media_player.atom_echo", name: "Atom Echo 01", state: "idle", ...byCode }),
  e(409, {
    entity_id: "script.tts_announce",
    name: "TTS Announce Script (Atom Echo 01)",
    state: "off",
    ...byCode,
  }),
  // --- the same on a timer
  e(200, {
    entity_id: "automation.angel",
    domain: "automation",
    name: "Anjel pana",
    message: "triggered by time",
    source: "time",
  }),
  e(199, {
    entity_id: "script.tts_announce",
    domain: "script",
    name: "TTS Announce Script (Atom Echo 01)",
    message: "started",
    context_event_type: "automation_triggered",
    context_entity_id: "automation.angel",
    context_source: "time",
  }),
  e(198, {
    entity_id: "media_player.atom_echo",
    name: "Atom Echo 01",
    state: "playing",
    context_event_type: "automation_triggered",
    context_entity_id: "automation.angel",
    context_source: "time",
  }),
];

const say = (text: string): ActionEvent[] => [
  { kind: "say", text, speakers: ["media_player.atom_echo"], service: "tts.speak" },
];

describe("a real house, default view", () => {
  const items = buildTimeline(hass, log, cfg, NOW, undefined, undefined, (run) =>
    run.entityId === "script.tts_announce"
      ? say(run.cause?.actor?.name === "Anjel pana" ? "Anjel pana" : "Onedlho sa bude vysávať")
      : undefined,
  ).flatMap((g) => g.items);

  it("shows only what happened, not the plumbing", () => {
    expect(items.map((i) => `${i.name} ${i.verb}`)).toEqual([
      "Atom Echo 01 said “Anjel pana”",
      "Atom Echo 01 said “Onedlho sa bude vysávať”",
      "Pavel Dubovský arrived home",
      "Home Assistant started",
    ]);
  });

  it("says who and why for what was said", () => {
    const [angel, code] = items;
    expect(angel.cause?.actor?.name).toBe("Anjel pana");
    expect(angel.cause?.trigger).toBe("time");
    expect(code.cause?.actor?.name).toBe("DevControl – Hlásenie kódu (spracovanie)");
    expect(code.cause?.trigger).toBe("44 – Onedlho sa bude vysávať (2–15 min) was pressed");
  });

  it("shows the person arriving, based on their phone, and not the phone itself", () => {
    const pavel = items.find((i) => i.name === "Pavel Dubovský")!;
    expect(pavel.cause?.trigger).toBe("device moto g13");
  });

  it("shows everything with activity: everything", () => {
    const all = buildTimeline(
      hass,
      log,
      { ...cfg, activity: "everything", chatty: "show" },
      NOW,
    ).flatMap((g) => g.items);
    expect(all.length).toBeGreaterThan(60);
  });

  it("is a small fraction of the raw log", () => {
    expect(items.length).toBeLessThan(log.length / 10);
    expect(s).toBeGreaterThan(0);
  });
});
