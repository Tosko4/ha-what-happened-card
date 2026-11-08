import * as mdi from "@mdi/js";
import { iconFor } from "./icons";
import "../src/card";
import "../src/editor";
import type { HomeAssistant, LogbookEntry } from "../src/types";

// --- Minimal stand-ins for HA frontend elements -----------------------------
customElements.define(
  "ha-card",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `<style>
        :host{display:block;background:var(--ha-card-background,var(--card-background-color));
        border-radius:var(--ha-card-border-radius,12px);box-shadow:var(--ha-card-box-shadow,0 1px 3px rgba(0,0,0,.2));
        color:var(--primary-text-color);height:100%}
        :host(.compact){}
        ::slotted(.card-header){display:block;font-size:24px;line-height:32px;padding:24px 16px 16px;margin:0;font-weight:400}
      </style><slot></slot>`;
    }
  },
);
// ha-card is a light-DOM child consumer: copy host classes when lit sets them.
class MdiIcon extends HTMLElement {
  protected _icon = "";
  set icon(v: string) {
    this._icon = v;
    this.render();
  }
  get icon() {
    return this._icon;
  }
  static get observedAttributes() {
    return ["icon"];
  }
  attributeChangedCallback(_n: string, _o: string, v: string) {
    this.icon = v;
  }
  render() {
    const key =
      "mdi" +
      this._icon.replace("mdi:", "").replace(/(^|-)(\w)/g, (_m, _a, c: string) => c.toUpperCase());
    const path = (mdi as Record<string, string>)[key] ?? mdi.mdiCircleMedium;
    this.style.display = "inline-flex";
    this.style.width = this.style.height = "var(--mdc-icon-size, 24px)";
    this.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="${path}"/></svg>`;
  }
}
customElements.define("ha-icon", MdiIcon);
// Stand-in for <ha-state-icon>: HA picks the icon from the entity and its state.
customElements.define(
  "ha-state-icon",
  class extends MdiIcon {
    private _stateObj: any;
    private _stateValue?: string;
    set stateObj(v: any) {
      this._stateObj = v;
      this.update();
    }
    set stateValue(v: string | undefined) {
      this._stateValue = v;
      this.update();
    }
    set hass(_v: unknown) {}
    private update() {
      if (!this._stateObj) return;
      this.icon = iconFor(
        this._stateObj.entity_id.split(".")[0],
        this._stateObj,
        this._stateValue ?? this._stateObj.state,
      );
    }
  },
);
customElements.define("ha-alert", class extends HTMLElement {});

// --- Mock data -------------------------------------------------------------
function avatar(letter: string, bg: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${bg}"/><text x="32" y="43" font-size="32" text-anchor="middle" fill="#fff" font-family="sans-serif">${letter}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const states = [
  [
    "person.jan",
    "home",
    { friendly_name: "Ján", user_id: "u1", entity_picture: avatar("J", "#7e57c2") },
  ],
  [
    "person.veronika",
    "not_home",
    { friendly_name: "Veronika", user_id: "u2", entity_picture: avatar("V", "#ec407a") },
  ],
  ["light.living_room", "on", { friendly_name: "Living room light" }],
  ["light.hall", "off", { friendly_name: "Hallway light" }],
  ["binary_sensor.hall_motion", "on", { friendly_name: "Hallway motion", device_class: "motion" }],
  ["binary_sensor.front_door", "off", { friendly_name: "Front door", device_class: "door" }],
  ["lock.front", "locked", { friendly_name: "Front door lock" }],
  ["cover.garage", "closed", { friendly_name: "Garage door" }],
  ["automation.motion_light", "on", { friendly_name: "Motion light" }],
  ["script.goodnight", "off", { friendly_name: "Goodnight routine" }],
  ["climate.bedroom", "heat", { friendly_name: "Bedroom thermostat" }],
  ["media_player.tv", "playing", { friendly_name: "Living room TV" }],
  ["switch.pump", "on", { friendly_name: "Irrigation pump" }],
  ["vacuum.robot", "docked", { friendly_name: "Robot vacuum" }],
  ["alarm_control_panel.home", "armed_away", { friendly_name: "Home alarm" }],
].map(([entity_id, state, attributes]) => ({ entity_id, state, attributes }) as any);

const now = Date.now() / 1000;
const m = (min: number) => now - min * 60;
const events: LogbookEntry[] = [
  {
    when: m(1),
    entity_id: "light.living_room",
    name: "Living room light",
    state: "on",
    context_event_type: "automation_triggered",
    context_entity_id: "automation.motion_light",
    context_source: "state of binary_sensor.hall_motion",
  },
  {
    when: m(1.2),
    entity_id: "automation.motion_light",
    domain: "automation",
    name: "Motion light",
    message: "triggered by state of binary_sensor.hall_motion",
    source: "state of binary_sensor.hall_motion",
  },
  { when: m(1.3), entity_id: "binary_sensor.hall_motion", name: "Hallway motion", state: "on" },
  {
    when: m(9),
    entity_id: "lock.front",
    name: "Front door lock",
    state: "locked",
    context_user_id: "u1",
    context_event_type: "call_service",
    context_domain: "lock",
    context_service: "lock",
  },
  { when: m(12), entity_id: "person.jan", name: "Ján", state: "home" },
  { when: m(14), entity_id: "binary_sensor.front_door", name: "Front door", state: "off" },
  { when: m(15), entity_id: "binary_sensor.front_door", name: "Front door", state: "on" },
  {
    when: m(41),
    entity_id: "media_player.tv",
    name: "Living room TV",
    state: "playing",
    context_user_id: "u2",
    context_event_type: "call_service",
    context_domain: "media_player",
    context_service: "media_play",
  },
  {
    when: m(58),
    entity_id: "switch.pump",
    name: "Irrigation pump",
    state: "on",
    context_event_type: "script_started",
    context_entity_id: "script.goodnight",
    context_source: "time",
  },
  {
    when: m(60 * 3),
    entity_id: "climate.bedroom",
    name: "Bedroom thermostat",
    state: "heat",
    context_event_type: "call_service",
    context_domain: "climate",
    context_service: "set_hvac_mode",
  },
  { when: m(60 * 5), entity_id: "person.veronika", name: "Veronika", state: "not_home" },
  ...[0, 2, 3].map(
    (o) =>
      ({
        when: m(60 * 6 + o),
        entity_id: "light.hall",
        name: "Hallway light",
        state: "on",
        context_entity_id: "binary_sensor.hall_motion",
        context_domain: "binary_sensor",
      }) as LogbookEntry,
  ),
  {
    when: m(60 * 7),
    entity_id: "cover.garage",
    name: "Garage door",
    state: "closed",
    context_user_id: "u1",
  },
  {
    when: m(60 * 20),
    entity_id: "alarm_control_panel.home",
    name: "Home alarm",
    state: "armed_away",
    context_user_id: "u2",
  },
  {
    when: m(60 * 22),
    entity_id: "light.living_room",
    name: "Living room light",
    state: "off",
    context_event_type: "automation_triggered",
    context_entity_id: "automation.motion_light",
    context_source: "time pattern",
  },
  { when: m(60 * 23), entity_id: "switch.pump", name: "Irrigation pump", state: "off" },
];

const vacuumRuns = [
  { started: m(95), minutes: 42, area: 38, emptied_bin: true, start_type: 4 },
  { started: m(60 * 9), minutes: 27, area: 21, start_type: 1, rule_name: "Kitchen deep clean" },
  { started: m(60 * 21), minutes: 4, area: 2, error: 12, start_type: 4 },
];
const plannerLog = [
  {
    ts: m(96),
    kind: "start",
    text: "Started cleaning Kitchen and Hallway. Kitchen: 6 days since last clean; nobody home.",
  },
  { ts: m(54), kind: "done", text: "Finished cleaning Kitchen and Hallway." },
  { ts: m(30), kind: "docked", text: "Sent home: someone is home." },
];
events.push(
  { when: m(96), entity_id: "vacuum.robot", name: "Robot vacuum", state: "cleaning" },
  { when: m(53), entity_id: "vacuum.robot", name: "Robot vacuum", state: "docked" },
);

const hass: HomeAssistant = {
  states: Object.fromEntries(states.map((s: any) => [s.entity_id, s])),
  entities: { "vacuum.robot": { entity_id: "vacuum.robot", platform: "tapo_rv30" } },
  devices: {},
  areas: {},
  locale: { language: "en", time_format: "24" },
  callWS: async (msg: any) => (msg.type === "tapo_rv30/history/list" ? { runs: vacuumRuns } : {}),
  connection: {
    subscribeMessage: async (cb: (m: any) => void, msg: any) => {
      if (msg.type === "tapo_rv30/planner/subscribe") {
        setTimeout(() => cb({ log: plannerLog }), 30);
        return () => undefined;
      }
      setTimeout(() => cb({ events }), 30);
      (window as any).__push = (e: LogbookEntry) => cb({ events: [e] });
      return () => undefined;
    },
  },
} as any;

function mount(id: string, config: Record<string, unknown>) {
  const card = document.createElement("what-happened-card") as any;
  card.setConfig({ type: "custom:what-happened-card", ...config });
  card.hass = hass;
  card.style.display = "block";
  document.getElementById(id)!.append(card);
  card.addEventListener("hass-more-info", (e: CustomEvent) =>
    console.log("more-info", e.detail.entityId),
  );
}

mount("a", { title: "What happened", hours_to_show: 48, max_entries: 50 });
mount("b", { title: "Activity", compact: true, time_display: "relative" });
mount("c", { hours_to_show: 1, show_day_headers: false, state_color: false });
if (location.hash.includes("dark")) document.body.classList.add("dark");
