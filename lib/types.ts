

export interface Product {
  /* ================= CORE ================= */
  id: string;
  slug: string;
  name: string;
  description: string;

  image: string;
  images?: string[];

  /* ================= PRICING (BASE / FALLBACK) ================= */
  price: number;
  originalPrice?: number;

  discountPercent?: number;

  taxIncluded?: boolean;

  /* ================= VARIANT SYSTEM (CRITICAL UPGRADE) ================= */
  variants?: ProductVariant[];
  defaultVariantId?: string;

  /**
   * If true → pricing MUST come from variant
   * If false → single product pricing mode
   */
  hasVariants?: boolean;

  /* ================= INVENTORY ================= */
  inStock?: boolean;
  stockQuantity?: number;
  lowStockThreshold?: number;

  sku?: string;
  barcode?: string;

  /* ================= CLASSIFICATION ================= */
  category?: string;
  subcategory?: string;
  tags?: string[];

  brand?: string;

  /* ================= SHIPPING ================= */
  freeShipping?: boolean;
  shippingTime?: string;
  weight?: number;

  /* ================= UI FLAGS ================= */
  isBestseller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;

  badge?: ProductBadge;

  /* ================= SOCIAL / METRICS ================= */
  rating?: number;
  reviewCount?: number;

  viewCount?: number;
  purchaseCount?: number;
  wishlistCount?: number;

  /* ================= SEO ================= */
  seoTitle?: string;
  seoDescription?: string;

  /* ================= LIFECYCLE ================= */
  createdAt?: string;
  updatedAt?: string;
  releaseDate?: string;

  isActive?: boolean;
  isDigital?: boolean;
  isPhysical?: boolean;
}

/* ================= VARIANT MODEL (UPGRADED) ================= */
export interface ProductVariant {
  id: string;
  sku?: string;

  name: string;

  /* pricing per SKU */
  price?: number;
  originalPrice?: number;

  /* inventory per SKU */
  stock?: number;

  /* media per SKU */
  image?: string;
  images?: string[];

  /* attribute system (CRITICAL FOR FILTERING LIKE DIGIKALA) */
  attributes?: Record<string, string>;
  /**
   * مثال:
   * {
   *   color: "red",
   *   storage: "256GB",
   *   sim: "esim"
   * }
   */
}

/* ================= BADGES ================= */
export type ProductBadge =
  | "discount"
  | "new"
  | "bestseller"
  | "limited"
  | "none";

/* ================= CART ================= */
export type CartItem = {
  key: string;

  productId: string;
  product: Product;

  variantId?: string;

  quantity: number;
  addedAt: number;

  /* snapshot (DO NOT RELY ON PRODUCT LIVE DATA) */
  unitPrice: number;
  originalPrice?: number;
  name: string;
  image: string;
  variantName?: string;
};