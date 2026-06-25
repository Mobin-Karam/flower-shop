import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    slug: "گلبرگ-گل-محمدی-چهل-چای-امسالی",
    name: "دمنوش و پر گل محمدی چهل چای (۴۰ گرم)",
    description:
      "گل سرخ طبیعی و خوش‌عطر از باغ‌های کردستان، مناسب دمنوش آرامش‌بخش",

    price: 100000,
    originalPrice: 120000,

    image: "/flowers/golbarg1.jpg",
    images: ["/flowers/golbarg1.jpg","/flowers/golbarg2.jpg", "/flowers/golbarg3.jpg","/flowers/golbarg4.jpg","/flowers/golbarg5.jpg"],

    rating: 5,
    reviewCount: 1,

    inStock: true,
    stockQuantity: 120,
    lowStockThreshold: 10,

    sku: "ROSE-CHAI-40G-001",
    barcode: "626000000001",

    isBestseller: true,
    isNew: false,
    isFeatured: true,

    freeShipping: false,
    shippingTime: "2-3 روز",

    category: "دمنوش",
    subcategory: "گل محمدی",
    tags: ["آرامش", "دمنوش", "گل محمدی"],

    brand: "چهل چای",

    weight: 0.04,

    discountPercent: 10,
    taxIncluded: true,

    seoTitle: "دمنوش گل محمدی چهل چای",
    seoDescription: "خرید گل محمدی طبیعی از کردستان",

    viewCount: 1200,
    purchaseCount: 85,
    wishlistCount: 34,

    createdAt: "2026-01-01",
    updatedAt: "2026-06-01",

    isActive: true,
    isDigital: false,
    isPhysical: true,

    /* ================= NEW ================= */
    hasVariants: false,
  },

  {
    id: "2",
    slug: "ghonche-gol-mohammadi",
    name: "غنچه گل محمدی امسالی ۵۰ گرمی",
    description: "غنچه خشک‌شده طبیعی گل محمدی مناسب دمنوش و آرامش",

    price: 120000,
    originalPrice: 140000,

    image: "/flowers/khonche1.jpg",
    images: ["/flowers/khonche1.jpg", "/flowers/khonche2.jpg", "/flowers/khonche3.jpg", "/flowers/khonche4.jpg", "/flowers/khonche5.jpg"],

    rating: 5,
    reviewCount: 1,

    inStock: true,
    stockQuantity: 80,
    lowStockThreshold: 8,

    sku: "ROSE-BUD-25G-002",
    barcode: "626000000002",

    isBestseller: false,
    isNew: true,
    isFeatured: false,

    freeShipping: false,
    shippingTime: "2-4 روز",

    category: "دمنوش",
    subcategory: "غنچه گل محمدی",
    tags: ["آرامش", "خواب", "دمنوش گیاهی"],

    brand: "چهل چای",

    weight: 0.025,

    discountPercent: 8,
    taxIncluded: true,

    seoTitle: "غنچه گل محمدی امسالی",
    seoDescription: "خرید غنچه گل محمدی طبیعی",

    viewCount: 540,
    purchaseCount: 32,
    wishlistCount: 18,

    createdAt: "2026-02-10",
    updatedAt: "2026-06-10",

    isActive: true,
    isDigital: false,
    isPhysical: true,

    /* ================= NEW ================= */
    hasVariants: false,
  },

  {
    id: "3",
    slug: "kalaash-oraman",
    name: "کلاش (گیوه) اورامان",
    description: "کفش دست‌دوز محلی هورامان سبک و بادوام",

    price: 2500000,
    originalPrice: 2900000,

    image: "/kalaash/kalaash1.jpg",
    images: ["/kalaash/kalaash1.jpg", "/kalaash/kalaash2.jpg", "/kalaash/kalaash3.jpg", "/kalaash/kalaash4.jpg", "/kalaash/kalaash5.jpg"],

    rating: 4.8,
    reviewCount: 64,

    inStock: true,
    stockQuantity: 12,
    lowStockThreshold: 3,

    sku: "KALASH-ORAMAN-001",
    barcode: "626000000003",

    isBestseller: true,
    isNew: true,
    isFeatured: true,

    freeShipping: false,
    shippingTime: "3-5 روز",

    category: "کفش سنتی",
    subcategory: "اورامان",
    tags: ["کفش سنتی", "کردستان", "دست‌دوز"],

    brand: "اورامان هنر",

    weight: 0.8,

    discountPercent: 14,
    taxIncluded: true,

    seoTitle: "کلاش اورامان دست‌دوز",
    seoDescription: "خرید گیوه سنتی اورامان با کیفیت بالا",

    viewCount: 3200,
    purchaseCount: 210,
    wishlistCount: 95,

    createdAt: "2025-12-01",
    updatedAt: "2026-06-20",

    isActive: true,
    isDigital: false,
    isPhysical: true,

    /* ================= VARIANT EXAMPLE (REAL DIGIKALA STYLE) ================= */
    hasVariants: true,

    variants: [
      {
        id: "kalaash-40",
        name: "سایز 40",
        sku: "KALASH-40",
        price: 2500000,
        originalPrice: 2900000,
        stock: 4,
        attributes: {
          size: "40",
        },
      },
      {
        id: "kalaash-41",
        name: "سایز 41",
        sku: "KALASH-41",
        price: 2500000,
        originalPrice: 2900000,
        stock: 3,
        attributes: {
          size: "41",
        },
      },
      {
        id: "kalaash-42",
        name: "سایز 42",
        sku: "KALASH-42",
        price: 2500000,
        originalPrice: 2900000,
        stock: 5,
        attributes: {
          size: "42",
        },
      },
    ],
  },
];
