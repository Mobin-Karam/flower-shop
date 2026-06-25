"use client";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

export default function HeroCarousel() {
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);

  return (
    <section className="w-full px-3 sm:px-6">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center">
        {/* Banner 1 */}
        <div className="w-full md:w-auto flex justify-center">
          <div className="w-full max-w-150">
            {!loaded1 && (
              <Skeleton height={90} borderRadius={16} className="w-full" />
            )}

            <Image
              src="/banners/banner1.png"
              alt="انواع محصولات کردستان"
              width={600}
              height={90}
              priority
              onLoadingComplete={() => setLoaded1(true)}
              className={`rounded-2xl w-full h-auto object-contain transition-opacity duration-300 ${
                loaded1 ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* Banner 2 */}
        <div className="w-full md:w-auto md:flex justify-center hidden">
          <div className="w-full max-w-150">
            {!loaded2 && (
              <Skeleton height={400} borderRadius={16} className="w-full" />
            )}

            <Image
              src="/banners/banner2.png"
              alt="انواع محصولات کردستان"
              width={600}
              height={400}
              onLoadingComplete={() => setLoaded2(true)}
              className={`rounded-2xl w-full h-auto object-contain transition-opacity duration-300 ${
                loaded2 ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
