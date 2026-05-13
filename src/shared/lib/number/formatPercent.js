export function formatPercent(value, digits = 0) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return '—';
  }

  return `${Number(value).toLocaleString('ru-RU', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  })}%`;
}
