import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full flex items-center mt-12  justify-center">
      <div className=" max-w-3xl 2xl:max-w-5xl relative ">
        <Image
          src="/images/hero.svg"
          alt="background"
          objectFit="contain"
          objectPosition="center"
          width={920}
          height={600}
        />
        <Link
          href={"/dashboard/edit-profile"}
          className=" opacity-0 absolute bottom-8 2xl:bottom-10 py-4 w-full"
        >
          go
        </Link>
      </div>
    </div>
  );
};

export default page;
