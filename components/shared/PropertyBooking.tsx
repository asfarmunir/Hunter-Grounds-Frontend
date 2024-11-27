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
  isSameDay,
} from "date-fns";
import { toast } from "react-hot-toast"; // Import toast
import { useRouter } from "next/navigation";
import { IProperty } from "@/lib/types/property";
import { CgLock } from "react-icons/cg";
import { addSavedProperty } from "@/database/actions/user.action";
import { FaHeart } from "react-icons/fa";

const page = ({
  propertyDetails,
  userId,
}: {
  propertyDetails: IProperty;
  userId: string;
}) => {
  console.log("🚀 ~ propertyDetails:", propertyDetails);
  const [fromDate, setFromDate] = React.useState<Date>();
  const [toDate, setToDate] = React.useState<Date>();
  const [nights, setNights] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);

  const [fromDateOpen, setFromDateOpen] = React.useState(false);
  const [toDateOpen, setToDateOpen] = React.useState(false);

  // Validate and calculate number of nights
  React.useEffect(() => {
    if (fromDate && toDate) {
      if (isPast(fromDate) || isPast(toDate)) {
        toast.error("Please select valid future date.");
        return;
      }
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
    if (fromDate > toDate) {
      toast.error("Please add a valid period!", {
        duration: 2000,
        style: {
          backgroundColor: "#ff0000",
          color: "#fff",
        },
      });
      return;
    }

    if (isPast(fromDate) || isPast(toDate)) {
      toast.error("Please select valid future date.");
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
    const formattedFromDate = format(adjustedFromDate, "yyyy-MM-dd");
    const formattedToDate = format(adjustedToDate, "yyyy-MM-dd");

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
    <div className=" w-full flex flex-col md:flex-row gap-4 justify-center p-4 md:pl-14 2xl:pl-20 md:py-12 2xl:pr-28 md:pr-20">
      {/* <div className="flex flex-col gap-2">
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
      </div> */}
      <div className=" w-full md:w-[70%] space-y-4">
        <h2 className="text-5xl font-bold capitalize">
          {propertyDetails.name}
        </h2>
        <p className=" 2xl:text-lg text-slate-200 max-w-2xl">
          {propertyDetails.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe optio
          assumenda deleniti impedit eius neque, ea officia, facere harum earum,
          excepturi aperiam. Perferendis, magnam. Distinctio, at. Earum fuga nam
          sit.
        </p>
        <div className="py-2">
          <h3 className="text-xl mb-3 font-bold">Games available: </h3>

          <div className="flex gap-2 ">
            {propertyDetails.gameAvailable.map((game, index) => (
              <div
                key={index}
                className="bg-primary-50/30 capitalize text-primary-50 px-4 py-2 rounded-md"
              >
                {game}
              </div>
            ))}
          </div>
        </div>
        <div className="py-2">
          <h3 className="text-xl mb-3 font-bold">Huntground Images: </h3>

          <div className="grid grid-cols-1 bg-primary-100 rounded-xl sm:grid-cols-2 gap-4 md:pr-8 py-4 md:grid-cols-3">
            {propertyDetails.photos.map((photo, index) => {
              return (
                <div key={index} className="relative h-[200px] sm:h-[300px]">
                  <Image
                    src={photo}
                    alt="property"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" w-full md:w-[30%]">
        <div className=" w-full flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold 2xl:text-4xl text-center md:text-start ">
            Booking Details
          </h2>
          <button
            disabled={loading}
            type="button"
            onClick={async () => {
              setLoading(true);
              const res = await addSavedProperty(userId, propertyDetails._id);
              if (res.status !== 200) {
                toast.error(res.message, {
                  duration: 4000,
                  style: {
                    background: "#333",
                    color: "#fff",
                  },
                  icon: "⚠️",
                });
                setLoading(false);
                return;
              }
              toast.success("Property saved successfully", {
                duration: 4000,
                style: {
                  background: "#333",
                  color: "#fff",
                },
                icon: "❤️",
              });
              setLoading(false);
            }}
            className="disabled:opacity-40 bg-primary-200/90 opacity-90 hover:opacity-100 transition-all rounded-full p-2"
          >
            <FaHeart className="text-primary-50 text-lg" />
          </button>
        </div>
        <div className="gap-4 flex flex-col md:flex-row pb-4 items-center md:items-start border-b border-primary-50/30">
          <div className=" w-full px-6 sm:px-0 sm:w-[165px] sm:h-[165px] flex items-center justify-center object-cover object-center">
            {propertyDetails.photos ? (
              <Image
                src={propertyDetails.photos[0] || "/images/property1.jpg"}
                width={165}
                height={165}
                alt="mail"
                className="rounded-xl object-cover object-center w-full h-full"
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
          <div className="flex flex-col w-full sm:w-fit px-6 md:px-0  ">
            <h4 className="font-bold capitalize text-xl sm:text-base 2xl:text-xl mb-2">
              CA${propertyDetails.pricePerNight}{" "}
              <span className="text-sm italic  lowercase">per night</span>
            </h4>
            <p className="text-base sm:text-sm 2xl:text-base font-semibold">
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
                  disabled={(date) => {
                    // Disable dates that are booked or dates before `fromDate`
                    const isBooked = propertyDetails.bookedDates.some(
                      (bookedDate) => isSameDay(bookedDate, date)
                    );

                    const isUnavailable =
                      propertyDetails.nonAvailableDates.some(
                        (nonAvailableDate) => isSameDay(nonAvailableDate, date)
                      );

                    return isBooked || isUnavailable;
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
                {/* <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={(date) => {
                    setToDate(date);
                    setToDateOpen(false);
                  }}
                  initialFocus
                /> */}
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={(date) => {
                    if (fromDate && isAfter(date!, fromDate)) {
                      setToDate(date);
                      setToDateOpen(false);
                    } else {
                      toast.error(
                        "Please select a valid end date after the start date."
                      );
                    }
                  }}
                  // @ts-ignore
                  disabled={(date) => {
                    // Disable dates that are booked or dates before `fromDate`
                    const isBooked = propertyDetails.bookedDates.some(
                      (bookedDate) => isSameDay(bookedDate, date)
                    );
                    const isUnavailable =
                      propertyDetails.nonAvailableDates.some(
                        (nonAvailableDate) => isSameDay(nonAvailableDate, date)
                      );
                    const isBeforeFromDate =
                      fromDate && !isAfter(date, fromDate);

                    return isBooked || isBeforeFromDate || isUnavailable;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Display total nights */}
        {nights !== null && (
          <>
            <h2 className="text-xl font-bold 2xl:text-3xl my-4">
              The Hunt Begins...
            </h2>
            <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
              <p>
                CA${propertyDetails.pricePerNight} x {nights + 1} night
                {nights > 1 ? "s" : ""}
              </p>
              <p className="text-lg">
                CA${(propertyDetails.pricePerNight * (nights + 1)).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
              <p>
                Service fee{" "}
                <span className="text-xs text-slate-300 px-1 italic">10%</span>
              </p>
              {/* <p className="text-lg">CA${propertyDetails.pricePerNight}</p> */}
              {/* <p className="text-lg">10%</p> */}
              <p className="text-lg">
                CA$
                {(
                  (propertyDetails.pricePerNight * (nights! + 1) || 0) * 0.1
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
              <p>
                Taxes
                {/* <span className="text-xs text-slate-300 px-1 italic">
                  (10%)
                </span> */}
              </p>
              <p className="text-lg">
                CA$
                {(
                  (propertyDetails.pricePerNight * (nights! + 1) || 0) * 0.1
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex py-4 border-t border-primary-50/30 items-center text-xs 2xl:text-sm justify-between">
              <p className="font-bold">Total</p>
              <p className="font-bold text-lg">
                CA$
                {(
                  (propertyDetails.pricePerNight * (nights! + 1) || 0) +
                  (propertyDetails.pricePerNight * (nights! + 1) || 0) * 0.1 +
                  (propertyDetails.pricePerNight * (nights! + 1) || 0) * 0.1
                ).toFixed(2)}
              </p>
            </div>
          </>
        )}

        <button
          onClick={handleSubmit}
          type="button"
          className=" w-full sm:w-[96%] px-12 py-3 rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold mt-8"
        >
          Continue
        </button>
        <p className="text-xs 2xl:text-sm font-normal my-5 sm:my-3 tracking-wide text-gray-200">
          Don't worry, you won’t be charged yet.
        </p>
        <div className="  flex items-center justify-center gap-1 my-3">
          <CgLock className="text-lg text-primary-50" />
          <p className="2xl:text-sm  gap-2 text-xs font-normal tracking-wide text-gray-200">
            Secure checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
