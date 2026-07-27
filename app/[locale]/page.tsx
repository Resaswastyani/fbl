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

export default function Page() {
  return (
    <>
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
