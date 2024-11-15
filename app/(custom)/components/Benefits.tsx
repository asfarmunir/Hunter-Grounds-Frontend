"use client";
import Image from "next/image";
import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1 } },
};

const Benefits = () => {
  return (
    <>
      <div className="pt-4 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center items-center flex-col"
          >
            <motion.div className="py-10" variants={fadeUp}>
              <Image
                src="/images/ship.svg"
                alt="circledeer"
                width={60}
                height={60}
              />
            </motion.div>
            <motion.div
              className="text-3xl text-center text-black"
              variants={fadeUp}
            >
              Here are four key benefits of HuntGrounds
            </motion.div>
            <motion.div
              className="py-7 text-center text-black"
              variants={fadeUp}
            >
              Here are four key benefits that make HuntGrounds the ultimate
              platform for both <br /> landowners and hunters. From effortless
              listings and quick payments to curated <br /> hunting experiences
              and user-friendly access, HuntGrounds brings value to every <br />
              adventure
            </motion.div>
          </motion.div>
        </div>

        {/* Images And Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-2xl overflow-hidden"
            >
              <div className="relative w-full h-[291px] md:h-[485px]">
                <Image
                  src="/images/HL1.svg"
                  alt="Hunter in mountains"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              <div className="p-4 bg-[#F8F8F8]  rounded-2xl md:p-6 mt-4">
                <h2 className="text-lg md:text-xl font-semibold mb-2 text-black">
                  Comprehensive Land Details
                </h2>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="black" color="black" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Get essential information on terrain, wildlife, and
                  accessibility for each hunting area, helping you make informed
                  decisions before you set out.
                </p>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 justify-between">
                  <span className="text-xs md:text-sm text-gray-500">
                    17K Views • Likes
                  </span>
                  <div className="flex justify-center items-center">
                    <button className="bg-[#FF7A3D] text-white p-4 rounded-full text-sm flex items-center gap-2">
                      Rent a land near you
                    </button>
                    <div className="bg-white text-black p-4 rounded-full">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#F8F8F8] p-4 md:p-6 rounded-2xl"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-black">
                Easy Access to Prime Hunting Locations
              </h2>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="black" color="black" />
                ))}
              </div>
              <p className="text-gray-600 text-sm md:text-base mb-4">
                Find and explore the best hunting grounds with ease, saving time
                and effort in locating ideal spots for your next adventure.
              </p>
              <div className="flex justify-end items-center">
                <button className="bg-black text-white px-4 p-4 rounded-full text-sm flex items-center gap-2">
                  Get Hunting Now
                </button>
                <div className="bg-white text-black p-4 rounded-full">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/HL2.svg"
                alt="Buffalo in misty forest"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Repeat the above for additional sections as needed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-2xl overflow-hidden"
            >
              <div className="relative w-full h-[300px] md:h-[500px]">
                <Image
                  src="/images/HL3.svg"
                  alt="Hunter in mountains"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              <div className="p-4 md:p-6 bg-[#F8F8F8]  rounded-2xl mt-6">
                <h2 className="text-lg md:text-xl font-semibold mb-2 text-black">
                  List your land and get paid. Fast.
                </h2>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="black" color="black" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Earn extra income by listing your hunting land on HuntGrounds.
                  Connect with hunters, maximize your land’s potential, and
                  start receiving payments quickly and easily.
                </p>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 justify-between">
                  <span className="text-xs md:text-sm text-gray-500">
                    17K Views • Likes
                  </span>
                  <div className="flex justify-center items-center">
                    <button className="bg-[#FF7A3D] text-white p-4 rounded-full text-sm flex items-center gap-2">
                      List My Land
                    </button>
                    <div className="bg-white text-black p-4 rounded-full">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#F8F8F8] p-4 md:p-6 rounded-2xl"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-black">
                Enhanced Hunting Experience
              </h2>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="black" color="black" />
                ))}
              </div>
              <p className="text-gray-600 text-sm md:text-base mb-4">
                Our platform connects you to diverse landscapes and habitats,
                providing opportunities to explore new environments and
                experience unique wildlife encounters.
              </p>
              <div className="flex justify-end items-center">
                <button className="bg-black text-white px-4 p-4 rounded-full text-sm flex items-center gap-2">
                  Refer a friend and get 10% off
                </button>
                <div className="bg-white text-black p-4 rounded-full">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/HL4.svg"
                alt="Buffalo in misty forest"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefits;
