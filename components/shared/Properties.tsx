"use client";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants, fadeInVariants } from "@/lib/animations";
import Image from "next/image";
const Properties = () => {
  return (
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
            <span className="bg-primary-50 text-xs p-1  rounded ml-2">9.0</span>
          </h4>
          <p className=" font-thin  text-slate-50  text-sm">
            11 sites Lodging 800 acres Harrington, QC from only{" "}
            <span className=" font-semibold"> CA$88</span> / night
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Properties;
