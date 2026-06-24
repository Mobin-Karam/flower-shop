"use client";

import { useCartStore } from "../../store/cart-store";
import CartItem from "../../components/cart-item";
import Link from "next/link";
import { formatPrice } from "../../lib/format";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.getTotalPrice());
  const clear = useCartStore((s) => s.clearCart);

  return (
    <div className="section" dir="rtl">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          سبد خرید شما 🛒
        </h1>

        {/* EMPTY STATE */}
        {items.length === 0 ? (
          <div className="mt-10 text-center card p-8">
            <p className="text-gray-500">سبد خرید شما هنوز خالی است</p>
            <p className="mt-2 text-sm text-gray-400">
              چند گل زیبا انتخاب کنید 🌸
            </p>

            <Link href="/shop" className="btn-primary mt-6 inline-block">
              رفتن به فروشگاه
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* SUMMARY CARD */}
            <div className="mt-8 card p-5 rounded-3xl sticky bottom-4 md:static">
              <div className="flex justify-between text-lg font-bold">
                <span>جمع کل</span>
                <span>{formatPrice(Number(total.toFixed(2)))}</span>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={clear}
                  className="flex-1 border rounded-xl py-3"
                >
                  پاک کردن
                </button>

                <Link
                  href="/checkout"
                  className="flex-1 btn-primary text-center"
                >
                  ادامه خرید
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
