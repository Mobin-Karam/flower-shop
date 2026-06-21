"use client";

import { useCartStore } from "@/store/cart-store";

import CartItem from "@/components/cart-item";

import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  const total = useCartStore((s) => s.getTotalPrice());

  const clear = useCartStore((s) => s.clearCart);

  return (
    <div className="section">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center">Your Cart</h1>

        <div className="mt-10 grid gap-4">
          {items.length === 0 ? (
            <>
              <p className="text-center text-gray-500">Your cart is empty</p>
              <div className="text-center mt-10">
                <p className="text-gray-500">
                  Start adding beautiful flowers 🌸
                </p>

                <Link href="/shop" className="btn-primary mt-4 inline-block">
                  Go Shopping
                </Link>
              </div>
            </>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div
            className="
            mt-10
            p-6
            border
            rounded-2xl
            bg-white
            "
          >
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={clear}
                className="
                px-4
                py-2
                border
                rounded-xl
                "
              >
                Clear Cart
              </button>

              <Link
                href="/checkout"
                className="
                ml-auto
                btn-primary
                "
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
