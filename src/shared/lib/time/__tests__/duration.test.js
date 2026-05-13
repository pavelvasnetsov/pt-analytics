import { describe, expect, it } from 'vitest';
import { formatDuration } from '../formatDuration.js';
import { parseDuration } from '../parseDuration.js';

describe('duration utils', () => {
  it('parses hh:mm:ss and formats rounded minutes', () => {
    expect(parseDuration('01:30:20').value).toBe(5420);
    expect(formatDuration(5420)).toBe('1 ч 30 мин');
  });

  it('uses seconds fallback', () => {
    expect(parseDuration('', 120).value).toBe(120);
  });
});
