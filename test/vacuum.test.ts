import { describe, expect, it } from "vitest";
import { buildTimeline, plainSentence } from "../src/timeline";
import { findTapoVacuums, parseStart, vacuumItems, type VacuumData } from "../src/vacuum";
import { NOW, entry, makeHass, state } from "./helpers";

const hass = makeHass([state("vacuum.robot", "docked", { friendly_name: "Robot vacuum" })], {
  user: { id: "u", name: "Ján" },
  entities: {
    "vacuum.robot": { entity_id: "vacuum.robot", platform: "tapo_rv30" },
    "vacuum.other": { entity_id: "vacuum.other", platform: "roborock" },
    "sensor.robot_battery": { entity_id: "sensor.robot_battery", platform: "tapo_rv30" },
  },
});
const cfg = { type: "custom:what-happened-card" };
const s = NOW / 1000;

const data: VacuumData = {
  entityId: "vacuum.robot",
  log: [
    {
      ts: s - 3600,
      kind: "start",
      text: "Started cleaning Kitchen and Hallway. Kitchen: 6 days since last clean; nobody home.",
    },
    { ts: s - 600, kind: "done", text: "Finished cleaning Kitchen and Hallway." },
    { ts: s - 9000, kind: "wait", text: "Waiting for the window" },
  ],
  runs: [
    { started: s - 3590, minutes: 42, area: 38, emptied_bin: true, start_type: 4, rule_name: null },
  ],
};

describe("findTapoVacuums", () => {
  it("only returns tapo_rv30 vacuum entities", () => {
    expect(findTapoVacuums(hass)).toEqual(["vacuum.robot"]);
  });
});

describe("parseStart", () => {
  it("extracts rooms, reason and who started it", () => {
    expect(parseStart("Started cleaning Kitchen and Hallway. due; nobody home.")).toEqual({
      names: "Kitchen and Hallway",
      why: "due; nobody home",
      byUser: false,
    });
    expect(parseStart("You started cleaning Kitchen.").byUser).toBe(true);
    expect(parseStart("something else").names).toBeUndefined();
  });
});

describe("vacuumItems", () => {
  it("makes one entry per run with rooms, facts and the planner's reason", () => {
    const items = vacuumItems(hass, data, cfg);
    expect(items).toHaveLength(1); // wait is noise and done is covered by the run
    const [run] = items;
    expect(run.verb).toBe("cleaned Kitchen and Hallway");
    expect(run.details).toEqual(["42 min", "38 m²", "bin emptied"]);
    expect(run.cause?.actor?.name).toBe("Cleaning planner");
    expect(run.cause?.trigger).toBe("Kitchen: 6 days since last clean; nobody home");
    expect(plainSentence(run)).toContain(
      "Robot vacuum cleaned Kitchen and Hallway by Cleaning planner",
    );
  });

  it("names where an unplanned run came from and flags errors", () => {
    const [run] = vacuumItems(
      hass,
      {
        entityId: "vacuum.robot",
        log: [],
        runs: [{ started: s - 100, minutes: 3, error: 7, start_type: 1 }],
      },
      cfg,
    );
    expect(run.cause?.actor?.name).toBe("the Tapo app");
    expect(run.tone).toBe("alert");
    expect(run.verb).toBe("stopped with error 7");
  });

  it("shows a started run that has no record yet", () => {
    const items = vacuumItems(
      hass,
      {
        entityId: "vacuum.robot",
        runs: [],
        log: [{ ts: s - 60, kind: "start", text: "You started cleaning Kitchen." }],
      },
      cfg,
    );
    expect(items[0].verb).toBe("started cleaning Kitchen");
    expect(items[0].cause?.actor?.kind).toBe("user");
  });

  it("shows planner events such as sending the robot home", () => {
    const [item] = vacuumItems(
      hass,
      {
        entityId: "vacuum.robot",
        runs: [],
        log: [{ ts: s - 60, kind: "docked", text: "Sent home: someone is home." }],
      },
      cfg,
    );
    expect(item.text).toBe("Sent home: someone is home");
  });
});

describe("timeline with vacuum data", () => {
  it("replaces the vacuum's plain state changes with the run entry", () => {
    const logbook = [
      entry({ ago: 3600, entity_id: "vacuum.robot", name: "Robot vacuum", state: "cleaning" }),
      entry({ ago: 600, entity_id: "vacuum.robot", name: "Robot vacuum", state: "docked" }),
      entry({ ago: 30, entity_id: "vacuum.robot", name: "Robot vacuum", state: "error" }),
    ];
    const items = buildTimeline(hass, logbook, cfg, NOW, undefined, {
      items: vacuumItems(hass, data, cfg),
      vacuums: new Set(["vacuum.robot"]),
    }).flatMap((g) => g.items);
    expect(items.map((i) => i.verb)).toEqual(["reported an error", "cleaned Kitchen and Hallway"]);
  });
});
