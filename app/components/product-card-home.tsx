"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";

import { formatPrice } from "../../lib/format";
import { Product } from "@/lib/types";

import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

type Props = {
  product: Product;
};

export default function ProductCardHome({ product }: Props) {

  const inStock = product.inStock === true && (product.stockQuantity ?? 0) > 0;

  const discountPercent = product.discountPercent ?? 0;


  return (
    <Card
      className="
        w-full
        max-w-55 sm:max-w-60 md:max-w-65
        flex flex-col
        overflow-hidden
        shrink-0
        hover:shadow-md transition
        rounded-xl
      "
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3] sm:aspect-square">
        <Link href={`/shop/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 260px"
          />
        </Link>

        {/* BADGES */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {discountPercent > 0 && (
            <Badge variant="destructive" className="text-[10px] sm:text-xs">
              ٪{discountPercent}
            </Badge>
          )}
          {product.isNew && (
            <Badge variant="secondary" className="text-[10px] sm:text-xs">
              جدید
            </Badge>
          )}
          {product.isBestseller && (
            <Badge className="text-[10px] sm:text-xs">پرفروش</Badge>
          )}
        </div>

        {/* OUT OF STOCK */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs sm:text-sm">
            ناموجود
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-2 sm:p-3 gap-1.5 sm:gap-2">
        {/* TITLE */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-semibold line-clamp-2 min-h-[36px] sm:min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 min-h-[28px] sm:min-h-[32px]">
          {product.description}
        </p>

        {/* SHIPPING */}
        {product.freeShipping && (
          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-green-600">
            <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            ارسال رایگان
          </div>
        )}

        <div className="flex-1" />

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs sm:text-sm">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && (
            <span className="text-[10px] sm:text-xs line-through text-muted-foreground">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
