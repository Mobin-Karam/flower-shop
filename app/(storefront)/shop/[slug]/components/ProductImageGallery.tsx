"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ImageLightbox } from "../ImageLightbox";
import { Heart, MapPin } from "lucide-react";

export default function ProductImageGallery({
  product,
  liked,
  setLiked,
}: {
  product: Product;
  liked: boolean;
  setLiked: (v: boolean | ((v: boolean) => boolean)) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => {
    return product.images?.length ? product.images : [product.image];
  }, [product]);

  return (
    <div className="space-y-3">
      <Card>
        <CardContent className="p-0 relative aspect-square">
          <ImageLightbox images={images} alt={product.name} initialIndex={0}>
            <Image
              src={images[activeIndex]}
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
              {product.category}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, index) => (
          <button
            key={img}
            onClick={() => setActiveIndex(index)}
            className={[
              "relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border",
              index === activeIndex ? "border-primary" : "border-border",
            ].join(" ")}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}