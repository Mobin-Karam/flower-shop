"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

export default function ProductCard({ product }: any) {
  const addItem = useCartStore((s) => s.addItem);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const items = useCartStore((s) => s.items);

  const cartItem = items.find((i: any) => i.id === product.id);
  const quantity = cartItem?.quantity || 0;

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

  return (
    <div className="card rounded-3xl overflow-hidden flex flex-col" dir="rtl">
      <Link href={`/shop/${product.slug}`} className="relative">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold">{product.name}</h3>

        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>

        <div className="mt-3 font-bold text-pink-600">
          ${product.price}
        </div>

        <div className="mt-auto pt-4">
          {quantity === 0 ? (
            <div className="flex gap-2">
              <Link
                className="flex-1 border rounded-xl py-2 text-center"
                href={`/shop/${product.slug}`}
              >
                جزئیات
              </Link>

              <button onClick={handleAdd} className="flex-1 btn-primary">
                افزودن
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between border rounded-xl p-2">
              <button
                onClick={handleDecrease}
                className="w-10 h-10 text-xl font-bold"
              >
                −
              </button>

              <span className="font-semibold">{quantity}</span>

              <button
                onClick={handleIncrease}
                className="w-10 h-10 text-xl font-bold"
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