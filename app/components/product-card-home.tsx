"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";

import { useCartStore } from "../store/cart-store";
import { formatPrice } from "../../lib/format";
import { Product } from "@/lib/types";

import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

type Props = {
  product: Product;
};

export default function ProductCardHome({ product }: Props) {
  const { addItem } = useCartStore();

  const inStock = product.inStock === true && (product.stockQuantity ?? 0) > 0;

  const discountPercent = product.discountPercent ?? 0;

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
        w-[200px] h-[360px]
        flex flex-col
        overflow-hidden
        shrink-0
        hover:shadow-md transition
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-[160px]">
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
        </div>

        {/* OUT OF STOCK */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
            ناموجود
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        {/* TITLE */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-semibold line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px]">
          {product.description}
        </p>

        {/* SHIPPING */}
        {product.freeShipping && (
          <div className="flex items-center gap-1 text-xs text-green-600">
            <Truck className="w-3.5 h-3.5" />
            ارسال رایگان
          </div>
        )}

        <div className="flex-1" />

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && (
            <span className="text-xs line-through text-muted-foreground">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* ACTION */}
        <Button
          size="sm"
          className="w-full mt-2"
          disabled={!inStock}
          onClick={handleAdd}
        >
          افزودن
        </Button>
      </div>
    </Card>
  );
}
