import { ReplaceReportButton } from '../../../features/replace-report/ui/ReplaceReportButton.jsx';
import { UploadDropzone } from '../../../features/upload-report/ui/UploadDropzone.jsx';
import { formatDateTime } from '../../../shared/lib/date/formatDateTime.js';
import { Card } from '../../../shared/ui/Card/Card.jsx';

export function ReportUploadPanel({ report, isParsing, onFile }) {
  if (!report) {
    return (
      <Card className="max-w-3xl">
        <UploadDropzone onFile={onFile} disabled={isParsing} />
        <div className="mt-5 text-sm text-slate-600 dark:text-slate-300">
          <p className="font-medium text-slate-800 dark:text-slate-100">Обязательные колонки:</p>
          <p className="mt-1">ФИО, email, поток, прогресс, дата открытия доступа и дата закрытия.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{report.fileMeta.name}</p>
          <dl className="mt-2 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-4">
            <div>
              <dt className="font-medium text-slate-700 dark:text-slate-200">Загружен</dt>
              <dd>{formatDateTime(report.fileMeta.uploadedAt)}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700 dark:text-slate-200">Лист</dt>
              <dd>{report.fileMeta.sheetName}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700 dark:text-slate-200">Строк</dt>
              <dd>{report.listeners.length}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700 dark:text-slate-200">Материалов</dt>
              <dd>{report.materials.length}</dd>
            </div>
          </dl>
        </div>
        <ReplaceReportButton onFile={onFile} disabled={isParsing} />
      </div>
    </Card>
  );
}
