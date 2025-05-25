import { useState, useEffect, useRef, useCallback } from "react";

interface VirtualScrollParams {
  rowHeight: number;
  totalCount: number;
  containerHeight: number;
}

export function useVirtualScroll({
  rowHeight,
  totalCount,
  containerHeight,
}: VirtualScrollParams) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const visibleCount = Math.ceil(containerHeight / rowHeight);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const start = Math.floor(scrollTop / rowHeight);
    setStartIndex(start);
    setEndIndex(Math.min(totalCount - 1, start + visibleCount));
  }, [rowHeight, totalCount, visibleCount]);

  useEffect(() => {
    setEndIndex(Math.min(totalCount - 1, visibleCount));
  }, [totalCount, visibleCount]);

  return { startIndex, endIndex, onScroll, visibleCount };
}