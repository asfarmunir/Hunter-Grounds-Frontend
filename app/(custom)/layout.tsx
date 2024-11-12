// components/SpecificPageLayout.tsx
import React from "react";
import CustomNavbar from "./components/CustomNavbar";
import CustomFooter from "./components/CustomFooter";
import Hero from "./components/Hero";

interface SpecificPageLayoutProps {
  children: React.ReactNode;
}

export default function SpecificPageLayout({
  children,
}: SpecificPageLayoutProps) {
  return (
    <div>
      <div>
        <Hero />
      </div>

      {/* Content section outside of background image */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
