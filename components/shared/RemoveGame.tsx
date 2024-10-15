"use client";
import { removeKeysFromQuery } from "@/lib/utils";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ImCancelCircle } from "react-icons/im";

const RemoveGame = ({ games }: { games: string[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRemovePriceRange = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["games"],
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex items-center gap-2">
      <p>Showing Result for {games.length} games.</p>
      <button
        onClick={handleRemovePriceRange}
        className="text-sm 2xl:text-base  font-thin capitalize inline-flex items-center gap-1"
      >
        <ImCancelCircle className="text-red-500 text-lg mt-0.5" />
      </button>
    </div>
  );
};

export default RemoveGame;
