import { formatPercent } from '../../../shared/lib/number/formatPercent.js';
import { useResizableColumns } from '../../../shared/lib/table/useResizableColumns.js';
import { useVirtualRows } from '../../../shared/lib/table/useVirtualRows.js';
import { ResizableHeaderCell } from '../../../shared/ui/Table/ResizableHeaderCell.jsx';

const baseColumns = [
  { id: 'fullName', label: 'Фамилия Имя', width: 190, minWidth: 140, sticky: true },
  { id: 'email', label: 'Email', width: 230, minWidth: 160, sticky: true },
  { id: 'stream', label: 'Поток', width: 230, minWidth: 160, sticky: true }
];

function StickyCell({ column, width, left, children, header = false, className = '' }) {
  const Tag = header ? 'th' : 'td';
  return (
    <Tag
      className={`sticky z-10 overflow-hidden text-ellipsis whitespace-nowrap px-4 py-3 ${header ? 'z-20 bg-slate-50' : 'bg-white'} ${className}`}
      style={{ left, width, minWidth: width, maxWidth: width }}
      scope={header ? 'col' : undefined}
    >
      {children}
    </Tag>
  );
}

function ProgressCell({ value, width, muted = false }) {
  const numericValue = Number.isFinite(value) ? value : null;
  return (
    <td
      className={`px-3 py-3 text-center ${muted ? 'bg-slate-100 font-semibold' : ''}`}
      style={{ width, minWidth: width, maxWidth: width }}
    >
      {numericValue === null ? (
        '—'
      ) : (
        <span className="inline-flex min-w-14 justify-center rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-800">
          {formatPercent(numericValue, Number.isInteger(numericValue) ? 0 : 1)}
        </span>
      )}
    </td>
  );
}

export function MaterialsMatrixTable({ materials, matrix }) {
  const columns = [
    ...baseColumns,
    ...materials.map((material) => ({
      id: material.id,
      label: material.title,
      width: 156,
      minWidth: 112,
      maxWidth: 320
    }))
  ];
  const { getWidth, startResize } = useResizableColumns(columns);
  const { containerRef, onScroll, virtualRows, paddingTop, paddingBottom } = useVirtualRows(matrix.rows, {
    rowHeight: 48,
    overscan: 8
  });
  const stickyLeft = {
    fullName: 0,
    email: getWidth(columns[0]),
    stream: getWidth(columns[0]) + getWidth(columns[1])
  };
  const tableWidth = columns.reduce((sum, column) => sum + getWidth(column), 0);

  if (!materials.length) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        В файле не найдены колонки материалов для построения матрицы.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="table-scroll max-h-[72vh] overflow-auto rounded-lg border border-slate-200 bg-white"
      onScroll={onScroll}
    >
      <table className="table-fixed border-collapse text-left text-sm" style={{ width: tableWidth }}>
        <thead className="bg-slate-50 text-xs uppercase tracking-normal text-slate-600">
          <tr>
            {baseColumns.map((column) => (
              <ResizableHeaderCell
                key={column.id}
                column={column}
                width={getWidth(column)}
                onResizeStart={startResize}
                className="sticky top-0 z-30 bg-slate-50"
                style={{ left: stickyLeft[column.id] }}
                title={column.label}
              >
                {column.label}
              </ResizableHeaderCell>
            ))}
            {materials.map((material) => (
              <ResizableHeaderCell
                key={material.id}
                column={columns.find((column) => column.id === material.id)}
                width={getWidth(columns.find((column) => column.id === material.id))}
                onResizeStart={startResize}
                className="sticky top-0 z-20 whitespace-normal bg-slate-50 px-3 text-center align-bottom"
                title={material.title}
              >
                {material.title}
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
          {virtualRows.map(({ item: row }) => (
            <tr key={row.rowId} className="bg-white">
              <StickyCell column={columns[0]} width={getWidth(columns[0])} left={stickyLeft.fullName} className="font-medium text-slate-900">
                {row.fullName}
              </StickyCell>
              <StickyCell column={columns[1]} width={getWidth(columns[1])} left={stickyLeft.email} className="text-slate-700">
                {row.email}
              </StickyCell>
              <StickyCell column={columns[2]} width={getWidth(columns[2])} left={stickyLeft.stream} className="text-slate-700">
                {row.stream}
              </StickyCell>
              {materials.map((material) => (
                <ProgressCell
                  key={material.id}
                  value={row.values[material.id]}
                  width={getWidth(columns.find((column) => column.id === material.id))}
                />
              ))}
            </tr>
          ))}
          {paddingBottom > 0 ? (
            <tr aria-hidden="true">
              <td colSpan={columns.length} style={{ height: paddingBottom, padding: 0 }} />
            </tr>
          ) : null}
          <tr className="border-t-2 border-slate-300 bg-slate-100">
            <StickyCell column={columns[0]} width={getWidth(columns[0])} left={stickyLeft.fullName} className="bg-slate-100 font-semibold text-slate-950">
              Среднее
            </StickyCell>
            <StickyCell column={columns[1]} width={getWidth(columns[1])} left={stickyLeft.email} className="bg-slate-100" />
            <StickyCell column={columns[2]} width={getWidth(columns[2])} left={stickyLeft.stream} className="bg-slate-100" />
            {materials.map((material) => (
              <ProgressCell
                key={material.id}
                value={matrix.averages[material.id]}
                width={getWidth(columns.find((column) => column.id === material.id))}
                muted
              />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
