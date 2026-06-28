import { Product, ProductVariant } from "@/lib/types";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Minus, Plus } from "lucide-react";

import { useCartStore } from "@/app/store/cart-store";

export default function ProductActions({
  product,
  variant,
}: {
  product: Product;
  variant?: ProductVariant;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const getKey = useCartStore((s) => s.getKey);
  const items = useCartStore((s) => s.items);

  const cartKey = getKey(product.id, variant?.id);
  const qty = items.find((i) => i.key === cartKey)?.quantity ?? 0;

  const stock = variant?.stock ?? product.stockQuantity ?? 0;
  const inStock = product.inStock !== false && stock > 0;

  const handleAdd = () => {
    if (!inStock) return;
    addItem({ product, variantId: variant?.id, quantity: 1 });
  };

  return (
    <div className="hidden lg:block lg:sticky lg:top-24">
      <Card>
        <CardContent className="p-4 space-y-4">

          {qty === 0 ? (
            <Button className="w-full" disabled={!inStock} onClick={handleAdd}>
              افزودن به سبد
            </Button>
          ) : (
            <div className="flex justify-between border rounded-xl p-2">
              <Button size="icon" variant="outline" onClick={() => decrease(cartKey)}>
                <Minus size={16} />
              </Button>
              <span>{qty}</span>
              <Button size="icon" variant="outline" onClick={() => increase(cartKey)}>
                <Plus size={16} />
              </Button>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}