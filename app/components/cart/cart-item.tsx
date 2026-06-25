"use client";

import Image from "next/image";
import { CartItem as Item } from "../../../lib/types";
import { useCartStore } from "../../store/cart-store";
import { formatPrice } from "../../../lib/format";

import { Button } from "@/app/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

type Props = {
  item: Item;
};

export default function CartItem({ item }: Props) {
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const remove = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 p-4 rounded-xl border border-border bg-card transition hover:bg-muted/30">
      {/* IMAGE */}
      <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-border">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold line-clamp-2">{item.name}</h3>

          <p className="text-xs text-muted-foreground mt-1">
            {item.variantName ?? ""}
          </p>

          <p className="text-sm font-medium mt-2">
            {formatPrice(item.unitPrice)}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 mt-3">
          {/* QUANTITY CONTROL */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => decrease(item.key)}
              className="hover:bg-muted"
            >
              <Minus size={16} />
            </Button>

            <span className="w-10 text-center text-sm">{item.quantity}</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => increase(item.key)}
              className="hover:bg-muted"
            >
              <Plus size={16} />
            </Button>
          </div>

          {/* DELETE */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => remove(item.key)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
