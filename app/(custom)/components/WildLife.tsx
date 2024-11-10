"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WildLife = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const staggeredContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="relative w-full h-screen bg-[#0B0E15] py-4" ref={ref}>
      <motion.div
        className="absolute inset-0 bg-cover bg-no-repeat"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: "url('/images/Wolf.svg')",
          backgroundPosition: "center 1%",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />

      <motion.div
        className="relative z-10 container mx-auto px-4"
        variants={staggeredContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex justify-center items-center flex-col">
          <motion.div className="py-10" variants={scaleInVariants}>
            <Image
              src="/images/circledeer.svg"
              alt="circledeer"
              width={50}
              height={50}
            />
          </motion.div>

          <motion.div
            className="text-3xl text-center"
            variants={fadeUpVariants}
          >
            Discover Captivating Wild Life
          </motion.div>

          <motion.div className="py-10 text-center" variants={fadeUpVariants}>
            Discover Captivating Wildlife with HuntGrounds – your ultimate guide
            to finding pristine hunting <br /> lands rich with natural beauty
            and diverse wildlife. Whether you're in search of expansive forests,{" "}
            <br /> open plains, or hidden wilderness, HuntGrounds connects you
            to exclusive locations where you can <br />
            experience the thrill of the hunt in unspoiled environments. Embark
            on your next adventure, immerse <br /> yourself in nature, and
            witness wildlife in its most captivating form.
          </motion.div>

          <motion.div variants={scaleInVariants}>
            <button className="bg-slate-800/50 p-4 rounded-full hover:bg-slate-700/50 transition-colors">
              Start Hunting
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WildLife;
