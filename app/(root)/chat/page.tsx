import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StreamChat from "@/components/shared/StreamChat";
import { redirect } from "next/navigation";
const page = async () => {
  const userDetails = await getServerSession(authOptions);
  console.log(userDetails);
  if (!userDetails) {
    redirect("/");
  }

  return <StreamChat userData={userDetails.user} />;
};

export default page;
