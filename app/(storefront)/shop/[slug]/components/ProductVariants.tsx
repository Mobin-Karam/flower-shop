import { Product, ProductVariant } from "@/lib/types";
import { Button } from "@/app/components/ui/button";

export default function ProductVariants({
  product,
  variant,
  setVariant,
}: {
  product: Product;
  variant?: ProductVariant;
  setVariant: (v: ProductVariant) => void;
}) {
  if (!product.hasVariants || !product.variants?.length) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {product.variants.map((v) => (
        <Button
          key={v.id}
          size="sm"
          variant={variant?.id === v.id ? "default" : "outline"}
          onClick={() => setVariant(v)}
        >
          {v.name}
        </Button>
      ))}
    </div>
  );
}