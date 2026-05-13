const variants = {
  neutral: 'border-slate-200 bg-slate-50 text-slate-700',
  closed: 'border-slate-300 bg-slate-100 text-slate-700',
  risk: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700'
};

export function Badge({ children, variant = 'neutral' }) {
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
