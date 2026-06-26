"use client";

import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

interface UseCarouselProps {
  emblaApi?: EmblaCarouselType;
  onSlideChange?: (index: number) => void;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export function useCarousel({
  emblaApi,
  onSlideChange,
  autoplay = true,
  autoplayDelay = 5000,
}: UseCarouselProps = {}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [totalSlides, setTotalSlides] = useState(0);

  const syncState = useCallback((api: EmblaCarouselType) => {
    const index = api.selectedScrollSnap();

    setSelectedIndex(index);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setTotalSlides(api.slideNodes().length);
  }, []);

  const onSelect = useCallback(
    (api: EmblaCarouselType) => {
      const index = api.selectedScrollSnap();

      setSelectedIndex(index);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());

      onSlideChange?.(index);
    },
    [onSlideChange],
  );

  // event binding
  useEffect(() => {
    if (!emblaApi) return;

    syncState(emblaApi);

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", syncState);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", syncState);
    };
  }, [emblaApi, onSelect, syncState]);

  // autoplay (stable + no memory leak)
  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, autoplayDelay);

    const container = emblaApi.containerNode();

    const stop = () => clearInterval(interval);

    container?.addEventListener("mouseenter", stop);
    container?.addEventListener("mouseleave", stop);

    return () => {
      clearInterval(interval);
      container?.removeEventListener("mouseenter", stop);
      container?.removeEventListener("mouseleave", stop);
    };
  }, [emblaApi, autoplay, autoplayDelay]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return {
    selectedIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
    canScrollPrev,
    canScrollNext,
    totalSlides,
  };
}
