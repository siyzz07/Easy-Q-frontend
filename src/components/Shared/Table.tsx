import React from "react";
import {
  Table as UITable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

interface IColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface ReusableTableProps {
  caption?: string;
  columns: IColumn[];
  data: Record<string, any>[];
  emptyMessage?: string;
  showIndex?: boolean;
  onAction?: (row: Record<string, any>) => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  caption,
  columns,
  data,
  emptyMessage = "No data available.",
  showIndex = true,
  onAction,
}) => {
  // Move "action" column to the end (if it exists)
  const sortedColumns = [
    ...columns.filter((col) => !col.key.toLowerCase().includes("action")),
    ...columns.filter((col) => col.key.toLowerCase().includes("action")),
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <UITable className="w-full border-collapse text-sm text-gray-700">
        {caption && (
          <TableCaption className="text-gray-500 text-sm py-3 italic">
            {caption}
          </TableCaption>
        )}

        {/* --- Header --- */}
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            {showIndex && (
              <TableHead className="px-4 py-3 text-center w-12 uppercase text-xs font-semibold text-gray-700">
                #
              </TableHead>
            )}
            {sortedColumns.map((col) => (
              <TableHead
                key={col.key}
                className={`px-4 py-3 font-semibold text-gray-700 text-${col.align || "left"} uppercase tracking-wide text-xs`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>


        <TableBody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <TableRow
                key={idx}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                {showIndex && (
                  <TableCell className="px-4 py-3 text-center text-gray-600 font-medium">
                    {idx + 1}
                  </TableCell>
                )}

                {sortedColumns.map((col) => {
                  const value = row[col.key];

                  if (typeof value === "boolean" || col.key.toLowerCase().includes("active")) {
                    return (
                      <TableCell
                        key={col.key}
                        className="px-4 py-3 text-center"
                      >
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            value
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {value ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                    );
                  }

                  if (col.key.toLowerCase().includes("action")) {
                    const isActive = row["isActive"];
                    return (
                      <TableCell key={col.key} className="px-4 py-3 text-center">
                        <Button
                          onClick={() => onAction?. (row)}
                          className={`text-xs px-3 py-1 ${
                            isActive
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white`}
                        >
                          {isActive ? "Block" : "Unblock"}
                        </Button>
                      </TableCell>
                    );
                  }

               
                  return (
                    <TableCell
                      key={col.key}
                      className={`px-4 py-3 text-${col.align || "left"} whitespace-nowrap`}
                    >
                      {value ?? "--"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={sortedColumns.length + (showIndex ? 1 : 0)}
                className="text-center text-gray-500 py-6"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </UITable>
    </div>
  );
};

export default ReusableTable;
