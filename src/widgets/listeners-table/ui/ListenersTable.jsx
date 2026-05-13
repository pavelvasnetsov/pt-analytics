import { useMemo } from 'react';
import { formatDateTime } from '../../../shared/lib/date/formatDateTime.js';
import { formatPercent } from '../../../shared/lib/number/formatPercent.js';
import { Badge } from '../../../shared/ui/Badge/Badge.jsx';
import { getListenerRowState } from '../../../entities/listener/lib/getListenerRowState.js';
import { useResizableColumns } from '../../../shared/lib/table/useResizableColumns.js';
import { useVirtualRows } from '../../../shared/lib/table/useVirtualRows.js';
import { ResizableHeaderCell } from '../../../shared/ui/Table/ResizableHeaderCell.jsx';

const columns = [
  { id: 'fullName', label: 'Фамилия Имя', width: 190, minWidth: 140 },
  { id: 'email', label: 'Email', width: 220, minWidth: 160 },
  { id: 'stream', label: 'Поток', width: 220, minWidth: 160 },
  { id: 'progress', label: 'Прогресс', width: 120, minWidth: 96, align: 'right' },
  { id: 'accessOpenDate', label: 'Дата открытия доступа', width: 190, minWidth: 150 },
  { id: 'startDate', label: 'Дата начала', width: 170, minWidth: 140 },
  { id: 'lastActivityDate', label: 'Последняя активность', width: 190, minWidth: 150 },
  { id: 'accessCloseDate', label: 'Дата закрытия', width: 170, minWidth: 140 },
  { id: 'status', label: 'Статус', width: 120, minWidth: 100 }
];

function DataCell({ column, width, children, className = '' }) {
  return (
    <td
      className={`overflow-hidden text-ellipsis whitespace-nowrap px-4 py-3 ${className}`}
      style={{ width, minWidth: width, maxWidth: width }}
    >
      {children}
    </td>
  );
}

export function ListenersTable({ listeners }) {
  const sortedListeners = useMemo(
    () => [...listeners].sort((a, b) => b.progress - a.progress || a.sourceRowIndex - b.sourceRowIndex),
    [listeners]
  );
  const { getWidth, startResize } = useResizableColumns(columns);
  const { containerRef, onScroll, virtualRows, paddingTop, paddingBottom } = useVirtualRows(sortedListeners, {
    rowHeight: 48,
    overscan: 10
  });
  const tableWidth = columns.reduce((sum, column) => sum + getWidth(column), 0);

  return (
    <div
      ref={containerRef}
      className="table-scroll max-h-[70vh] overflow-auto rounded-lg border border-slate-200 bg-white"
      onScroll={onScroll}
    >
      <table className="table-fixed border-collapse text-left text-sm" style={{ width: tableWidth }}>
        <thead className="bg-slate-50 text-xs uppercase tracking-normal text-slate-600">
          <tr>
            {columns.map((column) => (
              <ResizableHeaderCell
                key={column.id}
                column={column}
                width={getWidth(column)}
                onResizeStart={startResize}
                className={`sticky top-0 z-20 bg-slate-50 ${column.align === 'right' ? 'text-right' : ''}`}
                title={column.label}
              >
                {column.label}
              </ResizableHeaderCell>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {paddingTop > 0 ? (
            <tr aria-hidden="true">
              <td colSpan={columns.length} style={{ height: paddingTop, padding: 0 }} />
            </tr>
          ) : null}
          {virtualRows.map(({ item: listener }) => {
            const state = getListenerRowState(listener);
            return (
              <tr key={listener.rowId} className={state.rowClassName}>
                <DataCell column={columns[0]} width={getWidth(columns[0])} className="font-medium text-slate-900">
                  {listener.fullName}
                </DataCell>
                <DataCell column={columns[1]} width={getWidth(columns[1])} className="text-slate-700">
                  {listener.email}
                </DataCell>
                <DataCell column={columns[2]} width={getWidth(columns[2])} className="text-slate-700">
                  {listener.stream}
                </DataCell>
                <DataCell column={columns[3]} width={getWidth(columns[3])} className="text-right font-medium">
                  {formatPercent(listener.progress)}
                </DataCell>
                <DataCell column={columns[4]} width={getWidth(columns[4])}>
                  {formatDateTime(listener.accessOpenDate)}
                </DataCell>
                <DataCell column={columns[5]} width={getWidth(columns[5])}>
                  {formatDateTime(listener.startDate)}
                </DataCell>
                <DataCell column={columns[6]} width={getWidth(columns[6])}>
                  {formatDateTime(listener.lastActivityDate)}
                </DataCell>
                <DataCell column={columns[7]} width={getWidth(columns[7])}>
                  {formatDateTime(listener.accessCloseDate)}
                </DataCell>
                <DataCell column={columns[8]} width={getWidth(columns[8])}>
                  <Badge variant={state.type === 'closed' ? 'closed' : state.type === 'risk' ? 'risk' : 'neutral'}>
                    {state.label}
                  </Badge>
                </DataCell>
              </tr>
            );
          })}
          {paddingBottom > 0 ? (
            <tr aria-hidden="true">
              <td colSpan={columns.length} style={{ height: paddingBottom, padding: 0 }} />
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
