"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";

type PaymentStatus =
  | "succeeded"
  | "processing"
  | "requires_payment_method"
  | "default";

const STATUS_CONTENT_MAP: Record<
  PaymentStatus,
  { text: string; iconColor: string }
> = {
  succeeded: {
    text: "Payment succeeded",
    iconColor: "#30B130",
  },
  processing: {
    text: "Your payment is processing.",
    iconColor: "#6D6E78",
  },
  requires_payment_method: {
    text: "Your payment was not successful, please try again.",
    iconColor: "#DF1B41",
  },
  default: {
    text: "Something went wrong, please try again.",
    iconColor: "#DF1B41",
  },
};

const page = () => {
  const stripe = useStripe();
  const [status, setStatus] = useState<PaymentStatus>("default");
  const [intentId, setIntentId] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: { paymentIntent?: any }) => {
        if (paymentIntent) {
          setStatus(paymentIntent.status as PaymentStatus);
          setIntentId(paymentIntent.id);
        }
      });
  }, [stripe]);

  return (
    <div className=" w-full items-center justify-center flex h-screen">
      <div className=" w-full max-w-xl bg-[#09090999] -mt-24 rounded-xl flex flex-col items-center justify-center p-5 py-12">
        <Image
          src={"/images/success.svg"}
          width={70}
          height={70}
          alt="mail"
          className="rounded-xl mb-4 "
        />
        {status === "succeeded" && (
          <>
            <h2 className="text-lg 2xl:text-2xl mb-2 font-semibold">
              {STATUS_CONTENT_MAP[status].text}
            </h2>
            <p className="text-sm text-gray-300 ">
              Your trip information will be emailed
            </p>
          </>
        )}

        {status === "requires_payment_method" && (
          <>
            <h2 className="text-lg 2xl:text-2xl mb-2 font-semibold">
              {STATUS_CONTENT_MAP[status].text}
            </h2>
          </>
        )}

        {status === "succeeded" && (
          <Link
            href={"/"}
            className=" w-3/4 bg-gradient-to-r text-center  text-black my-4 from-[#FF9900] to-[#FFE7A9] rounded-xl py-3 font-semibold"
          >
            View Trip Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default page;
