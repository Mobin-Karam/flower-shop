"use client";

import { cn } from "@/lib/utils";

const COLLECTIONS = [
  { value: "all", label: "همه" },
  { value: "new", label: "جدیدها" },
  { value: "featured", label: "ویژه" },
  { value: "popular", label: "محبوب" },
  { value: "bestseller", label: "پرفروش" },
  { value: "sale", label: "تخفیف‌دار" },
  { value: "trending", label: "ترند" },
];

type Props = {
  active: string;
  onChange: (value: string) => void;
};

export default function CollectionTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
      {COLLECTIONS.map((col) => (
        <button
          key={col.value}
          onClick={() => onChange(col.value)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border",
            active === col.value
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card text-foreground border-border hover:border-primary/40"
          )}
        >
          {col.label}
        </button>
      ))}
    </div>
  );
}

export { COLLECTIONS };
