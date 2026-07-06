"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/app/components/ui/carousel";
import { cn } from "@/lib/utils";

const banners = [
  {
    src: "/banners/banner1.png",
    alt: "انواع محصولات کردستان",
    width: 1200,
    height: 400,
  },
  {
    src: "/banners/banner2.png",
    alt: "محصولات طبیعی هورامان",
    width: 1200,
    height: 400,
  },
];

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, direction: "rtl" }}
        plugins={[plugin]}
        className="w-full"
      >
        <CarouselContent className="w-full">
          {banners.map((banner, index) => (
            <CarouselItem key={banner.src} className="w-full">
              <div className="relative w-full aspect-[3/1] sm:aspect-[4/1] md:aspect-[5/1]">
                {!loaded[index] && (
                  <div className="absolute inset-0 rounded-2xl bg-muted animate-pulse" />
                )}
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  priority={index === 0}
                  onLoadingComplete={() =>
                    setLoaded((prev) => ({ ...prev, [index]: true }))
                  }
                  className={cn(
                    "rounded-2xl object-cover transition-opacity duration-500",
                    loaded[index] ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      {api && banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api.scrollTo(index)}
              aria-label={`Slide ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                current === index
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
