import { useCallback, useMemo, useState } from 'react';

const MIN_WIDTH = 88;
const MAX_WIDTH = 520;

function clampWidth(width, minWidth = MIN_WIDTH, maxWidth = MAX_WIDTH) {
  return Math.min(maxWidth, Math.max(minWidth, Math.round(width)));
}

export function useResizableColumns(columns) {
  const initialWidths = useMemo(
    () =>
      columns.reduce((acc, column) => {
        acc[column.id] = column.width;
        return acc;
      }, {}),
    [columns]
  );
  const [widths, setWidths] = useState(initialWidths);

  const getWidth = useCallback(
    (column) => widths[column.id] ?? column.width,
    [widths]
  );

  const startResize = useCallback(
    (event, column) => {
      event.preventDefault();
      event.stopPropagation();

      const startX = event.clientX;
      const startWidth = getWidth(column);

      function handleMove(moveEvent) {
        const nextWidth = clampWidth(startWidth + moveEvent.clientX - startX, column.minWidth, column.maxWidth);
        setWidths((current) => ({ ...current, [column.id]: nextWidth }));
      }

      function handleUp() {
        document.removeEventListener('pointermove', handleMove);
        document.removeEventListener('pointerup', handleUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('pointermove', handleMove);
      document.addEventListener('pointerup', handleUp);
    },
    [getWidth]
  );

  return { getWidth, startResize };
}
