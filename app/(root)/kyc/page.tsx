import React from "react";
import KycVerification from "@/components/shared/KycVerfication";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const page = async () => {
  const user = await getServerSession(authOptions);
  console.log("🚀 ~ page ~ user:", user);
  if (!user) {
    return null;
  }
  return <KycVerification userId={user.user.id} />;
};

export default page;
