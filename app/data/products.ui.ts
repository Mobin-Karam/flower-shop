import { products as rawProducts } from "@/lib/products"

export const uiProducts = rawProducts.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  description: p.description,

  image: p.image,

  price: p.price,
  originalPrice: p.originalPrice ?? null,
  discountPercent: p.discountPercent ?? 0,

  rating: p.rating ?? 4.5,
  reviewCount: p.reviewCount ?? 0,

  inStock: Boolean(p.inStock),
  stockQuantity: p.stockQuantity ?? 0,
  lowStockThreshold: p.lowStockThreshold ?? 5,

  isNew: p.isNew ?? false,
  isBestseller: p.isBestseller ?? false,
  isFeatured: p.isFeatured ?? false,

  freeShipping: p.freeShipping ?? false,
}));