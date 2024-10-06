"use client";
import { removeKeysFromQuery } from "@/lib/utils";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ImCancelCircle } from "react-icons/im";

const CityFilter = ({ city }: { city: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRemovePriceRange = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["city"],
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex items-center gap-2">
      <p className=" italic">
        Showing Results for{" "}
        <span className=" font-bold text-primary-50 capitalize not-italic px-1">
          {city}
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
