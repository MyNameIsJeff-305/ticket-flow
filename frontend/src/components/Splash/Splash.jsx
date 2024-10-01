import HeroSection from "./Herosection";
import BenefitsSection from "./BenefitsSection";
import FeaturesSection from "./FeaturesSection";
// import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CtaSection";
import Footer from "./Footer";

import './Splash.css';
import Header from "./Header";

const Splash = () => {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
      <Footer />
    </div>
  );
}

export default Splash;
