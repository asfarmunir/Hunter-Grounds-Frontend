import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StreamChat from "@/components/shared/StreamChat";
import { redirect } from "next/navigation";
import Topbar from "@/components/shared/Topbar";
const page = async () => {
  const userDetails = await getServerSession(authOptions);
  console.log(userDetails);
  if (!userDetails) {
    redirect("/");
  }
  const links = [
    {
      name: "account",
      href: "/account",
    },
    {
      name: "inbox",
      href: "/chat",
    },
  ];

  return (
    <>
      <Topbar links={links} />
      <StreamChat userData={userDetails.user} />;
    </>
  );
};

export default page;
