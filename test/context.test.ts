import { describe, expect, it } from "vitest";
import { humanizeEntityIds, resolveCause, runTrigger } from "../src/context";
import { entry, makeHass, state } from "./helpers";

const hass = makeHass(
  [
    state("person.jan", "home", {
      friendly_name: "Jan",
      user_id: "u1",
      entity_picture: "/api/image/jan.png",
    }),
    state("automation.motion_light", "on", { friendly_name: "Motion light" }),
    state("binary_sensor.hall_motion", "on", { friendly_name: "Hallway motion" }),
    state("script.goodnight", "off", { friendly_name: "Goodnight" }),
  ],
  { user: { id: "u2", name: "Admin" } },
);

describe("humanizeEntityIds", () => {
  it("replaces known entity ids only", () => {
    expect(humanizeEntityIds(hass, "state of binary_sensor.hall_motion")).toBe(
      "state of Hallway motion",
    );
    expect(humanizeEntityIds(hass, "state of sensor.unknown_thing")).toBe(
      "state of sensor.unknown_thing",
    );
    expect(humanizeEntityIds(hass, "time pattern")).toBe("time pattern");
  });
});

describe("resolveCause", () => {
  it("resolves automation with trigger", () => {
    const cause = resolveCause(
      hass,
      entry({
        context_event_type: "automation_triggered",
        context_entity_id: "automation.motion_light",
        context_name: "Motion light",
        context_source: "state of binary_sensor.hall_motion",
      }),
    );
    expect(cause?.actor).toMatchObject({ kind: "automation", name: "Motion light" });
    expect(cause?.trigger).toBe("state of Hallway motion");
  });

  it("extracts the trigger from context_message as a fallback", () => {
    const cause = resolveCause(
      hass,
      entry({
        context_event_type: "automation_triggered",
        context_entity_id: "automation.motion_light",
        context_message: "triggered by state of binary_sensor.hall_motion",
      }),
    );
    expect(cause?.trigger).toBe("state of Hallway motion");
  });

  it("resolves a person via user id with picture", () => {
    const cause = resolveCause(
      hass,
      entry({
        context_user_id: "u1",
        context_event_type: "call_service",
        context_domain: "light",
        context_service: "turn_on",
      }),
    );
    expect(cause?.actor).toMatchObject({
      kind: "user",
      name: "Jan",
      picture: "/api/image/jan.png",
      detail: "light.turn_on",
    });
  });

  it("falls back to the logged-in user, then to a generic user", () => {
    expect(resolveCause(hass, entry({ context_user_id: "u2" }))?.actor?.name).toBe("Admin");
    expect(resolveCause(hass, entry({ context_user_id: "other" }))?.actor?.name).toBe("A user");
  });

  it("describes service calls without a user", () => {
    const cause = resolveCause(
      hass,
      entry({
        context_event_type: "call_service",
        context_domain: "light",
        context_service: "turn_off",
      }),
    );
    expect(cause?.actor).toMatchObject({ kind: "service", name: "light.turn_off" });
  });

  it("describes entity-caused changes", () => {
    const cause = resolveCause(
      hass,
      entry({ context_entity_id: "binary_sensor.hall_motion", context_message: "detected motion" }),
    );
    expect(cause?.actor).toMatchObject({ kind: "entity", name: "Hallway motion" });
  });

  it("returns undefined when there is no context", () => {
    expect(resolveCause(hass, entry({}))).toBeUndefined();
  });
});

describe("runTrigger", () => {
  it("reads source or message", () => {
    expect(runTrigger(hass, entry({ source: "state of binary_sensor.hall_motion" }))).toBe(
      "state of Hallway motion",
    );
    expect(runTrigger(hass, entry({ message: "triggered by time pattern" }))).toBe("time pattern");
    expect(runTrigger(hass, entry({ message: "triggered" }))).toBeUndefined();
  });
});
