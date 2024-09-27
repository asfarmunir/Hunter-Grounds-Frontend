import React from "react";
import GeneralUserSettings from "@/components/shared/GeneralUseSettings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserDetails } from "@/database/actions/user.action";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ page ~ session:", session);

  const userDetails = await getUserDetails(session.user.email);
  return <GeneralUserSettings userDetails={userDetails} />;
};

export default page;
