"use client";
import Image from "next/image";
import React from "react";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { containerVariants, fadeInVariants } from "@/lib/animations";

const Home = () => {
  return (
    <div className=" min-h-screen p-4 md:px-16 flex gap-12 2xl:gap-20  w-full flex-col md:flex-row items-center relative ">
      <div className="flex text-xs md:text-sm items-center gap-3 bg-[#141428] rounded-full px-4 py-2 shadow-inner shadow-slate-800 absolute -bottom-12 md:right-[40%]">
        <Image src="/images/check.svg" width={20} height={20} alt="logo" />
        <p className="text-sm font-semibold">Hunt Where You Feel Free.</p>
      </div>
      <div className=" w-full pt-8">
        <div className="flex  mb-6  md:mb-0 items-center px-3 md:px-0 pt-4 justify-center flex-col gap-1 max-w-xl 2xl:max-w-2xl">
          <p className="text-sm 2xl:text-base mb-1 font-thin  capitalize">
            price range{" "}
          </p>
          <div className="flex items-center justify-between w-full px-1.5 mb-2 max-w-xs 2xl:max-w-sm">
            <p className=" font-thin  text-xs  capitalize">From</p>
            <p className=" font-thin  text-xs  capitalize">To</p>
          </div>
          <Slider
            defaultValue={[4, 96]}
            max={100}
            className=" max-w-xs 2xl:max-w-sm mx-auto "
            step={1}
          />
          <div className="flex items-center justify-between w-full  mt-2 max-w-xs 2xl:max-w-sm">
            <p className=" font-thin  text-xs  capitalize">$10</p>
            <p className=" font-thin  text-xs  capitalize">$50000$</p>
          </div>
        </div>
        <h2 className=" 2xl:text-lg text-sm font-bold mb-5">123 Places</h2>
        <motion.div
          variants={containerVariants} // Apply the container variant for staggering
          initial="initial"
          viewport={{ once: true }}
          whileInView="animate"
          className="grid grid-cols-1 w-full  sm:grid-cols-2 gap-y-10 place-items-center  max-w-xl 2xl:max-w-2xl gap-4  lg:grid-cols-3"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              variants={fadeInVariants} // Each child fades in
              viewport={{ once: true }}
              key={index}
              className=" flex flex-col items-center px-6 md:px-0  md:max-w-[12rem] 2xl:max-w-full w-full"
            >
              <Image
                src="/images/place1.svg"
                width={250}
                className="rounded-xl mb-4 w-full "
                height={250}
                alt="hehe"
              />
              <h4 className=" font-bold text-sm 2xl:text-lg text-nowrap mb-3">
                Braine Le Chateau
                <span className="bg-primary-50 text-xs p-1  rounded ml-2">
                  9.0
                </span>
              </h4>
              <p className=" font-thin  text-slate-50  text-sm">
                11 sites Lodging 800 acres Harrington, QC from only{" "}
                <span className=" font-semibold"> CA$88</span> / night
              </p>
            </motion.div>
          ))}
        </motion.div>
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
