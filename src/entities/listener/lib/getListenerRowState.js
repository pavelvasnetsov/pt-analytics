import { CLOSED_STATUS_KEYWORDS } from '../../report/config/statusRules.js';

const RISK_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

export function isClosedByStatus(status) {
  const normalized = String(status ?? '').trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  return CLOSED_STATUS_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

export function getListenerRowState(listener, now = new Date()) {
  const isClosed =
    (listener.accessCloseDate instanceof Date && listener.accessCloseDate.getTime() < now.getTime()) ||
    isClosedByStatus(listener.programStatus);

  if (isClosed) {
    return { type: 'closed', label: 'Закрыт', rowClassName: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' };
  }

  const closeTime = listener.accessCloseDate instanceof Date ? listener.accessCloseDate.getTime() : null;
  const isRisk =
    listener.progress < 50 &&
    closeTime !== null &&
    closeTime >= now.getTime() &&
    closeTime - now.getTime() < RISK_WINDOW_MS;

  if (isRisk) {
    return { type: 'risk', label: 'Риск', rowClassName: 'bg-red-50 dark:bg-red-950/50 dark:text-slate-100' };
  }

  return { type: 'normal', label: 'Норма', rowClassName: 'bg-white dark:bg-slate-900 dark:text-slate-100' };
}
