import React, { JSX } from "react";

interface CellProps<T> {
  value: any;
  row: T;
  column: {
    key: keyof T;
    width?: number | string;
    render?: (value: any, row: T) => React.ReactNode;
  };
}

export const Cell = React.memo(function Cell<T>({ value, row, column }: CellProps<T>) {
  return (
    <div
      style={{
        flex: column.width ? "none" : 1,
        width: typeof column.width === "number" ? `${column.width}px` : column.width,
        padding: "8px",
        borderBottom: "1px solid #eee",
        borderRight: "1px solid #ddd",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={typeof value === "string" ? value : undefined}
    >
      {column.render ? column.render(value, row) : value}
    </div>
  );
}) as <T>(props: CellProps<T>) => JSX.Element;