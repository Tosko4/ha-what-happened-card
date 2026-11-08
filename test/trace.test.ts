import { describe, expect, it } from "vitest";
import {
  TraceCache,
  describeActions,
  pickRun,
  type TraceData,
  type TraceRunInfo,
} from "../src/trace";
import { NOW, makeHass, state } from "./helpers";

const hass = makeHass([
  state("media_player.kitchen", "idle", { friendly_name: "Kitchen speaker" }),
  state("media_player.hall", "idle", { friendly_name: "Hall speaker" }),
  state("light.porch", "off", { friendly_name: "Porch light" }),
  state("automation.visitor", "on", { friendly_name: "Visitor", id: "1700000000" }),
]);

const trace: TraceData = {
  trace: {
    "trigger/0": [{}],
    "action/0": [
      {
        result: {
          params: {
            domain: "tts",
            service: "speak",
            target: { entity_id: "tts.home_assistant_cloud" },
            service_data: {
              message: "Someone is at the front door",
              media_player_entity_id: "media_player.kitchen",
            },
          },
        },
      },
    ],
    "action/1/sequence/0": [
      {
        result: {
          params: {
            domain: "notify",
            service: "mobile_app_phone",
            service_data: { title: "Door", message: "Visitor at the door" },
          },
        },
      },
    ],
    "action/2": [
      {
        result: {
          params: { domain: "light", service: "turn_on", target: { entity_id: "light.porch" } },
        },
      },
    ],
  },
};

describe("describeActions", () => {
  it("reports spoken text and notifications", () => {
    expect(describeActions(hass, trace, false)).toEqual([
      "Said “Someone is at the front door” on Kitchen speaker",
      "Sent notification “Door: Visitor at the door”",
    ]);
  });

  it("adds plain service calls for runs with no other visible result", () => {
    expect(describeActions(hass, trace, true)).toContain("Called light.turn_on on Porch light");
  });

  it("handles legacy tts.*_say with entity_id speakers and a long text", () => {
    const long = "x".repeat(400);
    const lines = describeActions(
      hass,
      {
        trace: {
          "action/0": [
            {
              result: {
                params: {
                  domain: "tts",
                  service: "google_say",
                  service_data: {
                    entity_id: ["media_player.kitchen", "media_player.hall"],
                    message: long,
                  },
                },
              },
            },
          ],
        },
      },
      false,
    );
    expect(lines[0]).toMatch(/^Said “x+…” on Kitchen speaker, Hall speaker$/);
    expect(lines[0].length).toBeLessThan(260);
  });

  it("copes with empty traces", () => {
    expect(describeActions(hass, {}, true)).toEqual([]);
  });
});

describe("pickRun", () => {
  const runs: TraceRunInfo[] = [
    { run_id: "old", timestamp: { start: new Date(NOW - 3_600_000).toISOString() } },
    { run_id: "near", timestamp: { start: new Date(NOW - 20_000).toISOString() } },
    { run_id: "later", timestamp: { start: new Date(NOW + 60_000).toISOString() } },
  ];
  it("takes the run that started shortly before the event", () => {
    expect(pickRun(runs, NOW, 600_000)?.run_id).toBe("near");
    expect(pickRun(runs, NOW, 10_000)).toBeUndefined();
  });
});

describe("TraceCache", () => {
  it("loads the trace behind an event once and then serves it from memory", async () => {
    const calls: string[] = [];
    const h = makeHass(Object.values(hass.states), {
      callWS: (async (msg: Record<string, unknown>) => {
        calls.push(String(msg.type));
        if (msg.type === "trace/list") {
          return [{ run_id: "r1", timestamp: { start: new Date(NOW - 5_000).toISOString() } }];
        }
        return trace;
      }) as never,
    });
    const cache = new TraceCache(h);
    expect(cache.lookup("automation.visitor", NOW, 60_000)).toBeUndefined();
    await cache.ensure("automation.visitor", NOW, 60_000);
    expect(cache.lookup("automation.visitor", NOW, 60_000)).toBe(trace);
    expect(cache.ensure("automation.visitor", NOW, 60_000)).toBeUndefined();
    expect(calls).toEqual(["trace/list", "trace/get"]);
  });

  it("stays quiet when traces are not available", async () => {
    const h = makeHass(Object.values(hass.states), {
      callWS: (async () => {
        throw new Error("unauthorized");
      }) as never,
    });
    const cache = new TraceCache(h);
    await cache.ensure("automation.visitor", NOW, 60_000);
    expect(cache.lookup("automation.visitor", NOW, 60_000)).toBeUndefined();
  });
});
