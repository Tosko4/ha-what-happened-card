import { describe, expect, it } from "vitest";
import { describeState } from "../src/state-message";
import { makeHass, state } from "./helpers";

const hass = makeHass([
  state("binary_sensor.door", "on", { device_class: "door" }),
  state("binary_sensor.motion", "on", { device_class: "motion" }),
  state("sensor.temp", "21.5", { unit_of_measurement: "°C" }),
  state("zone.work", "0", { friendly_name: "Work" }),
]);

describe("describeState", () => {
  it("uses device class for binary sensors", () => {
    expect(describeState(hass, "binary_sensor", "binary_sensor.door", "on").verb).toBe(
      "was opened",
    );
    expect(describeState(hass, "binary_sensor", "binary_sensor.door", "off").verb).toBe(
      "was closed",
    );
    expect(describeState(hass, "binary_sensor", "binary_sensor.motion", "on").verb).toBe(
      "detected motion",
    );
  });

  it("handles on/off for generic domains", () => {
    expect(describeState(hass, "light", "light.x", "on")).toEqual({
      verb: "was turned on",
      tone: "active",
    });
    expect(describeState(hass, "switch", "switch.x", "off")).toEqual({
      verb: "was turned off",
      tone: "inactive",
    });
  });

  it("describes presence", () => {
    expect(describeState(hass, "person", "person.a", "home").verb).toBe("arrived home");
    expect(describeState(hass, "person", "person.a", "not_home").verb).toBe("left home");
    expect(describeState(hass, "person", "person.a", "Work").verb).toBe("arrived at Work");
  });

  it("marks unavailable", () => {
    expect(describeState(hass, "light", "light.x", "unavailable")).toEqual({
      verb: "became unavailable",
      tone: "unavailable",
    });
  });

  it("covers locks, covers and alarms", () => {
    expect(describeState(hass, "lock", "lock.x", "locked").verb).toBe("was locked");
    expect(describeState(hass, "cover", "cover.x", "closing").verb).toBe("started closing");
    expect(describeState(hass, "alarm_control_panel", "alarm.x", "triggered").tone).toBe("alert");
  });

  it("falls back to the value with its unit", () => {
    expect(describeState(hass, "sensor", "sensor.temp", "23").verb).toBe("changed to 23 °C");
    expect(describeState(hass, "select", undefined, "auto_mode").verb).toBe("changed to Auto mode");
  });
});
