"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { formatPrice } from "@/lib/format";

// Star Rating Component
function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3.5 h-3.5 ${
              i < Math.floor(rating) ? "fill-amber-400" : "fill-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-600 font-medium">
        {rating.toFixed(1)}
      </span>
      <span className="text-xs text-gray-500">
        ({reviewCount})
      </span>
    </div>
  );
}

// Badge Component
function Badge({ 
  label, 
  variant = "default" 
}: { 
  label: string; 
  variant?: "discount" | "new" | "bestseller" | "default" 
}) {
  const variants = {
    discount: "bg-red-500 text-white",
    new: "bg-blue-500 text-white",
    bestseller: "bg-amber-500 text-white",
    default: "bg-gray-200 text-gray-700",
  };

  return (
    <span className={`px-2 py-1 text-xs font-bold rounded-lg ${variants[variant]}`}>
      {label}
    </span>
  );
}

export default function ProductCard({ product }: any) {
  const addItem = useCartStore((s) => s.addItem);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const items = useCartStore((s) => s.items);

  const cartItem = items.find((i: any) => i.id === product.id);
  const quantity = cartItem?.quantity || 0;

  // Calculate discount percentage (if originalPrice exists)
  const originalPrice = product.originalPrice || product.price * 1.2;
  const discountPercent = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );

  const handleAdd = () => {
    addItem(product);
    toast.success("به سبد اضافه شد");
  };

  const handleIncrease = () => {
    increase(product.id);
  };

  const handleDecrease = () => {
    decrease(product.id);
  };

  // Sample data - replace with actual product data
  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 128;
  const inStock = product.inStock !== false;
  const isBestseller = product.isBestseller || false;
  const isNew = product.isNew || false;

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full" 
      dir="rtl"
    >
      {/* Image Container with Badges */}
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden bg-gray-50">
        <div className="aspect-square relative overflow-hidden group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Top Left Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {discountPercent > 0 && (
            <Badge label={`${discountPercent}٪`} variant="discount" />
          )}
          {isBestseller && (
            <Badge label="پرفروش" variant="bestseller" />
          )}
          {isNew && (
            <Badge label="جدید" variant="new" />
          )}
        </div>

        {/* Stock Indicator */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-sm font-bold">موجود نیست</span>
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-200">
          <svg
            className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </button>
      </Link>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating */}
        <div className="mb-2">
          <StarRating rating={rating} reviewCount={reviewCount} />
        </div>

        {/* Product Name */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mt-1.5">
          {product.description}
        </p>

        {/* Delivery Info */}
        <div className="mt-2.5 text-xs text-green-700 font-medium flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.5 1.5H2.75A1.25 1.25 0 1.5 2.75v14.5A1.25 1.25 0 2.75 18.5h14.5a1.25 1.25 0 1.25-1.25V9.5" />
          </svg>
          ارسال رایگان
        </div>

        {/* Pricing Section */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-end gap-2 mt-3">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {discountPercent > 0 && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 gap-2 flex flex-col">
          {quantity === 0 ? (
            <>
              <button
                onClick={handleAdd}
                disabled={!inStock}
                className={`w-full py-2.5 px-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  inStock
                    ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {inStock ? "افزودن به سبد" : "موجود نیست"}
              </button>

              <Link
                href={`/shop/${product.slug}`}
                className="w-full py-2.5 px-3 rounded-lg font-semibold text-sm border border-gray-300 text-gray-700 text-center hover:bg-gray-50 transition-colors duration-200"
              >
                مشاهده جزئیات
              </Link>
            </>
          ) : (
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-1">
              <button
                onClick={handleDecrease}
                className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-white rounded-md transition-colors duration-200 font-semibold"
              >
                −
              </button>

              <span className="font-bold text-gray-900 text-sm px-2 min-w-[2rem] text-center">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-white rounded-md transition-colors duration-200 font-semibold"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
