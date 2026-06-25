"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Home, ShoppingBag, Phone, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cart-store";

import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const count = useCartStore((s) => s.getTotalItems());
  const [mounted, setMounted] = useState(false);

  const activeLayer = useUIStore((s) => s.activeLayer);

  const hidden = activeLayer === "cart-cta";

  useEffect(() => setMounted(true), []);

  const navItems = useMemo(
    () => [
      { href: "/", label: "خانه", icon: Home },
      { href: "/shop", label: "فروشگاه", icon: ShoppingBag },
      {
        href: "/cart",
        label: "سبد",
        icon: ShoppingCart,
        badge: true,
      },
      { href: "/contact", label: "تماس", icon: Phone },
    ],
    [],
  );

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 transition-all ${
        hidden ? "opacity-40 pointer-events-none" : ""
      }`}
    >
      <div className="md:hidden fixed bottom-0 inset-x-0 z-70 px-4">
        <nav
          className="
          mx-auto max-w-md
          rounded-2xl
          border
          bg-background/80
          backdrop-blur-xl
          shadow-lg
          supports-backdrop-filter:bg-background/60
        "
        >
          <div className="grid grid-cols-4 h-16">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-1",
                    "transition-colors active:scale-95",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <div className="relative">
                    <Icon
                      size={22}
                      className={cn(
                        "transition-transform",
                        active && "scale-110",
                      )}
                    />

                    {item.badge && mounted && count > 0 && (
                      <Badge
                        className="
                        absolute -top-2 -right-3
                        h-5 min-w-5 px-1
                        text-[10px]
                        flex items-center justify-center
                      "
                      >
                        {count > 9 ? "9+" : count}
                      </Badge>
                    )}
                  </div>

                  <span className="text-[11px] leading-none">{item.label}</span>

                  {/* active indicator */}
                  {active && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
