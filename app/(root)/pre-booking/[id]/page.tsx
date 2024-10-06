import React from "react";
import PropertBooking from "@/components/shared/PropertyBooking";
import { getPropertyById } from "@/database/actions/property.action";
const page = async ({ params: { id } }: { params: { id: string } }) => {
  const property = await getPropertyById(id);
  return <PropertBooking propertyDetails={property.property} />;
};

export default page;
