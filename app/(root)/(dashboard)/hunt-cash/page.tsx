import React from "react";
import Huncash from "@/components/shared/Huntcash";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getReferralEarningsOfLastMonth,
  getUserDetails,
} from "@/database/actions/user.action";
const page = async () => {
  const session = await getServerSession(authOptions);
  const data = await getUserDetails(session.user.email);
  const lastMonthEarnings = await getReferralEarningsOfLastMonth(
    session.user.id
  );

  return (
    <Huncash userDetails={data} lastMonthEarning={lastMonthEarnings.amount} />
  );
};

export default page;
