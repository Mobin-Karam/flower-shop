/* ================= STORY / ORIGIN ================= */

export interface ProductStory {
  origin?: string; // where it comes from (region / village)
  history?: string; // cultural background
  production?: string; // how it's made
  meaning?: string; // symbolic / emotional meaning
  harvestOrCraftTime?: string;
  maker?: string; // artisan / community
}

export interface Product {
  id: string;
  slug: string;
  name: string;

  /**
   * SHORT SUMMARY (for cards)
   */
  description: string;

  /**
   * NEW: LONG-FORM BLOG STYLE STORY
   */
  story?: ProductStory;

  /**
   * NEW: optional full article-style text (for product page SEO/blog mode)
   */
  longDescription?: string;

  image: string;
  images?: string[];

  /* ================= PRICING ================= */
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  taxIncluded?: boolean;

  /* ================= VARIANTS ================= */
  hasVariants?: boolean;
  variants?: ProductVariant[];
  defaultVariantId?: string;

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

  /* ================= SOCIAL ================= */
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

/* ================= VARIANT MODEL ================= */
export interface ProductVariant {
  id: string;
  name: string;

  sku?: string;

  /**
   * variant-level pricing (your dataset already uses this)
   */
  price?: number;
  originalPrice?: number;

  /**
   * variant inventory (IMPORTANT FIX: your data uses "stock")
   */
  stock?: number;

  image?: string;
  images?: string[];

  /**
   * flexible attribute system (size, weight, color, etc.)
   */
  attributes?: Record<string, string>;
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

  /* snapshot (NEVER trust live product state) */
  unitPrice: number;
  originalPrice?: number;

  name: string;
  image: string;
  variantName?: string;
};
