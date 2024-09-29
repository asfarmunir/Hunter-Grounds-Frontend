// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { NextRequest, NextResponse } from "next/server";

const calculateOrderAmount = (items:any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export async function POST(req : NextRequest) {
  const { items } = await req.json();

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
   description: 'Software development services',
  shipping: {
    name: 'Jenny Rosen',
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
  },
  amount: 1099,
  currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
        integration_check: 'accept_a_payment',
        customer_id: '123456789',
        customer_name: 'Jane Doe',
        customer_email: 'asdsa@asd.com',
        customer_phone: '123456789',
        customer_address: '123 Main Street',
        customer_postal_code: '12345',
        customer_city: 'San Francisco',
        customer_state: 'CA',
        },
  });


  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.   
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  })

};