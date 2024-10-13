import React from "react";
import Dashboard from "@/components/shared/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getUserDetails,
  updateBookingWithdrawableAmount,
} from "@/database/actions/user.action";
import { getTopPropertiesByOwner } from "@/database/actions/booking.action";
import { handleRejectedPayouts } from "@/database/actions/payout.action";

const page = async () => {
  const session = await getServerSession(authOptions);
  const data = await getUserDetails(session.user.email);
  await updateBookingWithdrawableAmount(session.user.id);
  const topCities = await getTopPropertiesByOwner(session.user.id);
  await handleRejectedPayouts();

  return <Dashboard userData={data} topCities={topCities.topCities} />;
};

export default page;
