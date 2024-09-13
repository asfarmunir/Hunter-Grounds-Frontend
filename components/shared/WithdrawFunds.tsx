"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";

const WithdrawFunds = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="  p-4 py-3 rounded-full bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold ">
        Withdraw Funds
      </AlertDialogTrigger>
      <AlertDialogContent className=" p-0  dark:bg-[#161313CC] border-none  2xl:min-w-[600px]  ">
        <AlertDialogCancel className=" w-fit absolute right-3 rounded-full dark:bg-[#161313CC] top-3">
          <IoCloseSharp className="text-white text-xl " />
        </AlertDialogCancel>
        <div className=" p-5 flex px-9   flex-col items-center ">
          <Image
            src={"/images/logo.svg"}
            width={200}
            height={200}
            className="mb-5"
            alt="withdraw"
          />
          <h2 className="text-lg font-semibold mb-1">Withdrawal Method</h2>
          <p className="  tracking-wide mb-6 text-sm text-gray-300">
            Please Choose your desired method.
          </p>
          <div className="mb-3 w-full">
            <label htmlFor="" className="text-sm mb-2">
              Withdraw Amount
            </label>
            <input
              type="number"
              placeholder="Enter Amount"
              className="bg-[#372F2F4D] border mt-2 border-[#372F2F] rounded-lg w-full p-2"
            />
          </div>
          <div className="mb-2 w-full">
            <label htmlFor="" className="text-sm mb-2">
              PayPal Email
            </label>
            <input
              type="text"
              placeholder="Enter email"
              className="bg-[#372F2F4D] border mt-2 border-[#372F2F] rounded-lg w-full p-2"
            />
          </div>
          <button className=" w-fit px-12 py-3 rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold my-4">
            Withdraw
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawFunds;
