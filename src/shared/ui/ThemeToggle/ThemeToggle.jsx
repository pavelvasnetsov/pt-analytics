function SunIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.99 12.62A8.5 8.5 0 1 1 11.38 3.01 6.5 6.5 0 1 0 20.99 12.62Z" />
    </svg>
  );
}

export function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      className="inline-flex h-10 w-16 items-center justify-between rounded-full border border-slate-300 bg-white p-1 text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-950"
      type="button"
      aria-pressed={isDark}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить темную тему'}
      title={isDark ? 'Светлая тема' : 'Темная тема'}
      onClick={onToggle}
    >
      <span
        className={`grid h-8 w-8 place-items-center rounded-full transition ${
          isDark ? 'translate-x-6 bg-sky-500 text-white' : 'translate-x-0 bg-amber-400 text-slate-950'
        }`}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
      <span className="sr-only">{isDark ? 'Светлая тема' : 'Темная тема'}</span>
    </button>
  );
}
