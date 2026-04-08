import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ProductDemo from "@/components/ProductDemo";
import WhyBarty from "@/components/WhyBarty";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import CtaFooter from "@/components/CtaFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <ProductDemo />
        <WhyBarty />
        <PricingSection />
        <Testimonials />
        <FaqSection />
      </main>
      <CtaFooter />
    </div>
  );
};

export default Index;
