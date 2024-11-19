"use client";
import { IProperty } from "@/lib/types/property";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CalendarFilter from "./CalendarFilter";
import { toggleUnavailableDates } from "@/database/actions/property.action";
import { RiExchangeFill } from "react-icons/ri";
import toast from "react-hot-toast";

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

const PropertyCalendar = ({
  data,
  propertyNames,
}: {
  data: IProperty[];
  propertyNames: {
    name: string;
    _id: string;
  }[];
}) => {
  // Create a mapping of booked dates to property details
  const bookedDatesMap: Record<
    string,
    { totalEarnings: number; propertyNames: string[] }
  > = {}; // Map date to total earnings and property names

  if (data) {
    data.forEach((property) => {
      property.bookedDates.forEach((date) => {
        const formattedDate = date.split("T")[0]; // Get the date part of the string
        if (!bookedDatesMap[formattedDate]) {
          bookedDatesMap[formattedDate] = {
            totalEarnings: 0,
            propertyNames: [],
          };
        }
        bookedDatesMap[formattedDate].totalEarnings += property.pricePerNight; // Add pricePerNight to total earnings
        bookedDatesMap[formattedDate].propertyNames.push(property.name); // Add property name to the list
      });
    });
  }
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  useEffect(() => {
    // Check if data array length is 1, then set nonAvailableDates
    if (data && data.length === 1 && data[0]?.nonAvailableDates) {
      const dates = data[0].nonAvailableDates.map(
        (date: string) => date.split("T")[0]
      );
      setBookedDates(dates);
    }
  }, [data]); // Dependency on 'data' so this effect runs when 'data' changes
  // State to track unavailable dates
  const [loading, setLoading] = useState(false);

  const handleToggleAvailability = (formattedDay: string) => {
    setBookedDates(
      (prev) =>
        prev.includes(formattedDay)
          ? prev.filter((date) => date !== formattedDay) // Remove if it's already booked
          : [...prev, formattedDay] // Add if it's available
    );
  };
  const isDateBooked = (formattedDay: string) =>
    bookedDates.includes(formattedDay);

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

  const handleSubmit = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await toggleUnavailableDates({
        propertyId: data[0]._id, // Assuming we are updating the first property
        nonAvailableDates: bookedDates,
      });
      if (response.status === 200) {
        toast.success("Dates updated successfully", {
          duration: 4000,
          style: {
            background: "#4B5563",
            color: "#F9FAFB",
          },
        });
      } else {
        console.error("Error updating dates", response.error);
        toast.error("Error updating dates", {
          duration: 4000,
          style: {
            background: "red",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Server error:", error);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className=" p-4 md:p-20 w-full oyo">
      <div className=" w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl md:text-3xl 2xl:text-5xl font-bold">
            Calendar
          </h3>
          <CalendarFilter properties={propertyNames} />
          <div className="flex items-center gap-3 border border-primary-50/30 px-3 rounded-full">
            <p className=" w-2 h-2 bg-primary-50 rounded-full"></p>
            <p className=" py-2.5 text-sm">Today</p>
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
        {bookedDates.length > 0 && (
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-primary-50/80 text-white rounded-lg flex items-center gap-2"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Dates"}
            <FaChevronRight />
          </button>
        )}
      </div>
      <p
        className="
        text-sm text-gray-300 mt-5 mb-6 2xl:text-base font-normal tracking-wide
      "
      >
        {data && data.length === 1
          ? "  Manage the availability of your property by selecting dates on the  calendar below. Click on a date to toggle between available and unavailable." // Show different message if multiple dates are selected
          : "Select a property to toggle availability."}
      </p>
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
          <p className=" text-sm font-bold tracking-wider">Live Stats</p>
        </div>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {daysInMonth.map((day, i) => {
            const formattedDay = formatDate(day);
            const bookingData = bookedDatesMap[formattedDay];
            const totalEarnings = bookingData?.totalEarnings || 0;
            const propertyNames = bookingData?.propertyNames || [];
            const isBooked = isDateBooked(formattedDay);

            return (
              <div
                key={i}
                className={`p-6 ${
                  totalEarnings
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
                      {totalEarnings ? (
                        <p
                          className={`px-3 py-1.5 rounded-full
                              bg-primary-50/60 text-white "
                          `}
                        >
                          ${totalEarnings.toLocaleString()}
                        </p>
                      ) : data && data.length === 1 ? (
                        isBooked ? (
                          <button
                            onClick={() =>
                              handleToggleAvailability(formattedDay)
                            }
                            className={`px-3 py-1.5 flex items-center justify-center gap-1 rounded-full bg-primary-50/60 text-white`}
                          >
                            <RiExchangeFill className="text-lg 2xl:text-xl text-white" />
                            Unavailable
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleToggleAvailability(formattedDay)
                            }
                            className={`px-3 py-1.5 flex items-center justify-center bg-[#FFFFFF33] gap-1 rounded-full  text-white`}
                          >
                            <RiExchangeFill className="text-lg 2xl:text-xl  text-primary-50" />
                            Available
                          </button>
                        )
                      ) : (
                        <p
                          className={`px-3 py-1.5 rounded-full
                              bg-[#FFFFFF33] text-white
                          `}
                        >
                          No booking
                        </p>
                      )}
                    </TooltipTrigger>{" "}
                    <TooltipContent className=" min-w-40 px-4 pb-3 pt-1 rounded-lg">
                      {totalEarnings ? (
                        <div className="text-sm border-2 border-primary-50/45 p-5 px-10 rounded-lg mt-2 text-white">
                          <p>Properties Booked:</p>
                          <ul>
                            {propertyNames.map((name, index) => (
                              <li key={index}>- {name}</li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-sm border-2 border-gray-400 p-5 px-10 rounded-lg mt-2 text-white">
                          No bookings on this date.
                        </div>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyCalendar;
