/*
  Pure helpers that turn Rejseplanen API data (as exposed by a Home Assistant REST sensor)
  into display items. Kept free of DOM/Lit so they can be unit tested.
*/

export type HassEntity = {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_updated?: string;
};

export type TransportMode = 'bus' | 'metro' | 'train' | 'tram' | 'boat' | 'taxi';

export interface DepartureItem {
  line?: string;
  destination?: string;
  scheduled_time?: string;
  expected_time?: string;
  time_formatted?: string;
  minutes_until?: number | null;
  transport_mode?: TransportMode | string;
  real_time?: boolean;
  delay?: number;
  delay_minutes?: number;
  canceled?: boolean;
  platform?: string;
  agency?: string;
  station?: string;
}

export interface LineColor {
  bg: string;
  color: string;
}

// Parse Rejseplanen date ("YYYY-MM-DD") and time ("HH:MM" or "HH:MM:SS") as local time.
export function parseDateTime(date: string | undefined, time: string | undefined): Date | undefined {
  if (!date || !time) return undefined;
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const t = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(time);
  if (!d || !t) return undefined;
  return new Date(+d[1], +d[2] - 1, +d[3], +t[1], +t[2], t[3] ? +t[3] : 0);
}

// Minutes between two "HH:MM" clock times, wrapped to the nearest day boundary.
// Fallback for data without dates.
function clockDiff(from: string, to: string): number {
  const toMins = (s: string) => (parseInt(s.substring(0, 2)) || 0) * 60 + (parseInt(s.substring(3, 5)) || 0);
  let diff = toMins(to) - toMins(from);
  if (diff < -720) diff += 1440;
  if (diff > 720) diff -= 1440;
  return diff;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export function detectMode(pat: any): TransportMode {
  const cat = (pat?.catOut || '').toString();
  const catl = (pat?.catOutL || '').toString();
  const icon = (pat?.icon?.res || '').toString();
  const catUpper = cat.toUpperCase();

  if (cat === 'MET' || catl.includes('Metro') || icon === 'prod_sub') return 'metro';
  if (catl.includes('Tog') || catl.includes('Train') || cat.includes('S-Tog') ||
      catl.includes('Lokalbane') || catl.includes('Regional') || catl.includes('InterCity') ||
      ['S', 'RE', 'REG', 'IC', 'ICL', 'LYN', 'LOK', 'ØRE'].includes(catUpper) ||
      ['prod_comm', 'prod_reg', 'prod_long', 'prod_loc', 'prod_ic'].includes(icon)) {
    return 'train';
  }
  if (catl.includes('Tram') || catl.includes('Letbane') || icon === 'prod_tram') return 'tram';
  if (catl.includes('Ferry') || catl.includes('Boat') || catl.includes('Færge') || icon === 'prod_ship') return 'boat';
  return 'bus';
}

// Rejseplanen omits rtTime when a departure runs on time, so rtTime alone misses on-time
// trains. prognosisType (e.g. "PROGNOSED") and real-time platform fields also mean live data.
function hasRealtime(d: any): boolean {
  return !!(d.rtTime || d.prognosisType || d.rtTrack || d.rtPlatform);
}

export function mapRejseplanenDeparture(d: any, now: Date = new Date()): DepartureItem | null {
  if (!d) return null;

  const pat = d.ProductAtStop || {};
  const sched = (d.time || '').toString();
  const rt = (d.rtTime || '').toString();
  const depClock = rt || sched;

  const schedAt = parseDateTime(d.date, sched);
  const rtAt = rt ? parseDateTime(d.rtDate || d.date, rt) : undefined;
  const depAt = rtAt ?? schedAt;

  // Compare at minute resolution, matching what the clock on the wall shows
  const nowMinute = new Date(now);
  nowMinute.setSeconds(0, 0);

  let minutes_until: number | null = null;
  if (depAt) {
    minutes_until = Math.floor((depAt.getTime() - nowMinute.getTime()) / 60000);
  } else if (depClock) {
    minutes_until = clockDiff(`${pad(now.getHours())}:${pad(now.getMinutes())}`, depClock);
  }

  let delay_minutes = 0;
  if (schedAt && rtAt) {
    delay_minutes = Math.round((rtAt.getTime() - schedAt.getTime()) / 60000);
  } else if (sched && rt) {
    delay_minutes = clockDiff(sched, rt);
  }

  let platform = '';
  if (d.rtTrack) platform = d.rtTrack.toString();
  else if (d.track) platform = d.track.toString();
  else if (d.rtPlatform?.text) platform = d.rtPlatform.text.toString();
  else if (d.platform?.text) platform = d.platform.text.toString();

  const scheduled = sched.substring(0, 5);
  const expected = rt ? rt.substring(0, 5) : scheduled;

  return {
    line: pat.displayNumber || d.name || '',
    destination: d.direction || '',
    scheduled_time: scheduled,
    expected_time: expected,
    time_formatted: expected,
    minutes_until,
    transport_mode: detectMode(pat),
    real_time: hasRealtime(d),
    delay_minutes,
    canceled: d.cancelled === true || d.cancelled === 'true',
    platform,
    station: d.stop || '',
  };
}

export function mapEntityToItem(entity: HassEntity): DepartureItem | undefined {
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

function asArray(value: unknown): any[] | undefined {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object') return [value];
  return undefined;
}

// The API answers in XML unless `format=json` is given. Home Assistant converts XML with
// xmltodict, which prefixes XML attributes with "@" (e.g. "@time"). Detect that shape so the
// card can explain the misconfiguration instead of rendering an empty list.
export function isXmlShaped(entity: HassEntity | undefined): boolean {
  const candidates = [entity?.attributes?.Departure, entity?.attributes?.DepartureBoard?.Departure];
  return candidates.some((value) => {
    const first = asArray(value)?.[0];
    return !!first && typeof first === 'object' && Object.keys(first).some((k) => k.startsWith('@'));
  });
}

export function getDepartures(entity: HassEntity | undefined, now: Date = new Date()): DepartureItem[] {
  if (!entity) return [];

  let items: DepartureItem[];
  const upcoming = asArray(entity.attributes?.upcoming);
  const raw = asArray(entity.attributes?.Departure);
  if (upcoming && upcoming.length > 0) {
    // Either preprocessed items in our format, or raw Rejseplanen departures
    items = 'line' in upcoming[0] || 'destination' in upcoming[0]
      ? upcoming
      : upcoming.map((d) => mapRejseplanenDeparture(d, now)).filter((d): d is DepartureItem => d !== null);
  } else if (raw) {
    items = raw.map((d) => mapRejseplanenDeparture(d, now)).filter((d): d is DepartureItem => d !== null);
  } else {
    const single = mapEntityToItem(entity);
    items = single ? [single] : [];
  }

  // The sensor only refreshes every few minutes; hide departures that have already left
  const upcomingItems = items.filter((d) => !isMinutes(d.minutes_until) || d.minutes_until >= 0);
  // The API orders by scheduled time; list by actual departure so delayed services move down
  const key = (d: DepartureItem) => (isMinutes(d.minutes_until) ? d.minutes_until : Infinity);
  return upcomingItems.sort((a, b) => (key(a) === key(b) ? 0 : key(a) < key(b) ? -1 : 1));
}

function isMinutes(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

// Times are always shown in 24-hour format, like Danish timetables
export function formatClock(hours: number, minutes: number): string {
  return `${pad(hours)}:${pad(minutes)}`;
}

// Normalise an "HH:MM[:SS]" string to "HH:MM"; anything else is returned unchanged
export function formatClockString(value: string): string {
  const m = /^(\d{1,2}):(\d{2})/.exec(value);
  return m ? formatClock(+m[1], +m[2]) : value;
}

// Size class for the line pill so long names shrink instead of widening the pill.
// "xlong" is a single word too long to sit next to the mode icon (e.g. "Hornbækbanen").
export function pillSize(line: string | undefined): 'normal' | 'medium' | 'long' | 'xlong' {
  const text = line ?? '';
  if (text.length <= 4) return 'normal';
  if (text.length <= 6) return 'medium';
  return text.split(' ').some((word) => word.length > 8) ? 'xlong' : 'long';
}

const METRO: Record<string, string> = { M1: '#0A9A48', M2: '#FFC917', M3: '#EE3B43', M4: '#1EBAE5' };
const S_TRAIN: Record<string, string> = {
  A: '#0173B7', B: '#72BF44', BX: '#72BF44', C: '#E87722', E: '#8B8C8E', F: '#FFC917', H: '#E30613',
};
const DSB_RED = '#E30613';
const DSB_LINES = ['IC', 'LYN', 'ICL', 'REG'];
const ORESUND = ['ØRE', 'ØRESUND'];
const LOKALTOG = [
  'HORNBÆKBANEN', 'LILLE NORD', 'FREDERIKSVÆRKBANEN', 'GRIBSKOVBANEN', 'NÆRUMBANEN', 'ØSTBANEN',
  'ODSHERREDSBANEN', 'TØLLØSEBANEN',
];
const A_BUSES = ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '9A'];
const DARK_TEXT = new Set(['#FFC917']);

function color(bg: string): LineColor {
  return { bg, color: DARK_TEXT.has(bg) ? '#000' : '#fff' };
}

export function getLineColor(line: string | undefined, mode?: string): LineColor | undefined {
  if (!line) return undefined;
  const l = String(line).toUpperCase();

  if (METRO[l]) return color(METRO[l]);
  if (S_TRAIN[l]) return color(S_TRAIN[l]);
  if (DSB_LINES.includes(l)) return color(DSB_RED);
  if (ORESUND.includes(l)) return color('#2B6B3D');
  if (LOKALTOG.includes(l)) return color('#1073A5');
  if (A_BUSES.includes(l)) return color(DSB_RED);
  // Copenhagen S-buses (express)
  if (l.endsWith('S') && l.length <= 4) return color('#0173B7');
  // Copenhagen E-buses (express)
  if (l.startsWith('E')) return color('#5A5A5A');
  // Night buses
  if (l.startsWith('N') || l.endsWith('N')) return color('#003366');
  // Numeric train numbers (DSB regional) — must be checked before generic bus pattern
  if (mode === 'train' && /^\d+$/.test(l)) return color(DSB_RED);
  // Regular buses
  if (/^\d+[A-Z]?$/.test(l)) return color('#FFC917');
  return undefined;
}
