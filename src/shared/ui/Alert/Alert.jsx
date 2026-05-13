const variants = {
  error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-100',
  warning: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100',
  info: 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-100'
};

export function Alert({ title, items = [], variant = 'info' }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className={`rounded-lg border p-4 ${variants[variant]}`} aria-live="polite">
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {items.slice(0, 12).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {items.length > 12 ? <p className="mt-2 text-sm">Еще предупреждений: {items.length - 12}</p> : null}
    </section>
  );
}
