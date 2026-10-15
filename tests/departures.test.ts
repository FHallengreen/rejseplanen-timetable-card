import { describe, expect, it } from 'vitest';
import {
  detectMode,
  formatClock,
  formatClockString,
  getDepartures,
  getLineColor,
  HassEntity,
  isXmlShaped,
  mapRejseplanenDeparture,
  parseDateTime,
  pillSize,
} from '../src/departures';
import fixture from './fixtures/departure-board.json';
import kokkedal from './fixtures/kokkedal-regional.json';

// 2026-11-25 23:50:30 local time
const NOW = new Date(2026, 10, 25, 23, 50, 30);

function sensor(attributes: Record<string, any>): HassEntity {
  return { entity_id: 'sensor.rejseplanen', state: '0', attributes };
}

describe('parseDateTime', () => {
  it('parses Rejseplanen date and time as local time', () => {
    expect(parseDateTime('2026-11-26', '00:03:00')).toEqual(new Date(2026, 10, 26, 0, 3, 0));
    expect(parseDateTime('2026-11-26', '00:03')).toEqual(new Date(2026, 10, 26, 0, 3, 0));
  });

  it('returns undefined for missing or malformed input', () => {
    expect(parseDateTime(undefined, '00:03')).toBeUndefined();
    expect(parseDateTime('26.11.26', '00:03')).toBeUndefined();
  });
});

describe('mapRejseplanenDeparture', () => {
  const byLine = (line: string) => fixture.Departure.find((d) => d.ProductAtStop.displayNumber === line);

  it('maps an on-time real-time S-train', () => {
    expect(mapRejseplanenDeparture(byLine('B'), NOW)).toEqual({
      line: 'B',
      destination: 'Høje Taastrup St.',
      scheduled_time: '23:52',
      expected_time: '23:52',
      time_formatted: '23:52',
      minutes_until: 2,
      transport_mode: 'train',
      real_time: true,
      delay_minutes: 0,
      canceled: false,
      platform: '2',
      station: 'Kokkedal St.',
    });
  });

  it('computes delay and countdown across midnight using rtDate', () => {
    const item = mapRejseplanenDeparture(byLine('IC'), NOW)!;
    expect(item.delay_minutes).toBe(8);
    expect(item.minutes_until).toBe(13);
    expect(item.expected_time).toBe('00:03');
    expect(item.platform).toBe('4'); // real-time track wins
  });

  it('marks cancelled departures', () => {
    const item = mapRejseplanenDeparture(byLine('150S'), NOW)!;
    expect(item.canceled).toBe(true);
    expect(item.real_time).toBe(false);
    expect(item.transport_mode).toBe('bus');
  });

  it('reports 0 minutes for a departure in the current minute', () => {
    expect(mapRejseplanenDeparture(byLine('M2'), NOW)!.minutes_until).toBe(0);
  });

  it('falls back to clock arithmetic when no date is given', () => {
    const item = mapRejseplanenDeparture({ time: '00:05:00', rtTime: '00:07:00', ProductAtStop: {} }, NOW)!;
    expect(item.minutes_until).toBe(17);
    expect(item.delay_minutes).toBe(2);
  });

  it('treats an on-time departure without rtTime but with a prognosis as real-time', () => {
    // Real sensor data: Rejseplanen omits rtTime when the train runs on time
    const item = mapRejseplanenDeparture(kokkedal.Departure[0], new Date(2026, 9, 15, 14, 10))!;
    expect(item.real_time).toBe(true);
    expect(item.delay_minutes).toBe(0);
    expect(item.minutes_until).toBe(8);
    expect(item.transport_mode).toBe('train');
    expect(item.platform).toBe('2');
  });

  it('treats a departure with only timetable fields as scheduled', () => {
    expect(mapRejseplanenDeparture(kokkedal.Departure[1], new Date(2026, 9, 15, 14, 10))!.real_time).toBe(false);
  });

  it('returns null for empty input', () => {
    expect(mapRejseplanenDeparture(null, NOW)).toBeNull();
  });
});

describe('getDepartures', () => {
  it('maps the Departure attribute and hides departures that already left', () => {
    const lines = getDepartures(sensor(fixture), NOW).map((d) => d.line);
    expect(lines).toEqual(['M2', 'B', 'IC', '150S']);
  });

  it('orders by actual departure so delayed services move down', () => {
    const late = { ...fixture.Departure[3], ProductAtStop: { ...fixture.Departure[3].ProductAtStop, displayNumber: 'LATE' },
      time: '23:51:00', rtTime: '23:59:00', rtDate: '2026-11-25' };
    const lines = getDepartures(sensor({ Departure: [late, ...fixture.Departure] }), NOW).map((d) => d.line);
    expect(lines).toEqual(['M2', 'B', 'LATE', 'IC', '150S']);
  });

  it('accepts a single Departure object instead of an array', () => {
    expect(getDepartures(sensor({ Departure: fixture.Departure[2] }), NOW)).toHaveLength(1);
  });

  it('passes through preprocessed upcoming items', () => {
    const upcoming = [{ line: '5C', destination: 'Herlev', minutes_until: 4 }];
    expect(getDepartures(sensor({ upcoming }), NOW)).toEqual(upcoming);
  });

  it('returns nothing for a missing entity or attribute', () => {
    expect(getDepartures(undefined, NOW)).toEqual([]);
    expect(getDepartures(sensor({}), NOW)).toEqual([]);
  });
});

describe('isXmlShaped', () => {
  it('detects xmltodict output from an XML response', () => {
    expect(isXmlShaped(sensor({ Departure: [{ '@name': 'Bus 150S', '@time': '00:10:00' }] }))).toBe(true);
    expect(isXmlShaped(sensor({ DepartureBoard: { Departure: { '@name': 'Bus 150S' } } }))).toBe(true);
  });

  it('accepts JSON responses', () => {
    expect(isXmlShaped(sensor(fixture))).toBe(false);
    expect(isXmlShaped(sensor({}))).toBe(false);
  });
});

describe('detectMode', () => {
  it.each([
    [{ catOut: 'MET', catOutL: 'Metro' }, 'metro'],
    [{ catOut: 'S', catOutL: 'S-Tog' }, 'train'],
    [{ catOut: 'LOK', catOutL: 'Lokalbane' }, 'train'],
    [{ catOut: 'LET', catOutL: 'Letbane' }, 'tram'],
    [{ icon: { res: 'prod_ship' } }, 'boat'],
    [{ catOut: 'Bus', catOutL: 'Bus' }, 'bus'],
  ])('%j -> %s', (pat, mode) => {
    expect(detectMode(pat)).toBe(mode);
  });
});

describe('getLineColor', () => {
  it.each([
    ['M1', 'bus', '#0A9A48'],
    ['A', 'train', '#0173B7'],
    ['F', 'train', '#FFC917'],
    ['IC', 'train', '#E30613'],
    ['2A', 'bus', '#E30613'],
    ['150S', 'bus', '#0173B7'],
    ['N5', 'bus', '#003366'],
    ['1234', 'train', '#E30613'],
    ['14', 'bus', '#FFC917'],
  ])('%s (%s) -> %s', (line, mode, bg) => {
    expect(getLineColor(line, mode)?.bg).toBe(bg);
  });

  it('uses dark text on yellow backgrounds', () => {
    expect(getLineColor('M2')).toEqual({ bg: '#FFC917', color: '#000' });
  });

  it('returns undefined for unknown lines', () => {
    expect(getLineColor('Hornbæk Express')).toBeUndefined();
    expect(getLineColor(undefined)).toBeUndefined();
  });
});

describe('time format', () => {
  it('always formats 24-hour clock times', () => {
    expect(formatClock(13, 5)).toBe('13:05');
    expect(formatClock(0, 3)).toBe('00:03');
    expect(formatClockString('23:52:00')).toBe('23:52');
    expect(formatClockString('7:05')).toBe('07:05');
    expect(formatClockString('soon')).toBe('soon');
  });
});

describe('pillSize', () => {
  it.each([
    ['M2', 'normal'],
    ['150S', 'normal'],
    ['Bus 5', 'medium'],
    ['Lille Nord', 'long'],
    ['Hornbækbanen', 'xlong'],
    [undefined, 'normal'],
  ])('%s -> %s', (line, size) => {
    expect(pillSize(line)).toBe(size);
  });
});
