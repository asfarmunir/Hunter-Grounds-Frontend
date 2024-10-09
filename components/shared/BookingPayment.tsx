"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/shared/CheckoutForm";
import CompletePage from "@/components/shared/Complete";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PaymentSuccess from "@/components/shared/PaymentSuccess";
import toast from "react-hot-toast";
import { IProperty } from "@/lib/types/property";

// Load Stripe outside of the component to avoid reinitializing it on every render
const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const page = ({
  propertyDetails,
  from,
  to,
  userId,
}: {
  propertyDetails: IProperty;
  from: string;
  to: string;
  userId: string;
}) => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState<string>("");
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [paymentBegan, setPaymentBegan] = useState<boolean>(false);
  const [totalDays, setTotalDays] = useState<number>(0);

  const parseDate = (dateStr: string) => {
    const [month, day] = dateStr.split("-").map(Number);
    return new Date(new Date().getFullYear(), month - 1, day);
  };
  const checkIn = parseDate(from);
  const checkOut = parseDate(to);

  const [bookingDetails, setBookingDetails] = useState<any>({
    bookingFirstname: "poyon",
    bookingLastname: "Oil",
    bookingEmail: "test@test.com",
    areaCode: "92",
    phone: "320873564",
    totalAmount: 0,
    property: propertyDetails._id,
    user: userId,
    checkIn: checkIn,
    checkOut: checkOut,
  });

  useEffect(() => {
    const confirmedPayment = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    setConfirmed(confirmedPayment);
    const daysBetween = calculateDays(from, to);
    setTotalDays(daysBetween);
  }, []);

  const formatDateRange = (fromDate: string, toDate: string) => {
    const parseDate = (dateStr: string) => {
      const [month, day] = dateStr.split("-").map(Number);
      return new Date(new Date().getFullYear(), month - 1, day);
    };

    const fromDateObj = parseDate(fromDate);
    const toDateObj = parseDate(toDate);

    const fromMonth = fromDateObj.toLocaleDateString("en-US", {
      month: "short",
    });
    const toMonth = toDateObj.toLocaleDateString("en-US", { month: "short" });

    return `${fromMonth} ${fromDateObj.getDate()} - ${toMonth} ${toDateObj.getDate()}`;
  };

  const calculateDays = (fromDate: string, toDate: string) => {
    const [fromMonth, fromDay] = fromDate.split("-").map(Number);
    const [toMonth, toDay] = toDate.split("-").map(Number);

    const year = new Date().getFullYear(); // Use the current year
    const from = new Date(year, fromMonth - 1, fromDay); // month is 0-indexed
    const to = new Date(year, toMonth - 1, toDay);

    const timeDiff = to.getTime() - from.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff;
  };

  const appearance = {
    theme: "night",
    fonts: "poppinw",
    rules: {
      ".Label": {
        marginBottom: "10px",
        fontSize: "1rem",
        color: "white",
        textTransform: "capitalize",
        fontWeight: "bold",
      },
      ".Input": {
        backgroundColor: "#372F2F33",
        border: "1px solid #372F2FCC",
        borderRadius: "10px",
        padding: "14px",
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPaymentBegan(true);

    const data = {
      bookingFirstname: bookingDetails.bookingFirstname,
      bookingLastname: bookingDetails.bookingLastname,
      bookingEmail: bookingDetails.bookingEmail,
      bookingPhone: bookingDetails.areaCode + bookingDetails.phone,
      property: bookingDetails.property,
      user: bookingDetails.user,
      checkIn: from,
      checkOut: to,
      totalAmount:
        propertyDetails.pricePerNight * (totalDays + 1) +
        propertyDetails.pricePerNight * (totalDays + 1) * 0.15,
    };
    axios
      .post("/api/stripe/create-payment-intent", {
        data,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setDpmCheckerLink(res.data.dpmCheckerLink);
      })
      .catch((error) => {
        toast.error("Error creating payment intent");
        console.error("Error creating payment intent:", error);
      });
  };

  return (
    <div className=" w-full flex flex-col md:flex-row gap-10 justify-between p-4 md:p-20">
      <div className="flex flex-col gap-2 w-full max-w-lg 2xl:max-w-2xl">
        <h2 className="text-2xl 2xl:text-4xl  font-bold">Review And Pay</h2>
        <p className="text-sm 2xl:text-base mb-6">
          Please fill out the details for your booking.{" "}
        </p>
        {!paymentBegan && (
          <form action="" onSubmit={submitHandler} className=" space-y-3">
            <div className=" w-full flex flex-col md:flex-row  items-center gap-4  justify-between">
              <div className="flex w-full flex-col gap-1.5">
                <p className="text-xs 2xl:text-base">First Name</p>
                <input
                  type="text"
                  required
                  value={bookingDetails.bookingFirstname}
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      bookingFirstname: e.target.value,
                    });
                  }}
                  className="bg-[#3C3C434A] w-full border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
                  placeholder=" Enter first name "
                />
              </div>
              <div className="flex w-full flex-col gap-1.5">
                <p className="text-xs 2xl:text-base">Last Name</p>
                <input
                  type="text"
                  required
                  value={bookingDetails.bookingLastname}
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      bookingLastname: e.target.value,
                    });
                  }}
                  className="bg-[#3C3C434A] border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
                  placeholder=" Enter last name "
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs 2xl:text-base">Email</p>
              <input
                type="text"
                required
                value={bookingDetails.bookingEmail}
                onChange={(e) => {
                  setBookingDetails({
                    ...bookingDetails,
                    bookingEmail: e.target.value,
                  });
                }}
                className="bg-[#3C3C434A] border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
                placeholder=" Enter email "
              />
            </div>
            <div className=" w-full pt-2 pb-4 flex flex-col md:flex-row my-2.5 items-center gap-4  justify-between">
              <div className="flex w-full flex-col gap-1.5">
                <input
                  required
                  type="number"
                  value={bookingDetails.areaCode}
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      areaCode: e.target.value,
                    });
                  }}
                  className="bg-[#3C3C434A] border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
                  placeholder=" Area Code "
                />
              </div>
              <div className="flex w-full flex-col gap-1.5">
                <input
                  type="number"
                  required
                  value={bookingDetails.phone}
                  onChange={(e) => {
                    setBookingDetails({
                      ...bookingDetails,
                      phone: e.target.value,
                    });
                  }}
                  className="bg-[#3C3C434A] border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
                  placeholder=" Phone number "
                />
              </div>
            </div>
            <button
              type="submit"
              className=" hover:cursor-pointer w-full  mt-6 px-12 py-3  disabled:cursor-not-allowed flex items-center justify-center rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold "
            >
              Continue to Payment
            </button>
          </form>
        )}

        {paymentBegan && (
          <div className=" my-6 w-full bg-[#121312c0] space-y-2 flex flex-col items-center rounded-xl p-5 border border-[#2a2c2a21]">
            <h3 className=" mx-auto 2xl:text-lg mb-5 ">Payment Details</h3>

            {clientSecret && (
              //@ts-ignore
              <Elements options={options} stripe={stripePromise}>
                {confirmed ? (
                  <PaymentSuccess />
                ) : (
                  <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
                )}
              </Elements>
            )}
            {/* ////// */}
            {/* <div className="flex flex-col gap-2 w-full">
            <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
              Card Number
            </p>
            <input
              type="text"
              className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter card number "
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
              Card Number
            </p>
            <input
              type="text"
              className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter card number "
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
              Card Name
            </p>
            <input
              type="text"
              className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter card name "
            />
          </div>
          <div className=" w-full flex flex-col md:flex-row items-center gap-4  justify-between">
            <div className="flex flex-col w-full gap-1.5">
              <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
                Date
              </p>
              <input
                type="text"
                className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
                placeholder=" mm / yy "
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
                CVV
              </p>
              <input
                type="text"
                className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
                placeholder=" X X X "
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full mb-4">
            <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
              Zip Code
            </p>
            <input
              type="text"
              className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter zip code"
            />
          </div> */}

            <div className="flex items-center px-2 py-4 gap-3 justify-start w-full ">
              <Checkbox
                className=" w-4 h-4 
            "
              />
              <p className="text-xs  tracking-wide">
                Save my payment information so checkout easy in next time
              </p>
            </div>
            <div className=" w-full flex justify-start">
              <button className=" px-3 py-2 text-xs 2xl:text-sm rounded-lg w-fit text-[#00C88C] border border-[#00c88c3c] bg-[#00C88C]/10">
                Use Added Card
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="">
        <h2 className="text-2xl font-bold 2xl:text-4xl text-center md:text-start mb-8">
          Booking Summary
        </h2>
        <div className="  gap-4 flex flex-col md:flex-row pb-4 items-center md:items-start border-b border-primary-50/30">
          <Image
            src={"/images/place1.svg"}
            width={165}
            height={165}
            alt="mail"
            className="rounded-xl  "
          />
          <div className="flex flex-col">
            <h4 className="font-bold 2xl:text-lg mb-2">
              {propertyDetails.name}
            </h4>
            <p className="text-sm mb-1">{formatDateRange(from, to)}</p>
            <p className="text-sm">
              {propertyDetails.acres} acres in {propertyDetails.city}
            </p>

            <p className="text-xs mt-4 mb-2">Coupon (optional)</p>
            <input
              placeholder="Enter coupen code"
              className="bg-[#222229cb] py-3  px-3 rounded-xl text-sm border border-[#50505c4a] "
              type="text"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold 2xl:text-3xl my-4">
          The Hunt Begins...
        </h2>
        <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
          <p>
            Service fee{" "}
            <span className="text-xs text-slate-300 px-1 italic">
              per night
            </span>
          </p>
          <p className="text-lg">CA${propertyDetails.pricePerNight}</p>
        </div>
        <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
          <p>
            CA${propertyDetails.pricePerNight} x {totalDays + 1} nights
          </p>
          <p className="text-lg">
            CA$
            {propertyDetails.pricePerNight * (totalDays + 1)}
          </p>
        </div>

        <div className="flex items-center text-xs  pb-4 border-b border-primary-50/30 my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
          <p>Taxes</p>
          <p>
            CA$
            {(propertyDetails.pricePerNight * (totalDays + 1) * 0.15).toFixed(
              2
            )}
          </p>
        </div>
        <div className="flex py-4 rounded-br-2xl bg-primary-50/20 px-4 mt-3 rounded-bl-2xl items-center text-xs 2xl:text-sm  justify-between">
          <p className="font-bold">Total Amount</p>
          <p className="font-bold">
            CA$
            {propertyDetails.pricePerNight * (totalDays + 1) +
              propertyDetails.pricePerNight * (totalDays + 1) * 0.15}
          </p>
        </div>
        <p className="text-xs 2xl:text-sm max-w-md 2xl:max-w-lg font-normal my-3 2xl:my-5 tracking-wide text-gray-200">
          By selecting the button below, I agree to pay the total amount shown,
          which includes service fees, and I agree to the host’s Moderate
          Cancellation Policy,  the host's rules, HuntGrounds Terms of Use, and
          HuntGrounds Privacy Policy.{" "}
        </p>
        {/* <button className=" w-[96%] px-12 py-3 mt-4 rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold ">
          I agree and book now
        </button> */}
      </div>
    </div>
  );
};

export default page;
