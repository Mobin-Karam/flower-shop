"use client";

import { useMemo } from "react";
import { ChevronDown, Star, X } from "lucide-react";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export type FilterState = {
  priceRange: [number, number];
  brands: string[];
  rating: number;
  inStock: boolean;
  tags: string[];
  discountOnly: boolean;
  categories: string[];
};

export const defaultFilters: FilterState = {
  priceRange: [0, Infinity],
  brands: [],
  rating: 0,
  inStock: false,
  tags: [],
  discountOnly: false,
  categories: [],
};

type Props = {
  products: Product[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
};

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex items-center justify-between cursor-pointer py-2 text-sm font-medium text-foreground select-none">
        {title}
        <ChevronDown
          size={14}
          className="transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pb-3 space-y-1.5">{children}</div>
    </details>
  );
}

export default function FilterSidebar({ products, filters, onChange }: Props) {
  // Extract dynamic filter options from products
  const options = useMemo(() => {
    const allBrands = new Set<string>();
    const allTags = new Set<string>();
    const allCategories = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;

    products.forEach((p) => {
      if (p.brand) allBrands.add(p.brand);
      (p.tags || []).forEach((t) => allTags.add(t));
      if (p.category) allCategories.add(p.category);
      if (p.price < minPrice) minPrice = p.price;
      if (p.price > maxPrice) maxPrice = p.price;
    });

    return {
      brands: Array.from(allBrands).sort(),
      tags: Array.from(allTags).sort(),
      categories: Array.from(allCategories).sort(),
      priceRange: [minPrice, maxPrice] as [number, number],
    };
  }, [products]);

  const toggleArrayItem = <T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.tags.length > 0 ||
    filters.rating > 0 ||
    filters.inStock ||
    filters.discountOnly ||
    filters.categories.length > 0 ||
    filters.priceRange[0] > options.priceRange[0] ||
    filters.priceRange[1] < options.priceRange[1];

  const clearAll = () => onChange(defaultFilters);

  return (
    <aside className="space-y-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold">فیلترها</p>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-destructive hover:underline flex items-center gap-1"
          >
            <X size={12} />
            پاک کردن
          </button>
        )}
      </div>

      {/* Categories */}
      {options.categories.length > 1 && (
        <FilterSection title="دسته‌بندی">
          {options.categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() =>
                  onChange({
                    ...filters,
                    categories: toggleArrayItem(filters.categories, cat),
                  })
                }
                className="accent-primary"
              />
              <span>{cat}</span>
              <span className="text-xs text-muted-foreground mr-auto">
                ({products.filter((p) => p.category === cat).length})
              </span>
            </label>
          ))}
        </FilterSection>
      )}

      {/* Price Range */}
      <FilterSection title="قیمت">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="از"
            value={filters.priceRange[0] === Infinity ? "" : filters.priceRange[0]}
            onChange={(e) =>
              onChange({
                ...filters,
                priceRange: [Number(e.target.value) || 0, filters.priceRange[1]],
              })
            }
            className="input text-xs py-1.5"
          />
          <span className="text-muted-foreground">—</span>
          <input
            type="number"
            placeholder="تا"
            value={
              filters.priceRange[1] === Infinity ? "" : filters.priceRange[1]
            }
            onChange={(e) =>
              onChange({
                ...filters,
                priceRange: [
                  filters.priceRange[0],
                  Number(e.target.value) || Infinity,
                ],
              })
            }
            className="input text-xs py-1.5"
          />
        </div>
      </FilterSection>

      {/* Brands */}
      {options.brands.length > 0 && (
        <FilterSection title="برند">
          {options.brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() =>
                  onChange({
                    ...filters,
                    brands: toggleArrayItem(filters.brands, brand),
                  })
                }
                className="accent-primary"
              />
              <span>{brand}</span>
              <span className="text-xs text-muted-foreground mr-auto">
                ({products.filter((p) => p.brand === brand).length})
              </span>
            </label>
          ))}
        </FilterSection>
      )}

      {/* Rating */}
      <FilterSection title="امتیاز">
        {[4, 3, 2, 1].map((r) => (
          <label
            key={r}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="radio"
              name="rating"
              checked={filters.rating === r}
              onChange={() =>
                onChange({
                  ...filters,
                  rating: filters.rating === r ? 0 : r,
                })
              }
              className="accent-primary"
            />
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < r
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">و بالاتر</span>
          </label>
        ))}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="موجودی">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={() =>
              onChange({ ...filters, inStock: !filters.inStock })
            }
            className="accent-primary"
          />
          <span>فقط موجود</span>
        </label>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="تخفیف">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.discountOnly}
            onChange={() =>
              onChange({ ...filters, discountOnly: !filters.discountOnly })
            }
            className="accent-primary"
          />
          <span>فقط تخفیف‌دار</span>
        </label>
      </FilterSection>

      {/* Tags */}
      {options.tags.length > 0 && (
        <FilterSection title="برچسب‌ها" defaultOpen={false}>
          <div className="flex flex-wrap gap-1.5">
            {options.tags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  onChange({
                    ...filters,
                    tags: toggleArrayItem(filters.tags, tag),
                  })
                }
                className={cn(
                  "text-xs px-2.5 py-1 rounded-full border transition",
                  filters.tags.includes(tag)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </FilterSection>
      )}
    </aside>
  );
}
