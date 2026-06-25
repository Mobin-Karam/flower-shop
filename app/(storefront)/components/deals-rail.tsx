"use client";

import Skeleton from "react-loading-skeleton";
import { uiProducts } from "@/app/data/products.ui";
import ProductCardHome from "@/app/components/product-card-home";
import { useTransition } from "react";

function DealsRailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton height={22} width={180} />

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border border-border rounded-xl p-3 space-y-3"
          >
            <Skeleton height={120} borderRadius={12} />
            <Skeleton height={14} width="80%" />
            <Skeleton height={12} width="60%" />
            <Skeleton height={18} width="40%" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DealsRail({ title }: { title: string }) {
  const [isPending] = useTransition();

  const products = uiProducts.filter((p) => p.discountPercent > 0).slice(0, 8);

  if (isPending) {
    return <DealsRailSkeleton />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCardHome product={product as any} />
          </div>
        ))}
      </div>
    </div>
  );
}
