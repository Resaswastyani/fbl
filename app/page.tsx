import { Header } from "@/components/Header";
import { ProductTeaserCard } from "@/components/ProductTeaserCard";
import { BankingScaleHero } from "@/components/BankingScaleHero";
import ForexCarousel from "@/components/ForexCarousel";
import CourseSection from "@/components/CourseSection";
import { ForexTestimonials } from "@/components/CaseStudiesCarousel";
import { IntegrationCarousel } from "@/components/IntegrationCarousel";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      {/* <Header /> */}
      <ProductTeaserCard />
      <BankingScaleHero />
      <ForexCarousel />
      {/* <CourseSection /> */}
      <ForexTestimonials />
      <IntegrationCarousel />
      <PricingSection />
      <FAQSection />
      {/* <Footer /> */}
    </>
  );
}
