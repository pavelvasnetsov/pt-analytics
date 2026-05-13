import { describe, expect, it } from 'vitest';
import { getListenerRowState } from '../getListenerRowState.js';

describe('getListenerRowState', () => {
  const now = new Date(2026, 4, 13, 12, 0);

  it('prioritizes closed access', () => {
    expect(
      getListenerRowState({ progress: 10, accessCloseDate: new Date(2026, 4, 1), programStatus: null }, now).type
    ).toBe('closed');
  });

  it('detects risk before close date', () => {
    expect(
      getListenerRowState({ progress: 49, accessCloseDate: new Date(2026, 4, 20), programStatus: null }, now).type
    ).toBe('risk');
  });
});
