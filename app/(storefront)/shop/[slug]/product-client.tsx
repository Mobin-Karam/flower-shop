"use client";

import { useEffect, useMemo, useState } from "react";
import { Product, ProductVariant } from "@/lib/types";
import { useUIStore } from "@/app/store/ui-store";
import { useCartStore } from "@/app/store/cart-store";

import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductActions from "./components/ProductActions";
import ProductMobileCTA from "./components/ProductMobileCTA";

export default function ProductClient({ product }: { product: Product }) {
  const setActiveLayer = useUIStore((s) => s.setActiveLayer);

  const [liked, setLiked] = useState(false);

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
    defaultVariant
  );

  const activeVariant = product.hasVariants ? variant : undefined;

  return (
    <div className="bg-background pb-[160px] lg:pb-0">
      <div className="container-custom py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        <ProductImageGallery
          product={product}
          liked={liked}
          setLiked={setLiked}
        />

        <ProductInfo
          product={product}
          variant={activeVariant}
          setVariant={setVariant}
        />

        <ProductActions
          product={product}
          variant={activeVariant}
        />

      </div>

      <ProductMobileCTA product={product} variant={activeVariant} />
    </div>
  );
}