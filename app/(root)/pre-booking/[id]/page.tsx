import React from "react";
import PropertBooking from "@/components/shared/PropertyBooking";
import { getPropertyById } from "@/database/actions/property.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import LoggedOut from "@/components/shared/loggedOut";
const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <LoggedOut />;
  }

  const property = await getPropertyById(id);
  return (
    <PropertBooking
      propertyDetails={property.property}
      userId={session.user.id}
    />
  );
};

export default Page;
