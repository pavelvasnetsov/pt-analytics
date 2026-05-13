export function parseDuration(value, fallbackSeconds) {
  if (typeof value === 'string' && value.trim()) {
    const match = value.trim().match(/^(\d+):([0-5]?\d):([0-5]?\d)$/);
    if (match) {
      const [, hours, minutes, seconds] = match;
      return { value: Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds), valid: true };
    }
  }

  const numericFallback = Number(fallbackSeconds);
  if (Number.isFinite(numericFallback) && numericFallback >= 0) {
    return { value: numericFallback, valid: true };
  }

  return { value: null, valid: false };
}
