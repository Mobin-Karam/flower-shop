"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/product-card";
import { useMemo, useState } from "react";

export default function ShopPage() {
  const [search, setSearch] = useState("");

  const tags = ["آرامش", "خواب", "انرژی", "گل رز", "دمنوش گیاهی"];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen gradient-bg">
      {/* HEADER */}
      <header className="section">
        <div className="container-custom text-center space-y-4">
          <p className="text-xs tracking-[0.25em] text-[var(--primary)] uppercase">
            فروشگاه دمنوش‌های طبیعی
          </p>

          <p className="text-sm text-[var(--foreground)]/70 max-w-xl mx-auto leading-loose">
            مجموعه‌ای انتخاب‌شده از دمنوش‌های گیاهی و گل‌های ارگانیک الهام‌گرفته
            از طبیعت و سنت ایرانی
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <main className="pb-16">
        <div className="container-custom space-y-8">
          {/* SEARCH */}
          <div className="space-y-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در محصولات..."
              className="input"
            />

            {/* TAGS */}
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => {
                const active = search === tag;

                return (
                  <button
                    key={tag}
                    onClick={() => setSearch(active ? "" : tag)}
                    className={`px-4 py-2 text-xs rounded-full border transition
                      ${
                        active
                          ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                          : "bg-white/60 text-[var(--foreground)]/70 border-black/5 hover:border-[var(--primary)]/40"
                      }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RESULTS */}
          <div className="space-y-3">
            <p className="text-xs text-[var(--foreground)]/50">
              {filtered.length} محصول
            </p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((product) => (
                  <div key={product.id} className="card p-3 sm:p-4">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="py-20 text-center space-y-4">
                <p className="text-sm text-[var(--foreground)]/50">
                  محصولی یافت نشد
                </p>

                <button
                  onClick={() => setSearch("")}
                  className="btn-primary"
                >
                  مشاهده همه محصولات
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}