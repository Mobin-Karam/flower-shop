"use client";

import { Product } from "@/lib/types";
import React, { useMemo, Suspense, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* ============================================
   TYPE DEFINITIONS
   ============================================ */



export interface DealsRailProps {
  products: Product[];
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
  renderProductCard: (product: Product) => ReactNode;
  maxProducts?: number;
  i18n?: {
    noDeals?: string;
    viewAll?: string;
    sortBy?: string;
  };
  emptyState?: ReactNode;
  className?: string;
  showViewAllButton?: boolean;
}

/* ============================================
   SKELETON LOADER (ANIMATED)
   ============================================ */

function DealsRailSkeleton() {
  return (
    <div className="space-y-5">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton height={28} width={200} className="rounded-lg" />
        <Skeleton height={16} width={120} className="rounded-lg" />
      </div>

      {/* Grid skeleton with staggered effect */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="group animate-pulse"
            style={{
              animationDelay: `${i * 50}ms`,
            }}
          >
            <div className="rounded-xl border border-border/40 p-3 space-y-3">
              {/* Image skeleton */}
              <div className="relative aspect-square">
                <Skeleton
                  height="100%"
                  className="rounded-lg w-full"
                  baseColor="var(--muted)"
                  highlightColor="var(--muted-foreground)"
                />
              </div>

              {/* Content skeleton */}
              <div className="space-y-2">
                <Skeleton height={14} width="85%" />
                <Skeleton height={12} width="70%" />
                <Skeleton height={16} width="50%" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   DISCOUNT BADGE (ANIMATED)
   ============================================ */

interface DiscountBadgeProps {
  discountPercent: number;
}

function DiscountBadge({ discountPercent }: DiscountBadgeProps) {
  return (
    <div
      className="absolute top-2 right-2 z-10 
        bg-gradient-to-br from-primary to-accent 
        text-primary-foreground text-xs font-semibold
        px-2.5 py-1.5 rounded-full
        shadow-md transform transition-all duration-300
        group-hover:scale-110 group-hover:shadow-lg
        animate-in fade-in slide-in-from-top-2 duration-500"
      aria-label={`${discountPercent}% off`}
    >
      <span className="flex items-center gap-0.5">
        <span className="text-xs">−</span>
        <span>{discountPercent}%</span>
      </span>
    </div>
  );
}

/* ============================================
   EMPTY STATE
   ============================================ */

interface EmptyStateProps {
  message: string;
}

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div
      className="py-12 px-4 text-center
        rounded-2xl border border-border/50 
        bg-gradient-to-br from-muted/50 to-muted/20"
    >
      <div className="space-y-3">
        {/* Icon placeholder */}
        <div className="flex justify-center mb-4">
          <div
            className="w-12 h-12 rounded-full 
            bg-muted flex items-center justify-center
            text-muted-foreground text-xl"
          >
            ✨
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-medium">{message}</p>
        <p className="text-xs text-muted-foreground/60">
          Check back soon for amazing deals
        </p>
      </div>
    </div>
  );
}

/* ============================================
   MAIN CONTENT
   ============================================ */

function DealsRailContent({
  products,
  title,
  subtitle,
  renderProductCard,
  onViewAll,
  i18n = {},
  emptyState,
  showViewAllButton = false,
}: DealsRailProps) {
  const defaultI18n = {
    noDeals: "No special deals available right now",
    viewAll: "View All Deals",
    ...i18n,
  };

  const filteredProducts = useMemo(() => {
    return (products ?? [])
      .filter((p) => (p.discountPercent ?? 0) > 0)
      .sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0))
      .slice(0, 8);
  }, [products]);

  if (filteredProducts.length === 0) {
    return emptyState || <EmptyState message={defaultI18n.noDeals} />;
  }

  return (
    <section className="space-y-5">
      {/* HEADER WITH GRADIENT UNDERLINE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2
              className="text-xl sm:text-2xl font-semibold tracking-tight
              text-foreground"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Optional view all button */}
          {showViewAllButton && onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs sm:text-sm font-medium text-primary
              hover:text-accent transition-colors duration-200
              flex items-center gap-1 group"
              aria-label={defaultI18n.viewAll}
            >
              {defaultI18n.viewAll}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Gradient underline */}
        <div
          className="h-1 w-12 rounded-full 
          bg-gradient-to-r from-primary to-accent"
        />
      </div>

      {/* PRODUCTS GRID */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4
        animate-in fade-in duration-500"
      >
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{
              animationDelay: `${index * 75}ms`,
              animationFillMode: "both",
            }}
          >
            {/* Card wrapper with hover effects */}
            <div
              className="h-full rounded-xl border border-border/40
              bg-card shadow-sm transition-all duration-300 overflow-hidden
              hover:shadow-md hover:border-primary/30
              hover:bg-white dark:hover:bg-slate-800/50"
            >
              {/* Product card content */}
              {renderProductCard(product)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================
   MAIN COMPONENT WITH SUSPENSE
   ============================================ */

export default function DealsRail({
  products,
  title,
  subtitle,
  onViewAll,
  renderProductCard,
  maxProducts = 8,
  i18n,
  emptyState,
  className = "",
  showViewAllButton = false,
}: DealsRailProps) {
  return (
    <div className={`w-full ${className}`}>
      <Suspense fallback={<DealsRailSkeleton />}>
        <DealsRailContent
          products={products}
          title={title}
          subtitle={subtitle}
          renderProductCard={renderProductCard}
          onViewAll={onViewAll}
          maxProducts={maxProducts}
          i18n={i18n}
          emptyState={emptyState}
          showViewAllButton={showViewAllButton}
        />
      </Suspense>
    </div>
  );
}

/* ============================================
   EXPORT HELPERS
   ============================================ */

export { DiscountBadge, EmptyState };
