import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StreamChat from "@/components/shared/StreamChat";
const page = async () => {
  const userDetails = await getServerSession(authOptions);
  console.log(userDetails);
  if (!userDetails) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return <StreamChat userData={userDetails.user} />;
};

export default page;
