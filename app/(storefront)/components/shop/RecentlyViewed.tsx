"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { getPricing } from "@/lib/pricing";
import { Clock } from "lucide-react";

type Props = {
  products: Product[];
};

export default function RecentlyViewed({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-muted-foreground" />
        <h2 className="text-base font-semibold">اخیراً مشاهده شده</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((product) => {
          const { finalPrice } = getPricing(product);
          return (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="flex-shrink-0 w-36 group"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted border border-border group-hover:border-primary/40 transition">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="text-xs font-medium mt-1.5 line-clamp-2 group-hover:text-primary transition">
                {product.name}
              </p>
              <p className="text-xs text-primary font-bold mt-0.5">
                {formatPrice(finalPrice)}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
