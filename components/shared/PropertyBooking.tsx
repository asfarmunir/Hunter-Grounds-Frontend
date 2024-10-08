"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  format,
  differenceInDays,
  isPast,
  isAfter,
  isWithinInterval,
} from "date-fns";
import { toast } from "react-hot-toast"; // Import toast
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { IProperty } from "@/lib/types/property";

const page = ({ propertyDetails }: { propertyDetails: IProperty }) => {
  console.log("🚀 ~ page ~ propertyDetails:", propertyDetails);
  const [fromDate, setFromDate] = React.useState<Date>();
  const [toDate, setToDate] = React.useState<Date>();
  const [nights, setNights] = React.useState<number | null>(null);

  const [fromDateOpen, setFromDateOpen] = React.useState(false);
  const [toDateOpen, setToDateOpen] = React.useState(false);

  // Validate and calculate number of nights
  React.useEffect(() => {
    if (fromDate && toDate) {
      const totalNights = differenceInDays(toDate, fromDate);
      setNights(totalNights);
    }
  }, [fromDate, toDate]);

  // Handle form submission
  const router = useRouter();

  const handleSubmit = () => {
    if (!fromDate || !toDate) {
      toast.error("Please select booking dates.");
      return;
    }

    // Adjust dates to noon to avoid time zone shift
    const adjustedFromDate = new Date(fromDate);
    adjustedFromDate.setHours(12, 0, 0, 0);

    const adjustedToDate = new Date(toDate);
    adjustedToDate.setHours(12, 0, 0, 0);

    // Check if any of the bookedDates fall within the selected range
    const isDateBooked = propertyDetails.bookedDates.some((bookedDate) => {
      const date = new Date(bookedDate); // Convert ISO date if necessary
      return isWithinInterval(date, {
        start: adjustedFromDate,
        end: adjustedToDate,
      });
    });

    if (isDateBooked) {
      toast.error("One or more of the selected dates are already booked.", {
        duration: 5000,
        style: {
          backgroundColor: "#FF0000",
          color: "#fff",
        },
      });
      return; // Prevent further actions
    }

    // Format the dates for query params
    const formattedFromDate = format(adjustedFromDate, "MM-dd");
    const formattedToDate = format(adjustedToDate, "MM-dd");

    // Prepare URL params
    const params = new URLSearchParams();
    params.set("fromDate", formattedFromDate);
    params.set("toDate", formattedToDate);

    // Redirect to payment page with booking details
    router.push(
      `/pre-booking/${propertyDetails._id}/payment?` + params.toString()
    );

    toast.success("Booking details saved successfully.");
  };

  return (
    <div className=" w-full flex flex-col-reverse md:flex-row gap-4 justify-between p-4 md:pl-14 2xl:pl-20 md:py-12 2xl:pr-28 md:pr-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl 2xl:text-4xl font-bold">Add Extras</h2>
        <p className="text-sm 2xl:text-base mb-4">
          Make your hunting trip even more fun by adding a little something
          special.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 border-b border-primary-50/30 py-5">
          <Image
            src={"/images/extra.svg"}
            width={155}
            height={155}
            alt="mail"
            className="rounded-xl "
          />
          <div className="flex flex-col">
            <h3 className="2xl:text-lg inline-flex mb-1.5 font-semibold gap-3">
              Wine Tasting{" "}
              <span className=" px-3 py-1 text-xs border border-primary-50 rounded-full text-primary-50">
                9.0
              </span>
            </h3>
            <p className="text-sm 2xl:text-base mb-4 text-gray-300 font-normal max-w-md">
              Notes of ripe berries and subtle oak, balanced with a hint of
              spice. The palate is smooth, with a lingering finish that
              highlights its rich, velvety texture
            </p>
            <div className="flex gap-4 items-center justify-between flex-col md:flex-row">
              <p className="text-sm 2xl:text-base text-gray-300 font-normal max-w-md">
                from only{" "}
                <span className="text-white font-semibold"> CA$88</span> / per
                person
              </p>
              <button className="px-6 text-xs 2xl:text-sm py-2 border-2 border-primary-50 bg-[#FFFFFF4D] rounded-2xl">
                Add to trip
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 border-b border-primary-50/30 py-5">
          <Image
            src={"/images/extra.svg"}
            width={155}
            height={155}
            alt="mail"
            className="rounded-xl "
          />
          <div className="flex flex-col">
            <h3 className="2xl:text-lg inline-flex mb-1.5 font-semibold gap-3">
              Wine Tasting{" "}
              <span className=" px-3 py-1 text-xs border border-primary-50 rounded-full text-primary-50">
                9.0
              </span>
            </h3>
            <p className="text-sm 2xl:text-base mb-4 text-gray-300 font-normal max-w-md">
              Notes of ripe berries and subtle oak, balanced with a hint of
              spice. The palate is smooth, with a lingering finish that
              highlights its rich, velvety texture
            </p>
            <div className="flex gap-4 items-center justify-between flex-col md:flex-row">
              <p className="text-sm 2xl:text-base text-gray-300 font-normal max-w-md">
                from only{" "}
                <span className="text-white font-semibold"> CA$88</span> / per
                person
              </p>
              <button className="px-6 text-xs 2xl:text-sm py-2 border-2 border-primary-50 bg-[#FFFFFF4D] rounded-2xl">
                Add to trip
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold 2xl:text-4xl text-center md:text-start mb-8">
          Booking Details
        </h2>
        <div className="gap-4 flex flex-col md:flex-row pb-4 items-center md:items-start border-b border-primary-50/30">
          <div className=" w-[165px] h-[165px] flex items-center justify-center object-cover object-center">
            {propertyDetails.photos ? (
              <Image
                src={propertyDetails.photos[0] || "/images/property1.jpg"}
                width={165}
                height={165}
                alt="mail"
                className="rounded-xl w-full h-full"
              />
            ) : (
              <Image
                src={"/images/property1.jpg"}
                width={165}
                height={165}
                alt="mail"
                className="rounded-xl w-full h-full"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold 2xl:text-xl mb-2">
              {propertyDetails.name}
            </h4>
            <p className="text-sm 2xl:text-base font-semibold">
              {propertyDetails.acres} acres in {propertyDetails.city}{" "}
            </p>
            <p className="font-semibold my-2 2xl:text-lg">Booking Dates</p>

            {/* From Date Popover */}
            <Popover open={fromDateOpen} onOpenChange={setFromDateOpen}>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center gap-2 text-xs 2xl:text-sm border-r border-gray-500 dark:bg-transparent">
                  <Image
                    src={"/images/calendar.svg"}
                    width={17}
                    height={17}
                    alt="logo"
                  />
                  {fromDate ? (
                    format(fromDate, "PPP")
                  ) : (
                    <span>From date...</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={(date) => {
                    setFromDate(date);
                    setFromDateOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Vertical line */}
            <div className="h-4 bg-primary-50/40 rounded-md w-0.5 ml-1.5 p-0.5 my-0.5"></div>

            {/* To Date Popover */}
            <Popover open={toDateOpen} onOpenChange={setToDateOpen}>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center gap-2 text-xs 2xl:text-sm border-r border-gray-500 dark:bg-transparent">
                  <Image
                    src={"/images/calendar.svg"}
                    width={17}
                    height={17}
                    alt="logo"
                  />
                  {toDate ? format(toDate, "PPP") : <span>To date...</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={(date) => {
                    setToDate(date);
                    setToDateOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
          <p>
            Service fee{" "}
            <span className="text-xs text-slate-300 px-1 italic">
              per night
            </span>
          </p>
          <p className="text-lg">CA${propertyDetails.pricePerNight}</p>
        </div>
        {/* Display total nights */}
        {nights !== null && (
          <>
            <h2 className="text-xl font-bold 2xl:text-3xl my-4">
              The Hunt Begins...
            </h2>
            <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
              <p>
                CA${propertyDetails.pricePerNight} x {nights} night
                {nights > 1 ? "s" : ""}
              </p>
              <p className="text-lg">
                CA${(propertyDetails.pricePerNight * nights).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
              <p>
                Taxes
                <span className="text-xs text-slate-300 px-1 italic">
                  (15%)
                </span>
              </p>
              <p className="text-lg">
                CA$
                {(
                  (propertyDetails.pricePerNight * nights! || 0) * 0.15
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex py-4 border-t border-primary-50/30 items-center text-xs 2xl:text-sm justify-between">
              <p className="font-bold">Total</p>
              <p className="font-bold text-lg">
                CA$
                {(propertyDetails.pricePerNight * nights! * 1.15).toFixed(2)}
              </p>
            </div>
          </>
        )}

        <button
          onClick={handleSubmit}
          type="button"
          className="w-[96%] px-12 py-3 rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold mt-8"
        >
          Continue
        </button>
        <p className="text-xs font-normal my-3 tracking-wide text-gray-200">
          Don't worry, you won’t be charged yet.
        </p>
      </div>
    </div>
  );
};

export default page;
