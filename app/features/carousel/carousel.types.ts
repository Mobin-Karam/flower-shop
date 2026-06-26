// Carousel Types and Interfaces

export interface CarouselSlide {
  id: string;
  title: string;
  description?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: {
    text: string;
    type: "sale" | "new" | "featured" | "limited";
  };
  link: {
    href: string;
    label?: string;
  };
  cta?: {
    text: string;
    action: "buy" | "view" | "learn";
  };
}

export interface CarouselConfig {
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  slidesToScroll?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showThumbnails?: boolean;
  align?: "start" | "center" | "end";
  gap?: number;
  containerClass?: string;
  animationDuration?: number;
}

import type { EmblaCarouselType as EmblaCoreType } from "embla-carousel";

export type EmblaCarouselType = EmblaCoreType;
export type SlideAlignment = "start" | "center" | "end";
