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

// Define types for the error object
type Errors = {
  amount?: string;
  email?: string;
  terms?: string;
};

interface WithdrawFundsProps {
  userId: string;
}

const WithdrawFunds: React.FC<WithdrawFundsProps> = ({ userId }) => {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [paypalEmail, setPaypalEmail] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const modalRef = useRef(null);

  // Simple email validation
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Form validation and handling
  const handleWithdraw = async () => {
    const formErrors: Errors = {};

    if (!withdrawAmount || withdrawAmount <= 0) {
      formErrors.amount =
        "Please enter a valid withdrawal amount greater than $0.";
    }

    if (!paypalEmail || !validateEmail(paypalEmail)) {
      formErrors.email = "Please enter a valid PayPal email.";
    }

    if (!termsAccepted) {
      formErrors.terms = "You must accept the terms to withdraw.";
    }

    // If no errors, proceed with withdrawal
    if (Object.keys(formErrors).length === 0) {
      // Handle payout creation (this would trigger a backend call)
      console.log("Processing payout:", {
        userId,
        withdrawAmount,
        paypalEmail,
      });

      const data = {
        user: userId,
        amount: withdrawAmount,
        accountEmail: paypalEmail,
      };
      const res = await createPayout(data);
      console.log("Payout response:", res);
      if (res.status !== 200) {
        toast.error(res.message, {
          duration: 5000,
          style: {
            backgroundColor: "#FF0000",
            color: "#fff",
          },
        });
        return;
      }

      toast.success("Payout Requested successfully!", {
        duration: 5000,
      });
      if (modalRef.current) {
        // @ts-ignore
        modalRef.current.click();
      }
      // Reset form (you can also show a success message here)

      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        ref={modalRef}
        className="p-4 py-3 rounded-full bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold"
      >
        Withdraw Funds
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 dark:bg-[#161313CC] border-none 2xl:min-w-[600px]">
        <AlertDialogCancel className="w-fit absolute right-3 rounded-full border-none dark:bg-[#161313CC] top-3">
          <IoCloseSharp className="text-white bg-primary-200 p-1 text-3xl rounded-full" />
        </AlertDialogCancel>
        <div className="p-5 flex px-9 flex-col items-center">
          <Image
            src={"/images/logo.svg"}
            width={200}
            height={200}
            className="mb-5"
            alt="withdraw"
          />
          <h2 className="text-lg font-semibold mb-1">Withdrawal Method</h2>
          <p className="tracking-wide mb-6 text-sm text-gray-300">
            Please Choose your desired method.
          </p>

          {/* Withdraw Amount */}
          <div className="mb-3 w-full">
            <label htmlFor="withdrawAmount" className="text-sm mb-2">
              Withdraw Amount
            </label>
            <div className="flex items-center gap-2 bg-[#372F2F4D] border border-[#372F2F] mt-2 rounded-lg">
              <p className="text-xl text-white bg-primary-100 p-3 px-5">$</p>
              <input
                id="withdrawAmount"
                type="number"
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                placeholder="Enter Amount"
                className="dark:bg-transparent rounded-lg w-full p-3"
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* PayPal Email */}
          <div className="mb-2 w-full">
            <label htmlFor="paypalEmail" className="text-sm mb-2">
              PayPal Email
            </label>
            <input
              id="paypalEmail"
              type="text"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="Enter email"
              className="bg-[#372F2F4D] border mt-2 border-[#372F2F] rounded-lg w-full p-3"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-center gap-4 mt-2 w-full justify-start">
            <Checkbox
              checked={termsAccepted}
              // @ts-ignore
              onCheckedChange={setTermsAccepted}
            />
            <p className="text-sm text-gray-300">I accept terms</p>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleWithdraw}
            className="w-fit px-12 py-3 rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold my-4"
          >
            Withdraw
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawFunds;
