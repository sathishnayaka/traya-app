export function exportToCSV<T>(data: T[], columns: { key: keyof T; title: string }[], filename = 'export.csv') {
  const header = columns.map(c => `"${c.title}"`).join(",");
  const rows = data.map(row =>
    columns.map(c => {
      const val = row[c.key];
      if (typeof val === 'string') return `"${val.replace(/"/g, '""')}"`;
      return val;
    }).join(",")
  );

  const csvContent = [header, ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}