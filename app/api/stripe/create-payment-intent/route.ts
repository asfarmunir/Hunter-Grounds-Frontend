// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const currentYear = new Date().getFullYear();

  // Construct proper Date objects
  const checkInDate = new Date(`${currentYear}-${data.checkIn}`);
  const checkOutDate = new Date(`${currentYear}-${data.checkOut}`);

  // Convert dates to ISO format or any format you prefer
  const checkInISO = checkInDate.toISOString();
  const checkOutISO = checkOutDate.toISOString();

  // Ensure amount is converted to integer (in cents) and rounded properly
  const totalAmountInCents = Math.round(data.totalAmount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    description: 'hunterground payment intent',
    shipping: {
      name: data.bookingFirstname + ' ' + data.bookingLastname,
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
    amount: totalAmountInCents, // Corrected here
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      ...data,
      checkIn: checkInISO,
      checkOut: checkOutISO,
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
}
