"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

import { useCartStore } from "@/app/store/cart-store";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { ScrollArea } from "@/app/components/ui/scroll-area";

export default function CartHover() {
  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeItem = useCartStore((s) => s.removeItem);
  const getTotalItems = useCartStore((s) => s.getTotalItems);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const count = mounted ? getTotalItems() : 0;

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [items],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* TRIGGER */}
      <PopoverTrigger asChild>
        <button
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="
            relative flex items-center gap-2
            px-3 py-2 rounded-full
            text-foreground/80
            hover:text-primary hover:bg-secondary
            transition
          "
        >
          <ShoppingCart size={18} />
          <span>سبد خرید</span>

          {/* IMPORTANT: always render span, no conditional mount */}
          <span
            className={`
              absolute -top-1 -right-1
              min-w-5 h-5 px-1
              flex items-center justify-center
              text-[11px] rounded-full
              bg-primary text-primary-foreground
              transition
              ${count === 0 ? "opacity-0 scale-90" : "opacity-100 scale-100"}
            `}
          >
            {count}
          </span>
        </button>
      </PopoverTrigger>

      {/* CONTENT */}
      <PopoverContent
        align="end"
        className="w-96 p-0 bg-card text-card-foreground border border-border"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <p className="font-medium">سبد خرید</p>
            <p className="text-xs text-muted-foreground">{count} آیتم</p>
          </div>
        </div>

        <ScrollArea className="max-h-72">
          {items.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              سبد خرید خالی است
            </div>
          ) : (
            <div className="p-3 space-y-3">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {item.quantity} × {item.unitPrice.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-1 mt-1">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => decrease(item.key)}
                      >
                        <Minus size={12} />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => increase(item.key)}
                      >
                        <Plus size={12} />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-6 w-6 ml-auto"
                        onClick={() => removeItem(item.key)}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <>
            <Separator />

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">جمع کل</span>
                <span className="font-medium">
                  {total.toLocaleString()} تومان
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href="/cart">مشاهده سبد</Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => useCartStore.getState().clearCart()}
                >
                  پاک کردن
                </Button>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
