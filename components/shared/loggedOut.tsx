"use client";
import Image from "next/image";
import React from "react";

const LoggedOut = () => {
  return (
    <div className=" w-full h-60 flex items-center flex-col justify-center">
      <Image
        src="/images/logoIcon.svg"
        alt="locked"
        width={100}
        height={100}
        className="object-cover object-center"
      />
      <p className="text-lg tracking-wide  mt-4 font-semibold ">
        Please sign in to continue!
      </p>
    </div>
  );
};

export default LoggedOut;
