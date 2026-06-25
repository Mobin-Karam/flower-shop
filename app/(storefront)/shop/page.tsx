"use client";

import { useMemo, useState, useTransition } from "react";
import Skeleton from "react-loading-skeleton";

import { products } from "@/lib/products";
import ProductCard from "@/app/components/product-card";
import MobileFilter from "@/app/components/mobile-filter";

/* ---------------- SKELETON GRID ---------------- */
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="border border-border rounded-xl p-3 space-y-3 bg-card"
        >
          <Skeleton height={140} borderRadius={12} />
          <Skeleton height={14} width="80%" />
          <Skeleton height={12} width="60%" />
          <Skeleton height={20} width="40%" />
        </div>
      ))}
    </div>
  );
}

export default function ShopPage() {
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<"default" | "cheap" | "expensive">(
    "default",
  );

  const tags = ["آرامش", "خواب", "انرژی", "گل رز", "دمنوش گیاهی", "گیوه"];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = products.filter((p) => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q);

      const matchesTag =
        !activeTag || p.tags?.includes(activeTag) || p.name.includes(activeTag);

      return matchesSearch && matchesTag;
    });

    if (sort === "cheap")
      result = [...result].sort((a, b) => a.price - b.price);

    if (sort === "expensive")
      result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [search, activeTag, sort]);

  const clearFilters = () => {
    startTransition(() => {
      setSearch("");
      setActiveTag(null);
      setSort("default");
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="border-b border-border bg-card">
        <div className="container-custom py-5 space-y-1">
          <p className="text-[10px] tracking-[0.3em] text-primary uppercase">
            فروشگاه گلیفای
          </p>

          <h1 className="text-base font-semibold text-foreground">
            نتایج جستجو
          </h1>

          <p className="text-xs text-muted-foreground">
            {filtered.length} محصول
          </p>
        </div>
      </header>

      {/* MOBILE FILTER */}
      <div className="lg:hidden border-b border-border bg-card">
        <MobileFilter
          search={search}
          setSearch={(val: string) =>
            startTransition(() => {
              setSearch(val);
              setActiveTag(null);
            })
          }
          tags={tags}
          activeTag={activeTag}
          setActiveTag={(tag: string | null) =>
            startTransition(() => setActiveTag(tag))
          }
          clearFilters={clearFilters}
        />
      </div>

      {/* LAYOUT */}
      <div className="container-custom py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* SIDEBAR */}
        <aside className="hidden lg:block sticky top-24 h-fit space-y-5">
          <div>
            <p className="text-sm font-medium mb-3">فیلتر سریع</p>

            <div className="flex flex-col gap-2">
              {tags.map((tag) => {
                const active = activeTag === tag;

                return (
                  <button
                    key={tag}
                    onClick={() =>
                      startTransition(() => setActiveTag(active ? null : tag))
                    }
                    className={`
                      text-right text-sm px-3 py-2 rounded-lg border transition
                      ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card hover:border-primary/40 border-border"
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
            className="w-full text-sm text-destructive border border-destructive/20 rounded-lg py-2 hover:bg-destructive/10"
          >
            حذف فیلترها
          </button>
        </aside>

        {/* MAIN */}
        <main className="space-y-4">
          {/* TOP BAR */}
          <div className="hidden lg:flex items-center justify-between bg-card border border-border rounded-xl p-3 gap-3">
            <input
              value={search}
              onChange={(e) =>
                startTransition(() => {
                  setSearch(e.target.value);
                  setActiveTag(null);
                })
              }
              placeholder="جستجو..."
              className="input flex-1 bg-background text-foreground border-border"
            />

            <select
              value={sort}
              onChange={(e) =>
                startTransition(() => setSort(e.target.value as any))
              }
              className="border border-border bg-background rounded-lg px-3 py-2 text-sm"
            >
              <option value="default">مرتب‌سازی</option>
              <option value="cheap">ارزان‌ترین</option>
              <option value="expensive">گران‌ترین</option>
            </select>

            {(search || activeTag) && (
              <button
                onClick={clearFilters}
                className="text-sm text-destructive"
              >
                پاک‌سازی
              </button>
            )}
          </div>

          {/* ACTIVE FILTERS */}
          {(activeTag || search) && (
            <div className="hidden lg:flex flex-wrap gap-2">
              {activeTag && (
                <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground">
                  {activeTag}
                </span>
              )}

              {search && (
                <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  {search}
                </span>
              )}
            </div>
          )}

          {/* GRID */}
          {isPending ? (
            <ProductGridSkeleton />
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
