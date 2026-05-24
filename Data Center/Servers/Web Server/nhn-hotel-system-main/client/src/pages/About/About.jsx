import React from "react";
import AboutHero from "../../components/AboutComponents/AboutHero/AboutHero";
import OurStory from "../../components/AboutComponents/OurStory/OurStory";
import MissionVision from "../../components/AboutComponents/MissionVision/MissionVision";
import Statistics from "../../components/AboutComponents/Statistics/Statistics";
import WhyChooseUs from "../../components/AboutComponents/WhyChooseUs/WhyChooseUs";
import {
  heroContent,
  storyContent,
  missionVision,
  whyChooseUs,
} from "../../data/about.data";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <AboutHero title={heroContent.title} subtitle={heroContent.subtitle} />
      <OurStory
        title={storyContent.title}
        paragraphs={storyContent.paragraphs}
      />
      <MissionVision
        mission={missionVision.mission}
        vision={missionVision.vision}
      />
      <Statistics />
      <WhyChooseUs title={whyChooseUs.title} features={whyChooseUs.features} />
    </div>
  );
}

export default About;
