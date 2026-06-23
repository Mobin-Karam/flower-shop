"use client";

import Link from "next/link";
import { Home, ShoppingBag, Phone, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const count = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/", label: "خانه", icon: Home },
    { href: "/shop", label: "فروشگاه", icon: ShoppingBag },
    { href: "/cart", label: "سبد", icon: ShoppingCart, badge: true },
    { href: "/contact", label: "تماس", icon: Phone },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-md">
        <nav
          className="grid grid-cols-4 items-center h-16 rounded-2xl
          backdrop-blur-xl bg-white/80 shadow-lg border border-white/40"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center text-[11px] transition-all duration-200 active:scale-95
                  ${
                    isActive
                      ? "text-(--primary)"
                      : "text-(--accent)/70"
                  }
                `}
              >
                <div className="relative">
                  <Icon
                    size={22}
                    className={`transition-transform duration-200 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  />

                  {item.badge && mounted && count > 0 && (
                    <span
                      className="absolute -top-2 -right-2 text-[10px]
                      bg-(--primary) text-white h-4 min-w-4 px-1
                      rounded-full flex items-center justify-center"
                    >
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </div>

                <span
                  className={`mt-1 transition ${
                    isActive ? "font-medium" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>

                {/* active indicator */}
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-(--primary)" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
