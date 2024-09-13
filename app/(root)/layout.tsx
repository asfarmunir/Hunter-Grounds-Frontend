"use client";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const backgroundImage =
    pathname === "/"
      ? "url('/images/bg-hero.svg')" // Change this to the desired background image
      : pathname === "/start-hosting"
      ? "url('/images/bg-hero2.svg')" // Another condition
      : pathname === "/pre-booking"
      ? "url('/images/bg-hero2.svg')" // Another condition
      : pathname === "/booking"
      ? "url('/images/bg-hero.svg')" // Another condition
      : pathname === "/account/inbox"
      ? "url('/images/bg-hero.svg')" // Another condition
      : pathname === "/pre-booking/payment"
      ? "url('/images/bg-hero3.svg')" // Another condition
      : pathname === "/pre-booking/success"
      ? "url('/images/bg-hero4.svg')" // Another condition
      : pathname === "/no-bg"
      ? ""
      : "";

  return (
    <main
      className={`relative h-screen overflow-hidden bg-primary bg-cover bg-center bg-no-repeat ${
        backgroundImage ? " " : "bg-none"
      }`}
      style={{
        backgroundImage: backgroundImage,
        // backgroundBlendMode: "multiply",
      }}
    >
      <section className="w-full overflow-y-auto h-screen">
        <Navbar />
        {children}
        <Footer />
      </section>
    </main>
  );
};

export default Layout;
