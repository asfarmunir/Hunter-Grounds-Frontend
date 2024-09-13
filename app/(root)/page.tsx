import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div className=" min-h-screen p-4 md:px-20 flex gap-12 w-full flex-col md:flex-row items-center relative ">
      <div className="flex items-center gap-3 bg-[#141428] rounded-full px-4 py-2 shadow-inner shadow-slate-800 absolute -bottom-12 right-[40%]">
        <Image src="/images/check.svg" width={20} height={20} alt="logo" />
        <p className="text-sm font-semibold">Hunt Where You Feel Free.</p>
      </div>
      <div className=" w-full">
        <div className=" w-full">
          <h2 className=" 2xl:text-lg text-sm font-bold mb-5">123 Places</h2>
          <div className="grid grid-cols-1 w-full  sm:grid-cols-2 gap-y-10 place-items-center  lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className=" flex flex-col items-center  max-w-[12rem] 2xl:max-w-[12rem] w-full"
              >
                <Image
                  src="/images/place1.svg"
                  width={150}
                  className="rounded-xl w-full mb-3"
                  height={150}
                  alt="hehe"
                />
                <h4 className=" font-bold text-sm 2xl:text-lg text-nowrap mb-3">
                  Braine Le Chateau
                  <span className="bg-primary-50 text-xs p-1  rounded ml-2">
                    9.0
                  </span>
                </h4>
                <p className=" font-light text-sm">
                  11 sites Lodging 800 acres Harrington, QC from only{" "}
                  <span className=" font-semibold"> CA$88</span> / night
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-[65%]">
        <Image
          src="/images/map2.svg"
          width={600}
          height={600}
          className="rounded-xl"
          alt="hehe"
        />
      </div>
    </div>
  );
};

export default Home;
