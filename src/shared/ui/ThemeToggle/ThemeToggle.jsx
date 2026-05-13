export function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      type="button"
      aria-pressed={isDark}
      onClick={onToggle}
    >
      {isDark ? 'Светлая тема' : 'Темная тема'}
    </button>
  );
}
