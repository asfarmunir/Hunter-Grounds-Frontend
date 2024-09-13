"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RiDeleteBinLine } from "react-icons/ri";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { linkSync } from "fs";

const links = [
  {
    name: " Edit Profile",
    link: "edit-profile",
  },
  {
    name: "Change Password",
    link: "change-password",
  },
  {
    name: "Emails & SMS",
    link: "emails-sms",
  },
  {
    name: "Payment Details",
    link: "payment-details",
  },
];

const page = () => {
  const [tab, setTab] = React.useState("payment-details");

  return (
    <div className=" w-full p-4 md:px-20 py-12 relative">
      <div className=" hidden md:block absolute right-0 h-[600px]  ">
        <Image
          src={"/images/footerBg.svg"}
          alt="bg"
          width={400}
          height={400}
          className=" w-full h-full opacity-45"
        />
      </div>
      <div className=" w-full flex flex-col md:flex-row gap-12  ">
        <div className=" w-full md:w-[30%] ">
          <div className=" p-5 rounded-xl w-full flex flex-col bg-gradient-to-b from-primary to-orange-500/20 ">
            <Link
              href={"/account"}
              className="2xl:text-lg inline-flex items-center gap-3 "
            >
              <FaArrowLeftLong className="text-xl text-primary-50" />
              Manager Account
            </Link>
            <div className=" my-5 flex flex-col gap-4 items-start">
              {links.map((link, index) => (
                <button
                  key={index}
                  className={`
                    ${
                      tab === link.link
                        ? " bg-[#372F2F] text-gray-300"
                        : "text-gray-400"
                    } text-sm 2xl:text-base font-normal py-2 px-4 w-full text-start rounded-lg `}
                  onClick={() => setTab(link.link)}
                >
                  {link.name}{" "}
                </button>
              ))}
            </div>
            <button
              className={`
                     text-sm 2xl:text-base text-slate-300 font-normal py-2 px-4 w-full text-start rounded-lg `}
            >
              Sign Out{" "}
            </button>
          </div>
        </div>
        {
          {
            "edit-profile": <GeneralSettings />,
            "change-password": <ChangePassword />,
            "emails-sms": <EmailsAndSms />,
            "payment-details": <PaymentDetails />,
          }[tab]
        }
      </div>
    </div>
  );
};

export default page;

const GeneralSettings = () => {
  return (
    <div className=" w-full ">
      <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
        Edit Profile{" "}
      </h2>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2">
        Perosnal Information
      </p>
      <div className=" w-full bg-[#352e2e33] border border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row py-8 border-b border-primary-50/20  gap-4 md:gap-16">
          <p className=" min-w-16 md:min-w-36">Profile Picture</p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center">
              <Image
                src="/images/avatar.svg"
                width={50}
                alt="avatar"
                height={50}
                className="rounded-full"
              />
              <button
                className={`text-xs md:text-sm 2xl:text-base font-semibold bg-gradient-to-b from-[#FF9900] to-[#3a3e3a6f] px-4 py-2 rounded-lg
                }`}
              >
                Upload Photo
              </button>
            </div>
            <p className="text-xs md:text-sm text-gray-200 max-w-3xl font-thin tracking-wide">
              Please upload a profile picture where your face is clearly
              visible. Sharing a clear image of yourself helps to build trust
              within the Hipcamp Community, and helps Hosts and Hipcampers
              recognize each other when meeting on properties. Max size: 10 Mb
            </p>
          </div>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className=" min-w-16 md:min-w-36">First Name</p>
          <p className="">Joney</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className=" min-w-16 md:min-w-36">Last Name</p>
          <p className="">Joney</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className=" min-w-16 md:min-w-36">Facebook</p>
          <button
            className={`text-sm 2xl:text-base font-semibold bg-[#05D6FF80] px-4 py-2 rounded-lg
                }`}
          >
            + Connect Facebook
          </button>{" "}
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className=" min-w-16 md:min-w-36">Email</p>
          <p className="">xyz@gmail.com</p>
        </div>
      </div>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2">
        Contact Information
      </p>
      <div className=" w-full bg-[#352e2e33] border border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">Street Address</p>
          <p className="">Optional</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">Apt or suite number</p>
          <p className="">Optional</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">City</p>
          <p className="">Optional</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">Zip Code</p>
          <p className="">Optional</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">Phone Number</p>
          <p className="">Optional</p>
        </div>
      </div>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2">
        How you publicly appear around HuntGround
      </p>
      <div className=" w-full bg-[#352e2e33] border border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">HuntGrounds URL</p>
          <p className="">A short description of yourself as a Hunt Grounder</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">public location</p>
          <p className="">Optional</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">Personal URL</p>
          <p className="">Optional</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">Instagram Handle</p>
          <p className="">Optional</p>
        </div>
        <div className="flex py-8 border-b border-primary-50/20  gap-16">
          <p className="  min-w-16 md:min-w-36">Twitter Handle</p>
          <p className="">Optional</p>
        </div>
      </div>
      <div className=" w-full flex justify-end my-4">
        <button className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 py-3 text-black font-semibold 2xl:text-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  return (
    <div className=" w-full ">
      <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
        Change Password{" "}
      </h2>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2">
        Change your password
      </p>
      <div className=" w-full bg-[#352e2e33] space-y-4 border border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className=" border-b pb-3 border-primary-50/30">
          <Input
            type="password"
            placeholder="Enter your current password"
            className=" border-none lg:text-lg text-sm border-b pb-4 border-primary-50/20"
          />
        </div>
        <div className=" border-b pb-3 border-primary-50/20">
          <Input
            type="password"
            placeholder="Enter new password"
            className=" border-none lg:text-lg text-sm border-b pb-4 border-primary-50/30"
          />
        </div>

        <Input
          type="password"
          placeholder="Confirm new password"
          className=" border-none lg:text-lg text-sm"
        />
      </div>

      <div className=" w-full flex justify-end my-4">
        <button className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 py-3 text-black font-semibold 2xl:text-lg">
          Update Your Password
        </button>
      </div>
    </div>
  );
};
const EmailsAndSms = () => {
  return (
    <div className=" w-full ">
      <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
        Email & SMS{" "}
      </h2>

      <div className=" w-full bg-[#352e2e33] space-y-5 border my-5  border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-16 flex justify-center ">
            <Image
              src="/images/email2.svg"
              width={30}
              height={30}
              alt="email"
            />
          </div>
          <p className="text-primary-50 md:pl-6 text-xs font-bold md:text-lg">
            Optional communication from the Huntground team
          </p>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Personalized Recommendations</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Exclusive offers, news and tips</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">New features announcement</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Feedback and surveys</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Safety tips and reminders</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full bg-[#352e2e33] space-y-5 border my-5  border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-16 flex justify-center ">
            <Image
              src="/images/email2.svg"
              width={30}
              height={30}
              alt="email"
            />
          </div>
          <div className="w-16 flex justify-center ">
            <Image src="/images/phone.svg" width={30} height={30} alt="email" />
          </div>
          <p className="text-primary-50 md:pl-6 text-xs md:text-lg font-bold">
            Huntground experience communications
          </p>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Personalized Recommendations</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Exclusive offers, news and tips</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">New features announcement</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Feedback and surveys</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="w-16 flex justify-center">
            <Checkbox />
          </div>
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Safety tips and reminders</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
      </div>

      <div className=" w-full flex justify-end my-4">
        <button className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 py-3 text-black font-semibold 2xl:text-lg">
          Save Changes
        </button>
      </div>
      <div className=" w-full bg-[#352e2e33] space-y-5 border my-5  border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-16 flex justify-center  ">
            <Image
              src="/images/email2.svg"
              width={30}
              height={30}
              alt="email"
            />
          </div>
          <div className="w-16 flex justify-center ">
            <Image src="/images/phone.svg" width={30} height={30} alt="email" />
          </div>
          <p className="text-primary-50 md:pl-6 text-sm md:text-lg font-bold">
            Optional communication from the Huntground team
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Referral notification</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Invite to trip notification</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Gift card notification</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">
              Huntground photographer notifications
            </p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col gap-1 pl-6">
            <p className="font-semibold">Forgot your password notification</p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              Sent to shares huntgrounds you might like
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentDetails = () => {
  return (
    <div className=" w-full ">
      <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
        Saved Cards{" "}
      </h2>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2">
        Your saved cards
      </p>
      <div className=" w-full bg-[#352e2e33] space-y-4 border flex flex-col  gap-3 border-[#372F2F] p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <div className="w-full bg-[#372F2F33] shadow-inner p-5 rounded-lg flex-col md:flex-row flex items-center justify-center gap-4 md:justify-between shadow-slate-800">
          <div className="flex  items-center gap-3">
            <Image src="/images/visa.svg" width={35} alt="visa" height={35} />
            <div className="flex flex-col gap-1">
              <p className="text-sm">Visa Ending in 7830</p>
              <p className="text-xs text-gray-400">Exp. Date 06/24</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-semibold  bg-white text-black rounded-xl px-4 py-2 ">
              Default
            </button>
            <button className="text-lg font-semibold text-white">
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
        <div className="w-full bg-[#372F2F33] shadow-inner p-5 rounded-lg flex-col md:flex-row flex items-center justify-center gap-4 md:justify-between shadow-slate-800">
          <div className="flex  items-center gap-3">
            <Image src="/images/visa.svg" width={35} alt="visa" height={35} />
            <div className="flex flex-col gap-1">
              <p className="text-sm">Visa Ending in 7830</p>
              <p className="text-xs text-gray-400">Exp. Date 06/24</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-semibold  bg-[#372F2F] border border-slate-900  rounded-xl px-4 py-2 ">
              Set as Default
            </button>
            <button className="text-lg font-semibold text-white">
              <RiDeleteBinLine />
            </button>
          </div>
        </div>

        <button className=" my-3 px-5 py-2.5 rounded-full w-fit text-[#00C88C] border border-[#00C88C] bg-[#00C88C]/10">
          Add new card
        </button>

        <div className=" my-6 w-full bg-[#12131280] space-y-2 flex flex-col items-center rounded-xl p-5 border border-[#2a2c2a21]">
          <h3 className=" mx-auto 2xl:text-lg mb-5 ">Add New Card</h3>
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

          <div className="flex items-center px-2 py-4 gap-3 justify-center w-full ">
            <button className=" text-black font-semibold px-8 md:w-1/4 text-lg py-2 rounded-xl bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
              Add New Card
            </button>
          </div>
        </div>
      </div>

      {/* <div className=" w-full flex justify-end my-4">
        <button className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 py-3 text-black font-semibold 2xl:text-lg">
          Update Your Password
        </button>
      </div> */}
    </div>
  );
};
