export interface Filter {
  key: string;
  value: string;
}

export function filterData<T>(
  data: T[],
  filters: Filter[]
): T[] {
  if (!filters.length) return data;
  return data.filter((row) =>
    filters.every((f) => {
      const cellValue = String(row[f.key as keyof T] ?? "").toLowerCase();
      return cellValue.includes(f.value.toLowerCase());
    })
  );
}
