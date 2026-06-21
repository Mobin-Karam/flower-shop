"use client";

import CheckoutForm from "@/components/checkout-form";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="section text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>

        <Link href="/shop" className="btn-primary mt-6 inline-block">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container-custom grid md:grid-cols-2 gap-10">
        {/* FORM */}
        <div>
          <h1 className="text-4xl font-bold mb-6">Checkout</h1>

          <CheckoutForm />
        </div>

        {/* ORDER SUMMARY */}
        <div className="border p-6 rounded-2xl bg-white">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {items.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>
                {item.name} x{item.quantity}
              </span>

              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${useCartStore.getState().getTotalPrice()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
