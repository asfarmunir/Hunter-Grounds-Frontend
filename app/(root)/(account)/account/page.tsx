import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getUserDetails,
  getUserSavedProperties,
} from "@/database/actions/user.action";
import UserProfile from "@/components/shared/UserProfile";
import { getUserBookings } from "@/database/actions/booking.action";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userBookings = await getUserBookings(session.user.id);
  const savedProperties = await getUserSavedProperties(session.user.id);
  const userDetails = await getUserDetails(session.user.email);
  return (
    <UserProfile
      userDetails={userDetails}
      userBookings={userBookings.bookings}
      savedProperties={savedProperties.properties}
    />
  );
};

export default page;
