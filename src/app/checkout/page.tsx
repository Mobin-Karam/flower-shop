"use client";

import CheckoutForm from "@/components/checkout-form";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="section text-center" dir="rtl">
        <h1 className="text-2xl md:text-3xl font-bold">
          سبد خرید شما خالی است
        </h1>

        <Link href="/shop" className="btn-primary mt-6 inline-block">
          رفتن به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="section" dir="rtl">
      <div className="container-custom grid md:grid-cols-2 gap-8">
        {/* FORM */}
        <div className="card p-6 rounded-3xl">
          <h1 className="text-3xl font-bold mb-6">تکمیل سفارش</h1>
          <CheckoutForm />
        </div>

        {/* SUMMARY */}
        <div className="card p-6 rounded-3xl h-fit">
          <h2 className="text-xl font-bold mb-4">خلاصه سفارش</h2>

          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <div className="">
                  <span>{formatPrice(item.price * item.quantity)} </span>
                  <span className="">تومان</span>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold">
            <span>جمع کل</span>

            <div className="">
              <span>{formatPrice(useCartStore.getState().getTotalPrice())}</span>
              <span className=""> تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
