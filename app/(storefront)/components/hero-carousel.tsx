"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    title: "دمنوش‌های طبیعی آرامش‌بخش",
    subtitle: "ارسال سریع به سراسر کشور",
    image: "/banners/banner1.png",
  },
  {
    title: "گل محمدی ممتاز کردستان",
    subtitle: "کیفیت صادراتی",
    image: "/banners/banner1.png",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  // simple autoplay
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full px-4 md:px-0">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-md">
        {/* SLIDES WRAPPER */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <Link key={i} href="/categories" className="min-w-full relative">
              {/* RESPONSIVE IMAGE CONTAINER */}
              <div className="relative w-full aspect-[3/2] md:aspect-[16/9] lg:aspect-[3/2]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 md:p-8 text-white">
                <h3 className="text-lg md:text-3xl font-bold">{slide.title}</h3>
                <p className="text-sm md:text-base opacity-90">
                  {slide.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
