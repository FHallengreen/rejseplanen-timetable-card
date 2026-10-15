import en from './translations/en.json';
import sv from './translations/sv.json';
import da from './translations/da.json';

export type HassLike = { locale?: { language?: string }; language?: string } | undefined;

const DICTS: Record<string, any> = { da, sv, en };

function lookup(dict: any, path: string): string | undefined {
  const value = path.split('.').reduce((acc: any, key: string) => (acc ? acc[key] : undefined), dict);
  return typeof value === 'string' ? value : undefined;
}

export function localize(hass: HassLike, path: string, vars?: Record<string, any>): string {
  const lang = String(hass?.locale?.language || hass?.language || 'en').toLowerCase().slice(0, 2);
  const value = lookup(DICTS[lang] ?? en, path) ?? lookup(en, path) ?? path;
  if (!vars) return value;
  return Object.entries(vars).reduce((str, [k, v]) => str.split(`{${k}}`).join(String(v)), value);
}
