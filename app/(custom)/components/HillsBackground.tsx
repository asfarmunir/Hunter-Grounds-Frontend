import React from "react";

const HillsBackground = () => {
  return (
    <div className="relative w-full h-screen bg-black">
      {/* Main background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/HillsBackgroundNew.svg')",
          maskImage: "linear-gradient(to top, transparent 0%, black 30%)", // Gradient mask
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 30%)", // For Safari
        }}
      />

      {/* Bottom overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[400px] bg-cover bg-center bg-no-repeat opacity-90 blur-2xl"
        style={{
          backgroundImage: "url('/images/HillBackgroundOverlay.svg')",
        }}
      />
    </div>
  );
};

export default HillsBackground;
