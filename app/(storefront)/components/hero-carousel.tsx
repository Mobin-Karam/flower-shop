"use client";

import Image from "next/image";

export default function HeroCarousel() {
  return (
    <section className="w-full px-3 sm:px-6">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center">
        {/* Banner 1 */}
        <div className="w-full md:w-auto flex justify-center">
          <Image
            src="/banners/banner1.png"
            alt="انواع محصولات کردستان"
            width={600}
            height={90}
            className="rounded-2xl w-full max-w-[600px] h-auto object-contain"
          />
        </div>

        {/* Banner 2 */}
        <div className="w-full md:w-auto md:flex justify-center hidden ">
          <Image
            src="/banners/banner2.png"
            alt="انواع محصولات کردستان"
            width={600}
            height={400}
            className="rounded-2xl w-full max-w-[600px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
