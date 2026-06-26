"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { Home, ShoppingBag, Phone, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cart-store";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/app/store/ui-store";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const count = useCartStore((s) => s.getTotalItems());

  const activeLayer = useUIStore((s) => s.activeLayer);
  const hidden = activeLayer === "cart-cta";

  const [mounted, setMounted] = useState(false);
  const [style, setStyle] = useState({ left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => setMounted(true), []);

  const navItems = useMemo(
    () => [
      { href: "/", label: "خانه", icon: Home },
      { href: "/shop", label: "فروشگاه", icon: ShoppingBag },
      { href: "/cart", label: "سبد", icon: ShoppingCart, badge: true },
      { href: "/contact", label: "تماس", icon: Phone },
    ],
    [],
  );

  const updateIndicator = (index: number) => {
    const el = itemRefs.current[index];
    const container = containerRef.current;

    if (!el || !container) return;

    const containerRect = container.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    setStyle({
      left: rect.left - containerRect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    const idx = navItems.findIndex((i) => i.href === pathname);
    if (idx >= 0) updateIndicator(idx);
  }, [pathname, navItems]);

  return (
    <div
      className={cn(
        "md:hidden fixed inset-x-0 bottom-0 z-50 px-4 pb-[env(safe-area-inset-bottom)]",
        hidden && "opacity-40 pointer-events-none",
      )}
    >
      <nav
        ref={containerRef}
        className="
          relative mx-auto max-w-md
          rounded-2xl border
          bg-background/80 backdrop-blur-xl
          shadow-lg
          overflow-hidden
        "
      >
        {/* REAL POSITION PILL */}
        <div
          className="
            absolute top-1 bottom-1
            rounded-xl
            bg-primary/15
            transition-all duration-300 ease-out
          "
          style={{
            left: style.left,
            width: style.width,
          }}
        />

        <div className="relative grid grid-cols-4 h-16">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onClick={() => updateIndicator(i)}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1",
                  "transition active:scale-95",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <div className="relative">
                  <Icon size={22} className={active ? "scale-110" : ""} />

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

                <span className="text-[11px] leading-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}