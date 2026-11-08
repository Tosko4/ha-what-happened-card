import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { formatDateTime, formatRelative, formatTime } from "./format";
import { subscribeLogbook } from "./logbook";
import { cardStyles } from "./styles";
import { hasTarget, resolveTargetEntities } from "./targets";
import {
  DEFAULTS,
  buildTimeline,
  effectiveHours,
  entryKey,
  passesFilters,
  plainSentence,
} from "./timeline";
import type {
  Actor,
  DayGroup,
  HomeAssistant,
  LogbookEntry,
  TimelineItem,
  WhatHappenedConfig,
} from "./types";

const MAX_BUFFER = 3000;
const TICK_MS = 60_000;

@customElement("what-happened-card")
export class WhatHappenedCard extends LitElement {
  static styles = cardStyles;

  static async getConfigElement(): Promise<HTMLElement> {
    await import("./editor");
    return document.createElement("what-happened-card-editor");
  }

  static getStubConfig(): Partial<WhatHappenedConfig> {
    return { title: "What happened", hours_to_show: 24, max_entries: 50 };
  }

  @state() private _config?: WhatHappenedConfig;
  @state() private _groups: DayGroup[] = [];
  @state() private _loading = true;
  @state() private _error?: string;
  @state() private _now = Date.now();

  private _hass?: HomeAssistant;
  private _entries = new Map<string, LogbookEntry>();
  private _allowed?: Set<string>;
  private _subKey?: string;
  private _unsub?: () => void;
  private _subToken = 0;
  private _tick?: number;
  private _recomputeTimer?: number;
  private _registryRefs: unknown[] = [];

  public setConfig(config: WhatHappenedConfig): void {
    if (!config || typeof config !== "object") throw new Error("Invalid configuration");
    if (
      config.target !== undefined &&
      (typeof config.target !== "object" || config.target === null)
    ) {
      throw new Error("`target` must be an object with entity_id, device_id, area_id or label_id");
    }
    this._config = { ...config };
    this._subKey = undefined; // force re-evaluation of the subscription
    this._ensureSubscription();
    this._scheduleRecompute();
  }

  set hass(hass: HomeAssistant) {
    const first = !this._hass;
    this._hass = hass;
    const registries = [hass.entities, hass.devices, hass.areas];
    const registriesChanged = registries.some((r, i) => r !== this._registryRefs[i]);
    this._registryRefs = registries;
    if (first || registriesChanged) {
      this._ensureSubscription();
      this._scheduleRecompute();
    }
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  public getCardSize(): number {
    const config = this._config;
    if (config?.max_height) return Math.max(3, Math.ceil(config.max_height / 50));
    const count = this._groups.reduce((n, g) => n + g.items.length, 0);
    return Math.min(12, Math.max(3, Math.ceil(count * 1.2) + 1));
  }

  /** Sections view: default size and resize limits (users resize with the handles). */
  public getGridOptions() {
    return { columns: 12, rows: 6, min_columns: 3, min_rows: 2 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._tick = window.setInterval(() => {
      this._now = Date.now();
      this._recompute();
    }, TICK_MS);
    if (this._hass && this._config) {
      this._subKey = undefined;
      this._ensureSubscription();
      this._scheduleRecompute();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearInterval(this._tick);
    window.clearTimeout(this._recomputeTimer);
    this._unsubscribe();
    this._subKey = undefined;
  }

  // ---------------------------------------------------------------- data

  private _unsubscribe(): void {
    this._subToken++;
    this._unsub?.();
    this._unsub = undefined;
  }

  private _ensureSubscription(): void {
    const hass = this._hass;
    const config = this._config;
    if (!hass || !config || !this.isConnected) return;

    let allowed: Set<string> | undefined;
    if (hasTarget(config.target)) allowed = resolveTargetEntities(hass, config.target!);

    const hours = effectiveHours(config);
    const key = JSON.stringify([hours, allowed ? [...allowed].sort() : null]);
    if (key === this._subKey) {
      this._allowed = allowed;
      return;
    }
    this._subKey = key;
    this._allowed = allowed;
    this._unsubscribe();
    this._entries.clear();
    this._error = undefined;

    if (allowed && allowed.size === 0) {
      this._loading = false;
      return;
    }

    this._loading = true;
    const token = this._subToken;
    const start = new Date(Date.now() - hours * 3_600_000);
    subscribeLogbook(
      hass,
      (events) => {
        if (token !== this._subToken) return;
        // Filter before buffering so the size cap never evicts entries that would match.
        const cfg = this._config;
        for (const event of events) {
          if (cfg && !passesFilters(event, cfg, this._allowed)) continue;
          this._entries.set(entryKey(event), event);
        }
        if (this._entries.size > MAX_BUFFER) this._trimBuffer();
        this._loading = false;
        this._scheduleRecompute();
      },
      start,
      allowed ? [...allowed] : undefined,
    )
      .then((unsub) => {
        if (token !== this._subToken) unsub();
        else this._unsub = unsub;
      })
      .catch((err: unknown) => {
        if (token !== this._subToken) return;
        this._loading = false;
        this._error = err instanceof Error ? err.message : "Could not load the logbook";
      });
  }

  private _trimBuffer(): void {
    const sorted = [...this._entries.entries()].sort((a, b) => b[1].when - a[1].when);
    this._entries = new Map(sorted.slice(0, MAX_BUFFER));
  }

  private _scheduleRecompute(): void {
    window.clearTimeout(this._recomputeTimer);
    this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }

  private _recompute(): void {
    if (!this._hass || !this._config) return;
    this._now = Date.now();
    this._groups = buildTimeline(
      this._hass,
      this._entries.values(),
      this._config,
      this._now,
      this._allowed,
    );
  }

  // ------------------------------------------------------------ interaction

  private _moreInfo(entityId: string | undefined): void {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }),
    );
  }

  private _onRowClick(item: TimelineItem): void {
    if ((this._config?.tap_action ?? DEFAULTS.tap_action) === "none") return;
    this._moreInfo(item.entityId);
  }

  private _onRowKey(ev: KeyboardEvent, item: TimelineItem): void {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this._onRowClick(item);
    }
  }

  // ----------------------------------------------------------------- render

  protected render(): TemplateResult | typeof nothing {
    const config = this._config;
    if (!config) return nothing;
    const total = this._groups.reduce((n, g) => n + g.items.length, 0);
    const lastGroup = this._groups[this._groups.length - 1];
    const lastKey = lastGroup?.items[lastGroup.items.length - 1]?.key;

    return html`
      <ha-card
        class=${classMap({
          compact: config.compact ?? DEFAULTS.compact,
          "has-header": !!config.title,
        })}
        style=${styleMap({ "--wh-max-height": config.max_height ? `${config.max_height}px` : "" })}
      >
        ${config.title ? html`<h1 class="card-header">${config.title}</h1>` : nothing}
        <div class="scroll">
          ${
            this._error
              ? html`<ha-alert alert-type="error">${this._error}</ha-alert>`
              : this._loading && total === 0
                ? html`<div class="state">Loading…</div>`
                : total === 0
                  ? this._renderEmpty(config)
                  : html`<ol>
                      ${this._groups.map((group) => this._renderGroup(group, config, lastKey))}
                    </ol>`
          }
        </div>
      </ha-card>
    `;
  }

  private _renderEmpty(config: WhatHappenedConfig): TemplateResult {
    const hours = effectiveHours(config);
    const span =
      hours % 24 === 0 && hours > 24
        ? `${hours / 24} days`
        : hours === 1
          ? "hour"
          : `${hours} hours`;
    const text = hours === 1 ? "No activity in the last hour" : `No activity in the last ${span}`;
    return html`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${text}
    </div>`;
  }

  private _renderGroup(
    group: DayGroup,
    config: WhatHappenedConfig,
    lastKey: string | undefined,
  ): TemplateResult {
    const headers = config.show_day_headers ?? DEFAULTS.show_day_headers;
    return html`
      ${headers ? html`<li class="day" role="presentation">${group.label}</li>` : nothing}
      ${group.items.map((item) => this._renderItem(item, config, item.key === lastKey))}
    `;
  }

  private _renderIcon(item: TimelineItem): TemplateResult {
    const stateObj = item.entityId ? this._hass?.states[item.entityId] : undefined;
    // Entities get their icon from <ha-state-icon>, as the HA design guidelines require.
    return stateObj
      ? html`<ha-state-icon
          .hass=${this._hass}
          .stateObj=${stateObj}
          .stateValue=${item.stateValue}
        ></ha-state-icon>`
      : html`<ha-icon .icon=${item.icon}></ha-icon>`;
  }

  private _renderItem(
    item: TimelineItem,
    config: WhatHappenedConfig,
    last: boolean,
  ): TemplateResult {
    const avatars = config.show_avatars ?? DEFAULTS.show_avatars;
    const showCause = config.show_cause ?? DEFAULTS.show_cause;
    const clickable = !!item.entityId && (config.tap_action ?? DEFAULTS.tap_action) !== "none";
    const photo = avatars && item.picture;

    return html`
      <li class=${classMap({ item: true, last })}>
        <div class="rail">
          <div
            class=${classMap({ node: true, photo: !!photo })}
            style=${styleMap({ "--accent": item.accent })}
          >
            ${
              photo
                ? html`<img class="photo-img" src=${item.picture!} alt="" loading="lazy" />`
                : this._renderIcon(item)
            }
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${classMap({ row: true, clickable })}
          style=${styleMap({ "--accent": item.accent })}
          role=${clickable ? "button" : "text"}
          tabindex=${clickable ? "0" : "-1"}
          aria-label=${plainSentence(item)}
          @click=${() => this._onRowClick(item)}
          @keydown=${(ev: KeyboardEvent) => this._onRowKey(ev, item)}
        >
          <div class="body">
            <div class="primary">
              <span class="subject">${item.name}</span> ${item.verb}
              ${item.count > 1 ? html`<span class="count">×${item.count}</span>` : nothing}
            </div>
            ${showCause ? this._renderCause(item, avatars) : nothing}
          </div>
          ${this._renderTime(item, config)}
        </div>
      </li>
    `;
  }

  private _renderAvatar(actor: Actor): TemplateResult {
    return actor.picture
      ? html`<img class="avatar" src=${actor.picture} alt="" loading="lazy" />`
      : html`<span class="avatar initial">${actor.name.charAt(0).toUpperCase()}</span>`;
  }

  private _renderCause(item: TimelineItem, avatars: boolean): TemplateResult | typeof nothing {
    const cause = item.cause;
    if (!cause || (!cause.actor && !cause.trigger)) return nothing;
    const actor = cause.actor;
    const interactive =
      !!actor?.entityId && (this._config?.tap_action ?? DEFAULTS.tap_action) !== "none";
    return html`
      <div class="secondary">
        ${
          actor
            ? html`by${avatars && actor.kind === "user" ? this._renderAvatar(actor) : nothing}
              ${
                interactive
                  ? html`<button
                      class="link"
                      type="button"
                      title=${actor.detail ? `${actor.name} – ${actor.detail}` : actor.name}
                      @click=${(ev: Event) => {
                        ev.stopPropagation();
                        this._moreInfo(actor.entityId);
                      }}
                      @keydown=${(ev: KeyboardEvent) => ev.stopPropagation()}
                    >
                      ${actor.name}
                    </button>`
                  : html`<span title=${actor.detail ?? actor.name}>${actor.name}</span>`
              }`
            : nothing
        }${actor && cause.trigger ? ", " : nothing}${
          cause.trigger ? html`${actor ? "triggered by" : "by"} ${cause.trigger}` : nothing
        }
      </div>
    `;
  }

  private _renderTime(item: TimelineItem, config: WhatHappenedConfig): TemplateResult {
    const mode = config.time_display ?? DEFAULTS.time_display;
    const abs = formatTime(item.when, this._hass);
    const rel = formatRelative(item.when, this._now);
    return html`
      <div class="time" title=${formatDateTime(item.when, this._hass)}>
        ${mode !== "relative" ? html`<span class="abs">${abs}</span>` : nothing}
        ${mode !== "absolute" ? html`<span class="rel">${rel}</span>` : nothing}
      </div>
    `;
  }
}
