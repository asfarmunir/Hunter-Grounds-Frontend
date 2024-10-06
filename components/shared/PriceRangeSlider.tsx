"use client";
import React, { useRef, useState } from "react";
import { Slider } from "../ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import qs from "query-string";
import { ImCancelCircle } from "react-icons/im";

const PriceRangeSlider = () => {
  const searchParams = useSearchParams();

  const price = searchParams.get("priceRange");
  console.log("🚀 ~ PriceRangeSlider ~ price:", price);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    price ? parseInt(price.split("-")[0]) : 4,
    price ? parseInt(price.split("-")[1]) : 196,
  ]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const onPriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);

    // Clear the previous timeout if it exists
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to update the URL after the user stops adjusting the slider
    debounceTimeout.current = setTimeout(() => {
      const currentParams = qs.parse(searchParams.toString());

      // Update the URL with priceRange and reset page to 1
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "priceRange",
        value: `${newRange[0]}-${newRange[1]}`,
      });

      // Ensure the page is set to 1 when price range changes
      const updatedUrlWithPageReset = qs.stringifyUrl({
        url: newUrl,
        query: {
          ...currentParams,
          page: 1, // Always reset to page 1
          priceRange: `${newRange[0]}-${newRange[1]}`,
        },
      });

      router.push(updatedUrlWithPageReset, { scroll: false });
    }, 500); // 500ms debounce delay
  };
  const handleRemovePriceRange = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["priceRange"],
    });
    router.push(newUrl, { scroll: false });
    setPriceRange([4, 196]);
  };

  return (
    <div className="flex flex-col items-center mb-6 md:mb-0 px-3 md:px-0 pt-4 justify-center gap-2 max-w-xl 2xl:max-w-2xl">
      {price ? (
        <button
          onClick={handleRemovePriceRange}
          className="text-sm 2xl:text-base  font-thin capitalize inline-flex items-center gap-1"
        >
          <ImCancelCircle className="text-red-500 text-lg" />
          Remove Price Range
        </button>
      ) : (
        <p className="text-sm 2xl:text-base  font-thin capitalize">
          Price range
        </p>
      )}
      <div className="flex items-center justify-between w-full px-1.5 mb-2 max-w-xs 2xl:max-w-sm">
        <p className="font-thin text-xs capitalize">From</p>
        <p className="font-thin text-xs capitalize">To</p>
      </div>
      <Slider
        defaultValue={priceRange}
        max={200}
        className="max-w-xs 2xl:max-w-sm mx-auto"
        step={1}
        onValueChange={onPriceRangeChange}
      />
      <div className="flex items-center justify-between w-full mt-2 max-w-xs 2xl:max-w-sm">
        <p className="font-thin text-xs capitalize">${priceRange[0]}</p>
        <p className="font-thin text-xs capitalize">${priceRange[1]}</p>
      </div>

      {/* Button to remove price range */}
    </div>
  );
};

export default PriceRangeSlider;
