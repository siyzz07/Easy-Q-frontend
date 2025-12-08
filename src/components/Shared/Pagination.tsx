import React, { type FC } from "react";


export interface PaginationProps {
  page: number;                  
  totalPages: number;               
  onPageChange: (page: number) => void; 
  maxButtons?: number;              
}


const Pagination:FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  maxButtons = 5,   
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];

  let start = Math.max(1, page - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center  justify-center gap-2 mt-10">

      {/* Prev Button */}
      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {start > 1 && (
        <button
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      )}

      {start > 2 && <span className="px-2">...</span>}

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded ${
            num === page
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {num}
        </button>
      ))}

      {end < totalPages - 1 && <span className="px-2">...</span>}

      {end < totalPages && (
        <button
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
