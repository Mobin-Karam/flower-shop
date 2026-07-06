"use client";

import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Clock,
  Star,
  Percent,
  TrendingUp,
  LayoutGrid,
  LayoutList,
  AlignJustify,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SortOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

export const SORT_OPTIONS: SortOption[] = [
  { value: "default", label: "پیش‌فرض", icon: <AlignJustify size={14} /> },
  { value: "newest", label: "جدیدترین", icon: <Clock size={14} /> },
  { value: "popular", label: "محبوب‌ترین", icon: <TrendingUp size={14} /> },
  { value: "rating", label: "امتیاز", icon: <Star size={14} /> },
  { value: "price-low", label: "ارزان‌ترین", icon: <ArrowUpWideNarrow size={14} /> },
  { value: "price-high", label: "گران‌ترین", icon: <ArrowDownWideNarrow size={14} /> },
  { value: "discount", label: "بیشترین تخفیف", icon: <Percent size={14} /> },
];

export type ViewMode = "grid-4" | "grid-3" | "grid-2" | "list";

type Props = {
  sort: string;
  onSortChange: (sort: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  productCount: number;
};

export default function SortBar({
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  productCount,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <p className="text-sm text-muted-foreground">
        {productCount} محصول
      </p>

      <div className="flex items-center gap-2">
        {/* View mode toggles */}
        <div className="hidden md:flex items-center border border-border rounded-lg overflow-hidden">
          {([
            { mode: "grid-4" as const, icon: <LayoutGrid size={14} /> },
            { mode: "grid-3" as const, icon: <LayoutGrid size={14} /> },
            { mode: "grid-2" as const, icon: <LayoutGrid size={14} /> },
            { mode: "list" as const, icon: <LayoutList size={14} /> },
          ]).map(({ mode, icon }) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={cn(
                "p-2 transition",
                viewMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              )}
              title={mode}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-border bg-card rounded-lg px-3 py-1.5 text-sm text-foreground cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
