import stripe from "stripe";
import { NextResponse } from "next/server";
import { createBooking } from "@/database/actions/booking.action";
import Property from "@/database/property.model";
import User from "@/database/user.modal"; // Import the User model

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

  if (eventType === "payment_intent.succeeded") {
    const { id, amount, metadata } = event.data.object;
    const bookingDetails = {
      totalAmount: amount,
      bookingEmail: metadata.customer_email,
      user: metadata.user,
      property: metadata.property,
      bookingFirstname: metadata.bookingFirstname,
      bookingLastname: metadata.bookingLastname,
      bookingPhone: metadata.bookingPhone,
      checkIn: metadata.checkIn,
      checkOut: metadata.checkOut,
      paymentStatus: "completed",
    };

    // Create the booking
    const booking = await createBooking(bookingDetails);

    // Update the property with the booked dates
    await updatePropertyWithBookedDates(metadata.property, metadata.checkIn, metadata.checkOut);

    // Handle referral rewards
    await handleReferralReward(metadata.user, amount);

    return NextResponse.json({ message: "OK", booking });
  }

  return new Response("", { status: 200 });
}

async function updatePropertyWithBookedDates(propertyId: string, checkIn: string, checkOut: string) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  checkInDate.setUTCHours(0, 0, 0, 0);
  checkOutDate.setUTCHours(23, 59, 59, 999);

  const bookedDates = getDatesInRange(checkInDate, checkOutDate);

  await Property.updateOne(
    { _id: propertyId },
    { $push: { bookedDates: { $each: bookedDates } } }
  );
}

function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return dates;
}

// New function to handle referral rewards
async function handleReferralReward(userId: string, bookingAmount: number) {
  // Find the user who made the booking
  const user = await User.findById(userId);

  if (user && user.referedBy && !user.referalUsed) {
    // Find the referring user
    const referringUser = await User.findById(user.referedBy);

    if (referringUser) {
      // Calculate 15% of the total booking amount
      const rewardAmount = bookingAmount * 0.15;

      // Update the referring user's referral amount
      referringUser.referalAmount += rewardAmount;
      await referringUser.save();

      // Mark referral as used
      user.referalUsed = true;
      await user.save();

      console.log(`Referral reward of ${rewardAmount} added to user ${referringUser.email}`);
    }
  }
}
