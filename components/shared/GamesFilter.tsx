"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { gameOptions } from "@/lib/constants";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { IoArrowBack, IoCloseSharp } from "react-icons/io5";

import { Checkbox } from "../ui/checkbox";

import { GiDeerHead } from "react-icons/gi";
import { formUrlQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

const GameFilter = () => {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCheckboxChange = (game: string) => {
    if (selectedGames.includes(game)) {
      setSelectedGames(
        selectedGames.filter((selectedGame) => selectedGame !== game)
      );
    } else {
      setSelectedGames([...selectedGames, game]);
    }
  };

  const submitHandler = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "games",
      value: `${selectedGames.join(",")}`,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex items-center gap-2 text-xs 2xl:text-sm border-r px-2.5 border-gray-500">
        <GiDeerHead className="text-lg text-primary-50/60" />

        <span>Games Available +</span>
      </AlertDialogTrigger>{" "}
      <AlertDialogContent className=" p-0  bg-primary-100/50  border-none md:min-w-[900px] 2xl:min-w-[1100px]  ">
        <AlertDialogCancel className=" w-fit absolute right-3 top-3 bg-primary-100/50 border-none">
          <IoCloseSharp className="text-3xl text-white p-1 bg-[#372F2F] rounded-full " />
        </AlertDialogCancel>

        <div className=" w-full bg-primary-100/50  gap-6  border border-primary-50/30 px-4 py-8 md:p-6  2xl:p-10 rounded-xl shadow-md">
          <p className="text-sm 2xl:text-lg border-b-2 pb-3 border-primary-50/20 w-full px-3  tracking-wide text-[#FFFFFF]  mb-2">
            Select the games you are interested in.
          </p>
          <div className="grid grid-cols-2 px-4 py-6  md:p-8  md:grid-cols-3 2xl:grid-cols-4 md:mt-4 2xl:mt-7 gap-4 2xl:gap-6">
            {gameOptions &&
              gameOptions.map((game) => (
                <div key={game} className="flex items-center">
                  <Checkbox
                    value={game}
                    name={game}
                    checked={selectedGames.includes(game)}
                    onCheckedChange={() => handleCheckboxChange(game)}
                    className="mr-2 2xl:mr-2.5"
                  />

                  <label
                    htmlFor={game}
                    className=" capitalize text-[#FFFFFF80]"
                  >
                    {game}
                  </label>
                </div>
              ))}
          </div>
          <div className=" w-full flex items-center  justify-center pb-4 ">
            <button
              type="button"
              onClick={submitHandler}
              className=" bg-gradient-to-b from-white to-primary-50 text-black px-12 font-bold py-2.5 rounded-xl"
            >
              Set Games
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameFilter;
