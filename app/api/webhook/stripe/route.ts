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
      bookingEmail: metadata.bookingEmail,
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
    console.log("🚀 ~ POST ~ booking:", booking)

    // Update the property with the booked dates
    await updatePropertyWithBookedDates(metadata.property, metadata.checkIn, metadata.checkOut);

    // Handle referral rewards
    await handleReferralReward(metadata.user, amount);

    // Add booking payment to the owner's account
    await addBookingPaymentToOwner(metadata.property, amount, booking._id);

    return NextResponse.json({ message: "OK", booking });
  }

  return new Response("", { status: 200 });
}

async function addBookingPaymentToOwner(propertyId: string, bookingAmount: number, bookingId: string) {
  // Find the property by its ID
  const property = await Property.findById(propertyId);

  if (property) {
    // Assuming 'owner' is a reference to the User model (property owner)
    const owner = await User.findById(property.owner);

    if (owner) {
      // Create a new booking payment object
      const bookingPayment = {
        amount: bookingAmount,            // Booking amount
        bookingRefId: bookingId,          // Reference to the booking ID
        status: 'pending',                // Status (can change to 'paid' later)
        date: new Date(),                 // Payment date
      };

      owner.bookingPayments.push(bookingPayment);
      await owner.save();

      console.log(`Booking payment of ${bookingAmount} added to property owner ${owner.email}`);
    } else {
      console.error(`Owner not found for property ID: ${propertyId}`);
    }
  } else {
    console.error(`Property not found with ID: ${propertyId}`);
  }
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

async function handleReferralReward(userId: string, bookingAmount: number) {
  // Find the user who made the booking
  const user = await User.findById(userId);

  if (user && user.referedBy && !user.referalUsed) {
    // Find the referring user
    const referringUser = await User.findById(user.referedBy);

    if (referringUser) {
      // Calculate 10% of the total booking amount
      const rewardAmount = bookingAmount * 0.10;

      // Create a new referral earning object
      const referralEarning = {
        amount: rewardAmount,              // 10% of booking amount
        referId: user._id,                 // ID of the user who booked (the referred user)
        description: `Referral reward for booking made by ${user.firstname} ${user.lastname}`,
        status: 'pending',                 // Status of the reward (can be updated to 'paid' later)
        date: new Date(),                  // Date of the referral
      };

      // Add the referral earning to the referring user's `referralEarnings` array
      referringUser.referralEarnings.push(referralEarning);

      // Save the referring user with the new referral earning
      await referringUser.save();

      // Mark the referred user's referral as used
      user.referalUsed = true;
      await user.save();

      console.log(`Referral reward of ${rewardAmount} added to user ${referringUser.email}`);
    }
  }
}
