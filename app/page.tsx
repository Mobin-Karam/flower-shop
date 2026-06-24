import Hero from "../components/hero";

import Gallery from "../components/gallery";

import CTASection from "../components/cta-section";

import FeaturedProducts from "../components/featured-products";

export default function HomePage() {
  return (
    <>
      <Hero />

      <FeaturedProducts />

      <Gallery />

      <CTASection />
    </>
  );
}
