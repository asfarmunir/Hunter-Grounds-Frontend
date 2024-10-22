import React from "react";
import Dashboard from "@/components/shared/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getUserDetails,
  updateBookingWithdrawableAmount,
} from "@/database/actions/user.action";
import {
  getTopPropertiesByOwner,
  getBookingCountByTimeFrame,
} from "@/database/actions/booking.action";
import {
  getPayoutsOfUser,
  handleRejectedPayouts,
} from "@/database/actions/payout.action";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const timeframe = searchParams?.timeframe as string | "24h";
  const data = await getUserDetails(session.user.email);
  await updateBookingWithdrawableAmount(session.user.id);
  const topCities = await getTopPropertiesByOwner(session.user.id);
  await handleRejectedPayouts();
  const bookingsForUser = await getBookingCountByTimeFrame(
    session.user.id,
    timeframe
  );

  const userPayouts = await getPayoutsOfUser(session.user.id);
  console.log("🚀 ~ userPayouts:", userPayouts);

  return (
    <Dashboard
      userData={data}
      topCities={topCities.topCities}
      totalBookings={bookingsForUser.bookingCount}
      userPayouts={userPayouts.data}
    />
  );
};

export default page;
