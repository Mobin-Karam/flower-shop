"use client";

import { useMemo } from "react";
import { Product } from "@/lib/types";
import ProductCard from "@/app/components/product-card";
import { Sparkles } from "lucide-react";

type Props = {
  allProducts: Product[];
  currentProducts: Product[];
};

export default function Recommended({ allProducts, currentProducts }: Props) {
  const recommended = useMemo(() => {
    const currentIds = new Set(currentProducts.map((p) => p.id));

    return allProducts
      .filter((p) => !currentIds.has(p.id))
      .map((p) => {
        let score = 0;
        for (const cp of currentProducts) {
          if (p.category === cp.category) score += 5;
          if (p.subcategory === cp.subcategory) score += 3;
          const tagMatches =
            p.tags?.filter((t) => cp.tags?.includes(t)).length || 0;
          score += tagMatches * 2;
        }
        if (p.isFeatured) score += 1;
        if (p.isBestseller) score += 1;
        return { ...p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [allProducts, currentProducts]);

  if (recommended.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-primary" />
        <h2 className="text-base font-semibold">پیشنهاد ما برای شما</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {recommended.map((product) => (
          <ProductCard key={product.id} product={product} source="recommended" />
        ))}
      </div>
    </section>
  );
}
