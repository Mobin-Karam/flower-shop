import { Product, ProductVariant } from "@/lib/types";
import { Separator } from "@/app/components/ui/separator";
import { Eye, ShoppingCart, Star } from "lucide-react";
import ProductStory from "./ProductStory";
import ProductVariants from "./ProductVariants";
import ProductPricing from "./ProductPricing";

export default function ProductInfo({
  product,
  variant,
  setVariant,
}: {
  product: Product;
  variant?: ProductVariant;
  setVariant: (v: ProductVariant) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          {product.description}
        </p>
      </div>

      <ProductStory product={product} />

      <div className="text-xs text-muted-foreground flex gap-3">
        <span>{product.brand}</span>
        <span>•</span>
        <span>{product.category}</span>
      </div>

      <Separator />

      <ProductPricing product={product} variant={variant} />

      <ProductVariants
        product={product}
        variant={variant}
        setVariant={setVariant}
      />

      <div className="text-xs flex gap-3 text-muted-foreground">
        <span className="flex items-center gap-1">
          <Eye size={14} /> {product.viewCount ?? 0}
        </span>
        <span className="flex items-center gap-1">
          <ShoppingCart size={14} /> {product.purchaseCount ?? 0}
        </span>
        <span className="flex items-center gap-1">
          <Star size={14} /> {product.rating ?? 0}
        </span>
      </div>
    </div>
  );
}
