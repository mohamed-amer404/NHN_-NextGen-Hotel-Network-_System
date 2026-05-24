import React from "react";
import HeroSection from "../../components/HomeComponents/HeroSection/HeroSection";
import SignatureSuites from "../../components/HomeComponents/SignatureSuites/SignatureSuites";
import Amenities from "../../components/HomeComponents/Amenities/Amenities";
import Gallery from "../../components/HomeComponents/Gallery/Gallery";
import Statistics from "../../components/AboutComponents/Statistics/Statistics";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <SignatureSuites />
      <Amenities />
      <Gallery />
      {/* <Statistics /> */}
    </div>
  );
}

export default Home;
