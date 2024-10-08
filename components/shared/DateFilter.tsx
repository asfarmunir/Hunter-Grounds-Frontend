"use client";
import { removeKeysFromQuery } from "@/lib/utils";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ImCancelCircle } from "react-icons/im";

const CityFilter = ({ from, to }: { from: string; to: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRemovePriceRange = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["dateFilter"],
    });
    router.push(newUrl, { scroll: false });
  };

  const fromDate = new Date(from);
  const formattedFromDate = fromDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const toDate = new Date(to);
  const formattedToDate = toDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center gap-2 mt-2">
      <p className=" italic">
        Properties available from{" "}
        <span className=" font-bold text-primary-50 capitalize text-sm  not-italic px-1">
          {formattedFromDate}
        </span>
        to
        <span className=" font-bold text-primary-50 capitalize text-sm  not-italic px-1">
          {formattedToDate}
        </span>
      </p>
      <button
        onClick={handleRemovePriceRange}
        className="text-sm 2xl:text-base  font-thin capitalize inline-flex items-center gap-1"
      >
        <ImCancelCircle className="text-red-500 text-lg" />
      </button>
    </div>
  );
};

export default CityFilter;
