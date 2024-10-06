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
  const { data } = await req.json();
 const currentYear = new Date().getFullYear();
  
  // Construct proper Date objects
  const checkInDate = new Date(`${currentYear}-${data.checkIn}`);
  const checkOutDate = new Date(`${currentYear}-${data.checkOut}`);

  // Convert dates to ISO format or any format you prefer
  const checkInISO = checkInDate.toISOString();
  console.log("🚀 ~ POST ~ checkInISO:", checkInISO)
  const checkOutISO = checkOutDate.toISOString();
  console.log("🚀 ~ POST ~ checkOutISO:", checkOutISO)

  const paymentIntent = await stripe.paymentIntents.create({
   description: 'hunterground payment intent', 
  shipping: {
    name: data.bookingFirstname + ' ' + data.bookingLastname,
    // address for payment intent is mendatory in indian region 
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
  },
    amount: data.totalAmount*100,
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
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.   
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  })

};