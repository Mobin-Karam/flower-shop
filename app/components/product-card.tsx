"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";

import { useCartStore } from "../store/cart-store";
import { formatPrice } from "../../lib/format";

import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { AspectRatio } from "@/app/components/ui/aspect-ratio";
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
    <Card className="overflow-hidden flex flex-row-reverse md:flex-col hover:shadow-lg transition">
      {/* IMAGE */}
      <div className="relative w-32 sm:w-40 md:w-full shrink-0">
        <AspectRatio ratio={1}>
          <Link href={`/shop/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition"
            />
          </Link>
        </AspectRatio>

        {/* BADGES */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {discountPercent > 0 && (
            <Badge variant="destructive">٪{discountPercent}</Badge>
          )}
          {product.isNew && <Badge variant="secondary">جدید</Badge>}
          {product.isBestseller && <Badge>پرفروش</Badge>}
          {product.isFeatured && <Badge variant="outline">ویژه</Badge>}
        </div>

        {/* STOCK OVERLAY */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
            ناموجود
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex justify-between flex-col flex-1">
        <CardContent className="p-2 sm:p-3 flex flex-col gap-2">
          <StarRating
            rating={product.rating ?? 4.5}
            count={product.reviewCount ?? 0}
          />

          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-muted-foreground line-clamp-2">
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
        </CardContent>

        <div >
          <Separator/>

          {/* PRICE */}
          <div className="flex items-center gap-2 mt-1 justify-center">
            <span className="font-bold">{formatPrice(product.price)}</span>

            {product.originalPrice && (
              <span className="text-xs line-through text-muted-foreground">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {/* ACTIONS */}
          <div className="p-2 flex flex-col gap-2">
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
        </div>
      </div>
    </Card>
  );
}
