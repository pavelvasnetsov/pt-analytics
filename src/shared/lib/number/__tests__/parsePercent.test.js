import { describe, expect, it } from 'vitest';
import { parsePercent } from '../parsePercent.js';

describe('parsePercent', () => {
  it('normalizes strings, fractions and invalid values', () => {
    expect(parsePercent('42,5%')).toMatchObject({ value: 42.5, valid: true });
    expect(parsePercent(0.75)).toMatchObject({ value: 75, valid: true });
    expect(parsePercent('abc')).toMatchObject({ value: 0, valid: false });
  });
});
