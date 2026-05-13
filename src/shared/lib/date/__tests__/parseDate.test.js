import { describe, expect, it } from 'vitest';
import { formatDateTime } from '../formatDateTime.js';
import { parseDate } from '../parseDate.js';

describe('date parsing and formatting', () => {
  it('parses Russian datetime format', () => {
    const parsed = parseDate('13.05.2026 16:15');
    expect(parsed.valid).toBe(true);
    expect(formatDateTime(parsed.value)).toBe('13.05.2026 16:15');
  });

  it('rejects invalid calendar dates', () => {
    expect(parseDate('32.05.2026 16:15')).toMatchObject({ value: null, valid: false });
  });
});
