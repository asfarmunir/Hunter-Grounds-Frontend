"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CustomLoginModal from "./CustomLoginModal";
import { isAbsolute } from "path";
import GradientLayer from "./GradientLayer";
import CustomNavbar from "./CustomNavbar";
import Link from "next/link";

const Hero = () => {
  // Refs for scroll detection
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const loginModalRef = useRef(null);
  const signupModalRef = useRef(null);

  // Check if elements are in view
  const subtitleInView = useInView(subtitleRef, {
    once: true,
    margin: "-50px",
  });

  const titleInView = useInView(titleRef, {
    once: true,
    margin: "-50px",
  });

  const contentInView = useInView(contentRef, {
    once: true,
    margin: "-50px",
  });

  // Animation variants
  const fadeUpVariant = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const scaleUpVariant = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const contentVariant = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const buttonVariant = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <>
      {/* Background image section containing only navbar and hero */}
      <div
        className="relative bg-cover bg-bottom bg-no-repeat bg-opacity-70 z-[1]"
        style={{
          backgroundImage: "url('/images/bg-hero-new.svg')",
        }}
      >
        <CustomNavbar />

        <GradientLayer color="#000000" direction="top" position="bottom" />
        <div className="w-full flex flex-col px-10 py-10 justify-center md:justify-end min-h-[calc(100vh-90px)] ">
          <motion.div
            ref={subtitleRef}
            initial="hidden"
            animate={subtitleInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="font-thin text-center md:text-left"
          >
            Discover The Great Outdoors <br /> And Everything It Has To Offer
          </motion.div>

          <motion.div
            ref={titleRef}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            variants={scaleUpVariant}
            className="mt-20 md:text-7xl text-5xl text-center md:text-left"
          >
            Your Adventure Begins.
          </motion.div>

          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={contentVariant}
            className="flex flex-col md:flex-row justify-end items-center mt-20"
          >
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-10 font-thin">
              <motion.div
                variants={fadeUpVariant}
                className="text-center md:text-left"
              >
                Welcome to HuntGrounds, your go-to resource for discovering
                prime hunting land. Explore, <br /> plan, and access the perfect
                grounds for your next adventure!
              </motion.div>

              <motion.div
                variants={buttonVariant}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4"
              >
                <Link
                  href={"/home"}
                  className={`text-sm 2xl:text-base font-semibold bg-white px-6 py-4 rounded-full text-black hover:border-b-2   transition-all    }`}
                >
                  Reserve a Post
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
