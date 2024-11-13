"use client";
import React from "react";
import { motion } from "framer-motion";
import CustomFooter from "./CustomFooter";
import GradientLayer from "./GradientLayer";

const Game = () => {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Main background image (Bear) */}
        <div
          className=" inset-0 bg-cover bg-top bg-no-repeat z-0 "
          style={{
            backgroundImage: "url('/images/BeerView.svg')",
          }}
        >
          <GradientLayer
            color="#ffffff"
            direction="bottom"
            position="top"
            zIndex="z-10"
            height="h-[400px]"
          />
          <div className="relative z-20 pt-10">
            {/* White section with text */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold mb-4 text-black">
                  Your Game Starts Here.
                </div>
                <p className="text-lg text-black mb-8">
                  Dive into the thrill of the wild with HuntGrounds. Discover
                  the best <br />
                  hunting grounds, uncover hidden landscapes, and set out on{" "}
                  <br />
                  adventures that connect you with nature like never before.
                </p>
              </div>
            </motion.div>

            {/* Main content section */}
            <motion.div
              className="min-h-[calc(100vh-200px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="relative flex flex-col items-center justify-center w-full text-center px-4 py-10">
                {/* Contact section */}
                <motion.div
                  className="max-w-2xl mx-auto"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-black font-medium">Contact Us</p>
                    <a
                      href="mailto:help@huntgrounds.com"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-black hover:text-white bg-white/60 hover:bg-black/30  transition-colors"
                    >
                      <span className="w-12 h-12 flex items-center justify-center bg-black  rounded-full">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
                        </svg>
                      </span>

                      <span className="">help@huntgrounds.com</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            ></motion.div>
          </div>
          <CustomFooter />
        </div>
      </div>
    </>
  );
};

export default Game;
