import React, { useState } from "react";
import { FileText, CircleCheckBig, CircleX, Edit, MoreVertical, Ban, Unlock, ShieldCheck, XCircle } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

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
  onReject,
  onVerified,
  onEditAction,
}) => {
  const navigate = useNavigate();


  const [imagePopup, setImagePopup] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const sortedColumns = [
    ...columns.filter(
      (col) => !["action", "view", "edit", "verification"].includes(col.key.toLowerCase())
    ),
    ...columns.filter((col) => col.key.toLowerCase() === "view"),
    ...columns.filter((col) => col.key.toLowerCase() === "edit"),
    ...columns.filter((col) => col.key.toLowerCase() === "verification"),
    ...columns.filter((col) => col.key.toLowerCase() === "action"),
  ];

  const onClickView = (route: string) => {
    navigate(`/vendor/staffs/${route}`);
  };

  return (
    <>
      <AnimatePresence>
        {imagePopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative border border-white/20"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Document Verification</h3>
                <button
                  onClick={() => {
                    setImagePopup(false);
                    setImage("");
                  }}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="p-8">
                <div className="rounded-3xl overflow-hidden shadow-inner bg-gray-50">
                  <AspectRatio ratio={16 / 10}>
                    <img
                      src={image}
                      alt="Proof"
                      className="h-full w-full object-contain"
                    />
                  </AspectRatio>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm border-separate border-spacing-0">
        <UITable className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-50/50 border-b border-gray-100 hover:bg-gray-50/50">
              {showIndex && (
                <TableHead className="w-16 px-6 py-5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  REF
                </TableHead>
              )}
              {sortedColumns.map((col) => (
                <TableHead
                  key={col.key}
                  className={`px-6 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 text-${col.align || "left"}`}
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
                  className="group hover:bg-blue-50/30 transition-all duration-300 border-b border-gray-50 last:border-0"
                >
                  {showIndex && (
                    <TableCell className="px-6 py-5 text-center">
                      <span className="text-xs font-bold text-gray-300 group-hover:text-blue-600 transition-colors">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                    </TableCell>
                  )}

                  {sortedColumns.map((col) => {
                    const value = row[col.key];

                    // Status Badge
                    if (typeof value === "boolean" || col.key.toLowerCase().includes("active")) {
                      const isActive = value === true || value === "true";
                      return (
                        <TableCell key={col.key} className="px-6 py-5">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            isActive ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100" : "bg-rose-50 text-rose-600 ring-1 ring-rose-100"
                          }`}>
                            <div className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-rose-500"}`} />
                            {isActive ? "Active" : "Inactive"}
                          </div>
                        </TableCell>
                      );
                    }

                    // Action Button (Block/Unblock)
                    if (col.key.toLowerCase().includes("action")) {
                      const isActive = row["isActive"];
                      return (
                        <TableCell key={col.key} className="px-6 py-5 text-right">
                          <Button
                            variant="ghost"
                            onClick={() => onAction?.(row)}
                            className={`h-9 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                              isActive 
                                ? "text-rose-600 hover:bg-rose-50 hover:text-rose-700" 
                                : "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                            }`}
                          >
                            {isActive ? (
                              <><Ban size={14} className="mr-2" /> Block</>
                            ) : (
                              <><Unlock size={14} className="mr-2" /> Unblock</>
                            )}
                          </Button>
                        </TableCell>
                      );
                    }

                    // View Action
                    if (col.key.toLowerCase().includes("view")) {
                      return (
                        <TableCell key={col.key} className="px-6 py-5">
                          <button
                            onClick={() => onClickView?.(row._id)}
                            className="flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <FileText size={16} />
                            Details
                          </button>
                        </TableCell>
                      );
                    }

                    // Proof Action
                    if (col.key.toLowerCase().includes("proof")) {
                      return (
                        <TableCell key={col.key} className="px-6 py-5">
                          <button
                            onClick={() => {
                              setImagePopup(true);
                              setImage(row.proofImage);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-[12px] font-bold transition-all border border-gray-100"
                          >
                            <FileText size={14} />
                            View Proof
                          </button>
                        </TableCell>
                      );
                    }

                    // Edit Action
                    if (col.key.toLowerCase().includes("edit")) {
                      return (
                        <TableCell key={col.key} className="px-6 py-5">
                          <button
                            onClick={() => onEditAction?.(row)}
                            className="h-10 w-10 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all border border-blue-100/50 shadow-sm"
                          >
                            <Edit size={16} />
                          </button>
                        </TableCell>
                      );
                    }

                    // Verification (Verify/Reject)
                    if (col.key.toLowerCase().includes("verification")) {
                      return (
                        <TableCell key={col.key} className="px-6 py-5">
                          <div className="flex gap-2">
                            <button
                              onClick={() => onVerified?.(row)}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[12px] font-bold transition-all shadow-lg shadow-emerald-600/20"
                            >
                              <ShieldCheck size={14} />
                              Verify
                            </button>
                            <button
                              onClick={() => onReject?.(row)}
                              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-rose-50 text-rose-600 rounded-xl text-[12px] font-bold transition-all border border-rose-100"
                            >
                              <XCircle size={14} />
                              Reject
                            </button>
                          </div>
                        </TableCell>
                      );
                    }

                    // Default Cell
                    return (
                      <TableCell
                        key={col.key}
                        className={`px-6 py-5 text-[14px] font-medium text-gray-600 text-${col.align || "left"}`}
                      >
                        <span className="block truncate" style={{ maxWidth: col.maxWidth || "220px" }}>
                          {value ?? "--"}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={sortedColumns.length + (showIndex ? 1 : 0)}
                  className="py-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-20 w-20 rounded-[2rem] bg-gray-50 flex items-center justify-center text-gray-200">
                       <FileText size={40} />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">{emptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {caption && (
            <TableCaption className="py-6 text-[11px] font-bold text-gray-300 uppercase tracking-[0.3em]">
              {caption}
            </TableCaption>
          )}
        </UITable>
      </div>
    </>
  );
};

export default ReusableTable;
