// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '../src/rejseplanen-timetable-card';
import type { RejseplanenTimetableCard } from '../src/rejseplanen-timetable-card';
import fixture from './fixtures/departure-board.json';
import kokkedal from './fixtures/kokkedal-regional.json';

const ENTITY = 'sensor.rejseplanen_kokkedal';

function hass(attributes: Record<string, any>, language = 'da') {
  return {
    language,
    locale: { language, time_format: '12' },
    states: {
      [ENTITY]: {
        entity_id: ENTITY,
        state: '5',
        attributes: { friendly_name: 'Kokkedal', ...attributes },
        last_updated: '2026-11-25T23:49:00+01:00',
      },
    },
  };
}

async function render(attributes: Record<string, any>, config: Record<string, any> = {}, language = 'da') {
  const card = document.createElement('rejseplanen-timetable-card') as RejseplanenTimetableCard;
  card.setConfig({ type: 'custom:rejseplanen-timetable-card', entity: ENTITY, ...config });
  card.hass = hass(attributes, language) as any;
  document.body.appendChild(card);
  await card.updateComplete;
  return card.shadowRoot!;
}

describe('rejseplanen-timetable-card', () => {
  beforeEach(() => {
    // Only fake Date: Lit schedules renders on microtasks
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 10, 25, 23, 50, 30));
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('registers with the card picker', () => {
    expect(window.customCards?.some((c) => c.type === 'rejseplanen-timetable-card')).toBe(true);
  });

  it('requires an entity', () => {
    const card = document.createElement('rejseplanen-timetable-card') as RejseplanenTimetableCard;
    expect(() => card.setConfig({ type: 'custom:rejseplanen-timetable-card' } as any)).toThrow(/entity/);
  });

  it('renders upcoming departures and skips departed ones', async () => {
    const root = await render(fixture);
    const rows = [...root.querySelectorAll('.row')];
    expect(rows.map((r) => r.querySelector('.pill-text')!.textContent)).toEqual(['M2', 'B', 'IC', '150S']);
    expect(rows[0].querySelector('.in')!.textContent).toBe('Nu');
  });

  it('shows cancelled, delayed, confirmed and timetable-only state', async () => {
    const root = await render(fixture);
    const status = [...root.querySelectorAll('.row')].map((r) => r.querySelector('.status')!);
    expect(status.map((s) => s.textContent)).toEqual(['Planlagt', 'Til tiden', 'Forsinket 8 min', 'Aflyst']);
    expect(status.map((s) => s.classList[1])).toEqual(['scheduled', 'ok', 'delay', 'cancel']);
  });

  it('counts down between sensor updates', async () => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    vi.setSystemTime(new Date(2026, 10, 25, 23, 50, 30));
    const root = await render(fixture);
    const card = root.host as RejseplanenTimetableCard;
    expect(root.querySelectorAll('.row')[1].querySelector('.in')!.textContent).toBe('om 2 min');

    vi.advanceTimersByTime(60_000);
    await card.updateComplete;
    const rows = root.querySelectorAll('.row');
    // M2 (23:50) has left, B (23:52) is now 1 minute away
    expect(rows[0].querySelector('.pill-text')!.textContent).toBe('B');
    expect(rows[0].querySelector('.in')!.textContent).toBe('om 1 min');
  });

  it('respects max_items', async () => {
    const root = await render(fixture, { max_items: 2 });
    expect(root.querySelectorAll('.row')).toHaveLength(2);
  });

  it('shows "on time" for a prognosed departure without rtTime (real sensor data)', async () => {
    vi.setSystemTime(new Date(2026, 9, 15, 14, 10));
    const root = await render(kokkedal);
    const status = [...root.querySelectorAll('.row .status')].map((s) => s.textContent);
    expect(status).toEqual(['Til tiden', 'Planlagt']);
  });

  it('marks cancelled departures so they can be struck through', async () => {
    const root = await render(fixture);
    const rows = [...root.querySelectorAll('.row')];
    expect(rows.map((r) => r.classList.contains('cancelled'))).toEqual([false, false, false, true]);
  });

  it('uses 24-hour time in every language, even with a 12-hour profile setting', async () => {
    const da = await render(fixture);
    expect(da.querySelector('.row .time-text')!.textContent).toBe('23:50');
    expect(da.querySelector('.footer .updated')!.textContent).toMatch(/^Opdateret \d{2}:\d{2}$/);
    document.body.innerHTML = '';

    const en = await render(fixture, {}, 'en');
    expect(en.querySelector('.row .time-text')!.textContent).toBe('23:50');
    expect(en.querySelector('.footer .updated')!.textContent).toMatch(/^Updated \d{2}:\d{2}$/);
  });

  it('only shows the stop name when departures come from several stops', async () => {
    const mixed = await render(fixture);
    expect(mixed.querySelectorAll('.station').length).toBeGreaterThan(0);
    document.body.innerHTML = '';

    const sameStop = fixture.Departure.map((d) => ({ ...d, stop: 'Kokkedal St.' }));
    const single = await render({ Departure: sameStop });
    expect(single.querySelectorAll('.station')).toHaveLength(0);
  });

  it('explains when the sensor returns XML', async () => {
    const root = await render({ Departure: [{ '@name': 'Bus 150S', '@time': '00:10:00' }] });
    expect(root.querySelector('.error')!.textContent).toContain('format=json');
  });

  it('reports a missing entity', async () => {
    const root = await render(fixture, { entity: 'sensor.missing' });
    expect(root.querySelector('.error')!.textContent).toContain('sensor.missing');
  });
});
