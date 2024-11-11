"use client";
import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, Variants, useInView } from "framer-motion";

const HuntingGround = () => {
  // Refs for scroll detection
  const statsRef = useRef(null);
  const buttonsRef = useRef(null);
  const imagesRef = useRef(null);
  const textContentRef = useRef(null);
  const mapRef = useRef(null);

  // Check if elements are in view
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const buttonsInView = useInView(buttonsRef, { once: true, margin: "-100px" });
  const imagesInView = useInView(imagesRef, { once: true, margin: "-100px" });
  const textContentInView = useInView(textContentRef, {
    once: true,
    margin: "-100px",
  });
  const mapInView = useInView(mapRef, { once: true, margin: "-100px" });

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideIn: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideInRight: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div className="py-20 bg-[#0B0E15] overflow-x-hidden">
      <div className="container">
        {/* Header with Stats and Navigation Buttons */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 justify-between items-center">
          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-2 text-white"
          >
            <motion.div variants={slideIn} className="text-lg font-medium">
              04/12
            </motion.div>
            <motion.div variants={fadeInUp} className="text-2xl font-bold">
              Your next hunting ground awaits..
            </motion.div>
            <motion.div variants={fadeInUp} className="text-lg">
              12 Km Away
            </motion.div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            ref={buttonsRef}
            initial="hidden"
            animate={buttonsInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="flex gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-12 h-12 bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft className="h-6 w-6 text-white" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-12 h-12 bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Next"
              >
                <ArrowRight className="h-6 w-6 text-white" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Images and Map Section */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
          {/* Images Section */}
          <div>
            <motion.div
              ref={imagesRef}
              initial="hidden"
              animate={imagesInView ? "visible" : "hidden"}
              transition={{ staggerChildren: 0.2 }}
              className="flex justify-center items-center flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0"
            >
              {/* Image 1 */}
              <motion.div
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/Beer1.svg"
                  alt="Beer1"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </motion.div>

              {/* Image 2 */}
              <motion.div
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/Beer2.svg"
                  alt="Beer2"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              ref={textContentRef}
              initial="hidden"
              animate={textContentInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="my-16 text-white"
            >
              <motion.div variants={slideIn} className="text-2xl pb-4">
                Hunt Where You're Able – We Make It Easy
              </motion.div>
              <motion.div variants={fadeInUp} className="text-sm font-thin">
                With HuntGrounds, finding the perfect spot is simple. Explore
                accessible <br /> hunting grounds and embark on your next
                adventure without the hassle.
              </motion.div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            ref={mapRef}
            initial="hidden"
            animate={mapInView ? "visible" : "hidden"}
            variants={slideInRight}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-2xl mx-auto" // Changed from max-w-md to max-w-6xl
          >
            {/* Map Image */}
            <Image
              src="/images/Group 2.svg"
              alt="Africa"
              width={1000}
              height={1000}
              className="rounded-lg w-full h-auto object-contain"
            />

            {/* Marker and Tooltip for 'Hunt Bear' */}
            <div className="absolute top-[35%] left-[40%]">
              <div className="relative flex items-center justify-center">
                {/* Tooltip */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute -top-20 left-6 bg-[#0B0E16] flex flex-col text-white text-xs py-2 px-3 rounded-md shadow-lg min-w-[150px]"
                >
                  <p>Hunt Bear</p>
                  <p className="text-gray-400">12 km away</p>
                </motion.div>
              </div>
            </div>

            {/* Marker and Tooltip for 'Moose' */}
            <div className="absolute bottom-[20%] left-[50%]">
              <div className="relative flex items-center justify-center">
                {/* Tooltip */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute left-6 bg-[#FF9900B5] text-white text-xs py-2 px-3 rounded-md shadow-lg min-w-[150px]"
                >
                  <p>Moose</p>
                  <p className="text-gray-200">17 km away</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HuntingGround;
