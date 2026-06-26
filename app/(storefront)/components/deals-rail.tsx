"use client";

import { useMemo, Suspense } from "react";
import Skeleton from "react-loading-skeleton";

import { uiProducts } from "@/app/data/products.ui";
import ProductCardHome from "@/app/components/product-card-home";

function DealsRailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton height={20} width={180} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border p-2 space-y-2"
          >
            <Skeleton height={120} className="rounded-lg" />
            <Skeleton height={14} width="85%" />
            <Skeleton height={12} width="65%" />
            <Skeleton height={16} width="45%" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DealsRailContent({ title }: { title: string }) {
  const products = useMemo(() => {
    return uiProducts
      .filter((p) => (p.discountPercent ?? 0) > 0)
      .sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0))
      .slice(0, 8);
  }, [uiProducts]);

  if (products.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-6">
        فعلاً پیشنهاد ویژه‌ای موجود نیست
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

        <div className="text-xs text-muted-foreground">تخفیف‌دارها</div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((product) => (
          <ProductCardHome key={product.id} product={product as any} />
        ))}
      </div>
    </section>
  );
}

export default function DealsRail({ title }: { title: string }) {
  return (
    <Suspense fallback={<DealsRailSkeleton />}>
      <DealsRailContent title={title} />
    </Suspense>
  );
}
