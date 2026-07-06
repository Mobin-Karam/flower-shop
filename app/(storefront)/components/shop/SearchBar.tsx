"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { Product } from "@/lib/types";
import { analytics } from "@/lib/analytics";

const RECENT_KEY = "gulify-recent-searches";
const MAX_RECENT = 8;

type Props = {
  products: Product[];
  value: string;
  onChange: (value: string) => void;
};

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SearchBar({ products, value, onChange }: Props) {
  const [focused, setFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(value, 300);

  // Load recent searches
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {}
  }, []);

  const saveRecent = useCallback((term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((r) => r !== term);
      const next = [term, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {}
  }, []);

  // Fuzzy search
  const suggestions = useMemo(() => {
    if (!debouncedValue.trim()) return [];
    const q = debouncedValue.toLowerCase();
    return products
      .filter((p) => {
        const searchFields = [
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
        return searchFields.includes(q);
      })
      .slice(0, 6);
  }, [debouncedValue, products]);

  // Popular searches from product data
  const popularSearches = useMemo(() => {
    const tagCounts = new Map<string, number>();
    products.forEach((p) => {
      (p.tags || []).forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag);
  }, [products]);

  // Track search
  useEffect(() => {
    if (debouncedValue.trim()) {
      analytics.search(debouncedValue, suggestions.length);
    }
  }, [debouncedValue, suggestions.length]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showDropdown = focused && !value.trim();
  const showResults = focused && value.trim() && suggestions.length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="جستجوی محصولات..."
          className="input pr-10 pl-10 bg-background text-foreground border-border"
        />
        {value && (
          <button
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown: Recent + Popular */}
      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {recentSearches.length > 0 && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  جستجوهای اخیر
                </span>
                <button
                  onClick={clearRecent}
                  className="text-xs text-destructive hover:underline"
                >
                  پاک کردن
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      onChange(term);
                      setFocused(false);
                    }}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground transition"
                  >
                    <Clock size={12} />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {popularSearches.length > 0 && (
            <div className="p-3 border-t border-border">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-2">
                <TrendingUp size={12} />
                جستجوهای محبوب
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      onChange(term);
                      setFocused(false);
                    }}
                    className="text-xs px-2.5 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto">
          {suggestions.map((product) => (
            <a
              key={product.id}
              href={`/shop/${product.slug}`}
              onClick={() => {
                saveRecent(value);
                setFocused(false);
              }}
              className="flex items-center gap-3 p-3 hover:bg-muted transition border-b border-border last:border-0"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {product.category}
                  {product.brand ? ` · ${product.brand}` : ""}
                </p>
              </div>
              <span className="text-xs font-medium text-primary whitespace-nowrap">
                {product.price.toLocaleString("fa-IR")} تومان
              </span>
            </a>
          ))}
        </div>
      )}

      {/* No Results */}
      {focused && value.trim() && suggestions.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg z-50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            نتیجه‌ای برای &quot;{value}&quot; یافت نشد
          </p>
        </div>
      )}
    </div>
  );
}
