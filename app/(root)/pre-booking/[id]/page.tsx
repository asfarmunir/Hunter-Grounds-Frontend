import React from "react";
import PropertBooking from "@/components/shared/PropertyBooking";
import { getPropertyById } from "@/database/actions/property.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const page = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const property = await getPropertyById(id);
  return (
    <PropertBooking
      propertyDetails={property.property}
      userId={session.user.id}
    />
  );
};

export default page;
