import { MaterialsMatrixTable } from '../../../widgets/materials-matrix-table/ui/MaterialsMatrixTable.jsx';

export function MaterialsMatrixPage({ report }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-950 dark:text-slate-50">Матрица материалов</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Столбцы идут в порядке Excel. Итоговая строка показывает средний процент по каждому материалу.
        </p>
      </div>
      <MaterialsMatrixTable materials={report.materials} matrix={report.materialMatrix} />
    </div>
  );
}
