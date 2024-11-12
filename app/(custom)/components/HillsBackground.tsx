import React from "react";
import GradientLayer from "./GradientLayer";

const HillsBackground = () => {
  return (
    <div className="relative w-full h-screen bg-black">
      {/* Main background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/HillsBackgroundNew.svg')",
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 30%)", // For Safari
        }}
      />
      <GradientLayer
        color="#ffffff"
        direction="top"
        position="bottom"
        zIndex="z-10"
        height="h-[400px]"
      />
      <GradientLayer
        color="#3485C0"
        direction="bottom"
        position="top"
        zIndex="z-10"
        height="h-[400px]"
      />
    </div>
  );
};

export default HillsBackground;
