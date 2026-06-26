import { CarouselSlide } from "./carousel.types";

export const mockCarouselData: CarouselSlide[] = [
  {
    id: "1",
    title: "دمنوش گل محمدی ارگانیک کردستان",
    description: "کاملاً طبیعی، مناسب آرامش و خواب بهتر",
    image: {
      src: "/banners/banner1.png",
      alt: "دمنوش گل محمدی",
      width: 1200,
      height: 600,
    },
    price: 100000,
    originalPrice: 120000,
    rating: 5,
    reviewCount: 120,
    badge: {
      text: "پرفروش",
      type: "featured", // ✅ must be literal type
    },
    link: {
      href: "/products/1",
      label: "مشاهده محصول",
    },
    cta: {
      text: "خرید",
      action: "buy",
    },
  },
  {
    id: "2",
    title: "دمنوش گل محمدی ارگانیک کردستان",
    description: "کاملاً طبیعی، مناسب آرامش و خواب بهتر",
    image: {
      src: "/banners/banner2.png",
      alt: "دمنوش گل محمدی",
      width: 1200,
      height: 600,
    },
    price: 100000,
    originalPrice: 120000,
    rating: 5,
    reviewCount: 120,
    badge: {
      text: "پرفروش",
      type: "featured", // ✅ must be literal type
    },
    link: {
      href: "/products/1",
      label: "مشاهده محصول",
    },
    cta: {
      text: "خرید",
      action: "buy",
    },
  },
];
