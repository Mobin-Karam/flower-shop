"use client";

import { useMemo } from "react";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, string> = {
  "دمنوش": "🍵",
  "کفش سنتی": "👟",
  "صنایع دستی": "🎨",
  "عسل و محصولات زنبور": "🍯",
};

type Props = {
  products: Product[];
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
};

export default function CategoryBar({
  products,
  activeCategory,
  onSelect,
}: Props) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => {
      if (p.category) {
        counts.set(p.category, (counts.get(p.category) || 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({
        name,
        count,
        icon: CATEGORY_ICONS[name] || "📦",
      }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  if (categories.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {/* All category */}
        <button
          onClick={() => onSelect(null)}
          className={cn(
            "flex flex-col items-center gap-1.5 flex-shrink-0 px-4 py-3 rounded-xl border transition-all",
            activeCategory === null
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card text-foreground border-border hover:border-primary/40"
          )}
        >
          <span className="text-2xl">🏪</span>
          <span className="text-xs font-medium whitespace-nowrap">همه</span>
          <span className="text-[10px] opacity-70">{products.length}</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() =>
              onSelect(activeCategory === cat.name ? null : cat.name)
            }
            className={cn(
              "flex flex-col items-center gap-1.5 flex-shrink-0 px-4 py-3 rounded-xl border transition-all",
              activeCategory === cat.name
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-foreground border-border hover:border-primary/40"
            )}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-xs font-medium whitespace-nowrap">
              {cat.name}
            </span>
            <span className="text-[10px] opacity-70">{cat.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
