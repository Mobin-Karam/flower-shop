"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";

import { useCartStore } from "@/app/store/cart-store";
import { formatPrice } from "@/lib/format";

import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Product } from "@/lib/types";

type Props = {
  product?: Product;
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < Math.round(rating) ? "text-amber-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

export default function ProductCard({ product }: Props) {
  const { addItem, increase, decrease, items } = useCartStore();

  if (!product) return null;

  const cartItem = items.find((i) => i.productId === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const inStock = product.inStock === true && (product.stockQuantity ?? 0) > 0;

  const discountPercent = product.discountPercent ?? 0;

  const lowStock =
    typeof product.stockQuantity === "number" &&
    typeof product.lowStockThreshold === "number" &&
    product.stockQuantity <= product.lowStockThreshold;

  const handleAdd = () => {
    if (!inStock) return;

    addItem({
      product,
      quantity: 1,
    });
  };

  return (
    <Card
      className="
        w-[220px] h-[420px]
        flex flex-col
        overflow-hidden
        hover:shadow-lg transition
      "
    >
      {/* IMAGE - FIXED HEIGHT */}
      <div className="relative w-full h-[180px] shrink-0">
        <Link href={`/shop/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>

        {/* BADGES */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {discountPercent > 0 && (
            <Badge variant="destructive">٪{discountPercent}</Badge>
          )}
          {product.isNew && <Badge variant="secondary">جدید</Badge>}
          {product.isBestseller && <Badge>پرفروش</Badge>}
          {product.isFeatured && <Badge variant="outline">ویژه</Badge>}
        </div>

        {/* OUT OF STOCK */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
            ناموجود
          </div>
        )}
      </div>

      {/* CONTENT - FIXED FLEX AREA */}
      <CardContent className="flex-1 flex flex-col gap-2 p-3">
        <StarRating
          rating={product.rating ?? 4.5}
          count={product.reviewCount ?? 0}
        />

        {/* TITLE (FIXED HEIGHT) */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {/* DESCRIPTION (FIXED SPACE) */}
        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px]">
          {product.description}
        </p>

        {product.freeShipping && (
          <div className="flex items-center gap-1 text-xs text-green-600">
            <Truck className="w-3.5 h-3.5" />
            ارسال رایگان
          </div>
        )}

        {lowStock && (
          <span className="text-xs text-orange-600">
            فقط {product.stockQuantity} عدد باقی مانده
          </span>
        )}

        <div className="flex-1" />

        <Separator />

        {/* PRICE (FIXED AREA) */}
        <div className="flex items-center gap-2 pt-2">
          <span className="font-bold">{formatPrice(product.price)}</span>

          {product.originalPrice && (
            <span className="text-xs line-through text-muted-foreground">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </CardContent>

      {/* ACTIONS - FIXED FOOTER HEIGHT */}
      <div className="p-3 pt-0 space-y-2">
        <Button
          onClick={handleAdd}
          disabled={!inStock}
          size="sm"
          className="w-full"
        >
          افزودن به سبد
        </Button>

        {quantity > 0 && cartItem && (
          <div className="flex items-center justify-between bg-muted rounded-md p-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => decrease(cartItem.key)}
            >
              -
            </Button>

            <span className="text-sm">{quantity}</span>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => increase(cartItem.key)}
            >
              +
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
