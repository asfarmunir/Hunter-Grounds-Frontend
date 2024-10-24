import { getPropertyById } from "@/database/actions/property.action";
import { getUserbyId } from "@/database/actions/user.action";
import React from "react";
import EditProperty from "@/components/shared/EditProperty";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const propertyDetails = await getPropertyById(id);
  const user = await getUserbyId(propertyDetails.property.owner);
  return (
    <EditProperty userDetails={user} property={propertyDetails.property} />
  );
};

export default page;
