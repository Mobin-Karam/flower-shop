"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cart-store";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/app/components/ui/drawer";

import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";

import Image from "next/image";
import { useEffect } from "react";
import { useUIStore } from "@/app/store/ui-store";

export default function CartCTA() {
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((t, i) => t + i.quantity, 0);

  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const setActiveLayer = useUIStore((s) => s.setActiveLayer);

  useEffect(() => {
    if (totalItems === 0) setActiveLayer("nav");
  }, [totalItems, setActiveLayer]);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center px-4 md:justify-end">
      <Drawer
        onOpenChange={(open) => setActiveLayer(open ? "cart-cta" : "nav")}
      >
        <DrawerTrigger asChild>
          <button className="w-full max-w-md rounded-full bg-primary text-primary-foreground px-5 py-3 flex justify-between">
            <div>{totalItems} آیتم</div>
            <span>مشاهده</span>
          </button>
        </DrawerTrigger>

        <DrawerContent className="p-4 max-h-[85vh]">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3>سبد خرید</h3>
              <Button variant="destructive" size="sm" onClick={clearCart}>
                حذف همه
              </Button>
            </div>

            <ScrollArea className="h-[55vh]">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-3 border p-2 rounded-xl"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={56}
                    height={56}
                    className="rounded-md"
                  />

                  <div className="flex-1">{item.product.name}</div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeItem(item.key)}
                  >
                    حذف
                  </Button>
                </div>
              ))}
            </ScrollArea>

            <Separator />

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => router.push("/cart")}>سبد</Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/checkout")}
              >
                پرداخت
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
