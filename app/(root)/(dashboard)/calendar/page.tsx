import React from "react";
import PropertyCalendar from "@/components/shared/PropertyCalendar";
import {
  getPropertiesCalendar,
  getUserPropertyNames,
} from "@/database/actions/property.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const propertyName = searchParams?.propertyName as string | undefined;
  const session = await getServerSession(authOptions);
  const userProperties = await getPropertiesCalendar(
    session.user.id,
    propertyName
  );
  const propertyNames = await getUserPropertyNames(session.user.id);
  return (
    <PropertyCalendar
      data={userProperties.properties}
      propertyNames={propertyNames.propertyNames}
    />
  );
};

export default page;
