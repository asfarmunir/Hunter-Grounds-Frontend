import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className=" w-full items-center justify-center flex h-screen">
      <div className=" w-full max-w-xl bg-[#09090999] -mt-24 rounded-xl flex flex-col items-center justify-center p-5 py-12">
        <Image
          src={"/images/success.svg"}
          width={70}
          height={70}
          alt="mail"
          className="rounded-xl mb-4 "
        />
        <h2 className="text-lg 2xl:text-2xl mb-2 font-semibold">
          Payment Successful
        </h2>
        <p className="text-sm text-gray-300 ">
          Your trip information will be emailed
        </p>
        <button className=" w-3/4 bg-gradient-to-r  text-black my-4 from-[#FF9900] to-[#FFE7A9] rounded-xl py-3 font-semibold">
          View Trip Details
        </button>
      </div>
    </div>
  );
};

export default page;
