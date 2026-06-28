import HeroCarousel from "./components/hero-carousel";
import DealsRail from "./components/deals-rail";
import CTASection2 from "../components/cta-section2";

import { products } from "@/lib/products"; // ← your dataset
import ProductCardHome from "../components/product-card-home";
import DealsClient from "./deals-client";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      {/* ================= HERO ================= */}
      <section className="container-custom pt-6 pb-10">
        <HeroCarousel />
      </section>

      {/* ================= DEALS ================= */}
      <section className="container-custom py-10 border-t border-border/50">
        <DealsClient />
      </section>

      {/* ================= CTA ================= */}
      <section className="container-custom py-14 border-t border-border/50 bg-secondary/30">
        <CTASection2 />
      </section>
    </main>
  );
}
