export function parsePercent(value) {
  if (value === null || value === undefined || value === '') {
    return { value: 0, valid: false, empty: true };
  }

  let normalized = value;
  if (typeof value === 'string') {
    normalized = value.replace('%', '').replace(',', '.').trim();
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    return { value: 0, valid: false, empty: false };
  }

  const percent = parsed > 0 && parsed <= 1 ? parsed * 100 : parsed;
  return { value: Math.min(100, Math.max(0, percent)), valid: true, empty: false };
}
