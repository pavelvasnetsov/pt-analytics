const EXCEL_EPOCH_OFFSET = 25569;
const MS_IN_DAY = 86400 * 1000;

export function parseDate(value) {
  if (value === null || value === undefined || value === '') {
    return { value: null, valid: false, empty: true };
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return { value, valid: true, empty: false };
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    const date = new Date(Math.round((value - EXCEL_EPOCH_OFFSET) * MS_IN_DAY));
    return Number.isNaN(date.getTime())
      ? { value: null, valid: false, empty: false }
      : { value, valid: true, empty: false };
  }

  if (typeof value !== 'string') {
    return { value: null, valid: false, empty: false };
  }

  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (!match) {
    const date = new Date(trimmed);
    return Number.isNaN(date.getTime())
      ? { value: null, valid: false, empty: false }
      : { value: date, valid: true, empty: false };
  }

  const [, day, month, year, hour = '0', minute = '0', second = '0'] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return { value: null, valid: false, empty: false };
  }

  return { value: date, valid: true, empty: false };
}
