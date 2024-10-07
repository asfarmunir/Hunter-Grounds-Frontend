"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession(); // Destructure session and status
  const [urlText, setUrlText] = useState<string>("");

  // Set the URL text when the session is authenticated
  useEffect(() => {
    // @ts-ignore
    if (status === "authenticated" && session?.user?.id) {
      setUrlText(
        // @ts-ignore
        `http://localhost:3000/start-hosting?referalCode=${session.user.id}`
      );
    }
  }, [status, session]);

  const handleCopy = () => {
    if (!urlText) return; // Avoid copying empty text

    navigator.clipboard.writeText(urlText).then(
      () => {
        toast.success("Copied to clipboard", {
          style: {
            background: "#4CAF50",
            color: "#fff",
          },
        });
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <div className="w-full flex items-center mt-12 justify-center">
      <div className="max-w-3xl 2xl:max-w-5xl relative">
        <Image
          src="/images/huntcash.svg"
          alt="background"
          objectFit="contain"
          objectPosition="center"
          width={920}
          height={600}
        />
        <div className="absolute bottom-[30%] md:bottom-[40%] flex items-center justify-center py-4 w-full">
          <div className="p-2 rounded-lg border flex items-center bg-[#372F2F33] gap-3 border-primary-200">
            <p className="bg-[#372F2F]/50 truncate max-w-64 md:max-w-96 2xl:max-w-[34rem] border text-xs md:text-base border-[#372F2F] p-3 rounded-lg px-4 md:px-8">
              {urlText || "generating referal link..."}{" "}
            </p>
            <button
              className="px-6 text-xs md:text-base md:px-12 py-3 rounded-lg from-[#FF9900] to-[#FFE7A9] bg-gradient-to-r"
              onClick={handleCopy}
              disabled={!urlText} // Disable button if no URL is available
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
