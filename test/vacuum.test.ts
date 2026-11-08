import { describe, expect, it } from "vitest";
import { buildTimeline } from "../src/timeline";
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
  it("gives a run a start entry (rooms, who, why) and a finish entry (the facts)", () => {
    const items = vacuumItems(hass, data, cfg);
    expect(items).toHaveLength(2); // wait is noise and done is covered by the run
    const start = items.find((i) => i.phase === "start")!;
    const finish = items.find((i) => i.phase === "finish")!;
    expect(start.verb).toBe("started cleaning Kitchen and Hallway");
    expect(start.cause?.actor?.name).toBe("Cleaning planner");
    expect(start.cause?.trigger).toBe("Kitchen: 6 days since last clean; nobody home");
    expect(finish.verb).toBe("finished cleaning Kitchen and Hallway");
    expect(finish.details).toEqual(["42 min", "38 m²", "bin emptied"]);
    expect(finish.when - start.when).toBe(42 * 60 * 1000);
  });

  it("names where an unplanned run came from and flags errors", () => {
    const items = vacuumItems(
      hass,
      {
        entityId: "vacuum.robot",
        log: [],
        runs: [{ started: s - 400, minutes: 3, error: 7, start_type: 1 }],
      },
      cfg,
    );
    expect(items.find((i) => i.phase === "start")?.cause?.actor?.name).toBe("the Tapo app");
    const finish = items.find((i) => i.phase === "finish")!;
    expect(finish.tone).toBe("alert");
    expect(finish.verb).toBe("stopped with error 7");
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
    expect(items).toHaveLength(1);
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

describe("sent home", () => {
  const people = makeHass(
    [
      state("vacuum.robot", "docked", { friendly_name: "Robot vacuum" }),
      state("person.jan", "home", { friendly_name: "Jan", entity_picture: "/jan.png" }),
    ],
    { entities: { "vacuum.robot": { entity_id: "vacuum.robot", platform: "tapo_rv30" } } },
  );

  it("says who came home and made the planner send the robot home", () => {
    const items = vacuumItems(
      people,
      {
        entityId: "vacuum.robot",
        runs: [],
        log: [
          {
            ts: s - 300,
            kind: "return",
            text: "Jan came home: finishing the kitchen, then docking.",
          },
          { ts: s - 120, kind: "docked", text: "Sent home: someone is home." },
        ],
      },
      cfg,
    );
    expect(items).toHaveLength(1);
    expect(items[0].verb).toBe("was sent home");
    expect(items[0].cause?.actor).toMatchObject({ name: "Jan", picture: "/jan.png" });
    expect(items[0].cause?.trigger).toBe("coming home");
    expect(items[0].details).toEqual(["Finishing the kitchen, then docking"]);
  });

  it("names several people and still works without the matching log line", () => {
    const [two] = vacuumItems(
      people,
      {
        entityId: "vacuum.robot",
        runs: [],
        log: [
          {
            ts: s - 300,
            kind: "return",
            text: "Jan and Veronika came home: finishing this room, then docking.",
          },
          { ts: s - 120, kind: "docked", text: "Sent home: someone is home." },
        ],
      },
      cfg,
    );
    expect(two.cause?.actor?.name).toBe("Jan and Veronika");
    const [alone] = vacuumItems(
      people,
      {
        entityId: "vacuum.robot",
        runs: [],
        log: [{ ts: s - 60, kind: "docked", text: "Sent home: someone is home." }],
      },
      cfg,
    );
    expect(alone.text).toBe("Sent home: someone is home");
  });
});

describe("timeline with vacuum data", () => {
  it("keeps a logbook line when its integration entry is outside the window", () => {
    const oldRun: VacuumData = {
      entityId: "vacuum.robot",
      log: [],
      runs: [{ started: s - (24 * 3600 + 180), minutes: 1 }],
    };
    // The run started just outside the 24h window; the plain "cleaning" line is just inside it.
    const logbook = [
      entry({
        ago: 24 * 3600 - 60,
        entity_id: "vacuum.robot",
        name: "Robot vacuum",
        state: "cleaning",
      }),
    ];
    const items = buildTimeline(hass, logbook, cfg, NOW, undefined, {
      items: vacuumItems(hass, oldRun, cfg),
      vacuums: new Set(["vacuum.robot"]),
    }).flatMap((g) => g.items);
    expect(items.map((i) => i.verb)).toEqual(["started cleaning"]);
  });

  const extra = () => ({ items: vacuumItems(hass, data, cfg), vacuums: new Set(["vacuum.robot"]) });
  const verbs = (logbook: ReturnType<typeof entry>[]) =>
    buildTimeline(hass, logbook, cfg, NOW, undefined, extra())
      .flatMap((g) => g.items)
      .map((i) => i.verb);

  it("shows started and finished as two entries, not duplicated by the logbook", () => {
    const logbook = [
      entry({ ago: 3600, entity_id: "vacuum.robot", name: "Robot vacuum", state: "cleaning" }),
      entry({ ago: 600, entity_id: "vacuum.robot", name: "Robot vacuum", state: "docked" }),
    ];
    expect(verbs(logbook)).toEqual([
      "finished cleaning Kitchen and Hallway",
      "started cleaning Kitchen and Hallway",
    ]);
  });

  it("keeps other vacuum states and logbook lines the integration knows nothing about", () => {
    const logbook = [
      entry({ ago: 30, entity_id: "vacuum.robot", name: "Robot vacuum", state: "error" }),
      entry({ ago: 90, entity_id: "vacuum.robot", name: "Robot vacuum", state: "returning" }),
      entry({ ago: 50_000, entity_id: "vacuum.robot", name: "Robot vacuum", state: "cleaning" }),
    ];
    const result = verbs(logbook);
    expect(result).toContain("reported an error");
    expect(result).toContain("is returning to its dock");
    // no integration entry near this one, so the plain logbook line stays
    expect(result.filter((v) => v === "started cleaning")).toHaveLength(1);
  });
});

describe("vacuum color", () => {
  it("is teal when cleaning and when docked, red on an error", () => {
    const items = vacuumItems(
      hass,
      {
        entityId: "vacuum.robot",
        log: [],
        runs: [
          { started: s - 400, minutes: 3 },
          { started: s - 4000, minutes: 3, error: 5 },
        ],
      },
      cfg,
    );
    const start = items.find((i) => i.phase === "start" && i.when === (s - 400) * 1000)!;
    const finish = items.find((i) => i.phase === "finish" && i.when === (s - 400 + 180) * 1000)!;
    const failed = items.find((i) => i.phase === "finish" && i.tone === "alert")!;
    expect(start.accent).toContain("--teal-color");
    expect(finish.accent).toContain("--teal-color");
    expect(failed.accent).toBe("var(--error-color)");
  });

  it("can still be recolored", () => {
    const result = buildTimeline(
      hass,
      [entry({ ago: 30, entity_id: "vacuum.robot", name: "Robot vacuum", state: "paused" })],
      { ...cfg, colors: [{ match: "vacuum", color: "purple" }] },
      NOW,
    ).flatMap((g) => g.items);
    expect(result[0].accent).toBe("var(--purple-color, #926bc7)");
  });
});
