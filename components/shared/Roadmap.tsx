"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useMotionValue, useScroll } from "framer-motion";
import Image from "next/image";

export default function Roadmap() {
  const [ref1, inView1, entry1] = useInView({ threshold: 0.8 });
  const [ref2, inView2, entry2] = useInView({ threshold: 1 });
  const [ref3, inView3, entry3] = useInView({ threshold: 1 });
  const [ref4, inView4, entry4] = useInView({ threshold: 1 });

  const [height, setHeight] = React.useState(10);

  useEffect(() => {
    if (inView1) {
      setHeight(11.2);
    }
  }, [inView1, entry1]);

  useEffect(() => {
    if (inView2) {
      setHeight(34.4);
    }
  }, [inView2, entry2]);

  useEffect(() => {
    if (inView3) {
      setHeight(57.6);
    }
  }, [inView3, entry3]);

  useEffect(() => {
    if (inView4) {
      setHeight(100);
    } else {
      setHeight(0);
    }
  }, [inView4, entry4]);

  return (
    <div className="w-full mt-8 sm:mt-12 sm:mb-32">
      {/* mobile ver */}
      <div className="lg:hidden flex items-center justify-center gap-12 mx-4 relative">
        {/* left side - progress */}

        {/* right side - cards */}
        <div className="flex flex-col items-center justify-center gap-12 px-4">
          <div className="h-60 flex flex-col justify-center ">
            <h4 className="w-fit  pr-4  font-bold text-[27px]">01</h4>
            <div className="mt-4  max-w-[600px]">
              <div className="flex flex-col gap-2 justify-start items-start">
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold text-primary-50">
                  Calendar management software
                </h2>
                <p className="text-sm 2xl:text-base text-slate-300 font-normal">
                  Sync your HuntGrounds calendar with as many external calendars
                  as you'd like. It will automatically update whenever changes
                  are made to your other calendars.
                </p>
              </div>
            </div>
          </div>

          <div className="h-60 flex flex-col justify-center items-end ">
            <h4 className="w-fit  pr-4  font-bold text-[27px]">02</h4>
            <div ref={ref2} className="mt-4  max-w-[600px]">
              <div className="flex flex-col gap-2 justify-start items-start">
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold text-primary-50">
                  Money and tax management
                </h2>
                <p className="text-sm 2xl:text-base max-w-xl   text-slate-300 font-normal">
                  HuntGrounds helps you collect the necessary occupancy taxes
                  from your bookings. It's easy to add the required amount based
                  on your province or district.
                </p>
              </div>
            </div>
          </div>
          <div className="h-60 flex flex-col justify-center ">
            <h4 className="w-fit  pr-4  font-bold text-[27px]">03</h4>
            <div ref={ref3} className="mt-4  max-w-[600px]">
              <div className="flex flex-col gap-2 justify-start items-start">
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold text-primary-50">
                  Exclusive hosting resources
                </h2>
                <p className="text-sm 2xl:text-base text-slate-300 font-normal">
                  Want to set quiet hours or other rules for staying on your
                  property? No problem. We'll make sure all guests see them when
                  they book through HuntGrounds.
                </p>
              </div>
            </div>
          </div>
          <div className="h-60 flex flex-col justify-center items-end ">
            <h4 className="w-fit  pr-4  font-bold text-[27px]">04</h4>
            <div ref={ref4} className="mt-4  max-w-[600px]">
              <div className="flex flex-col gap-2 justify-start items-start">
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold text-primary-50">
                  100% free to use
                </h2>
                <p className="text-sm 2xl:text-base max-w-xl   text-slate-300 font-normal">
                  Listing your property is completely free, with no strings
                  attached. We only charge a commission on the bookings we bring
                  in, reinvesting our share to further support you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* desktop ver */}
      <div className="hidden lg:flex   justify-center gap-16 relative">
        {/* left side */}
        <div className="w-1/2 pt-16 2xl:pl-32  ">
          {/* card 1 */}
          <motion.div
            viewport={{ amount: 0.55 }}
            initial={{ opacity: 0, x: -150 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.7, ease: "easeOut" },
            }}
            className=" h-60  "
          >
            <Image
              src="/images/calendar2.svg"
              width={500}
              height={500}
              alt="roadmap"
              className=" h-full"
            />
          </motion.div>
          {/* gap */}
          <div className="w-0 h-10"></div>
          {/* card 2 */}

          <motion.div
            viewport={{ amount: 0.55 }}
            initial={{ opacity: 0, x: -150 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.7, ease: "easeOut" },
            }}
            className="h-60 flex flex-col justify-center items-end "
          >
            <h4 className="w-fit  pr-4  font-bold text-[27px]">02</h4>
            <div ref={ref2} className="mt-4  max-w-[600px]">
              <div className="flex flex-col gap-2 justify-start items-end">
                <h2 className="text-3xl 2xl:text-4xl font-semibold text-primary-50">
                  Money and tax management
                </h2>
                <p className="text-sm 2xl:text-base max-w-xl  text-end text-slate-300 font-normal">
                  HuntGrounds helps you collect the necessary occupancy taxes
                  from your bookings. It's easy to add the required amount based
                  on your province or district.
                </p>
              </div>
            </div>
          </motion.div>
          <div className="w-0 h-10"></div>
          {/* card 3 */}
          <motion.div
            viewport={{ amount: 0.55 }}
            initial={{ opacity: 0, x: -150 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.7, ease: "easeOut" },
            }}
            className=" h-60  "
          >
            <Image
              src="/images/hosting.svg"
              width={500}
              height={500}
              alt="roadmap"
              className=" h-full"
            />
          </motion.div>
          {/* gap */}
          <div className="w-0 h-10"></div>
          {/* card 4 */}
          <motion.div
            viewport={{ amount: 0.55 }}
            initial={{ opacity: 0, x: -150 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.7, ease: "easeOut" },
            }}
            className="h-60 flex flex-col justify-center items-end "
          >
            <h4 className="w-fit  pr-4  font-bold text-[27px]">04</h4>
            <div ref={ref4} className="mt-4  max-w-[600px]">
              <div className="flex flex-col gap-2 justify-start items-end">
                <h2 className="text-3xl 2xl:text-4xl font-semibold text-primary-50">
                  100% free to use
                </h2>
                <p className="text-sm 2xl:text-base max-w-xl  text-end text-slate-300 font-normal">
                  Listing your property is completely free, with no strings
                  attached. We only charge a commission on the bookings we bring
                  in, reinvesting our share to further support you.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* center */}
        <div className="bg-white bg-opacity-[12%] w-2 rounded-full relative">
          <motion.div
            className="absolute top-0 transition-all duration-500 ease-out delay-200  w-full rounded-full bg-primary-50 " /* roadmapProgressBar */
            style={{
              height: `${height}%`,
            }}
          ></motion.div>
          {/* dots */}
          {/* item 1 number circle */}
          <div className="z-[1] absolute top-[120px] left-1/2 transform -translate-x-1/2">
            <div className="glassContainerContainerRoundHowToBuy">
              <div className="howToBuyOrangeCircle">
                <p className="text-white w-4 2xl:w-6 2xl:h-6 h-4 bg-primary-50 rounded-full text-[16px]"></p>
              </div>
            </div>
          </div>
          {/* item 2 number circle */}
          <div className="z-[1] absolute top-[400px] left-1/2 transform -translate-x-1/2">
            <div className="glassContainerContainerRoundHowToBuy">
              <div className="howToBuyOrangeCircle">
                <p className="text-white w-4 2xl:w-6 2xl:h-6 h-4 bg-primary-50 rounded-full text-[16px]"></p>
              </div>
            </div>
          </div>
          {/* item 3 number circle */}
          <div className="z-[1] absolute top-[680px] xl:top-[685px] left-1/2 transform -translate-x-1/2">
            <div className="glassContainerContainerRoundHowToBuy">
              <div className="howToBuyOrangeCircle">
                <p className="text-white w-4 2xl:w-6 2xl:h-6 h-4 bg-primary-50 rounded-full text-[16px]"></p>
              </div>
            </div>
          </div>
          {/* item 4 number circle */}
          <div className="z-[1] absolute top-[970px] xl:top-[960px] left-1/2 transform -translate-x-1/2">
            <div className="glassContainerContainerRoundHowToBuy">
              <div className="howToBuyOrangeCircle">
                <p className="text-white w-4 2xl:w-6 2xl:h-6 h-4 bg-primary-50 rounded-full text-[16px]"></p>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-1/2 py-16  pr-4 lg:pr-16 ">
          {/* card 1 */}
          <motion.div
            viewport={{ amount: 0.55 }}
            initial={{ opacity: 0, x: 150 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.7, ease: "easeOut" },
            }}
            className="h-60 flex flex-col justify-center "
          >
            <h4 className="w-fit  pr-4  font-bold text-[27px]">01</h4>
            <div ref={ref1} className="mt-4  max-w-[600px]">
              <div className="flex flex-col gap-2 justify-start items-start">
                <h2 className="text-3xl 2xl:text-4xl font-semibold text-primary-50">
                  Calendar management software
                </h2>
                <p className="text-sm 2xl:text-base text-slate-300 font-normal">
                  Sync your HuntGrounds calendar with as many external calendars
                  as you'd like. It will automatically update whenever changes
                  are made to your other calendars.
                </p>
              </div>
            </div>
          </motion.div>
          {/* gap */}
          <div className="w-0 h-10"></div>
          {/* card 2 */}
          <motion.div
            viewport={{ amount: 0.55 }}
            initial={{ opacity: 0, x: 150 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.7, ease: "easeOut" },
            }}
            className=" h-60  "
          >
            <Image
              src="/images/tax.svg"
              width={500}
              height={500}
              alt="roadmap"
              className=" h-full"
            />
          </motion.div>
          {/* gap */}
          <div className="w-0 h-10"></div>
          {/* card 3 */}
          <motion.div
            viewport={{ amount: 0.55 }}
            initial={{ opacity: 0, x: 150 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.7, ease: "easeOut" },
            }}
            className="h-60 flex flex-col justify-center "
          >
            <h4 className="w-fit  pr-4  font-bold text-[27px]">03</h4>
            <div ref={ref3} className="mt-4  max-w-[600px]">
              <div className="flex flex-col gap-2 justify-start items-start">
                <h2 className="text-3xl 2xl:text-4xl font-semibold text-primary-50">
                  Exclusive hosting resources
                </h2>
                <p className="text-sm 2xl:text-base text-slate-300 font-normal">
                  Want to set quiet hours or other rules for staying on your
                  property? No problem. We'll make sure all guests see them when
                  they book through HuntGrounds.
                </p>
              </div>
            </div>
          </motion.div>
          {/* gap */}
          <div className="w-0 h-10"></div>
          {/* card 4 */}
          <motion.div
            viewport={{ amount: 0.55 }}
            initial={{ opacity: 0, x: 150 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.7, ease: "easeOut" },
            }}
            className=" h-60  "
          >
            <Image
              src="/images/free.svg"
              width={500}
              height={500}
              alt="roadmap"
              className=" h-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
