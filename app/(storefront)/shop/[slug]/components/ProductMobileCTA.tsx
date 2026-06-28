import { Product, ProductVariant } from "@/lib/types";
import { Button } from "@/app/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";

import { useCartStore } from "@/app/store/cart-store";
import { formatPrice } from "@/lib/format";

export default function ProductMobileCTA({
  product,
  variant,
}: {
  product: Product;
  variant?: ProductVariant;
}) {
  const { addItem, increase, decrease, getKey, items } = useCartStore();

  const cartKey = getKey(product.id, variant?.id);
  const qty = items.find((i) => i.key === cartKey)?.quantity ?? 0;

  const price = variant?.price ?? product.price;

  const inStock =
    product.inStock !== false &&
    (variant?.stock ?? product.stockQuantity ?? 0) > 0;

  const handleAdd = () => {
    if (!inStock) return;
    addItem({ product, variantId: variant?.id, quantity: 1 });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
      <div className="border-t bg-background/95 backdrop-blur-xl px-4 py-3 flex items-center justify-between gap-3">

        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">قیمت</span>
          <span className="font-bold">{formatPrice(price)}</span>
        </div>

        {qty === 0 ? (
          <Button
            className="flex-1 flex items-center gap-2"
            disabled={!inStock}
            onClick={handleAdd}
          >
            <ShoppingCart size={18} />
            افزودن به سبد
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={() => decrease(cartKey)}>
              <Minus size={16} />
            </Button>
            <span>{qty}</span>
            <Button size="icon" variant="ghost" onClick={() => increase(cartKey)}>
              <Plus size={16} />
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}