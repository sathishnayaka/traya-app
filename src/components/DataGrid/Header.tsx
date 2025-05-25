import React from "react";
import { Column } from "./types";

interface HeaderProps<T> {
  columns: Column<T>[];
  frozenColumnsCount: number;
}

export function Header<T>({ columns, frozenColumnsCount }: HeaderProps<T>) {
  const frozenColumns = columns.filter((c, i) => i < frozenColumnsCount);
  const scrollableColumns = columns.slice(frozenColumnsCount);

  const cellStyle = {
    padding: '8px',
    fontWeight: 'bold',
    borderBottom: '2px solid #888',
    borderRight: '1px solid #ddd',
    background: '#eee',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } as React.CSSProperties;

  return (
    <div style={{ display: 'flex', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', position: 'sticky', left: 0, background: '#ddd', zIndex: 3, borderRight: '2px solid #aaa' }}>
        {frozenColumns.map(col => (
          <div
            key={String(col.key)}
            style={{ ...cellStyle, width: col.width ? (typeof col.width === 'number' ? `${col.width}px` : col.width) : 120 }}
          >
            {col.title}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {scrollableColumns.map(col => (
          <div
            key={String(col.key)}
            style={{ ...cellStyle, width: col.width ? (typeof col.width === 'number' ? `${col.width}px` : col.width) : 120 }}
          >
            {col.title}
          </div>
        ))}
      </div>
    </div>
  );
}
