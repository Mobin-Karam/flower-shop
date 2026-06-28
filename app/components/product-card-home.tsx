"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";

import { formatPrice } from "../../lib/format";
import { Product } from "@/lib/types";

import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

import { getPricing } from "@/lib/pricing";

type Props = {
  product: Product;
};

export default function ProductCardHome({ product }: Props) {
  const { finalPrice, originalPrice, discountPercent } = getPricing(product);

  const inStock = product.inStock === true && (product.stockQuantity ?? 0) > 0;

  const showOldPrice =
    typeof originalPrice === "number" && originalPrice > finalPrice;

  return (
    <Card className="w-full flex flex-col overflow-hidden">
      {/* IMAGE */}
      <div className="relative w-full aspect-square">
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
            <Badge className="bg-amber-600 text-white">
              ٪{discountPercent}
            </Badge>
          )}

          {product.isNew && <Badge variant="secondary">جدید</Badge>}
          {product.isBestseller && <Badge>پرفروش</Badge>}
        </div>

        {/* OUT OF STOCK */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
            ناموجود
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-2 flex flex-col gap-2">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>
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

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">{formatPrice(finalPrice)}</span>

          {showOldPrice && (
            <span className="text-xs line-through text-muted-foreground">
              {formatPrice(originalPrice!)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
