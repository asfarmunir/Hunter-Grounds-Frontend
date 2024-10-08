import React from "react";
import Dashboard from "@/components/shared/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getUserDetails,
  getWithdrawableReferralAmount,
} from "@/database/actions/user.action";
import { getTopCitiesWithMostBookings } from "@/database/actions/booking.action";

const page = async () => {
  const session = await getServerSession(authOptions);
  const data = await getUserDetails(session.user.email);
  const available = await getWithdrawableReferralAmount(session.user.id);
  console.log("🚀 ~ page ~ available:", available);
  const topCities = await getTopCitiesWithMostBookings();

  return (
    <Dashboard
      userData={data}
      available={available.amount}
      topCities={topCities.topCities}
    />
  );
};

export default page;
