import { useState } from 'react';
import { ReportUploadPanel } from '../widgets/report-upload-panel/ui/ReportUploadPanel.jsx';
import { ListenersPage } from '../pages/listeners/ui/ListenersPage.jsx';
import { MaterialsMatrixPage } from '../pages/materials-matrix/ui/MaterialsMatrixPage.jsx';
import { useUploadReport } from '../features/upload-report/model/useUploadReport.js';
import { Alert } from '../shared/ui/Alert/Alert.jsx';

const tabs = [
  { id: 'listeners', label: 'Список слушателей' },
  { id: 'materials', label: 'Матрица материалов' }
];

export function App() {
  const [activeTab, setActiveTab] = useState('listeners');
  const { report, errors, isParsing, uploadFile } = useUploadReport();

  async function handleFile(file) {
    setActiveTab('listeners');
    await uploadFile(file);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-normal text-sky-700">Excel analytics</p>
          <h1 className="text-3xl font-semibold text-slate-950">Дашборд слушателей</h1>
          <p className="max-w-3xl text-sm text-slate-600">
            Загрузите еженедельный Excel-отчет, чтобы увидеть KPI, список слушателей и прогресс по материалам.
          </p>
        </header>

        <ReportUploadPanel report={report} isParsing={isParsing} onFile={handleFile} />
        {isParsing ? <Alert title="Файл обрабатывается" items={['Идет чтение и нормализация данных Excel.']} /> : null}
        <Alert title="Ошибки загрузки" items={errors} variant="error" />
        <Alert title="Предупреждения по файлу" items={report?.warnings ?? []} variant="warning" />

        {report ? (
          <>
            <nav className="flex flex-wrap gap-2" aria-label="Разделы дашборда">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`rounded-md px-4 py-2 text-sm font-semibold ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {activeTab === 'listeners' ? <ListenersPage report={report} /> : <MaterialsMatrixPage report={report} />}
          </>
        ) : null}
      </div>
    </main>
  );
}
