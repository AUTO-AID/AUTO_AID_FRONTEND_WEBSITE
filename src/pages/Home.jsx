import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServiceSection from "../components/ServiceSection";
import WhyChooseUs from "../components/WhyChooseUs";
import SalientFeatures from "../components/SalientFeatures";
import Footer from "../components/Footer";
import DownloadSection from"../components/DownloadSection";
import StatisticsSection from "../components/StatisticsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServiceSection/>
      <WhyChooseUs/>
      <SalientFeatures/>
      <StatisticsSection/>
      <ContactSection/>
      <TestimonialsSection/>
      <DownloadSection/>
      <Footer/>
    </>
  );
};

export default Home;
