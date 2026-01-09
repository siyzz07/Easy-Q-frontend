type ExportColumn<T> = {
  header: string;
  accessor: (row: T) => string | number;
};

export function exportToCSV<T>(
  data: T[],
  columns: ExportColumn<T>[],
  fileName: string
) {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  const headers = columns.map(col => col.header);

  const rows = data.map(row =>
    columns.map(col => String(col.accessor(row)))
  );

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map(e => e.join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = `${fileName}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
