/*
  Trafiklab Timetable Card
  Home Assistant Lovelace custom card that displays upcoming departures from the Trafiklab integration.
*/

import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';

// Import editor for HA UI config (bundled together by Vite)
import './trafiklab-timetable-card-editor';
import en from './translations/en.json';
import sv from './translations/sv.json';
import da from './translations/da.json';

type HassEntity = {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
};

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
    const lang = this.hass?.locale?.language || this.hass?.language || 'en';
    const dict = String(lang).toLowerCase().startsWith('da') ? (da as any) : String(lang).toLowerCase().startsWith('sv') ? (sv as any) : (en as any);
    const value = path.split('.').reduce((acc: any, key: string) => (acc ? acc[key] : undefined), dict) || path;
    if (!vars) return value;
    return Object.entries(vars).reduce((str, [k, v]) => str.replaceAll(`{${k}}`, String(v)), value);
  }

  private _getDepartures(): any[] {
    const entity = this._getEntity();
    if (!entity) return [];
    const upcoming = entity.attributes?.upcoming as any[] | undefined;
    if (Array.isArray(upcoming)) return upcoming;
    const single = this._mapEntityToItem(entity);
    return single ? [single] : [];
  }

  private _mapEntityToItem(entity: HassEntity) {
    const a = entity.attributes || {};
    if (!('destination' in a) && !('scheduled_time' in a)) return undefined;
    return {
      line: a.line,
      destination: a.destination,
      scheduled_time: a.scheduled_time,
      expected_time: a.expected_time ?? a.scheduled_time,
      time_formatted: a.time_formatted,
      minutes_until: Number(entity.state),
      transport_mode: a.transport_mode,
      real_time: a.real_time,
      delay: a.delay,
      delay_minutes: a.delay_minutes,
      canceled: a.canceled,
      platform: a.platform,
      agency: a.agency,
      station: a.station,
    };
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

  private _platformLabelFor(item: any): string | undefined {
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

  private _getLineColor(line: string | undefined): { bg: string; color: string } | undefined {
    if (!line) return undefined;
    const lineStr = String(line).toUpperCase();
    
    // Danish Metro lines (Copenhagen)
    if (lineStr === 'M1') return { bg: '#0A9A48', color: '#fff' }; // Green
    if (lineStr === 'M2') return { bg: '#FFC917', color: '#000' }; // Yellow
    if (lineStr === 'M3') return { bg: '#EE3B43', color: '#fff' }; // Red
    if (lineStr === 'M4') return { bg: '#1EBAE5', color: '#fff' }; // Blue
    
    // S-train lines (Copenhagen)
    if (lineStr === 'A') return { bg: '#0173B7', color: '#fff' }; // Blue
    if (lineStr === 'B') return { bg: '#72BF44', color: '#fff' }; // Green
    if (lineStr === 'BX') return { bg: '#72BF44', color: '#fff' }; // Green
    if (lineStr === 'C') return { bg: '#E87722', color: '#fff' }; // Orange
    if (lineStr === 'E') return { bg: '#8B8C8E', color: '#fff' }; // Grey
    if (lineStr === 'F') return { bg: '#FFC917', color: '#000' }; // Yellow
    if (lineStr === 'H') return { bg: '#E30613', color: '#fff' }; // Red
    
    // Copenhagen A-buses (Red/Burgundy)
    if (lineStr === '1A') return { bg: '#E30613', color: '#fff' };
    if (lineStr === '2A') return { bg: '#E30613', color: '#fff' };
    if (lineStr === '3A') return { bg: '#E30613', color: '#fff' };
    if (lineStr === '4A') return { bg: '#E30613', color: '#fff' };
    if (lineStr === '5A') return { bg: '#E30613', color: '#fff' };
    if (lineStr === '6A') return { bg: '#E30613', color: '#fff' };
    if (lineStr === '7A') return { bg: '#E30613', color: '#fff' };
    if (lineStr === '9A') return { bg: '#E30613', color: '#fff' };
    
    // Copenhagen S-buses (Express - Blue)
    if (lineStr.endsWith('S') && lineStr.length <= 4) {
      return { bg: '#0173B7', color: '#fff' };
    }
    
    // Copenhagen E-buses (Express - Grey)
    if (lineStr.startsWith('E')) {
      return { bg: '#5A5A5A', color: '#fff' };
    }
    
    // Copenhagen N-buses (Night buses - Dark blue)
    if (lineStr.startsWith('N') || lineStr.endsWith('N')) {
      return { bg: '#003366', color: '#fff' };
    }
    
    // Regular buses - Yellow (default for most Copenhagen buses)
    if (lineStr.match(/^\d+[A-Z]?$/)) {
      return { bg: '#FFC917', color: '#000' };
    }
    
    return undefined;
  }

  private _statusFor(item: any): { label: string; badge: 'ok' | 'delay' | 'cancel'; } {
    if (item.canceled) return { label: this._t('status.cancelled'), badge: 'cancel' };
    const delayMin = typeof item.delay_minutes === 'number' ? item.delay_minutes : (typeof item.delay === 'number' ? Math.round(item.delay / 60) : 0);
    if (delayMin > 0) return { label: this._t('status.delayed', { minutes: delayMin }), badge: 'delay' };
    return { label: this._t('status.on_time'), badge: 'ok' };
  }

  private _formatTimeString(item: any): string {
    if (item.time_formatted) return item.time_formatted;
    const t = item.expected_time || item.scheduled_time;
    if (!t) return '';
    try {
      const date = new Date(t);
      const hour = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      return `${hour}:${min}`;
    } catch {
      return String(t);
    }
  }

  private _formatUpdated(dt: string): string {
    try {
      const d = new Date(dt);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dt;
    }
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
        ${departures.length === 0
          ? html`<div class="content empty">${this._t('empty.no_upcoming')}</div>`
          : html`<div class="list" role="list">
              ${departures.map((d) => {
                const status = this._statusFor(d);
                const time = this._formatTimeString(d);
                const min = typeof d.minutes_until === 'number' ? d.minutes_until : undefined;
                const mode = this._modeLabel(d.transport_mode) ?? d.transport_mode;
                const modeIcon = this._iconForMode(d.transport_mode);
                const inLabel = min !== undefined ? (min === 0 ? this._t('label.now') : this._t('label.in_minutes', { minutes: min })) : undefined;
                const lineColors = this._getLineColor(d.line);
                const pillStyle = lineColors ? `background: ${lineColors.bg}; color: ${lineColors.color};` : '';
                return html`
                  <div class="row" role="listitem">
                    <div class="line">
                      <span class="pill" role="button" tabindex="0"
                            style="${pillStyle}"
                            @click=${() => this._openMoreInfo()}
                            @keydown=${(e: KeyboardEvent) => this._onKeyActivate(e)}>
                        ${modeIcon ? html`<ha-icon class="pill-icon" .icon=${modeIcon}></ha-icon>` : nothing}${d.line ?? ''}
                      </span>
                    </div>
                    <div class="main">
                      ${d.station ? html`<div class="station">${d.station}</div>` : nothing}
                      <div class="dest">${d.destination ?? ''}</div>
                      <div class="meta">
                        ${this._platformLabelFor(d) ? html`<span class="platform">${this._platformLabelFor(d)}</span>` : nothing}
                        ${mode ? html`<span class="mode-text">${mode}</span>` : nothing}
                      </div>
                    </div>
                    <div class="right">
                      <div class="time">${time}</div>
                      ${(inLabel !== undefined || status?.label)
                        ? html`<div class="in-status">
                              ${inLabel ? html`<span class="in">${inLabel}</span>` : nothing}
                              ${inLabel && status?.label ? html`<span class="sep"> - </span>` : nothing}
                              ${status?.label ? html`<span class="status ${status.badge}">${status.label}</span>` : nothing}
                            </div>`
                        : nothing}
                    </div>
                  </div>`;
              })}
            </div>`}
        <div class="footer">
          ${entity.attributes?.attribution ? html`<span class="attr">${entity.attributes.attribution}</span>` : nothing}
          ${entity.attributes?.last_update ? html`<span class="updated">${this._t('label.updated', { time: this._formatUpdated(entity.attributes.last_update) })}</span>` : nothing}
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
      --trafiklab-pill-font-size: 1.3em; /* Smaller pill for more space */
      --trafiklab-pill-icon-size: 1.1em; /* scale icon with text */
      --trafiklab-pill-icon-nudge: -0.05em; /* slight optical centering */
    }
    .card-body { position: relative; }
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
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-width: 28px;
      padding: 4px 12px;
      border-radius: 999px;
      background: var(--pill-bg);
      color: var(--text-primary-color, white);
      font-weight: 600;
      line-height: 1;
      font-size: var(--trafiklab-pill-font-size, 2em);
      cursor: pointer;
    }
    .station { font-size: 0.85em; color: var(--secondary-text-color); margin-bottom: 2px; }
    .dest { font-weight: 600; font-size: 1.1em; }
    .meta { color: var(--secondary-text-color); font-size: 0.86em; display: flex; gap: 8px; }
    .pill-icon {
      --mdc-icon-size: var(--trafiklab-pill-icon-size, 1.25em);
      width: var(--trafiklab-pill-icon-size, 1.25em);
      height: var(--trafiklab-pill-icon-size, 1.25em);
      color: var(--text-primary-color, white);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transform: translateY(var(--trafiklab-pill-icon-nudge));
    }
    .right { text-align: right; }
    .time { font-weight: 600; font-size: 1.1em; }
    .in-status { color: var(--secondary-text-color); font-size: 0.9em; display: inline-flex; align-items: baseline; gap: 4px; }
    .status { font-size: 0.86em; }
    .status.ok { color: var(--ok); }
    .status.delay { color: var(--delay); }
    .status.cancel { color: var(--cancel); font-weight: 700; }
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px 12px;
      color: var(--secondary-text-color);
      font-size: 0.8em;
    }
  `;
}

customElements.define(CARD_TYPE, RejseplanenTimetableCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TYPE,
  name: 'Rejseplanen Timetable',
  description: 'Shows upcoming departures from Rejseplanen (Danish public transport)',
  preview: true,
});
