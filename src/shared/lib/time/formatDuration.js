export function formatDuration(seconds) {
  if (!Number.isFinite(Number(seconds))) {
    return '—';
  }

  const totalMinutes = Math.round(Number(seconds) / 60);
  if (totalMinutes < 60) {
    return `${totalMinutes} мин`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} ч ${minutes} мин`;
}
