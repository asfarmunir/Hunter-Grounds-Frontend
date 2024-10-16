"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoChevronDownOutline } from "react-icons/io5";
import { formUrlQuery } from "@/lib/utils"; // Assuming you have the formUrlQuery function in utils
import qs from "query-string";
import { useSearchParams, useRouter } from "next/navigation";

const PayoutFilter = ({
  properties,
}: {
  properties: {
    name: string;
    _id: string;
  }[];
}) => {
  const [selectedStatus, setSelectedStatus] = useState("Filter Property");
  const searchParams = useSearchParams();
  const router = useRouter();
  // Handler function for filter selection
  const handleFilterChange = (status: string) => {
    setSelectedStatus(status);
    const currentParams = qs.parse(searchParams.toString());

    const queryString = formUrlQuery({
      params: searchParams.toString(),
      key: "propertyName", // Example query key for status
      value: status === "ALL" ? null : status, // If 'ALL' is selected, we skip the query
    });

    router.push(queryString, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="  border border-primary-50/30 text-white justify-center text-nowrap w-full md:w-52 gap-4 text-xs 2xl:text-sm px-3 md:px-4 py-2.5 font-semibold rounded-full inline-flex items-center ">
        {selectedStatus}
        <IoChevronDownOutline className="w-3 h-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary-200 mt-1 p-3 rounded-lg shadow-sm">
        <DropdownMenuItem
          className="flex items-center text-xs 2xl:text-sm justify-between"
          onClick={() => handleFilterChange("ALL")}
        >
          <p>ALL</p>
        </DropdownMenuItem>
        {properties.map((property) => (
          <DropdownMenuItem
            key={property._id}
            className="flex items-center capitalize text-xs 2xl:text-sm justify-between"
            onClick={() => handleFilterChange(property.name)}
          >
            <p>{property.name}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PayoutFilter;
