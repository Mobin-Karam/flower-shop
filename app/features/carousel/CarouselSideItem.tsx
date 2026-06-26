// CarouselSlideItem Component
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { CarouselSlide } from "./carousel.types";

interface CarouselSlideItemProps {
  slide: CarouselSlide;
  index: number;
  isActive: boolean;
  onAddToCart?: (slideId: string) => void;
}

const slideVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as any,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

export function CarouselSlideItem({
  slide,
  index,
  isActive,
  onAddToCart,
}: CarouselSlideItemProps) {
  const price = slide.price;
  const originalPrice = slide.originalPrice;

  const hasDiscount =
    price != null && originalPrice != null && price < originalPrice;

  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="embla__slide relative w-full flex-shrink-0 h-[400px] md:h-[500px] lg:h-[600px]"
      variants={slideVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
    >
      {/* Background Image */}
      <div className="relative w-full h-full overflow-hidden rounded-lg md:rounded-xl">
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          fill
          className="object-cover transition-transform duration-500 ease-out hover:scale-105"
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          decoding="async"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Badge */}
        {slide.badge && (
          <motion.div
            className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-white text-sm md:text-base ${
              slide.badge.type === "sale"
                ? "bg-red-600"
                : slide.badge.type === "new"
                  ? "bg-green-600"
                  : slide.badge.type === "featured"
                    ? "bg-purple-600"
                    : "bg-amber-600"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {slide.badge.text}
          </motion.div>
        )}

        {/* Discount Badge (if applicable) */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discountPercentage}%
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="space-y-3 md:space-y-4"
          >
            {/* Title */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {slide.title}
            </h2>

            {/* Description */}
            {slide.description && (
              <p className="text-sm md:text-base text-gray-100 max-w-md">
                {slide.description}
              </p>
            )}

            {/* Rating & Price Row */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              {/* Rating */}
              {slide.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(slide.rating!)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs md:text-sm text-gray-200">
                    ({slide.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              {slide.price && (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    ${slide.price.toFixed(2)}
                  </span>
                  {slide.originalPrice && (
                    <span className="text-sm md:text-base text-gray-300 line-through">
                      ${slide.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 md:gap-3 pt-2">
              {/* Main CTA Button */}
              <Link
                href={slide.link.href}
                className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 text-sm md:text-base group"
                onClick={(e) => {
                  if (slide.cta?.action === "buy" && onAddToCart) {
                    e.preventDefault();
                    onAddToCart(slide.id);
                  }
                }}
              >
                {slide.cta?.text || "Shop Now"}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              {/* Secondary CTA - Quick View */}
              {slide.cta?.action !== "buy" && (
                <Link
                  href={slide.link.href}
                  className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300 text-sm md:text-base"
                >
                  View Details
                </Link>
              )}
            </div>

            {/* Quick Add to Cart Button (Mobile) */}
            {slide.price && onAddToCart && (
              <button
                onClick={() => onAddToCart(slide.id)}
                className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300 text-sm"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: slide.title,
            description: slide.description,
            image: slide.image.src,
            url: slide.link.href,
            price: slide.price,
            priceCurrency: "USD",
            aggregateRating: slide.rating
              ? {
                  "@type": "AggregateRating",
                  ratingValue: slide.rating,
                  reviewCount: slide.reviewCount,
                }
              : undefined,
            offers: {
              "@type": "Offer",
              price: slide.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
    </motion.div>
  );
}
