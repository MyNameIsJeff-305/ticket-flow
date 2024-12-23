import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import HeroSection from "./Herosection";
import BenefitsSection from "./BenefitsSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CtaSection";
import Footer from "./Footer";

import './Splash.css';
import Header from "./Header";
import { useEffect } from "react";

const Splash = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      navigate('/dashboard');
    }
  }, [navigate, user])

  return (
    <div className="app">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Splash;
