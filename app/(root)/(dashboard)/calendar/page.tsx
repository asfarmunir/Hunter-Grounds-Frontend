import React from "react";
import PropertyCalendar from "@/components/shared/PropertyCalendar";
import {
  getAllProperties,
  getUserProperties,
} from "@/database/actions/property.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const page = async () => {
  const session = await getServerSession(authOptions);
  const userProperties = await getUserProperties(session.user.id);

  return <PropertyCalendar data={userProperties.properties} />;
};

export default page;
