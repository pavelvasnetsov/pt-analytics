export function ResizableHeaderCell({
  children,
  column,
  width,
  onResizeStart,
  className = '',
  style,
  title
}) {
  return (
    <th
      className={`relative px-4 py-3 ${className}`}
      style={{ width, minWidth: width, maxWidth: width, ...style }}
      title={title}
      scope="col"
    >
      <div className="pr-2">{children}</div>
      <button
        aria-label={`Изменить ширину колонки ${title ?? children}`}
        className="absolute right-0 top-0 h-full w-2 cursor-col-resize touch-none border-r border-transparent hover:border-sky-500 focus:border-sky-600 focus:outline-none"
        type="button"
        onPointerDown={(event) => onResizeStart(event, column)}
      />
    </th>
  );
}
