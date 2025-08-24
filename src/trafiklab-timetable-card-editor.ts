import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { RejseplanenTimetableCardConfig } from './trafiklab-timetable-card';
import { localize } from './localize';

type HomeAssistant = any;

export class RejseplanenTimetableCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: RejseplanenTimetableCardConfig;

  setConfig(config: RejseplanenTimetableCardConfig) {
    this._config = { show_name: true, max_items: 5, ...config };
  }

  private _valueChanged(ev: Event) {
    if (!this._config) {
      this._config = { type: 'rejseplanen-timetable-card', entity: '', show_name: true, max_items: 5 } as any;
    }
    const target = ev.currentTarget as any;
    const detail = (ev as CustomEvent).detail;

    const newConfig = { ...this._config } as any;
    const key = target?.configValue ?? target?.dataset?.configValue;
    if (key) {
      let value = detail?.value ?? target.value ?? target.checked;
      if (target.type === 'number' || target.inputMode === 'numeric' || key === 'max_items') {
        const n = Number(value);
        if (!Number.isNaN(n)) value = n;
      }
      if (target.type === 'checkbox') {
        newConfig[key] = target.checked;
      } else if (value !== undefined) {
        newConfig[key] = value;
      }
    }
    if (JSON.stringify(newConfig) !== JSON.stringify(this._config)) {
      this._config = newConfig;
      this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: newConfig } }));
    }
  }

  render() {
    const t = (p: string, v?: Record<string, any>) => localize(this.hass, p, v);
  const hasEntityPicker = !!customElements.get('ha-entity-picker') && !!this.hass;
    const hasSwitch = !!customElements.get('ha-switch');
    const hasTextfield = !!customElements.get('ha-textfield');
    const hasHaForm = !!customElements.get('ha-form');
    const cfg = {
      entity: this._config?.entity ?? '',
      show_name: this._config?.show_name !== false,
      max_items: this._config?.max_items ?? 5,
    };

    if (hasHaForm) {
      const schema = [
        { name: 'entity', selector: { entity: { domain: 'sensor' } } },
        { name: 'show_name', selector: { boolean: {} } },
        { name: 'max_items', selector: { number: { min: 1, max: 20, mode: 'box' } } },
      ] as any;
      const data = { entity: cfg.entity, show_name: cfg.show_name, max_items: cfg.max_items } as any;
      return html`
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${schema}
          .computeLabel=${(s: any) => {
            switch (s.name) {
              case 'entity':
                return t('editor.sensor_entity');
              case 'show_name':
                return t('editor.show_heading');
              case 'max_items':
                return t('editor.max_items');
              default:
                return String(s.name);
            }
          }}
          .computeHelper=${(s: any) => {
            switch (s.name) {
              case 'entity':
                return t('editor.help_sensor');
              case 'show_name':
                return t('editor.help_show_heading');
              case 'max_items':
                return t('editor.help_max_items');
              default:
                return undefined;
            }
          }}
          @value-changed=${(e: CustomEvent) => {
            const value = (e.detail as any)?.value || {};
            const next = {
              ...(this._config || { type: 'trafiklab-timetable-card' }),
              entity: value.entity ?? '',
              show_name: value.show_name ?? true,
              max_items: typeof value.max_items === 'number' ? value.max_items : Number(value.max_items) || 5,
            } as TrafiklabTimetableCardConfig as any;
            if (JSON.stringify(next) !== JSON.stringify(this._config)) {
              this._config = next;
              this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: next } }));
            }
          }}
        ></ha-form>
      `;
    }
    return html`
      <div class="card-config">
        <div class="field">
          ${hasEntityPicker
            ? html`<ha-entity-picker
                  .hass=${this.hass}
                  .value=${cfg.entity}
                  .label=${t('editor.sensor_entity')}
                  .configValue=${'entity'}
                  .includeDomains=${['sensor']}
                  allow-custom-entity
                  @value-changed=${this._valueChanged}
                ></ha-entity-picker>`
            : html`<label class="lbl">${t('editor.sensor_entity')}<input
                    type="text"
                    .value=${cfg.entity}
                    data-config-value="entity"
                    @input=${(e: Event) => this._valueChanged(e)}
                  /></label>`}
        </div>
        <div class="field">
          ${hasSwitch
            ? html`<ha-formfield .label=${t('editor.show_heading')}>
                  <ha-switch
                    .checked=${cfg.show_name}
                    .configValue=${'show_name'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>`
            : html`<label class="lbl"><input type="checkbox"
                    .checked=${cfg.show_name}
                    data-config-value="show_name"
                    @change=${(e: Event) => this._valueChanged(e)}
                  /> ${t('editor.show_heading')}</label>`}
        </div>
        <div class="field">
          ${hasTextfield
            ? html`<ha-textfield
                  .label=${t('editor.max_items')}
                  .value=${String(cfg.max_items)}
                  .configValue=${'max_items'}
                  type="number"
                  min="1"
                  max="20"
                  @value-changed=${this._valueChanged}
                  @input=${this._valueChanged}
                  @change=${this._valueChanged}
                ></ha-textfield>`
            : html`<label class="lbl">${t('editor.max_items')}<input
                    type="number" min="1" max="20"
                    .value=${String(cfg.max_items)}
                    data-config-value="max_items"
                    @input=${(e: Event) => this._valueChanged(e)}
                  /></label>`}
        </div>
      </div>
    `;
  }

  static styles = css`
  .card-config { display: grid; gap: 16px; }
  .lbl { display: grid; gap: 6px; font: inherit; color: var(--primary-text-color); }
  input[type="text"], input[type="number"] { padding: 8px; border-radius: 6px; border: 1px solid var(--divider-color); width: 100%; background: var(--card-background-color); color: var(--primary-text-color); }
  `;
}

customElements.define('rejseplanen-timetable-card-editor', RejseplanenTimetableCardEditor);
