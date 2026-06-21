"use client";

import Link from "next/link";
import { Home, ShoppingBag, Phone, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

export default function MobileBottomNav() {
  const count = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-rose-50 border-t border-rose-100 shadow-lg">
      <div className="grid grid-cols-4 items-center h-16 text-rose-900">

        {/* Home */}
        <Link href="/" className="flex flex-col items-center justify-center text-xs">
          <Home size={20} />
          خانه
        </Link>

        {/* Shop */}
        <Link href="/shop" className="flex flex-col items-center justify-center text-xs">
          <ShoppingBag size={20} />
          فروشگاه
        </Link>

        {/* Cart (CENTER) */}
        <Link
          href="/cart"
          className="relative flex flex-col items-center justify-center text-xs"
        >
          <div className="relative">
            <ShoppingCart size={22} />
            {mounted && count > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] bg-rose-600 text-white h-4 w-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          سبد
        </Link>

        {/* Contact */}
        <Link href="/contact" className="flex flex-col items-center justify-center text-xs">
          <Phone size={20} />
          تماس
        </Link>

      </div>
    </div>
  );
}