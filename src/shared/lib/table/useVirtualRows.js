import { useEffect, useMemo, useRef, useState } from 'react';

export function useVirtualRows(items, { rowHeight = 48, overscan = 8 } = {}) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return undefined;
    }

    const updateViewport = () => setViewportHeight(element.clientHeight);
    updateViewport();

    const resizeObserver = new ResizeObserver(updateViewport);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  const totalHeight = items.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const visibleCount = Math.ceil(viewportHeight / rowHeight) + overscan * 2;
  const endIndex = Math.min(items.length, startIndex + visibleCount);

  const virtualRows = useMemo(
    () =>
      items.slice(startIndex, endIndex).map((item, index) => ({
        item,
        index: startIndex + index
      })),
    [items, startIndex, endIndex]
  );

  return {
    containerRef,
    onScroll: (event) => setScrollTop(event.currentTarget.scrollTop),
    virtualRows,
    paddingTop: startIndex * rowHeight,
    paddingBottom: Math.max(0, totalHeight - endIndex * rowHeight),
    totalRows: items.length
  };
}
