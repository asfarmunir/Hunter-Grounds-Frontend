"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { createPayout } from "@/database/actions/payout.action";
import toast from "react-hot-toast";
import { useRef } from "react";
import Link from "next/link";

// Define types for the error object
type Errors = {
  amount?: string;
  email?: string;
  terms?: string;
};

interface WithdrawFundsProps {
  userId: string;
}

const WithdrawFunds = () => {
  // Simple email validation

  return (
    <AlertDialog>
      <AlertDialogTrigger className="  text-primary-50 underline font-semibold">
        Payout Explained
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 pb-10 transition-all dark:bg-[#161313CC] border-none 2xl:min-w-[600px]">
        <AlertDialogCancel className="w-fit absolute right-3 rounded-full border-none dark:bg-[#161313CC] top-3">
          <IoCloseSharp className="text-white bg-primary-200 p-1 text-3xl rounded-full" />
        </AlertDialogCancel>
        <div className="p-6 flex flex-col items-center">
          <Image
            src={"/images/logoIcon.svg"}
            width={70}
            height={70}
            className="mb-5"
            alt="withdraw"
          />
          <h1 className="text-2xl border-b-2 px-8 border-primary-50/50 pb-3 font-semibold text-center mb-6">
            Payout Explained
          </h1>
          <p className=" text-start text-sm 2xl:text-base">
            You can request your funds 14 days after the checkout of the sale in
            which you referred. <br />
            <br /> An icon will appear on this page when the funds are
            withdrawable. <br /> <br /> Payouts are processed within 10 business
            days following the request, via PayPal. Please make sure you have
            entered the correct PayPal email address on the request.
          </p>
          {/* <p className="text-sm text-primary-50 font-bold mt-10 text-center">
            10% of the sale amount is deducted as a service fee.
          </p> */}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawFunds;
