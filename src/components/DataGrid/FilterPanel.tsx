import React, { useState, useEffect } from "react";
import { Filter } from "./types";

interface FilterPanelProps {
  filters: Filter[];
  onChange: (filters: Filter[]) => void;
  columns: { key: string; title: string; filterable?: boolean }[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange, columns }) => {
  const [localFilters, setLocalFilters] = useState<Filter[]>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const onFilterChange = (key: string, value: string) => {
    const updated = localFilters.filter(f => f.key !== key);
    if (value) updated.push({ key, value });
    setLocalFilters(updated);
    onChange(updated);
  };

  return (
    <div style={{ padding: 8, backgroundColor: '#f1f1f1', borderBottom: '1px solid #ccc', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {columns.filter(c => c.filterable).map(col => {
        const filter = localFilters.find(f => f.key === col.key);
        return (
          <div key={col.key} style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
            <label style={{ fontSize: 12 }}>{col.title} filter:</label>
            <input
              type="text"
              value={filter?.value || ""}
              onChange={e => onFilterChange(col.key, e.target.value)}
              placeholder={`Filter ${col.title}`}
              style={{ padding: 4, fontSize: 14 }}
            />
          </div>
        );
      })}
    </div>
  );
};