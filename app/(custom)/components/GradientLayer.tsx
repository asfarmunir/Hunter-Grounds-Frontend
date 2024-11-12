import React from "react";

type GradientLayerProps = {
  direction: "top" | "bottom";
  color: string;
  position: "top" | "bottom";
  zIndex?: string; // optional, default is "z-[1]"
  height?: string; // optional, default is "h-[200px]"
};

const GradientLayer: React.FC<GradientLayerProps> = ({
  direction = "top",
  color = "#000000",
  position,
  zIndex = "-z-[1]",
  height = "h-[200px]",
}) => {
  const gradientDirection =
    direction === "top"
      ? `to bottom, rgba(${hexToRgb(color)}, 0), ${color}`
      : `to top, rgba(${hexToRgb(color)}, 0), ${color}`;

  const isTop = position === "top" ? "top-0" : "bottom-0";

  return (
    <div
      className={`absolute w-full ${height} ${isTop} ${zIndex}`}
      style={{
        background: `linear-gradient(${gradientDirection})`,
      }}
    />
  );
};

// Helper function to convert hex color to rgb
const hexToRgb = (hex: string): string => {
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16));
  return rgb ? rgb.join(", ") : "0, 0, 0";
};

export default GradientLayer;
