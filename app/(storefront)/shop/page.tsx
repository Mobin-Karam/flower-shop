"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/app/components/product-card";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<"default" | "cheap" | "expensive">(
    "default",
  );

  const tags = ["آرامش", "خواب", "انرژی", "گل رز", "دمنوش گیاهی"];

  /* ================= FILTER + SORT ================= */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = products.filter((p) => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q);

      const matchesTag =
        !activeTag || p.tags?.includes(activeTag) || p.name.includes(activeTag);

      return matchesSearch && matchesTag;
    });

    if (sort === "cheap") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "expensive") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, activeTag, sort]);

  const clearFilters = () => {
    setSearch("");
    setActiveTag(null);
    setSort("default");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ================= HEADER ================= */}
      <header className="border-b bg-white">
        <div className="container-custom py-5 space-y-1">
          <p className="text-[10px] tracking-[0.3em] text-[var(--primary)] uppercase">
            فروشگاه گلیفای
          </p>

          <h1 className="text-base font-semibold">نتایج جستجو</h1>

          <p className="text-xs text-muted-foreground">
            {filtered.length} محصول
          </p>
        </div>
      </header>

      {/* ================= MOBILE FILTER BAR ================= */}
      <div className="lg:hidden border-b bg-white">
        <div className="container-custom py-3 space-y-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveTag(null);
            }}
            placeholder="جستجو..."
            className="input"
          />

          <div className="flex gap-2 overflow-x-auto pb-1">
            {tags.map((tag) => {
              const active = activeTag === tag;

              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(active ? null : tag)}
                  className={`
                    whitespace-nowrap text-xs px-3 py-1.5 rounded-full border
                    ${
                      active
                        ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                        : "bg-white"
                    }
                  `}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {(search || activeTag) && (
            <button onClick={clearFilters} className="text-xs text-red-500">
              پاک‌سازی
            </button>
          )}
        </div>
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="container-custom py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* ================= SIDEBAR (DESKTOP ONLY) ================= */}
        <aside className="hidden lg:block sticky top-24 h-fit space-y-5">
          <div>
            <p className="text-sm font-medium mb-3">فیلتر سریع</p>

            <div className="flex flex-col gap-2">
              {tags.map((tag) => {
                const active = activeTag === tag;

                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(active ? null : tag)}
                    className={`
                      text-right text-sm px-3 py-2 rounded-lg border transition
                      ${
                        active
                          ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                          : "bg-white hover:border-[var(--primary)]/40"
                      }
                    `}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="w-full text-sm text-red-500 border border-red-200 rounded-lg py-2 hover:bg-red-50"
          >
            حذف فیلترها
          </button>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="space-y-4">
          {/* TOP BAR (DESKTOP SORT) */}
          <div className="hidden lg:flex items-center justify-between bg-white border rounded-xl p-3 gap-3">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveTag(null);
              }}
              placeholder="جستجو..."
              className="input flex-1"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="default">مرتب‌سازی</option>
              <option value="cheap">ارزان‌ترین</option>
              <option value="expensive">گران‌ترین</option>
            </select>

            {(search || activeTag) && (
              <button onClick={clearFilters} className="text-sm text-red-500">
                پاک‌سازی
              </button>
            )}
          </div>

          {/* ACTIVE FILTERS */}
          {(activeTag || search) && (
            <div className="hidden lg:flex flex-wrap gap-2">
              {activeTag && (
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--primary)] text-white">
                  {activeTag}
                </span>
              )}

              {search && (
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
                  {search}
                </span>
              )}
            </div>
          )}

          {/* ================= GRID ================= */}
          {/* ================= GRID ================= */}
          {filtered.length > 0 ? (
            <div
              className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-5
      gap-3
    "
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-3">
              <p className="text-sm text-muted-foreground">محصولی یافت نشد</p>

              <button onClick={clearFilters} className="btn-primary">
                مشاهده همه محصولات
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
