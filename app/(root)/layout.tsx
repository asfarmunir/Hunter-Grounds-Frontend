"use client";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";
import Link from "next/link";
import { useCreateChatClient } from "stream-chat-react";
import { createStreamUserToken } from "@/database/actions/user.action";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [hideCookieWarning, setHideCookieWarning] = React.useState(true);
  const session = useSession();

  const backgroundImage =
    pathname === "/"
      ? "url('/images/bg-hero.svg')" // Background for the homepage
      : pathname === "/start-hosting"
      ? "url('/images/bg-hero2.svg')" // Background for the start-hosting page
      : pathname.includes("/pre-booking") &&
        !pathname.includes("/payment") &&
        !pathname.includes("/success")
      ? "url('/images/bg-hero2.svg')" // Background for pre-booking (excluding payment and success)
      : pathname.includes("/pre-booking") && pathname.includes("/payment")
      ? "url('/images/bg-hero3.svg')" // Background for payment pages under pre-booking
      : pathname.includes("/pre-booking") && pathname.includes("/success")
      ? "url('/images/bg-hero4.svg')" // Background for success pages under pre-booking
      : pathname === "/booking"
      ? "url('/images/bg-hero.svg')" // Background for booking page
      : pathname === "/account/inbox"
      ? "url('/images/bg-hero.svg')" // Background for account inbox page
      : pathname === "/no-bg"
      ? "" // No background for specific page
      : ""; // Default to no background for other pages

  // if (session.status === "authenticated") {
  //   const tokenProvider = useCallback( async () => {
  //     return await createStreamUserToken(session.data.user!.id);
  //   }, [session.data.user!.id, createStreamUserToken]);

  //   const client = useCreateChatClient({
  //     apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  //     tokenOrProvider: tokenProvider,
  //     userData: session.data.user!.id,
  //   });
  // }

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
      {hideCookieWarning ? null : (
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
      )}
    </main>
  );
};

export default Layout;
