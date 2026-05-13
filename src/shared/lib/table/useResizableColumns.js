import { useCallback, useEffect, useMemo, useState } from 'react';

const MIN_WIDTH = 88;
const MAX_WIDTH = 520;
const STORAGE_PREFIX = 'pt-analytics-column-widths';

function clampWidth(width, minWidth = MIN_WIDTH, maxWidth = MAX_WIDTH) {
  return Math.min(maxWidth, Math.max(minWidth, Math.round(width)));
}

function getDefaultWidths(columns) {
  return columns.reduce((acc, column) => {
    acc[column.id] = column.width;
    return acc;
  }, {});
}

function getStorageKey(storageKey) {
  return storageKey ? `${STORAGE_PREFIX}:${storageKey}` : null;
}

function readStoredWidths(storageKey, columns) {
  const key = getStorageKey(storageKey);
  if (!key || typeof window === 'undefined') {
    return {};
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? '{}');
    if (!parsed || typeof parsed !== 'object') {
      return {};
    }

    return columns.reduce((acc, column) => {
      const value = Number(parsed[column.id]);
      if (Number.isFinite(value)) {
        acc[column.id] = clampWidth(value, column.minWidth, column.maxWidth);
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
}

function writeStoredWidths(storageKey, widths) {
  const key = getStorageKey(storageKey);
  if (!key || typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(widths));
  } catch {
    // Persisting column widths is optional.
  }
}

export function useResizableColumns(columns, { storageKey } = {}) {
  const defaultWidths = useMemo(() => getDefaultWidths(columns), [columns]);
  const [widths, setWidths] = useState(() => ({
    ...defaultWidths,
    ...readStoredWidths(storageKey, columns)
  }));

  useEffect(() => {
    setWidths((current) => {
      const stored = readStoredWidths(storageKey, columns);
      return columns.reduce((acc, column) => {
        acc[column.id] = stored[column.id] ?? current[column.id] ?? column.width;
        return acc;
      }, {});
    });
  }, [columns, storageKey]);

  useEffect(() => {
    writeStoredWidths(storageKey, widths);
  }, [storageKey, widths]);

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
