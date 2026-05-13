import { useRef, useState } from 'react';

export function UploadDropzone({ onFile, disabled = false }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(files) {
    const [file] = Array.from(files ?? []);
    if (file) {
      onFile(file);
    }
  }

  return (
    <section
      aria-label="Загрузка Excel-файла"
      className={`rounded-lg border-2 border-dashed p-8 text-center transition ${
        isDragging
          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950'
          : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept=".xlsx"
        disabled={disabled}
        onChange={(event) => handleFiles(event.target.files)}
      />
      <p className="text-base font-semibold text-slate-900 dark:text-slate-50">Перетащите Excel-файл сюда</p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Поддерживается формат .xlsx. Данные обрабатываются только в браузере.
      </p>
      <button
        className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-600 dark:hover:bg-sky-500"
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        Выбрать файл
      </button>
    </section>
  );
}
