/*
  Rejseplanen Timetable Card
  Home Assistant Lovelace custom card that displays upcoming departures from Rejseplanen (Danish public transport).
*/

import { css, html, LitElement, nothing } from 'lit';
import { state } from 'lit/decorators.js';

// Import editor for HA UI config (bundled together by Vite)
import './rejseplanen-timetable-card-editor';
import { localize } from './localize';
import {
  DepartureItem, formatClock, formatClockString, getDepartures, getLineColor, HassEntity, isXmlShaped, pillSize, uses12h,
} from './departures';

type HomeAssistant = {
  states: Record<string, HassEntity>;
  formatEntityState?(entity: HassEntity): string;
  locale?: any;
  language?: string;
};

export interface RejseplanenTimetableCardConfig {
  type: string;
  entity: string; // sensor entity id
  show_name?: boolean; // show heading with entity friendly name
  max_items?: number; // optional, default 5
}

declare global {
  interface Window {
    customCards?: Array<any>;
  }
  interface HTMLElementTagNameMap {
    'rejseplanen-timetable-card': RejseplanenTimetableCard;
  }
}

const CARD_TYPE = 'rejseplanen-timetable-card';
const TICK_MS = 15_000;

export class RejseplanenTimetableCard extends LitElement {
  private _hass!: HomeAssistant;
  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
  }
  get hass(): HomeAssistant {
    return this._hass;
  }
  @state() private _config?: RejseplanenTimetableCardConfig;
  // Dynamic overlay sizing
  private _overlayHeight = 0;
  private _overlayTop = 0;
  // Re-render between sensor updates so "in X min" counts down
  private _tick?: ReturnType<typeof setInterval>;

  connectedCallback(): void {
    super.connectedCallback();
    this._tick = setInterval(() => this.requestUpdate(), TICK_MS);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._tick);
    this._tick = undefined;
  }

  static getStubConfig(): Partial<RejseplanenTimetableCardConfig> {
    return { show_name: true, max_items: 5 };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('rejseplanen-timetable-card-editor');
  }

  setConfig(config: RejseplanenTimetableCardConfig): void {
    if (!config || !config.entity) {
      throw new Error('Required property missing: entity');
    }
    this._config = {
      show_name: true,
      max_items: 5,
      ...config,
      type: CARD_TYPE,
    };
  }

  getCardSize(): number {
    const count = this._getDepartures().length || 1;
    return 1 + Math.min(count, this._config?.max_items ?? 5);
  }

  private _getEntity(): HassEntity | undefined {
    const entityId = this._config?.entity;
    if (!entityId) return undefined;
    return this.hass?.states?.[entityId];
  }

  private _t(path: string, vars?: Record<string, any>): string {
    return localize(this.hass, path, vars);
  }

  private _getDepartures(): DepartureItem[] {
    return getDepartures(this._getEntity());
  }

  private _modeLabel(mode: string | undefined): string | undefined {
    if (!mode) return undefined;
    const key = `label.mode_${String(mode).toLowerCase()}`;
    const translated = this._t(key);
    return translated === key ? mode : translated;
  }

  private _iconForMode(mode: string | undefined): string | undefined {
    if (!mode) return undefined;
    switch (String(mode).toLowerCase()) {
      case 'bus':
        return 'mdi:bus';
      case 'metro':
        return 'mdi:subway-variant';
      case 'train':
        return 'mdi:train';
      case 'tram':
        return 'mdi:tram';
      case 'taxi':
        return 'mdi:taxi';
      case 'boat':
        return 'mdi:ferry';
      default:
        return undefined;
    }
  }

  private _platformLabelFor(item: DepartureItem): string | undefined {
    const p = item?.platform;
    if (p === undefined || p === null || p === '') return undefined;
    const mode = String(item?.transport_mode || '').toLowerCase();
    // Mapping decision:
    // - platform: train, metro
    // - stand: bus, taxi, tram
    // - bay: boat
    const key = mode === 'bus' || mode === 'taxi' || mode === 'tram'
      ? 'label.stand'
      : mode === 'boat'
        ? 'label.bay'
        : 'label.platform';
    return this._t(key, { platform: p });
  }

  private _statusFor(item: DepartureItem): { label: string; badge: 'ok' | 'delay' | 'cancel' | 'scheduled'; } {
    if (item.canceled) return { label: this._t('status.cancelled'), badge: 'cancel' };
    const delayMin = typeof item.delay_minutes === 'number' ? item.delay_minutes : (typeof item.delay === 'number' ? Math.round(item.delay / 60) : 0);
    if (delayMin > 0) return { label: this._t('status.delayed', { minutes: delayMin }), badge: 'delay' };
    // Only call it "on time" when live data confirms it; otherwise it is just the timetable
    if (item.real_time === false) return { label: this._t('status.scheduled'), badge: 'scheduled' };
    return { label: this._t('status.on_time'), badge: 'ok' };
  }

  private _use12h(): boolean {
    return uses12h(this.hass?.locale, this.hass?.language);
  }

  private _formatTimeString(item: DepartureItem): string {
    const t = item.time_formatted || item.expected_time || item.scheduled_time;
    if (!t) return '';
    if (/^\d{1,2}:\d{2}/.test(t)) return formatClockString(t, this._use12h());
    const date = new Date(t);
    return Number.isNaN(date.getTime()) ? String(t) : formatClock(date.getHours(), date.getMinutes(), this._use12h());
  }

  private _formatUpdated(dt: string): string {
    const d = new Date(dt);
    return Number.isNaN(d.getTime()) ? dt : formatClock(d.getHours(), d.getMinutes(), this._use12h());
  }

  private _openMoreInfo(): void {
    const entityId = this._config?.entity;
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        bubbles: true,
        composed: true,
        detail: { entityId },
      })
    );
  }

  private _onKeyActivate(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._openMoreInfo();
    }
  }

  protected updated(): void {
    // Compute overlay height to span from top of card (including header) down to just above the first row
    try {
      const list = this.renderRoot.querySelector('.list') as HTMLElement | null;
      const body = this.renderRoot.querySelector('.card-body') as HTMLElement | null;
      const card = this.renderRoot.querySelector('ha-card') as HTMLElement | null;
      if (!list || !body || !card) return;
      const listRect = list.getBoundingClientRect();
      const bodyRect = body.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const headerHeight = Math.max(0, bodyRect.top - cardRect.top);
      const spaceAboveFirstRow = Math.max(0, listRect.top - bodyRect.top);
      const desiredHeight = Math.max(0, headerHeight + spaceAboveFirstRow - 2); // 2px gap above first row
      const desiredTop = -headerHeight;
      if (desiredHeight !== this._overlayHeight || desiredTop !== this._overlayTop) {
        this._overlayHeight = desiredHeight;
        this._overlayTop = desiredTop;
        this.requestUpdate();
      }
    } catch {
      // ignore
    }
  }

  protected render() {
    const entity = this._getEntity();
    if (!this._config) return nothing;

    if (!entity) {
      return html`<ha-card header=${this._t('card.title')}>
        <div class="content error">${this._t('error.entity_not_found', { entity: this._config.entity })}</div>
      </ha-card>`;
    }

    const showHeader = this._config.show_name !== false;
    const header = showHeader ? (entity.attributes?.friendly_name || entity.entity_id) : undefined;
    const departures = this._getDepartures().slice(0, this._config.max_items ?? 5);
    const xmlShaped = isXmlShaped(entity);
    const updatedAt = entity.attributes?.last_update ?? entity.last_updated;
    // A single-station board repeats the same stop on every row; only show it when stops differ
    const showStation = new Set(departures.map((d) => d.station || '')).size > 1;

    return html`
      <ha-card .header=${showHeader ? (header ?? this._t('card.title')) : undefined}>
        <div class="card-body">
          ${showHeader
            ? html`<div
                    class="header-overlay"
                    style="top: ${this._overlayTop}px; height: ${this._overlayHeight}px;"
                    role="button"
                    tabindex="0"
                    @click=${() => this._openMoreInfo()}
                    @keydown=${(e: KeyboardEvent) => this._onKeyActivate(e)}
                  ></div>`
            : nothing}
        ${xmlShaped
          ? html`<div class="content error">${this._t('error.xml_format')}</div>`
          : departures.length === 0
          ? html`<div class="content empty">${this._t('empty.no_upcoming')}</div>`
          : html`<div class="list" role="list">
              ${departures.map((d) => {
                const status = this._statusFor(d);
                const time = this._formatTimeString(d);
                const min = typeof d.minutes_until === 'number' ? d.minutes_until : undefined;
                const mode = this._modeLabel(d.transport_mode) ?? d.transport_mode;
                const modeIcon = this._iconForMode(d.transport_mode);
                const inLabel = min !== undefined ? (min === 0 ? this._t('label.now') : this._t('label.in_minutes', { minutes: min })) : undefined;
                const lineColors = getLineColor(d.line, d.transport_mode);
                const pillStyle = lineColors ? `background: ${lineColors.bg}; color: ${lineColors.color};` : '';
                const size = pillSize(d.line);
                return html`
                  <div class="row ${d.canceled ? 'cancelled' : ''}" role="listitem">
                    <div class="line">
                      <span class="pill" role="button" tabindex="0"
                            style="${pillStyle}"
                            @click=${() => this._openMoreInfo()}
                            @keydown=${(e: KeyboardEvent) => this._onKeyActivate(e)}>
                        ${modeIcon && size !== 'xlong' ? html`<ha-icon class="pill-icon" .icon=${modeIcon}></ha-icon>` : nothing}<span class="pill-text ${size}">${d.line ?? ''}</span>
                      </span>
                    </div>
                    <div class="main">
                      ${showStation && d.station ? html`<div class="station">${d.station}</div>` : nothing}
                      <div class="dest">${d.destination ?? ''}</div>
                      <div class="meta">
                        ${this._platformLabelFor(d) ? html`<span class="platform">${this._platformLabelFor(d)}</span>` : nothing}
                        ${mode ? html`<span class="mode-text">${mode}</span>` : nothing}
                      </div>
                    </div>
                    <div class="right">
                      <div class="time"><span class="time-text">${time}</span></div>
                      ${(inLabel !== undefined || status?.label)
                        ? html`<div class="in-status">
                              ${inLabel ? html`<span class="in">${inLabel}</span>` : nothing}
                              ${status?.label ? html`<span class="status ${status.badge}">${status.label}</span>` : nothing}
                            </div>`
                        : nothing}
                    </div>
                  </div>`;
              })}
            </div>`}
        <div class="footer">
          ${entity.attributes?.attribution ? html`<span class="attr">${entity.attributes.attribution}</span>` : nothing}
          ${updatedAt ? html`<span class="updated">${this._t('label.updated', { time: this._formatUpdated(updatedAt) })}</span>` : nothing}
        </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      --pill-bg: var(--primary-color);
      --ok: var(--success-color, #0b8457);
      --delay: var(--warning-color, #b36b00);
      --cancel: var(--error-color, #c92a2a);
      /* Size controls for icon and line pill */
      --rejseplanen-pill-font-size: 1.3em; /* Smaller pill for more space */
      --rejseplanen-pill-icon-size: 1.1em; /* scale icon with text */
      --rejseplanen-pill-icon-nudge: -0.05em; /* slight optical centering */
    }
    .card-body { position: relative; container-type: inline-size; }
    .header-overlay { position: absolute; left: 0; right: 0; background: transparent; z-index: 2; }
    .content {
      padding: 12px 16px;
    }
    .error { color: var(--error-color); }
    .empty { color: var(--secondary-text-color); }
    .list { padding: 8px 8px 0; }
    .row {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid var(--divider-color);
    }
    .row:last-child { border-bottom: none; }
    .card-header { padding: 16px; font-size: 1.1em; font-weight: 600; cursor: pointer; }
    .pill {
      /* Fixed size so every row lines up; long line names shrink instead (see .pill-text) */
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.25em;
      width: var(--rejseplanen-pill-width, 4.8em);
      height: 1.75em;
      padding: 0 0.4em;
      overflow: hidden;
      border-radius: 999px;
      background: var(--pill-bg);
      color: var(--text-primary-color, white);
      font-weight: 600;
      line-height: 1;
      font-size: var(--rejseplanen-pill-font-size, 2em);
      cursor: pointer;
    }
    .pill-text { white-space: nowrap; }
    .pill-text.medium { font-size: 0.75em; }
    .pill-text.long { font-size: 0.55em; white-space: normal; line-height: 1.05; text-align: center; }
    .pill-text.xlong { font-size: 0.55em; }
    .station { font-size: 0.85em; color: var(--secondary-text-color); margin-bottom: 2px; }
    .dest { font-weight: 600; font-size: 1.1em; }
    .meta { color: var(--secondary-text-color); font-size: 0.86em; display: flex; flex-wrap: wrap; gap: 0 8px; }
    .meta span { white-space: nowrap; }
    .pill-icon {
      --mdc-icon-size: var(--rejseplanen-pill-icon-size, 1.25em);
      width: var(--rejseplanen-pill-icon-size, 1.25em);
      height: var(--rejseplanen-pill-icon-size, 1.25em);
      flex: none;
      color: currentColor;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transform: translateY(var(--rejseplanen-pill-icon-nudge));
    }
    .right { text-align: right; }
    .time { font-weight: 600; font-size: 1.1em; }
    /* Countdown and status share a line in wide cards and stack in narrow ones */
    .in-status { color: var(--secondary-text-color); font-size: 0.9em; display: flex; justify-content: flex-end; align-items: baseline; gap: 8px; white-space: nowrap; }
    @container (max-width: 420px) {
      .in-status { flex-direction: column; align-items: flex-end; gap: 0; }
    }
    .status { font-size: 0.9em; }
    .status.ok { color: var(--ok); }
    .status.scheduled { color: var(--secondary-text-color); }
    .status.delay { color: var(--delay); }
    .status.cancel { color: var(--cancel); font-weight: 700; }
    /* Cancelled: strike out the whole departure so it cannot be mistaken for a running service */
    .row.cancelled .line, .row.cancelled .main, .row.cancelled .time, .row.cancelled .in { opacity: 0.55; }
    .row.cancelled .dest, .row.cancelled .time-text, .row.cancelled .in { text-decoration: line-through; }
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px 12px;
      color: var(--secondary-text-color);
      font-size: 0.8em;
    }
  `;
}

// Guard against the bundle being loaded twice (e.g. a HACS and a manual resource)
if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, RejseplanenTimetableCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_TYPE,
    name: 'Rejseplanen Timetable',
    description: 'Shows upcoming departures from Rejseplanen (Danish public transport)',
    preview: true,
  });
}
