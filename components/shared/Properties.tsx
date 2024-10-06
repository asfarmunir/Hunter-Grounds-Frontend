"use client";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants, fadeInVariants } from "@/lib/animations";
import Image from "next/image";
import { IProperty } from "@/lib/types/property";
import Link from "next/link";
const Properties = ({ properties }: { properties: IProperty[] }) => {
  console.log("🚀 ~ Properties ~ properties:", properties);
  return (
    <div className=" ">
      {properties && properties.length ? (
        <motion.div
          variants={containerVariants} // Apply the container variant for staggering
          initial="initial"
          viewport={{ once: true }}
          whileInView="animate"
          className="grid grid-cols-1  w-full  sm:grid-cols-2 gap-y-10 place-items-center  max-w-xl 2xl:max-w-2xl gap-4  lg:grid-cols-3"
        >
          {properties.map((property, index) => (
            <motion.div
              // variants={fadeInVariants} // Each child fades in
              // viewport={{ once: true }}
              key={index}
              className=" flex flex-col items-center px-6 md:px-0  md:max-w-[12rem] 2xl:max-w-full w-full"
            >
              <Link href={`/pre-booking/${property._id}`}>
                <div className=" w-full h-[180px] 2xl:h-[210px] bg-red-50 flex items-center hover:shadow-lg hover:shadow-primary-50/50 transition-all justify-center object-cover   object-center mb-4 rounded-xl  ">
                  <Image
                    src={property.photos[0]}
                    width={250}
                    priority
                    className=" rounded-lg w-full h-full object-cover"
                    height={250}
                    alt="hehe"
                  />
                </div>
              </Link>

              <h4 className=" font-bold text-sm 2xl:text-lg capitalize text-nowrap mb-3">
                {property.name}
                <span className="bg-primary-50 text-xs p-1  rounded ml-2">
                  9.0
                </span>
              </h4>
              <p className=" font-thin  text-slate-50 capitalize  text-sm">
                11 sites Lodging {property.acres} acres {property.city} from
                only{" "}
                <span className=" font-semibold">
                  {" "}
                  CA${property.pricePerNight}
                </span>{" "}
                / night
              </p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex justify-center items-center pt-12  w-full h-full">
          <h1 className="text-2xl border-b-2 border-t-2 border-primary-50/30  py-12 bg-primary-50/10 font-bold capitalize px-20 rounded-lg ">
            No properties found!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Properties;
