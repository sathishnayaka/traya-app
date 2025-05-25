import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  UIEvent,
} from "react";
import { Column, Filter } from "./types";
import { useVirtualScroll } from "../../hooks/useVirtualScroll";
import { exportToCSV } from "../../utils/csvExport";

interface DataGridProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  rowHeight?: number;
  height?: number;
}

export function DataGrid<T extends object>({
  columns,
  data,
  rowHeight = 35,
  height = 400,
}: DataGridProps<T>) {
  const frozenColumns = useMemo(() => columns.filter((c) => c.frozen), [columns]);
  const scrollableColumns = useMemo(() => columns.filter((c) => !c.frozen), [columns]);

  const [filters, setFilters] = useState<Filter[]>([]);

  const filteredData = useMemo(() => {
    if (!filters.length) return data;
    return data.filter((row) =>
      filters.every((f) => {
        const val = String(row[f.key as keyof T] ?? "").toLowerCase();
        return val.includes(f.value.toLowerCase());
      })
    );
  }, [data, filters]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { startIndex, endIndex, onScroll } = useVirtualScroll({
    rowHeight,
    totalCount: filteredData.length,
    containerHeight: height,
  });

  const frozenBodyRef = useRef<HTMLTableSectionElement>(null);
  const scrollableBodyRef = useRef<HTMLTableSectionElement>(null);

  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;
      if (frozenBodyRef.current) {
        frozenBodyRef.current.parentElement!.scrollTop = scrollTop;
      }
      onScroll(e);
    },
    [onScroll]
  );

  const visibleRows = useMemo(() => {
    return filteredData.slice(startIndex, endIndex + 1);
  }, [filteredData, startIndex, endIndex]);

  const onExportCSV = () => exportToCSV(filteredData, columns);

  const getColWidth = (col: Column<T>) =>
    typeof col.width === "number" ? `${col.width}px` : "150px";

  const spacerHeightTop = startIndex * rowHeight;
  const spacerHeightBottom = (filteredData.length - endIndex - 1) * rowHeight;

  return (
    <div style={{ fontFamily: "sans-serif", overflow: "hidden", border: "1px solid #ccc" }}>
      <div style={{ padding: 8 }}>
        <button onClick={onExportCSV}>Export CSV</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: 8 }}>
        {columns
          .filter((col) => col.filterable)
          .map((col) => {
            const existing = filters.find((f) => f.key === col.key);
            return (
              <div key={String(col.key)}>
                <label style={{ display: "block", fontSize: 12 }}>{col.title}</label>
                <input
                  style={{
                    padding: "4px 8px",
                    width: 120,
                    fontSize: 14,
                  }}
                  value={existing?.value || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFilters((prev) => {
                      const updated = prev.filter((f) => f.key !== col.key);
                      if (!val.trim()) return updated;
                      return [...updated, { key: String(col.key), value: val }];
                    });
                  }}
                  placeholder={`Filter ${col.title}`}
                />
              </div>
            );
          })}
      </div>

      <div style={{ display: "flex", height, borderTop: "1px solid #ccc" }} ref={containerRef}>
        {/* Frozen table */}
        <div style={{ overflow: "hidden", flex: "0 0 auto" }}>
          <table
            style={{
              borderCollapse: "collapse",
              tableLayout: "fixed",
              width: frozenColumns.reduce((sum, col) => sum + (col.width || 150), 0),
            }}
          >
            <thead style={{ background: "#f5f5f5" }}>
              <tr>
                {frozenColumns.map((col) => (
                  <th
                    key={String(col.key)}
                    style={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "left",
                      padding: 8,
                      width: getColWidth(col),
                    }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody ref={frozenBodyRef} style={{ display: "block", height: height - 40, overflow: "hidden" }}>
              <tr style={{ height: spacerHeightTop }} />
              {visibleRows.map((row, i) => (
                <tr key={startIndex + i} style={{ height: rowHeight }}>
                  {frozenColumns.map((col) => {
                    const key = col.key as keyof T;
                    const value = row[key];
                    return (
                      <td
                        key={String(col.key)}
                        style={{
                          padding: "6px 8px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          borderBottom: "1px solid #eee",
                          width: getColWidth(col),
                        }}
                        title={String(value)}
                      >
                        {col.render ? col.render(value, row) : (value as React.ReactNode)}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr style={{ height: spacerHeightBottom }} />
            </tbody>
          </table>
        </div>

        {/* Scrollable table */}
        <div style={{ overflow: "auto", flex: 1 }} onScroll={handleScroll}>
          <table
            style={{
              borderCollapse: "collapse",
              tableLayout: "fixed",
              width: scrollableColumns.reduce((sum, col) => sum + (col.width || 150), 0),
            }}
          >
            <thead style={{ background: "#f5f5f5", position: "sticky", top: 0, zIndex: 1 }}>
              <tr>
                {scrollableColumns.map((col) => (
                  <th
                    key={String(col.key)}
                    style={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "left",
                      padding: 8,
                      width: getColWidth(col),
                    }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody ref={scrollableBodyRef}>
              <tr style={{ height: spacerHeightTop }} />
              {visibleRows.map((row, i) => (
                <tr key={startIndex + i} style={{ height: rowHeight }}>
                  {scrollableColumns.map((col) => {
                    const key = col.key as keyof T;
                    const value = row[key];
                    return (
                      <td
                        key={String(col.key)}
                        style={{
                          padding: "6px 8px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          borderBottom: "1px solid #eee",
                          width: getColWidth(col),
                        }}
                        title={String(value)}
                      >
                        {col.render ? col.render(value, row) : (value as React.ReactNode)}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr style={{ height: spacerHeightBottom }} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}