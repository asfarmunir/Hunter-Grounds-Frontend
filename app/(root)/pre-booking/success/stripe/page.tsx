"use client";

import React, { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/shared/CheckoutForm";
import CompletePage from "@/components/shared/Complete";
import axios from "axios";

// Load Stripe outside of the component to avoid reinitializing it on every render
const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const App: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState<string>("");
  const [confirmed, setConfirmed] = useState<string | null>(null);

  useEffect(() => {
    // Check if the payment has been confirmed using the query param
    const confirmedPayment = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    setConfirmed(confirmedPayment);
  }, []);

  //   useEffect(() => {
  //     // Create PaymentIntent on page load
  //     axios
  //       .post("/api/stripe/create-payment-intent", {
  //         items: [{ id: "xl-tshirt" }],
  //       })
  //       .then((res) => {
  //         setClientSecret(res.data.clientSecret);
  //         setDpmCheckerLink(res.data.dpmCheckerLink);
  //       })
  //       .catch((error) => {
  //         console.error("Error creating payment intent:", error);
  //       });
  //   }, []);

  const clicked = () => {
    axios
      .post("/api/stripe/create-payment-intent", {
        items: [{ id: "xl-tshirt" }],
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setDpmCheckerLink(res.data.dpmCheckerLink);
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
      });
  };

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <button onClick={clicked} className=" bg-blue-400 px-4 py-2 rounded-lg">
        lesgo
      </button>
      {clientSecret && (
        //@ts-ignore
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? (
            <CompletePage />
          ) : (
            <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
          )}
        </Elements>
      )}
    </div>
  );
};

export default App;
