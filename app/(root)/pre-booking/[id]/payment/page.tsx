import React from "react";
import BookingPayment from "@/components/shared/BookingPayment";
import { getPropertyById } from "@/database/actions/property.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserbyId } from "@/database/actions/user.action";
type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const page = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const user = await getServerSession(authOptions);
  const userDetails = await getUserbyId(user.user.id);
  console.log("🚀 ~ page ~ userDetails:", userDetails);
  const fromDate = (searchParams.fromDate as string) || "";
  const toDate = (searchParams.toDate as string) || "";
  const propertyDetails = await getPropertyById(id);
  return (
    <BookingPayment
      propertyDetails={propertyDetails.property}
      from={fromDate}
      to={toDate}
      userId={user.user.id}
      userCountry={userDetails.country}
    />
  );
};

export default page;
