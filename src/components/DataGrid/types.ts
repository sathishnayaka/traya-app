export interface Column<T = any> {
  key: keyof T;
  title: string;
  width?: number; // fixed width in px or %
  frozen?: boolean; // freeze first N columns support
  render?: (value: any, row: T) => React.ReactNode;
  filterable?: boolean;
}

export interface Filter {
  key: string;
  value: string;
}
