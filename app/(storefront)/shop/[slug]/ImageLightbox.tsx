"use client";

import * as React from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";

type Props = {
  images: string[];
  alt: string;
  children: React.ReactNode;
  initialIndex?: number;
};

export function ImageLightbox({
  images = [],
  alt,
  children,
  initialIndex = 0,
}: Props) {
  const safeImages =
    images && images.length > 0 ? images : ["/placeholder.png"];

  const [index, setIndex] = React.useState(initialIndex);

  const current = safeImages[index];

  const next = () => {
    setIndex((i) => (i + 1 < safeImages.length ? i + 1 : 0));
  };

  const prev = () => {
    setIndex((i) => (i - 1 >= 0 ? i - 1 : safeImages.length - 1));
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-6xl p-0 overflow-hidden bg-black/95 border-none">
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          <Image
            src={current}
            alt={alt}
            fill
            className="object-contain"
            priority
          />

          {safeImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 text-white text-3xl"
              >
                ‹
              </button>

              <button
                onClick={next}
                className="absolute right-3 text-white text-3xl"
              >
                ›
              </button>
            </>
          )}
        </div>

        {safeImages.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto bg-black/80">
            {safeImages.map((img, i) => (
              <button
                key={img}
                onClick={() => setIndex(i)}
                className={`relative w-16 h-16 shrink-0 border rounded-md overflow-hidden ${
                  i === index ? "border-white" : "border-transparent"
                }`}
              >
                <Image src={img} alt={alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
