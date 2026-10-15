import { describe, expect, it } from 'vitest';
import { localize } from '../src/localize';

describe('localize', () => {
  it('picks the dictionary from the Home Assistant locale', () => {
    expect(localize({ locale: { language: 'da' } }, 'status.cancelled')).toBe('Aflyst');
    expect(localize({ locale: { language: 'sv-SE' } }, 'status.cancelled')).toBe('Inställd');
    expect(localize({ language: 'en' }, 'status.cancelled')).toBe('Cancelled');
  });

  it('falls back to English for unsupported languages', () => {
    expect(localize({ locale: { language: 'de' } }, 'status.cancelled')).toBe('Cancelled');
    expect(localize(undefined, 'status.cancelled')).toBe('Cancelled');
  });

  it('returns the key for unknown paths', () => {
    expect(localize(undefined, 'does.not.exist')).toBe('does.not.exist');
  });

  it('substitutes variables', () => {
    expect(localize({ language: 'da' }, 'status.delayed', { minutes: 4 })).toBe('Forsinket 4 min');
  });
});
