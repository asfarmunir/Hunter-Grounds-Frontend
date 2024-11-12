import React from "react";
import GradientLayer from "./GradientLayer";

const SnowHill = () => {
  return (
    <div
      className="relative w-full h-screen bg-[#0B0E15]  bg-center bg-no-repeat bg-cover z-[1]"
      style={{
        backgroundImage: "url('/images/SnowHill.svg')",
      }}
    >
      <GradientLayer color="#000000" direction="top" position="bottom" />
    </div>
  );
};

export default SnowHill;
