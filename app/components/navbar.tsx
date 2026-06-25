"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flower2, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cart-store";
import Image from "next/image";

export default function Navbar() {
  const count = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-rose-50/70 backdrop-blur-md border-b border-rose-100">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
            <span className="font-semibold tracking-wide text-rose-900">
             گلیفای
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-rose-900 font-medium">
            <Link className="hover:text-rose-600 transition" href="/">
              خانه
            </Link>

            <Link className="hover:text-rose-600 transition" href="/shop">
              فروشگاه
            </Link>

            <Link className="hover:text-rose-600 transition" href="/contact">
              تماس
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-2">
              <ShoppingCart size={18} />
              سبد خرید
              {mounted && count > 0 && (
                <span className="absolute -top-2 -right-4 text-xs bg-rose-600 text-white h-5 w-5 rounded-full flex items-center justify-center shadow-md">
                  {count}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
