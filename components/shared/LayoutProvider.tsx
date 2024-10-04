"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";
import { Footer } from "react-day-picker";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // const [hideCookieWarning, setHideCookieWarning] = React.useState(true);

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
      className={`relative h-screen overflow-hidden bg-[#000214]  bg-cover bg-center bg-no-repeat ${
        backgroundImage ? " " : "bg-none"
      }`}
      style={{
        backgroundImage: backgroundImage,
      }}
    >
      <section className="w-full overflow-y-auto h-screen">
        <Navbar />
        {children}
        <Footer />
      </section>
      {/* {hideCookieWarning ? null : (
        <div className=" w-full hidden absolute bg-[#ff99004b] px-8 py-4  bottom-0 md:flex items-center justify-between">
          <div className="flex flex-col ">
            <p className="2xl:text-lg font-semibold">Cookie Preferences</p>
            <p className="2xl:text-sm text-xs">
              Sharing your cookies helps us improve site functionality and
              optimize your experience. Click Here to read our cookie policy.{" "}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={"#"}
              className="text-xs 2xl:text-sm underline text-primary-50"
            >
              Manage Settings
            </Link>
            <button
              onClick={() => setHideCookieWarning(true)}
              className=" px-3 py-1.5 2xl:py-2 text-xs 2xl:text-sm rounded-full bg-primary-50"
            >
              Accept
            </button>
          </div>
        </div>
      )} */}
    </main>
  );
};

export default LayoutProvider;
