// components/SpecificPageLayout.tsx
import React from "react";
import CustomNavbar from "./components/CustomNavbar";
import Hero from "./components/Hero";
import CustomFooter from "./components/CustomFooter";

interface SpecificPageLayoutProps {
  children: React.ReactNode;
}

export default function SpecificPageLayout({
  children,
}: SpecificPageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background image section containing only navbar and hero */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: "url('/images/bg-hero-new.svg')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10">
          <CustomNavbar />
          <Hero />
        </div>
      </div>

      {/* Content section outside of background image */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
