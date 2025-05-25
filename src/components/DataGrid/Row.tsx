import React from "react";
import { Column } from "./types";
import { Cell } from "./Cell";

interface RowProps<T> {
  row: T;
  columns: Column<T>[];
  style?: React.CSSProperties;
}

function RowComponent<T>({ row, columns, style }: RowProps<T>) {
  const frozenColumns = columns.filter(col => col.frozen);
  const scrollableColumns = columns.filter(col => !col.frozen);

  return (
    <div style={{ ...style, display: "flex", width: "100%", boxSizing: "border-box" }}>
      <div
        style={{
          display: "flex",
          position: "sticky",
          left: 0,
          background: "#fafafa",
          zIndex: 2,
          borderRight: "2px solid #ccc",
        }}
      >
        {frozenColumns.map((col) => (
          <Cell<T> key={String(col.key)} value={row[col.key]} row={row} column={col} />
        ))}
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {scrollableColumns.map((col) => (
          <Cell<T> key={String(col.key)} value={row[col.key]} row={row} column={col} />
        ))}
      </div>
    </div>
  );
}

// Memoize with React.memo, preserving generic type:
export const Row = React.memo(RowComponent) as typeof RowComponent;