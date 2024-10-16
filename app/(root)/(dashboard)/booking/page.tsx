import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full flex items-center mt-12 md:h-screen pb-8 md:pb-0 justify-center">
      <div className=" max-w-3xl 2xl:max-w-5xl relative ">
        <Image
          src="/yoywhatsupfambro.svg"
          alt="background"
          objectFit="contain"
          objectPosition="center"
          width={920}
          height={600}
        />
        <Link
          href={"/dashboard/add-property"}
          className=" opacity-0 absolute bottom-8 2xl:bottom-10 py-4 w-full"
        >
          go
        </Link>
        <div className="flex items-center gap-3 bg-[#141428] rounded-full px-4 py-2 shadow-inner shadow-slate-800 absolute -bottom-16 right-[20%] md:right-[36%] 2xl:right-[38%]">
          <Image src="/images/check.svg" width={20} height={20} alt="logo" />
          <p className="text-xs xs:text-sm font-semibold">
            Hunt Where You Feel Free.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
