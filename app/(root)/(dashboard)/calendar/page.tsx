import React from "react";
import PropertyCalendar from "@/components/shared/PropertyCalendar";
import { getAllProperties } from "@/database/actions/property.action";

const page = async () => {
  const properties = await getAllProperties({
    limit: 6,
    page: 1,
  });
  return <PropertyCalendar data={properties.properties} />;
};

export default page;
