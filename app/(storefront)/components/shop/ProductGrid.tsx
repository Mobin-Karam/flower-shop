"use client";

import { Product } from "@/lib/types";
import ProductCard from "@/app/components/product-card";
import { ViewMode } from "./SortBar";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  viewMode: ViewMode;
  source?: string;
};

const GRID_CLASSES: Record<ViewMode, string> = {
  "grid-4": "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  "grid-3": "grid-cols-2 md:grid-cols-3",
  "grid-2": "grid-cols-2",
  list: "grid-cols-1",
};

export default function ProductGrid({ products, viewMode, source }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="text-4xl">🔍</div>
        <p className="text-sm text-muted-foreground">محصولی یافت نشد</p>
        <p className="text-xs text-muted-foreground/60">
          فیلترها را تغییر دهید یا عبارت جستجو را اصلاح کنید
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-3",
        GRID_CLASSES[viewMode],
        viewMode === "list" && "space-y-3"
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          source={source}
        />
      ))}
    </div>
  );
}
