import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className=" w-full flex flex-col md:flex-row gap-10 justify-between p-4 md:p-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl 2xl:text-4xl mb-6 font-bold">Review And Pay</h2>
        <div className=" w-full flex flex-col md:flex-row  items-center gap-4  justify-between">
          <div className="flex w-full flex-col gap-1.5">
            <p className="text-xs 2xl:text-base">First Name</p>
            <input
              type="text"
              className="bg-[#3C3C434A] w-full border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter first name "
            />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <p className="text-xs 2xl:text-base">Last Name</p>
            <input
              type="text"
              className="bg-[#3C3C434A] border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter last name "
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-xs 2xl:text-base">Email</p>
          <input
            type="text"
            className="bg-[#3C3C434A] border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
            placeholder=" Enter email "
          />
        </div>
        <div className=" w-full flex flex-col md:flex-row my-2.5 items-center gap-4  justify-between">
          <div className="flex w-full flex-col gap-1.5">
            <input
              type="text"
              className="bg-[#3C3C434A] border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Area Code "
            />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <input
              type="text"
              className="bg-[#3C3C434A] border border-gray-500 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Phone number "
            />
          </div>
        </div>

        <div className=" my-6 w-full bg-[#12131280] space-y-2 flex flex-col items-center rounded-xl p-5 border border-[#2a2c2a21]">
          <h3 className=" mx-auto 2xl:text-lg mb-5 ">Payment Details</h3>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
              Card Number
            </p>
            <input
              type="text"
              className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter card number "
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
              Card Number
            </p>
            <input
              type="text"
              className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter card number "
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
              Card Name
            </p>
            <input
              type="text"
              className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter card name "
            />
          </div>
          <div className=" w-full flex flex-col md:flex-row items-center gap-4  justify-between">
            <div className="flex flex-col w-full gap-1.5">
              <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
                Date
              </p>
              <input
                type="text"
                className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
                placeholder=" mm / yy "
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
                CVV
              </p>
              <input
                type="text"
                className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
                placeholder=" X X X "
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full mb-4">
            <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
              Zip Code
            </p>
            <input
              type="text"
              className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
              placeholder=" Enter zip code"
            />
          </div>

          <div className="flex items-center px-2 py-4 gap-3 justify-start w-full ">
            <Checkbox
              className=" w-4 h-4 
            "
            />
            <p className="text-xs  tracking-wide">
              Save my payment information so checkout easy in next time
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold 2xl:text-4xl text-center md:text-start mb-8">
          Booking Summary
        </h2>
        <div className="  gap-4 flex flex-col md:flex-row pb-4 items-center md:items-start border-b border-primary-50/30">
          <Image
            src={"/images/place1.svg"}
            width={165}
            height={165}
            alt="mail"
            className="rounded-xl  "
          />
          <div className="flex flex-col">
            <h4 className="font-bold 2xl:text-lg mb-2">Braine Le Chateau</h4>
            <p className="text-sm mb-1">Aug 30-Sept 4</p>
            <p className="text-sm">800 acres Harrington, QC</p>

            <p className="text-xs mt-4 mb-2">Coupon (optional)</p>
            <input
              placeholder="Enter coupen code"
              className="bg-[#222229cb] py-3  px-3 rounded-xl text-sm border border-[#50505c4a] "
              type="text"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold 2xl:text-3xl my-4">
          The Hunt Begins...
        </h2>
        <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
          <p>CA$125 x 4 nights</p>
          <p>CA$488.96</p>
        </div>
        <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
          <p>Service fee</p>
          <p>CA$488.96</p>
        </div>
        <div className="flex items-center text-xs  pb-4 border-b border-primary-50/30 my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
          <p>Taxes</p>
          <p>CA$488.96</p>
        </div>
        <div className="flex py-4 rounded-br-2xl bg-primary-50/20 px-4 mt-3 rounded-bl-2xl items-center text-xs 2xl:text-sm  justify-between">
          <p className="font-bold">Total Amount</p>
          <p className="font-bold">CA$488.96</p>
        </div>
        <p className="text-xs 2xl:text-sm max-w-md 2xl:max-w-lg font-normal my-3 2xl:my-5 tracking-wide text-gray-200">
          By selecting the button below, I agree to pay the total amount shown,
          which includes service fees, and I agree to the host’s Moderate
          Cancellation Policy,  the host's rules, HuntGrounds Terms of Use, and
          HuntGrounds Privacy Policy.{" "}
        </p>
        <button className=" w-[96%] px-12 py-3 rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold ">
          I agree and book now
        </button>
      </div>
    </div>
  );
};

export default page;
