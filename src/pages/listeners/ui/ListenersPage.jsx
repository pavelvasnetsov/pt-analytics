import { KpiSummary } from '../../../widgets/kpi-summary/ui/KpiSummary.jsx';
import { ListenersTable } from '../../../widgets/listeners-table/ui/ListenersTable.jsx';

export function ListenersPage({ report }) {
  return (
    <div className="space-y-5">
      <KpiSummary kpis={report.kpis} />
      <ListenersTable listeners={report.listeners} />
    </div>
  );
}
