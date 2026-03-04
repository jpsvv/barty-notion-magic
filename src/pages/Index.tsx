import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyBarty from "@/components/WhyBarty";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import CtaFooter from "@/components/CtaFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <WhyBarty />
      <PricingSection />
      <Testimonials />
      <CtaFooter />
    </div>
  );
};

export default Index;
