"use client";
import { IProperty } from "@/lib/types/property";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Helper function to generate the days of the month in UTC
const generateDaysInMonth = (year: number, month: number) => {
  const date = new Date(Date.UTC(year, month, 1)); // Using UTC
  const days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date)); // Push copy of date
    date.setUTCDate(date.getUTCDate() + 1); // Move to the next UTC date
  }
  return days;
};

// Format a date to "YYYY-MM-DD" format using UTC
const formatDate = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Ensure two digits
  const day = date.getUTCDate().toString().padStart(2, "0"); // Ensure two digits
  return `${year}-${month}-${day}`;
};

const PropertyCalendar = ({ data }: { data: IProperty[] }) => {
  console.log("🚀 ~ PropertyCalendar ~ data:", data);

  // Create a mapping of booked dates to property names
  const bookedDatesMap: Record<string, string[]> = {};

  data.forEach((property) => {
    property.bookedDates.forEach((date) => {
      const formattedDate = date.split("T")[0]; // Get the date part of the string
      if (!bookedDatesMap[formattedDate]) {
        bookedDatesMap[formattedDate] = [];
      }
      bookedDatesMap[formattedDate].push(property.name); // Map property name to the booked date
    });
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  // Get year and month for the current view
  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth();

  // Generate the days for the current month
  const daysInMonth = generateDaysInMonth(year, month);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(Date.UTC(year, month - 1, 1))); // Go to previous month
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(Date.UTC(year, month + 1, 1))); // Go to next month
  };

  const getMonthlyBookingsCount = () => {
    // Filter bookedDatesMap to match only dates in the current month
    const bookingsThisMonth = Object.keys(bookedDatesMap).filter((date) => {
      const bookedDate = new Date(date);
      return (
        bookedDate.getFullYear() === year && bookedDate.getMonth() === month
      );
    });
    return bookingsThisMonth.length;
  };

  return (
    <div className=" p-4 md:p-20 w-full oyo">
      <div className=" w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl md:text-3xl 2xl:text-5xl font-bold">
            Calendar
          </h3>
          <div className="flex items-center gap-3 border border-primary-50/30 px-3 rounded-full">
            <p className=" w-2 h-2 bg-primary-50 rounded-full"></p>
            <p className=" py-2 text-sm">Today</p>
          </div>
          <FaChevronLeft
            onClick={goToPreviousMonth}
            className="text-2xl p-0.5 border border-primary-50/30 rounded-full cursor-pointer"
          />
          <p className="font-semibold">{`${currentDate.toLocaleString(
            "default",
            {
              month: "long",
            }
          )} ${year}`}</p>
          <FaChevronRight
            onClick={goToNextMonth}
            className="text-2xl p-0.5 border border-primary-50/30 rounded-full cursor-pointer"
          />
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
              <LuCalendarDays className=" text-white text-xl" />
              <span className="font-semibold">{`${currentDate.toLocaleString(
                "default",
                {
                  month: "long",
                }
              )} ${year}`}</span>
            </p>
            <p className="px-2 md:px-3 py-2 bg-[#372F2F] rounded-full text-xs md:text-xs 2xl:text-sm">
              {getMonthlyBookingsCount()} Booking
              {getMonthlyBookingsCount() <= 1 ? "" : "s"}
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
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {daysInMonth.map((day, i) => {
            const formattedDay = formatDate(day);
            const isBooked = bookedDatesMap[formattedDay];

            return (
              <div
                key={i}
                className={`p-6 ${
                  isBooked
                    ? "bg-[#FF990033] border-b text-primary-50 border-b-primary-50/50"
                    : "bg-[#372F2F33] text-gray-300  "
                } hover:border-b hover:border-r-0 hover:border-l-0 border  border-[#372F2F]/50    flex flex-col items-start justify-between`}
              >
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="flex items-center  w-full justify-between">
                      <p>
                        {day.toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p
                        className={`px-3 py-1.5 rounded-full ${
                          isBooked
                            ? "bg-primary-50/60 text-white"
                            : "bg-[#FFFFFF33] text-white"
                        }`}
                      >
                        {isBooked ? "Booked" : "Available"}
                      </p>
                    </TooltipTrigger>{" "}
                    <TooltipContent className=" min-w-40 px-4 pb-3 pt-1 rounded-lg">
                      {isBooked && (
                        <ul className="text-sm border-2 border-primary-50/45 p-5 px-10 rounded-lg mt-2 text-white">
                          {bookedDatesMap[formattedDay].map(
                            (propertyName, index) => (
                              <li key={index} className="text-lg">
                                {index + 1}. {propertyName}
                              </li>
                            )
                          )}
                        </ul>
                      )}{" "}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Display property names if booked */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyCalendar;
