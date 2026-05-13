import { useRef } from 'react';

export function ReplaceReportButton({ onFile, disabled = false }) {
  const inputRef = useRef(null);

  return (
    <>
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept=".xlsx"
        disabled={disabled}
        onChange={(event) => {
          const [file] = Array.from(event.target.files ?? []);
          if (file) {
            onFile(file);
          }
          event.target.value = '';
        }}
      />
      <button
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        Заменить файл
      </button>
    </>
  );
}
