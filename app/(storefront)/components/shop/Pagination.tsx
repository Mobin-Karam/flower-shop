"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: number;
  onPerPageChange: (n: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 2;

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
      {/* Per page selector */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>در هر صفحه:</span>
        {[12, 24, 48].map((n) => (
          <button
            key={n}
            onClick={() => onPerPageChange(n)}
            className={cn(
              "px-2 py-0.5 rounded text-sm transition",
              perPage === n
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <ChevronRight size={16} />
        </button>

        {getPages().map((page, i) =>
          page === "..." ? (
            <span key={`dots-${i}`} className="px-1 text-muted-foreground">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-8 h-8 rounded-lg text-sm font-medium transition",
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <ChevronLeft size={16} />
        </button>
      </div>
    </div>
  );
}
