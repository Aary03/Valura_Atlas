"use client";

import LandingNav from "./landing/LandingNav";
import LandingHero from "./landing/LandingHero";
import { Ticker, WhyAtlas, Modules, HowItWorks } from "./landing/LandingContent";
import { LessonPreview, Platforms, Access, LandingFooter } from "./landing/LandingEnd";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#FFFFFC" }}>
      <LandingNav />
      <LandingHero />
      <Ticker />
      <WhyAtlas />
      <Modules />
      <HowItWorks />
      <LessonPreview />
      <Platforms />
      <Access />
      <LandingFooter />
    </div>
  );
}
