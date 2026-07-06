"use client";

import { useMemo, useState, useEffect, useCallback } from "react";

import { products } from "@/lib/products";
import { analytics } from "@/lib/analytics";
import { useRecentlyViewed } from "@/lib/use-recently-viewed";
import { ViewMode } from "../components/shop/SortBar";

import SearchBar from "../components/shop/SearchBar";
import CategoryBar from "../components/shop/CategoryBar";
import CollectionTabs from "../components/shop/CollectionTabs";
import FilterSidebar, {
  FilterState,
  defaultFilters,
} from "../components/shop/FilterSidebar";
import MobileFilterSheet from "../components/shop/MobileFilterSheet";
import SortBar from "../components/shop/SortBar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";
import RecentlyViewed from "../components/shop/RecentlyViewed";
import Recommended from "../components/shop/Recommended";

/* ================= STORAGE KEYS ================= */
const VIEW_MODE_KEY = "gulify-shop-view";
const PER_PAGE_KEY = "gulify-shop-per-page";

/* ================= MAIN ================= */
export default function ShopPage() {
  /* ---- State ---- */
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  /* ---- Local state ---- */
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [viewMode, setViewMode] = useState<ViewMode>("grid-4");
  const [perPage, setPerPage] = useState(12);

  /* ---- Load persisted preferences ---- */
  useEffect(() => {
    try {
      const vm = localStorage.getItem(VIEW_MODE_KEY);
      if (vm) setViewMode(vm as ViewMode);
      const pp = localStorage.getItem(PER_PAGE_KEY);
      if (pp) setPerPage(Number(pp));
    } catch {}
  }, []);

  /* ---- Recently viewed ---- */
  const { items: recentItems } = useRecentlyViewed();

  /* ---- View mode change ---- */
  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem(VIEW_MODE_KEY, mode);
    } catch {}
  }, []);

  /* ---- Per page change ---- */
  const handlePerPageChange = useCallback((n: number) => {
    setPerPage(n);
    setPage(1);
    try {
      localStorage.setItem(PER_PAGE_KEY, String(n));
    } catch {}
  }, []);

  /* ---- Active filter count ---- */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.brands.length > 0) count++;
    if (filters.tags.length > 0) count++;
    if (filters.rating > 0) count++;
    if (filters.inStock) count++;
    if (filters.discountOnly) count++;
    if (filters.categories.length > 0) count++;
    if (
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < Infinity
    )
      count++;
    return count;
  }, [filters]);

  /* ---- FILTER + SORT + SEARCH ---- */
  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => {
        const fields = [
          p.name,
          p.description,
          p.category,
          p.subcategory,
          p.brand,
          p.sku,
          p.barcode,
          ...(p.tags || []),
        ]
          .join(" ")
          .toLowerCase();
        return fields.includes(q);
      });
    }

    // Category
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Collection
    switch (collection) {
      case "new":
        result = result.filter((p) => p.isNew);
        break;
      case "featured":
        result = result.filter((p) => p.isFeatured);
        break;
      case "popular":
        result = result.sort(
          (a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0)
        );
        break;
      case "bestseller":
        result = result.filter((p) => p.isBestseller);
        break;
      case "sale":
        result = result.filter(
          (p) => (p.discountPercent ?? 0) > 0
        );
        break;
      case "trending":
        result = result.sort(
          (a, b) => (b.purchaseCount ?? 0) - (a.purchaseCount ?? 0)
        );
        break;
    }

    // Filters
    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.includes(p.category || "")
      );
    }
    if (filters.brands.length > 0) {
      result = result.filter((p) =>
        filters.brands.includes(p.brand || "")
      );
    }
    if (filters.tags.length > 0) {
      result = result.filter((p) =>
        filters.tags.some((t) => p.tags?.includes(t))
      );
    }
    if (filters.rating > 0) {
      result = result.filter((p) => (p.rating ?? 0) >= filters.rating);
    }
    if (filters.inStock) {
      result = result.filter(
        (p) => p.inStock === true && (p.stockQuantity ?? 0) > 0
      );
    }
    if (filters.discountOnly) {
      result = result.filter((p) => (p.discountPercent ?? 0) > 0);
    }
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity) {
      result = result.filter(
        (p) =>
          p.price >= filters.priceRange[0] &&
          p.price <= filters.priceRange[1]
      );
    }

    // Sort
    switch (sort) {
      case "newest":
        result.sort(
          (a, b) =>
            (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
        );
        break;
      case "popular":
        result.sort(
          (a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0)
        );
        break;
      case "rating":
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        result.sort(
          (a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0)
        );
        break;
    }

    return result;
  }, [search, activeCategory, collection, filters, sort]);

  /* ---- Pagination ---- */
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  /* ---- Reset page on filter change ---- */
  useEffect(() => {
    setPage(1);
  }, [search, activeCategory, collection, filters, sort]);

  /* ---- Track sort usage ---- */
  useEffect(() => {
    if (sort !== "default") analytics.sort(sort);
  }, [sort]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===== SEARCH ===== */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-3">
          <SearchBar
            products={products}
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>

      <div className="container-custom py-4 space-y-4">
        {/* ===== CATEGORIES ===== */}
        <CategoryBar
          products={products}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* ===== COLLECTION TABS ===== */}
        <CollectionTabs active={collection} onChange={setCollection} />

        {/* ===== MAIN LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* SIDEBAR (desktop) */}
          <div className="hidden lg:block sticky top-32 h-fit">
            <FilterSidebar
              products={products}
              filters={filters}
              onChange={setFilters}
            />
          </div>

          {/* MAIN CONTENT */}
          <main className="space-y-4">
            {/* SORT BAR + MOBILE FILTER */}
            <div className="flex items-center justify-between gap-2">
              <MobileFilterSheet
                products={products}
                filters={filters}
                onChange={setFilters}
                activeCount={activeFilterCount}
              />

              <div className="flex-1">
                <SortBar
                  sort={sort}
                  onSortChange={setSort}
                  viewMode={viewMode}
                  onViewModeChange={handleViewModeChange}
                  productCount={filtered.length}
                />
              </div>
            </div>

            {/* PRODUCT GRID */}
            <ProductGrid
              products={paginated}
              viewMode={viewMode}
              source="shop"
            />

            {/* PAGINATION */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              perPage={perPage}
              onPerPageChange={handlePerPageChange}
            />

            {/* RECENTLY VIEWED */}
            <div className="border-t border-border pt-6">
              <RecentlyViewed products={recentItems} />
            </div>

            {/* RECOMMENDED */}
            <div className="border-t border-border pt-6">
              <Recommended
                allProducts={products}
                currentProducts={paginated}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
