"use client";

import { useRef } from "react";
import { uiProducts } from "@/app/data/products.ui";
import ProductCardHome from "@/app/components/product-card-home";

export default function DealsRail({ title }: { title: string }) {
  const products = uiProducts.filter((p) => p.discountPercent > 0).slice(0, 8);

  const ref = useRef<HTMLDivElement | null>(null);

  const state = useRef({
    isDown: false,
    startX: 0,
    scrollStart: 0,
    velocity: 0,
    lastX: 0,
    raf: 0,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;

    state.current.isDown = true;
    state.current.startX = e.clientX;
    state.current.scrollStart = el.scrollLeft;
    state.current.lastX = e.clientX;

    cancelAnimationFrame(state.current.raf);

    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    const s = state.current;
    if (!el || !s.isDown) return;

    const dx = e.clientX - s.startX;

    el.scrollLeft = s.scrollStart - dx;

    // smooth velocity tracking
    s.velocity = e.clientX - s.lastX;
    s.lastX = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = ref.current;
    const s = state.current;
    if (!el) return;

    s.isDown = false;
    el.releasePointerCapture(e.pointerId);

    const inertia = () => {
      if (Math.abs(s.velocity) < 0.2) return;

      el.scrollLeft -= s.velocity * 2.2;

      s.velocity *= 0.9;

      s.raf = requestAnimationFrame(inertia);
    };

    s.raf = requestAnimationFrame(inertia);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div
        ref={ref}
        className="
          flex gap-4 overflow-x-auto
          cursor-grab active:cursor-grabbing
          select-none
          snap-x snap-mandatory
          scroll-smooth
          pb-2
          touch-pan-x
        "
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[220px] snap-start">
            <ProductCardHome product={product as any} />
          </div>
        ))}
      </div>
    </div>
  );
}
