"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GradientLayer from "./GradientLayer";

const Special = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.3 });

  const metrics = [
    {
      value: "100m+",
      label: "Acres of land to use",
    },
    {
      value: "98%",
      label: "Visitor Satisfied",
    },
    {
      value: "50+",
      label: "Game to explore",
    },
    {
      value: "2m+",
      label: "Active members",
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: -90,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const metricsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const metricItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="relative w-full h-screen bg-black" ref={ref}>
      <motion.div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: "url('/images/mountain.svg')",
        }}
      />
      <GradientLayer
        color="#000000"
        direction="bottom"
        position="top"
        zIndex="z-10"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />

      <div className="relative z-50 container mx-auto px-4">
        <motion.div
          className="w-full bg-[#0E111B] text-white p-8 rounded-lg transform -translate-y-1/5 md:-translate-y-1/4 lg:-translate-y-[50%]"
          variants={boxVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col md:flex-row -mt-8 justify-between items-start md:items-center">
            <div className="max-w-3xl mb-6 md:mb-0">
              <motion.h2
                className="text-xl md:text-2xl 2xl:text-3xl capitalize font-semibold mb-4 md:mb-6"
                variants={fadeInUpVariants}
              >
                HuntGrounds enhances the hunting journey, making it more
                accessible, enjoyable, and{" "}
                <span className="text-primary-50 px-1">rewarding</span> for
                hunters of all levels.
              </motion.h2>
              <motion.p
                className="text-gray-300 leading-relaxed text-sm md:text-base"
                variants={fadeInUpVariants}
              >
                Embark On A Thrilling Journey Into Nature With HuntGrounds'
                Wildlife Tour Experience. Explore Pristine Landscapes Filled
                With Diverse Wildlife, Guided By Experts Who Bring The Wonders
                Of The Wild Up Close. Whether You're A Hunter Or A Nature
                Enthusiast, This Tour Offers Unforgettable Encounters And
                Breathtaking Views. Experience The Thrill Of The Wild
                Responsibly And Create Lasting Memories With HuntGrounds.
              </motion.p>
            </div>

            <motion.div
              className="text-left md:text-right mt-4 md:mt-0"
              variants={fadeInUpVariants}
            >
              <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">
                Over 50+ Game
              </h3>
              <p className="text-[#87C1EE] text-sm md:text-base">
                Hunt Where You Feel Good.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center items-center flex-col pt-6"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="text-3xl text-center"
            variants={fadeInUpVariants}
          >
            Why We Are Special?
          </motion.div>
          <motion.div className="py-4 text-center" variants={fadeInUpVariants}>
            Scroll Down
          </motion.div>
          <motion.div
            className="py-4 mt-3"
            variants={fadeInUpVariants}
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/arrow-down.svg"
              alt="circledeer"
              width={50}
              height={50}
            />
          </motion.div>
        </motion.div>

        <div
          className="flex flex-col space-y-10 justify-center  items-center mt-[10rem]"
          ref={metricsRef}
        >
          <motion.div
            className="text-center z-50"
            variants={fadeInUpVariants}
            initial="hidden"
            animate={metricsInView ? "visible" : "hidden"}
          >
            We're more than just a service; we create unforgettable hunting{" "}
            <br />
            experiences. Our passion for excellence in the field sets us apart,{" "}
            <br />
            driven by a commitment to quality, innovation, and authenticity in{" "}
            <br />
            every adventure.
          </motion.div>

          <motion.div
            variants={metricsVariants}
            initial="hidden"
            animate={metricsInView ? "visible" : "hidden"}
          >
            <div className="flex  flex-col sm:flex-row sm:justify-between w-full max-w-6xl mx-auto gap-6 sm:gap-12 lg:gap-28">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center sm:items-start font-thin text-center sm:text-left"
                  variants={metricItemVariants}
                >
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {metric.value}
                  </span>
                  <span className="text-white text-xs sm:text-sm font-thin">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/Rectangle16.svg')",
        }}
      />
    </div>
  );
};

export default Special;
