import React from "react";
import HuntingGround from "./components/HuntingGround";
import SnowHill from "./components/SnowHill";
import WildLife from "./components/WildLife";
import VideoHeroSection from "./components/VideoHeroSection";
import Special from "./components/Special";
import HillsBackground from "./components/HillsBackground";
import Benefits from "./components/Benefits";
import Game from "./components/Game";

const page = () => {
  return (
    <div className="">
      <HuntingGround />
      <SnowHill />
      <WildLife />
      <VideoHeroSection />
      <Special />
      <HillsBackground />
      <Benefits />
      <Game />
    </div>
  );
};

export default page;
