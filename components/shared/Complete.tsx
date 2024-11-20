"use client";

import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";
// Define Payment Status Type
type PaymentStatus =
  | "succeeded"
  | "processing"
  | "requires_payment_method"
  | "default";

// Map Payment Status to Content and Styling
const STATUS_CONTENT_MAP: Record<
  PaymentStatus,
  { text: string; icon: string; iconColor: string }
> = {
  succeeded: {
    text: "Payment Successful",
    icon: "/images/success.svg",
    iconColor: "#30B130",
  },
  processing: {
    text: "Your payment is processing.",
    icon: "/images/processing.svg",
    iconColor: "#6D6E78",
  },
  requires_payment_method: {
    text: "Your payment was not successful.",
    icon: "/images/failure.svg",
    iconColor: "#DF1B41",
  },
  default: {
    text: "Something went wrong.",
    icon: "/images/failure.svg",
    iconColor: "#DF1B41",
  },
};

export default function CompletePage(): JSX.Element {
  const stripe = useStripe();
  const [status, setStatus] = useState<PaymentStatus>("default");
  const [intentId, setIntentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  // Log the current status for debugging
  console.log("🚀 ~ CompletePage ~ status:", status);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (!stripe) return;

      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) return;

      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(
          clientSecret
        );
        if (paymentIntent) {
          setStatus(paymentIntent.status as PaymentStatus);
          setIntentId(paymentIntent.id);
        }
      } catch (error) {
        console.error("Failed to retrieve payment intent:", error);
        setStatus("default");
      }
    };

    fetchPaymentIntent();

    // Delay showing results for 3 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 3000);

    return () => clearTimeout(timeout); // Clean up the timeout
  }, [stripe]);

  // Loader component
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-xl bg-[#09090999] -mt-24 rounded-xl flex flex-col items-center justify-center gap-4 p-5 py-12">
          <Loader size={70} className=" animate-spin" />
          <h2 className=" text-2xl font-semibold tracking-wide capitalize">
            Finalizing your payment...
          </h2>
          <p className="text-sm text-primary-50 text-center">
            Please wait while we process your payment. <br /> This may take a
            few seconds.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center h-screen">
      {status === "succeeded" ? (
        <div className="w-full max-w-xl bg-[#09090999] -mt-24 rounded-xl flex flex-col items-center justify-center gap-4 p-5 py-12">
          <Image
            src={STATUS_CONTENT_MAP[status].icon}
            width={70}
            height={70}
            alt="Payment Status"
            className="rounded-xl mb-4"
          />
          <h2 className="text-lg 2xl:text-2xl mb-2 font-semibold">
            {STATUS_CONTENT_MAP[status].text}
          </h2>
          <p className="text-sm text-gray-300">
            Your trip information will be emailed.
          </p>
          <Link
            href="/account?tab=trips"
            className="w-3/4 bg-gradient-to-r text-center hover:cursor-pointer text-black my-4 from-[#FF9900] to-[#FFE7A9] rounded-xl py-3 font-semibold"
          >
            View Trip Details
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-[#09090999] -mt-24 rounded-xl flex flex-col items-center justify-center p-5 gap-4 py-12">
          <Image
            src={STATUS_CONTENT_MAP[status].icon}
            width={70}
            height={70}
            alt="Payment Status"
            className="rounded-xl mb-4"
          />
          <h2 className="text-lg 2xl:text-2xl mb-2 font-semibold">
            {STATUS_CONTENT_MAP[status].text}
          </h2>
          <p className="text-sm text-gray-300">
            Please consider trying again. Your card was not charged.
          </p>
          <Link
            href="/home"
            className="w-3/4 bg-gradient-to-r text-center hover:cursor-pointer text-black my-4 from-[#FF9900] to-[#FFE7A9] rounded-xl py-3 font-semibold"
          >
            {status === "requires_payment_method"
              ? "Try Purchase Again"
              : "Return Home"}
          </Link>
        </div>
      )}
    </div>
  );
}
