import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { ProductTeaserCard } from "@/components/ProductTeaserCard";
import { ForexPhilosophyHero } from "@/components/ForexPhilosophyHero";
import { BankingScaleHero } from "@/components/BankingScaleHero";
import ForexCarousel from "@/components/ForexCarousel";
import CourseSection from "@/components/CourseSection";
import { ForexTestimonials } from "@/components/CaseStudiesCarousel";
import { IntegrationCarousel } from "@/components/IntegrationCarousel";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import RobotTradingHero from "@/components/RobotTradingHero";
import Footer from "@/components/Footer";
import { buildMetadata, JsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Forex for Better Living: Edukasi Forex & EA Trading",
  description:
    "Belajar forex dan trading dari nol bersama FBL: edukasi forex terpercaya, kursus trading, mentor profesional, dan EA trading MT4/MT5.",
  path: "/",
  absoluteTitle: true,
});

export default async function Page() {
  const t = await getTranslations("FAQ");
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [1, 2, 3, 4, 5, 6, 7].map((i) => ({
      "@type": "Question",
      name: t(`q${i}`),
      acceptedAnswer: { "@type": "Answer", text: t(`a${i}`) },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      {/* <Header /> */}
      <ProductTeaserCard />
      <ForexPhilosophyHero />
      <BankingScaleHero />
      <ForexCarousel />
      {/* <CourseSection /> */}
      <ForexTestimonials />
      {/* <RobotTradingHero /> */}
      <IntegrationCarousel />
      {/* <PricingSection /> */}
      <FAQSection />
      {/* <Footer /> */}
    </>
  );
}
