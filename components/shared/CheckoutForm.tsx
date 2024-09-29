"use client";

import React, { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { BounceLoader } from "react-spinners";

interface CheckoutFormProps {
  dpmCheckerLink: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ dpmCheckerLink }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/pre-booking/success",
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An error occurred");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions: any = {
    layout: "tabs",
  };

  return (
    <>
      <form id="payment-form" className=" w-full" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className=" w-full md:mt-6 px-12 py-3  disabled:cursor-not-allowed flex items-center justify-center rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold "
        >
          <span id="button-text">
            {isLoading ? (
              <BounceLoader size={28} color={"white"} />
            ) : (
              "I agree and book now"
            )}
          </span>
        </button>
        {message && (
          <div
            id="payment-message"
            className="mt-3  text-sm 2xl:text-base text-red-500"
          >
            {message}
          </div>
        )}
      </form>

      {/* [DEV]: For demo purposes only, display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location,
          order amount, and currency.&nbsp;
          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Preview payment methods by transaction
          </a>
        </p>
      </div>
    </>
  );
};

export default CheckoutForm;
