"use client";

import CartCTA from "@/app/components/cart/cart-cta";
import CartCTADesktop from "@/app/components/cart/cart-cta-desktop";
import { useEffect, useState } from "react";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px)");
    const update = () => setIsDesktop(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function CartCTAResponsive() {
  const isDesktop = useIsDesktop();

  if (isDesktop) return <CartCTADesktop />;
  return <CartCTA />;
}
