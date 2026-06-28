import { Product } from "@/lib/types";
import { Card, CardContent } from "@/app/components/ui/card";

export default function ProductStory({ product }: { product: Product }) {
  if (!product.story) return null;

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-4 space-y-3">
        <h2 className="text-sm font-semibold">داستان محصول</h2>

        <div className="text-xs space-y-2 text-muted-foreground leading-relaxed">
          <p>
            <span className="font-medium text-foreground">منشأ:</span>{" "}
            {product.story.origin}
          </p>

          <p>
            <span className="font-medium text-foreground">فرآیند تولید:</span>{" "}
            {product.story.production}
          </p>

          <p>
            <span className="font-medium text-foreground">معنا:</span>{" "}
            {product.story.meaning}
          </p>

          <p>
            <span className="font-medium text-foreground">سازنده:</span>{" "}
            {product.story.maker}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}