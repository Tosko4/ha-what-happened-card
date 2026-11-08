import { describe, expect, it } from "vitest";
import { hasTarget, resolveTargetEntities } from "../src/targets";
import { makeHass } from "./helpers";

const hass = makeHass([], {
  entities: {
    "light.a": { entity_id: "light.a", device_id: "d1", area_id: null },
    "light.b": { entity_id: "light.b", device_id: "d2", area_id: "garden" },
    "sensor.c": {
      entity_id: "sensor.c",
      device_id: null,
      area_id: "kitchen",
      labels: ["important"],
    },
    "switch.d": { entity_id: "switch.d", device_id: "d3" },
  },
  devices: {
    d1: { id: "d1", area_id: "kitchen" },
    d2: { id: "d2", area_id: "kitchen" },
    d3: { id: "d3", area_id: null, labels: ["important"] },
  },
  areas: {
    kitchen: { area_id: "kitchen", name: "Kitchen", floor_id: "ground" },
    garden: { area_id: "garden", name: "Garden", floor_id: "outside" },
  },
});

describe("resolveTargetEntities", () => {
  it("resolves areas through devices, but entity area wins", () => {
    expect([...resolveTargetEntities(hass, { area_id: "kitchen" })].sort()).toEqual([
      "light.a",
      "sensor.c",
    ]);
  });
  it("resolves devices, labels, floors and plain entities", () => {
    expect([...resolveTargetEntities(hass, { device_id: ["d2"] })]).toEqual(["light.b"]);
    expect([...resolveTargetEntities(hass, { label_id: "important" })].sort()).toEqual([
      "sensor.c",
      "switch.d",
    ]);
    expect([...resolveTargetEntities(hass, { floor_id: "outside" })]).toEqual(["light.b"]);
    expect([...resolveTargetEntities(hass, { entity_id: "sensor.x" })]).toEqual(["sensor.x"]);
  });
  it("detects empty targets", () => {
    expect(hasTarget(undefined)).toBe(false);
    expect(hasTarget({ area_id: [] })).toBe(false);
    expect(hasTarget({ entity_id: "light.a" })).toBe(true);
  });
});
