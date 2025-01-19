"use client";
import { removeKeysFromQuery } from "@/lib/utils";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ImCancelCircle } from "react-icons/im";

const CityFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRemovePriceRange = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["tour"],
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex items-center gap-3">
      <p className="italic ">
        showing
        <span className=" font-semibold text-primary-50 px-1  not-italic  ">
          Properties
        </span>
        with Guided Tour.
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
