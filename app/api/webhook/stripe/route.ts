import stripe from "stripe";
import { NextResponse } from "next/server";
import { createBooking } from "@/database/actions/booking.action";
import Property from "@/database/property.model";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
    console.log("🚀 ~ POST ~ metadata:", metadata)
    console.log("🚀 ~ POST ~ amount_total:", amount_total)
    console.log("🚀 ~ POST ~ id:", id)
    return NextResponse.json({ message: "OK",});
  }

  if(eventType === "payment_intent.succeeded") {
    const { id, amount, currency, payment_method_types , metadata} = event.data.object;
    const bookingDetails = {
      totalAmount: amount,
      bookingEmail: metadata.customer_email,
      user : metadata.user,
      property: metadata.property,
      bookingFirstname: metadata.bookingFirstname,
      bookingLastname: metadata.bookingLastname,
      bookingPhone: metadata.bookingPhone,
      checkIn: metadata.checkIn,
      checkOut: metadata.checkOut,
      // guests: metadata.guests,
      paymentStatus: "completed",
    }

    const booking = await createBooking(bookingDetails);
 // Update the property with the booked dates
    await updatePropertyWithBookedDates(metadata.property, metadata.checkIn, metadata.checkOut);

    return NextResponse.json({ message: "OK", booking});
  }

  return new Response("", { status: 200 });
}

async function updatePropertyWithBookedDates(propertyId: string, checkIn: string, checkOut: string) {
  // Parse the date strings without time zone conversion
  const checkInDate = new Date(`${checkIn}T00:00:00.000Z`);
  const checkOutDate = new Date(`${checkOut}T23:59:59.999Z`);

  // Get all dates between checkIn and checkOut
  const bookedDates = getDatesInRange(checkInDate, checkOutDate);

  // Update the property document
  await Property.updateOne(
    { _id: propertyId },
    { $push: { bookedDates: { $each: bookedDates } } }
  );
}

// Helper function to generate all dates between checkIn and checkOut
function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    // Push a copy of the current date to avoid mutation
    dates.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return dates;
}