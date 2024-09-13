import Image from "next/image";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";

const page = () => {
  return (
    <div className=" p-4 md:p-20 w-full">
      <div className=" w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl md:text-3xl 2xl:text-4xl font-bold">
            Calendar
          </h3>
          <div className="flex items-center gap-3 border border-primary-50/30 px-3 rounded-full">
            <p className=" w-2 h-2 bg-primary-50 rounded-full"></p>
            <p className=" py-2 text-sm">Today</p>
          </div>
          <FaChevronRight className=" hidden md:block text-2xl p-0.5 border border-primary-50/30 rounded-full" />
          <FaChevronRight className=" text-2xl p-0.5 border border-primary-50/30 rounded-full" />
          <p className="font-semibold">August 23</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className=" px-4 text-sm py-2 rounded-full shadow-inner shadow-gray-800 inline-flex gap-2 ">
            <Image
              src={"/images/setting.svg"}
              alt="bg"
              width={18}
              height={18}
            />
            Options
          </button>
          <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
            Bulk Edit
          </button>
        </div>
      </div>
      <div className=" w-full my-10">
        <div className=" w-full bg-[#161313]  p-1 py-6 md:p-6 rounded-xl flex-col md:flex-row flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className=" inline-flex items-center text-xs gap-2 2xl:text-sm">
              <Image
                src={"/images/calendar.svg"}
                width={23}
                height={23}
                alt="mail"
              />
              <span className="text-white">Tue, Aug 20 - Thu, Sep 5, 2024</span>
            </p>
            <p className=" px-2 md:px-3 py-2 bg-[#372F2F] rounded-full text-xs md:text-xs 2xl:text-sm">
              0 Booking
            </p>
          </div>
          <button className="px-4 py-2 hidden rounded-full bg-white text-black text-sm md:inline-flex items-center gap-2">
            <Image
              src={"/images/setting.svg"}
              width={22}
              className=" invert"
              height={22}
              alt="setting"
            />
            CA$20
          </button>
        </div>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className=" p-6 bg-[#372F2F33] hover:border-b  hover:border-primary-50 hover:bg-primary-50/30 text-white hover:text-primary-50 flex items-center justify-between "
            >
              <p>Wed, Aug 21</p>
              <p className=" px-3 py-1.5 bg-[#FFFFFF33] rounded-full ">CA$20</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
