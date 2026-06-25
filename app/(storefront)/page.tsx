import HeroCarousel from "./components/hero-carousel";
import DealsRail from "./components/deals-rail";
import CTASection2 from "../components/cta-section2";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      {/* ================= HERO ================= */}
      <section className="container-custom pt-6 pb-10">
        <HeroCarousel />
      </section>

      {/* ================= URGENCY / DEALS ================= */}
      <section
        className="
          container-custom
          py-10
          border-t border-border/50
        "
      >
        <div className="space-y-6">
          <DealsRail title="پیشنهادهای ویژه امروز" />
        </div>
      </section>

      {/* ================= CONVERSION CTA ================= */}
      <section
        className="
          container-custom
          py-14
          border-t border-border/50
          bg-secondary/30
        "
      >
        <CTASection2 />
      </section>
    </main>
  );
}
