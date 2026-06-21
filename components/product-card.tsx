"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((s) => s.items);

  const inCart = items.find((i) => i.id === product.id);

  const handleAdd = () => {
    addItem(product);
    toast.success("به سبد خرید اضافه شد 🛒");
  };

  return (
    <div
      dir="rtl"
      className="
        group
        bg-white
        rounded-2xl
        border
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        overflow-hidden
        flex flex-col
      "
    >
      {/* IMAGE */}
      <Link href={`/shop/${product.slug}`} className="relative block">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="
              object-cover
              group-hover:scale-105
              transition-transform
              duration-300
            "
          />
        </div>

        {/* badge */}
        {inCart && (
          <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            در سبد ({inCart.quantity})
          </span>
        )}
      </Link>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        {/* TITLE */}
        <h3 className="font-semibold text-base line-clamp-2 text-gray-900">
          {product.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* PRICE */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-pink-600">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto pt-4 flex gap-2">
          <Link
            href={`/shop/${product.slug}`}
            className="
              flex-1
              text-center
              text-sm
              py-2
              rounded-xl
              border
              border-gray-300
              hover:bg-gray-50
              transition
            "
          >
            جزئیات
          </Link>

          <button
            onClick={handleAdd}
            className="
              flex-1
              text-sm
              py-2
              rounded-xl
              bg-pink-600
              text-white
              hover:bg-pink-700
              active:scale-95
              transition
            "
          >
            افزودن
          </button>
        </div>
      </div>
    </div>
  );
}
