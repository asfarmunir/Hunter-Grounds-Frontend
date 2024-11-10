"use client";
import React from "react";
import { motion } from "framer-motion";
import CustomFooter from "./CustomFooter";

const Game = () => {
  return (
    <div className="relative min-h-screen">
      {/* Main background image (Bear) - now covers entire page */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/images/BeerView.svg')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      {/* Content wrapper */}
      <div className="relative z-20">
        {/* White section with text */}
        <motion.div
          className="bg-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold mb-4 text-black">
              Your Game Starts Here.
            </div>
            <p className="text-lg text-black mb-8">
              Dive into the thrill of the wild with HuntGrounds. Discover the
              best <br />
              hunting grounds, uncover hidden landscapes, and set out on <br />
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
                <p className="text-white font-medium">Contact Us</p>
                <a
                  href="mailto:help@huntgrounds.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-black/30 transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-black rounded-full">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
                    </svg>
                  </span>
                  help@huntgrounds.com
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
        >
          <CustomFooter />
        </motion.div>
      </div>
    </div>
  );
};

export default Game;
