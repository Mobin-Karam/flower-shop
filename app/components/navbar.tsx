"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useTheme } from "next-themes";
import { useCartStore } from "../store/cart-store";



import { Button } from "@/app/components/ui/button";
import ThemeToggle from "./theme/theme-toggle";
import CartHover from "./cart/cart-hover";

export default function Navbar() {
  const count = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-md
        bg-background/80
        border-b border-border
        supports-[backdrop-filter]:bg-background/60
      "
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo/logo.png"
              alt="Logo"
              width={42}
              height={42}
              className="object-contain"
            />

            <span
              className="
                font-semibold tracking-wide
                text-foreground
                group-hover:text-primary
                transition
              "
            >
              گلیفای
            </span>
          </Link>

          <div className="md:hidden flex">
            <ThemeToggle />
          </div>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-foreground/80">
            <Link className="hover:text-primary transition-colors" href="/">
              خانه
            </Link>

            <Link className="hover:text-primary transition-colors" href="/shop">
              فروشگاه
            </Link>

            <Link
              className="hover:text-primary transition-colors"
              href="/contact"
            >
              تماس
            </Link>

            {/* THEME SWITCHER */}
            <ThemeToggle />
            {/* CART */}
            <CartHover />
          </nav>
        </div>
      </div>
    </header>
  );
}
