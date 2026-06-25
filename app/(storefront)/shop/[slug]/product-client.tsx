"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";

import { Product, ProductVariant } from "@/lib/types";
import { ImageLightbox } from "./ImageLightbox";
import { useCartStore } from "@/app/store/cart-store";
import { formatPrice } from "@/lib/format";

import {
  Heart,
  Eye,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  MapPin,
} from "lucide-react";

import { useUIStore } from "@/store/ui-store";

export default function ProductClient({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const getKey = useCartStore((s) => s.getKey);
  const items = useCartStore((s) => s.items);

  const setActiveLayer = useUIStore((s) => s.setActiveLayer);
  const activeLayer = useUIStore((s) => s.activeLayer);

  const [liked, setLiked] = useState(false);

  /* ================= LAYER SYNC ================= */
  useEffect(() => {
    setActiveLayer("product-cta");
    return () => setActiveLayer("nav");
  }, [setActiveLayer]);

  /* ================= VARIANT ================= */
  const defaultVariant = useMemo(() => {
    if (!product.variants?.length) return undefined;
    return (
      product.variants.find((v) => v.id === product.defaultVariantId) ??
      product.variants[0]
    );
  }, [product]);

  const [variant, setVariant] = useState<ProductVariant | undefined>(
    defaultVariant,
  );

  const isVariantMode = Boolean(
    product.hasVariants && product.variants?.length,
  );
  const activeVariant = isVariantMode ? variant : undefined;

  /* ================= CART ================= */
  const cartKey = getKey(product.id, activeVariant?.id);
  const qty = items.find((i) => i.key === cartKey)?.quantity ?? 0;

  /* ================= PRICING ================= */
  const price = activeVariant?.price ?? product.price;

  /* ================= STOCK ================= */
  const stock = activeVariant?.stock ?? product.stockQuantity ?? 0;
  const inStock = product.inStock !== false && stock > 0;

  const handleAdd = () => {
    if (!inStock) return;
    addItem({ product, variantId: activeVariant?.id, quantity: 1 });
  };

  /* ================= IMAGES ================= */
  const lightBoxImages = useMemo(() => {
    if (activeVariant?.images?.length) return activeVariant.images;
    if (product.images?.length) return product.images;
    return [product.image];
  }, [activeVariant, product]);

  const [activeIndex, setActiveIndex] = useState(0);

  // reset index when images change (important for variants)
  useEffect(() => {
    setActiveIndex(0);
  }, [activeVariant, product.id]);

  return (
    <div className="bg-background pb-[160px] lg:pb-0">
      <div className="container-custom py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= IMAGE ================= */}
        <div className="space-y-3">
          <Card>
            <CardContent className="p-0 relative aspect-square">
              <ImageLightbox
                images={lightBoxImages}
                alt={product.name}
                initialIndex={activeIndex}
              >
                <Image
                  src={lightBoxImages[activeIndex]}
                  alt={product.name}
                  fill
                  className="object-cover cursor-zoom-in"
                  priority
                />
              </ImageLightbox>

              <Button
                size="icon"
                variant="secondary"
                className="absolute top-3 right-3 rounded-full"
                onClick={() => setLiked((v) => !v)}
              >
                <Heart />
              </Button>

              <div className="absolute top-3 left-3">
                <span className="text-xs bg-background/80 backdrop-blur px-2 py-1 rounded-full border flex items-center gap-1">
                  <MapPin size={12} />
                  محصول
                </span>
              </div>
            </CardContent>
          </Card>

          {/* ================= THUMBNAILS ================= */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {lightBoxImages.map((img, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={img}
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border transition",
                    isActive ? "border-primary" : "border-border",
                  ].join(" ")}
                  type="button"
                >
                  <Image
                    src={img}
                    alt={`image-${index}`}
                    fill
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= INFO ================= */}
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.description}</p>

          <Separator />

          <div className="text-2xl font-bold text-primary">
            {formatPrice(price)}
          </div>

          {isVariantMode && (
            <div className="flex gap-2 flex-wrap">
              {product.variants!.map((v) => (
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
          )}

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

        {/* ================= BUY ================= */}
        <div className="hidden lg:block lg:sticky lg:top-24">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="font-bold text-lg">{formatPrice(price)}</div>

              {qty === 0 ? (
                <Button
                  className="w-full"
                  disabled={!inStock}
                  onClick={handleAdd}
                >
                  افزودن به سبد
                </Button>
              ) : (
                <div className="flex justify-between border rounded-xl p-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => decrease(cartKey)}
                  >
                    <Minus size={16} />
                  </Button>
                  <span>{qty}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => increase(cartKey)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ================= MOBILE CTA ================= */}
      <div
        className={[
          "fixed bottom-0 left-0 right-0 md:hidden z-50",
          "transition-all duration-300",
          activeLayer !== "product-cta" &&
            "translate-y-24 opacity-0 pointer-events-none",
        ].join(" ")}
      >
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
              <Button
                size="icon"
                variant="ghost"
                onClick={() => decrease(cartKey)}
              >
                <Minus size={16} />
              </Button>
              <span>{qty}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => increase(cartKey)}
              >
                <Plus size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
