import { SUCCESS_COMPLETION_STATUS } from '../config/statusRules.js';

export function isSuccessfullyCompleted(listener) {
  return String(listener.completionStatus ?? '').trim().toLowerCase() === SUCCESS_COMPLETION_STATUS;
}

export function calculateKpis(listeners) {
  const totalListeners = listeners.length;
  const startedCount = listeners.filter((listener) => listener.progress > 0).length;
  const progressSum = listeners.reduce((sum, listener) => sum + listener.progress, 0);
  const completed = listeners.filter(isSuccessfullyCompleted);
  const completionTimes = completed
    .map((listener) => listener.spentTimeSeconds)
    .filter((seconds) => Number.isFinite(seconds));

  return {
    totalListeners,
    startedCount,
    startedPercent: totalListeners === 0 ? 0 : (startedCount / totalListeners) * 100,
    averageProgress: totalListeners === 0 ? 0 : progressSum / totalListeners,
    successfullyCompletedCount: completed.length,
    averageCompletionTimeSeconds:
      completionTimes.length === 0
        ? null
        : completionTimes.reduce((sum, seconds) => sum + seconds, 0) / completionTimes.length
  };
}
