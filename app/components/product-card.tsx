"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Star, Share2 } from "lucide-react";

import { useCartStore } from "../store/cart-store";
import { formatPrice } from "../../lib/format";
import { analytics } from "@/lib/analytics";

import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Product } from "@/lib/types";

import { getPricing } from "@/lib/pricing";

type Props = {
  product?: Product;
  source?: string;
};

export default function ProductCard({ product, source = "shop" }: Props) {
  const { addItem, increase, decrease, items } = useCartStore();
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!product) return null;

  const { finalPrice, originalPrice, discountPercent, hasDiscount } =
    getPricing(product);

  const cartItem = items.find((i) => i.productId === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const inStock = product.inStock === true && (product.stockQuantity ?? 0) > 0;

  const lowStock =
    typeof product.stockQuantity === "number" &&
    typeof product.lowStockThreshold === "number" &&
    product.stockQuantity <= product.lowStockThreshold &&
    product.stockQuantity > 0;

  const hasHoverImage =
    product.images && product.images.length > 1 && product.images[1] !== product.image;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem({ product, quantity: 1 });
    analytics.addToCart(product.slug, 1);
  };

  const handleClick = () => {
    analytics.productClick(product.slug, source);
  };

  // Determine badge
  const badge = product.isNew
    ? { text: "جدید", variant: "secondary" as const }
    : product.isBestseller
      ? { text: "پرفروش", variant: "default" as const }
      : hasDiscount
        ? { text: `٪${discountPercent}`, variant: "destructive" as const }
        : null;

  return (
    <Card
      className="overflow-hidden group hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-square overflow-hidden bg-muted">
        <Link
          href={`/shop/${product.slug}`}
          onClick={handleClick}
          className="block w-full h-full"
        >
          {/* Main image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 ${
              hasHoverImage && hovered ? "opacity-0 scale-105" : "opacity-100"
            }`}
          />
          {/* Hover image */}
          {hasHoverImage && (
            <Image
              src={product.images![1]}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {badge && (
            <Badge variant={badge.variant} className="text-xs">
              {badge.text}
            </Badge>
          )}
          {product.freeShipping && (
            <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              ارسال رایگان
            </Badge>
          )}
        </div>

        {/* Wishlist + Share buttons */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition"
          >
            <Heart
              size={14}
              className={liked ? "fill-red-500 text-red-500" : ""}
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (navigator.share) {
                navigator.share({
                  title: product.name,
                  url: `/shop/${product.slug}`,
                });
              }
            }}
            className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition"
          >
            <Share2 size={14} />
          </button>
        </div>

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-medium">
            ناموجود
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col gap-1.5">
        {/* Brand */}
        {product.brand && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {product.brand}
          </p>
        )}

        {/* Name */}
        <Link href={`/shop/${product.slug}`} onClick={handleClick}>
          <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < Math.round(product.rating!)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }
                />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">
              ({product.reviewCount ?? 0})
            </span>
          </div>
        )}

        {/* Low stock warning */}
        {lowStock && (
          <span className="text-[10px] text-orange-600">
            فقط {product.stockQuantity} عدد باقی مانده
          </span>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="font-bold text-sm">{formatPrice(finalPrice)}</span>
          {hasDiscount && originalPrice && (
            <span className="text-xs line-through text-muted-foreground">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <div className="mt-1">
          {quantity === 0 ? (
            <Button
              onClick={handleAdd}
              disabled={!inStock}
              size="sm"
              className="w-full"
            >
              افزودن به سبد
            </Button>
          ) : (
            <div className="flex items-center justify-between bg-muted rounded-lg p-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  decrease(cartItem!.key);
                }}
              >
                -
              </Button>
              <span className="text-sm font-medium">{quantity}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  increase(cartItem!.key);
                }}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
