import { Product } from "./types";

// Example product data
export const products: Product[] = [
  {
    id: "1",
    slug: "golbarg-gol-mohammadi",
    name: "دمنوش و پر گل محمدی چهل چای (۴۰ گرم)",
    description: "گل سرخ طبیعی و خوشخوند از باغ‌های کردستان",
    price: 90000,
    originalPrice: 100000,
    image: "/flowers/rose-2.jpg",
    rating: 5,
    reviewCount: 1,
    inStock: true,
    isBestseller: true,
    isNew: false,
    freeShipping: true,
  },
  {
    id: "2",
    slug: "ghonche-gol-mohammadi",
    name: "غنچه گل محمدی امسالی ۲۵ گرمی",
    price: 110000,
    originalPrice: 120000,
    image: "/flowers/rose-1.jpg",
    description: "بابونه خشک شده طبیعی برای آرامش و خواب بهتر",
    rating: 5,
    reviewCount: 1,
    inStock: true,
    isBestseller: false,
    isNew: true,
    freeShipping: true,
  },
];
