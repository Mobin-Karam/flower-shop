"use client";

import { useCartStore } from "../store/cart-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartCTA() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);

  const [visible, setVisible] = useState(false);

  const totalItems = items.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    if (totalItems > 0) {
      setVisible(true);
    }
  }, [totalItems]);

  if (!visible || totalItems === 0) return null;

 return (
  <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
    <div className="w-full max-w-md bg-[#2f6f5e] text-white rounded-full shadow-lg flex items-center justify-between px-5 py-3">
      
      <span className="text-sm">
        {totalItems} محصول در سبد
      </span>

      <button
        onClick={() => router.push("/cart")}
        className="bg-white text-[#2f6f5e] px-4 py-1 rounded-full text-sm font-semibold"
      >
        رفتن به سبد
      </button>
    </div>
  </div>
);
}