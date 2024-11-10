import React from "react";
const HillsBackground = () => {
  return (
    <div className="relative w-full h-screen bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/HillsBackground.svg')",
        }}
      />
    </div>
  );
};
export default HillsBackground;
