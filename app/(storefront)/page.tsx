import CTASection from "@/app/components/cta-section";
import HeroCarousel from "./components/hero-carousel";

import DealsRail from "./components/deals-rail";
import CTASection2 from "../components/cta-section2";
import { AnnouncementBanner } from "./components/announcement-banner";

export default function HomePage() {
  return (
    <main className="space-y-10 gradient-bg">
      {/* 1. TOP HERO (carousel + search like Amazon/Digikala) */}
      <section className="container-custom pt-6">
        <HeroCarousel />

      </section>

      {/* 2. CATEGORY STRIP (quick navigation like Digikala) */}
      {/* <section className="container-custom">
        <CategoryStrip />
      </section> */}

      {/* 3. PROMO BANNERS (high CTR blocks) */}
      {/* <section className="container-custom">
        <BannerGrid />
      </section> */}

      {/* 4. DEALS (urgency system) */}
      <section className="container-custom">
        <DealsRail title="پیشنهادهای ویژه امروز" />
      </section>

      {/* 5. BEST SELLERS */}
      {/* <section className="container-custom">
        <ProductRail
          title="پرفروش‌ترین‌ها"
          endpoint="/api/products?sort=sales"
        />
      </section> */}

      {/* 6. NEW ARRIVALS */}
      {/* <section className="container-custom">
        <ProductRail
          title="جدیدترین محصولات"
          endpoint="/api/products?sort=latest"
        />
      </section> */}

      {/* 7. CATEGORY-BASED COLLECTIONS */}
      {/* <section className="container-custom">
        <CollectionsRail />
      </section> */}

      {/* 8. SECONDARY PROMO BANNER */}

      <CTASection2 />
    </main>
  );
}
