import { formatPercent } from '../../../shared/lib/number/formatPercent.js';
import { formatDuration } from '../../../shared/lib/time/formatDuration.js';
import { Card } from '../../../shared/ui/Card/Card.jsx';

const KPI_ITEMS = [
  ['Всего слушателей', 'totalListeners'],
  ['Приступившие', 'startedCount'],
  ['% приступивших', 'startedPercent', 'percent'],
  ['Средний % прохождения', 'averageProgress', 'percent'],
  ['Успешно завершившие', 'successfullyCompletedCount'],
  ['Среднее время прохождения', 'averageCompletionTimeSeconds', 'duration']
];

export function KpiSummary({ kpis }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {KPI_ITEMS.map(([label, key, type]) => (
        <Card key={key}>
          <p className="text-xs font-medium uppercase tracking-normal text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50">
            {type === 'percent'
              ? formatPercent(kpis[key], 1)
              : type === 'duration'
                ? formatDuration(kpis[key])
                : kpis[key].toLocaleString('ru-RU')}
          </p>
        </Card>
      ))}
    </div>
  );
}
