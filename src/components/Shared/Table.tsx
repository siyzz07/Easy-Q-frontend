import React, { useState } from "react";
import { FileText, CircleCheckBig, CircleX, Edit } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface IColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  maxWidth?: string;
}

interface ReusableTableProps {
  caption?: string;
  columns: IColumn[];
  data: Record<string, any>[];
  emptyMessage?: string;
  showIndex?: boolean;
  onAction?: (row: Record<string, any>) => void;
  // onProofAction?: (row: Record<string, any>) => void;
  onReject?: (row: Record<string, any>) => void;
  onVerified?: (row: Record<string, any>) => void;
  onViewAction?: (row: Record<string, any>) => void;
  onEditAction?: (row: Record<string, any>) => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  caption,
  columns,
  data,
  emptyMessage = "No data available.",
  showIndex = true,
  onAction,
  // onProofAction,
  onReject,
  onVerified,
  onEditAction,
}) => {
  const navigatge = useNavigate();

  const [imagePopup, setImagePopup] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const sortedColumns = [
    ...columns.filter(
      (col) => !["action", "view", "edit"].includes(col.key.toLowerCase())
    ),
    ...columns.filter((col) => col.key.toLowerCase() === "view"),
    ...columns.filter((col) => col.key.toLowerCase() === "edit"),
    ...columns.filter((col) => col.key.toLowerCase() === "action"),
  ];

  const onClickView = (route: string) => {
    navigatge(`/vendor/staffs/${route}`);
  };

  const rejectVendor = (value: any) => {
    onReject?.(value);
  };

  const verifyVendor = (value: any) => {
    onVerified?.(value);
  };

  return (
    <>
      {imagePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-end mb-4 sticky top-0 bg-white z-10 pb-2 border-b">
              <button
                onClick={() => {
                  setImagePopup(false);
                  setImage("");
                }}
                className="text-gray-400 hover:text-gray-800 text-2xl font-bold leading-none"
              >
                ✕
              </button>
            </div>

            {/* Image container */}
            <div className="rounded-lg overflow-hidden">
              <AspectRatio ratio={16 / 10} className="bg-muted rounded-lg">
                <img
                  src={image}
                  alt="Proof"
                  className="h-full w-full object-contain rounded-lg max-h-[70vh]"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <UITable className="min-w-[600px] md:min-w-full border-collapse text-sm md:text-base text-gray-700">
          {/* Table caption */}
          {caption && (
            <TableCaption className="text-gray-500 text-sm py-3 italic">
              {caption}
            </TableCaption>
          )}

          {/* --- Header --- */}
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              {showIndex && (
                <TableHead className="px-2 sm:px-4 py-2 text-center w-12 uppercase text-xs sm:text-sm font-semibold text-gray-700">
                  #
                </TableHead>
              )}
              {sortedColumns.map((col) => (
                <TableHead
                  key={col.key}
                  className={`px-2 sm:px-4 py-2 font-semibold text-gray-700 text-${
                    col.align || "left"
                  } uppercase tracking-wide text-xs sm:text-sm`}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* --- Body --- */}
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  {/* Index column */}
                  {showIndex && (
                    <TableCell className="px-2 sm:px-4 py-2 text-center text-gray-600 font-medium">
                      {idx + 1}
                    </TableCell>
                  )}

                  {/* Data cells */}
                  {sortedColumns.map((col) => {
                    const value = row[col.key];

                    // Active / Inactive badge status
                    if (
                      typeof value === "boolean" ||
                      col.key.toLowerCase().includes("active")
                    ) {
                      return (
                        <TableCell
                          key={col.key}
                          className="px-2 sm:px-4 py-2 text-start"
                        >
                          <span
                            className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-full ${
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

                    // Action button (Block / Unblock)
                    if (col.key.toLowerCase().includes("action")) {
                      const isActive = row["isActive"];
                      return (
                        <TableCell
                          key={col.key}
                          className="px-4 py-3 text-center"
                        >
                          <Button
                            onClick={() => onAction?.(row)}
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

                    // View Details button in  the vendor side staff details
                    if (col.key.toLowerCase().includes("view")) {
                      return (
                        <TableCell
                          key={col.key}
                          className="px-2 sm:px-4 py-2 text-start"
                        >
                          <Button
                            onClick={() => onClickView?.(row._id)}
                            className="cursor-pointer text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 whitespace-nowrap"
                          >
                            <FileText size={14} />
                            View Details
                          </Button>
                        </TableCell>
                      );
                    }

                    // view proof button in adimin side see the vendor porrf
                    if (col.key.toLowerCase().includes("proof")) {
                      return (
                        <TableCell
                          key={col.key}
                          className="px-2 sm:px-4 py-2 text-start"
                        >
                          <Button
                            onClick={() => {
                              setImagePopup(true);
                              setImage(row.proofImage);
                            }}
                            className="cursor-pointer text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 whitespace-nowrap"
                          >
                            <FileText size={14} />
                            View Proof
                          </Button>
                        </TableCell>
                      );
                    }

                    // edit ----------------------
                    if (col.key.toLowerCase().includes("edit")) {
                      return (
                        <TableCell
                          key={col.key}
                          className="px-2 sm:px-4 py-2 text-start"
                        >
                          <Button
                            onClick={() => onEditAction?.(row)} 
                            className="text-xs sm:text-sm p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                          >
                            <Edit size={16} />
                            Edit
                          </Button>
                        </TableCell>
                      );
                    }

                    //  verified
                    if (col.key.toLowerCase().includes("verification")) {
                      return (
                        <TableCell
                          key={col.key}
                          className="px-2 sm:px-4 py-2 text-start flex gap-2"
                        >
                          <Button
                            onClick={() => verifyVendor?.(row)}
                            className="cursor-pointer text-xs sm:text-sm px-3 py-1 sm:py-1.5 bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 whitespace-nowrap"
                          >
                            <CircleCheckBig size={14} />
                            Verify
                          </Button>

                          <Button
                            onClick={() => rejectVendor?.(row)}
                            className="cursor-pointer text-xs sm:text-sm px-3 py-1 sm:py-1.5 bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 whitespace-nowrap"
                          >
                            <CircleX size={14} />
                            Reject
                          </Button>
                        </TableCell>
                      );
                    }

                    // Default text cell with truncation
                    return (
                      <TableCell
                        key={col.key}
                        title={value ?? "--"}
                        className={`px-2 sm:px-4 py-2 text-${
                          col.align || "left"
                        } truncate`}
                        style={{ maxWidth: col.maxWidth || "150px" }}
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
    </>
  );
};

export default ReusableTable;
