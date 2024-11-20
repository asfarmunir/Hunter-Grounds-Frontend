"use client";
import CompletePage from "@/components/shared/Complete";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
};

const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const page = ({ searchParams }: SearchParamProps) => {
  const secret = searchParams?.payment_intent_client_secret as string;
  console.log("🚀 ~ page ~ secret:", secret);
  const [clientSecret, setClientSecret] = React.useState(secret);

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

  return (
    <>
      {/* @ts-ignore */}
      <Elements options={options} stripe={stripePromise}>
        <CompletePage />
      </Elements>
      {/* <div className=" w-full items-center justify-center flex h-screen">
        <div className=" w-full max-w-xl bg-[#09090999] -mt-24 rounded-xl flex flex-col items-center justify-center p-5 py-12">
          <Image
            src={"/images/success.svg"}
            width={70}
            height={70}
            alt="mail"
            className="rounded-xl mb-4 "
          />
          <h2 className="text-lg 2xl:text-2xl mb-2 font-semibold">
            Payment Successful
          </h2>
          <p className="text-sm text-gray-300 ">
            Your trip information will be emailed
          </p>
          <Link
            href={"/account?tab=trips"}
            className=" w-3/4 bg-gradient-to-r text-center hover:cursor-pointer text-black my-4 from-[#FF9900] to-[#FFE7A9] rounded-xl py-3 font-semibold"
          >
            View Trip Details
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default page;
