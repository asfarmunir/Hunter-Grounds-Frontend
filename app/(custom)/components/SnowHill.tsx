import React from "react";
import GradientLayer from "./GradientLayer";
import img2 from "../../../public/landingImages/2.webp";

const SnowHill = () => {
  return (
    <div
      className="relative w-full h-[80svh] bg-[#0B0E15]  bg-center bg-no-repeat bg-cover z-[1]"
      style={{
        backgroundImage: "url('/landingImages/2.webp')",
        filter: "grayscale(30%)", // Makes the image black and white
      }}
    >
      <GradientLayer color="#000000" direction="top" position="bottom" />
    </div>
  );
};

export default SnowHill;
