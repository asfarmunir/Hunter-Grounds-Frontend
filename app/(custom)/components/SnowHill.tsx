import React from "react";

const SnowHill = () => {
  return (
    <div className="relative w-full h-screen bg-[#0B0E15]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/SnowHill.svg')",
        }}
      />
      {/* Custom gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(175.71deg, rgba(11, 14, 22, 0) 3.67%, rgba(11, 14, 22, 0.5) 50.19%, rgba(11, 14, 22, 0.75) 73.45%, #0B0E16 96.71%)",
        }}
      />
    </div>
  );
};

export default SnowHill;
