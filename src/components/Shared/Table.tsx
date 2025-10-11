import React  from "react";

interface Column<T> {
  key: keyof T;
  header: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export const SimpleTable = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((col) => (
            <th
              key={col.key as string}
              className="border px-4 py-2 text-left text-gray-700"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center px-4 py-2">
              No data available
            </td>
          </tr>
        ) : (
          data.map((row:any, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key as string} className="px-4 py-2">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
