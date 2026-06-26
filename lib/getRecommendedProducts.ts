import { products } from "@/lib/products";
import { Product } from "@/lib/types";

type ScoredProduct = Product & { score: number };

export function getRecommendedProducts(
  cartItems: { product: Product }[],
  limit = 6,
): Product[] {
  const cartProducts = cartItems.map((i) => i.product);

  const scored: ScoredProduct[] = products
    .filter((p) => !cartProducts.some((c) => c.id === p.id))
    .map((p) => {
      let score = 0;

      for (const cartItem of cartProducts) {
        if (p.category === cartItem.category) score += 5;
        if (p.subcategory === cartItem.subcategory) score += 3;

        const tagMatches =
          p.tags?.filter((tag) => cartItem.tags?.includes(tag)).length || 0;

        score += tagMatches * 2;
      }

      if (p.isFeatured) score += 1;
      if (p.isBestseller) score += 1;

      return { ...p, score };
    });

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
