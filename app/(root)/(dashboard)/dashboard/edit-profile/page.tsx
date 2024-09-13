"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RiDeleteBinLine } from "react-icons/ri";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { linkSync } from "fs";

const settings = [
  {
    name: " Property Address",
    status: "pending",
  },
  {
    name: "Acres",
    status: "pending",
  },
  {
    name: "Property Name",
    status: "pending",
  },
  {
    name: "Property Description",
    status: "pending",
  },
  {
    name: "Photos",
    status: "pending",
  },
  {
    name: "Profile Picture",
    status: "completed",
  },
  {
    name: "Insurance",
    status: "pending",
  },
  {
    name: "Game Available",
    status: "pending",
  },
];

const page = () => {
  const [tab, setTab] = React.useState("edit-profile");

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
              href={"/dashboard"}
              className="2xl:text-lg inline-flex items-center gap-3 "
            >
              <FaArrowLeftLong className="text-xl text-primary-50" />
              Back
            </Link>
            <div className=" my-5 flex flex-col gap-2 items-start">
              {settings.map((s, index) => (
                <p
                  key={index}
                  className={`
                    ${
                      s.status === "completed"
                        ? " text-primary-50 font-semibold"
                        : "text-gray-400"
                    } text-sm 2xl:text-base font-normal inline-flex items-center gap-2 py-2 px-4 w-full text-start rounded-lg `}
                >
                  {s.status === "completed" ? (
                    <Image
                      src="/images/completed.svg"
                      width={20}
                      height={20}
                      alt="check"
                    />
                  ) : (
                    <Image
                      src="/images/pending.svg"
                      width={20}
                      height={20}
                      alt="check"
                    />
                  )}
                  {s.name}{" "}
                </p>
              ))}
            </div>
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
    <div className=" w-full bg-[#16131399] p-4 ">
      <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
        Add Your Property
      </h2>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
        Property Address
      </p>
      <div className=" w-full dark:bg-[#372F2F33] border border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex py-8 items-center gap-3   ">
          <Image
            src="/images/missing.svg"
            width={30}
            height={30}
            alt="location"
          />

          <p className="text-sm text-gray-300">Address not provided</p>
        </div>
        <button className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg">
          Change Adress
        </button>
      </div>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">Acres</p>
      <div className=" w-full dark:bg-[#372F2F33] border border-[#372F2F] p-6 rounded-xl shadow-md">
        <p className="text-sm  tracking-wide text-[#FFFFFF80] mb-2">
          A rough estimate is ok! This helps guests know what to expect.
        </p>
        <div className="  pb-3  my-3">
          <Input
            type="text"
            placeholder="10 acres"
            className=" border lg:text-base text-sm rounded-lg dark:border-[#372F2F] p-4 2xl:p-6 bg-[#372f2f67] "
          />
        </div>
      </div>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
        Property Name
      </p>
      <div className=" w-full dark:bg-[#372F2F33] flex items-center gap-6 flex-col md:flex-row justify-between border border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex flex-col">
          <p className="text-sm  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
            Give your property a special name. Be creative and capture its
            essence to attract more guests!
          </p>
          <div className="  pb-3  my-3">
            <Input
              type="text"
              placeholder="Write your property name....."
              className=" border lg:text-base text-sm rounded-lg dark:border-[#372F2F] p-4 2xl:p-6 bg-[#372f2f67] "
            />
          </div>
        </div>
        <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
          <p className="font-semibold mb-3 2xl:text-sm text-xs">
            A formula that does well:
          </p>
          <p className="text-gray-50 2xl:text-sm text-xs">
            [point of interest, location or activity] + [accommodation type/s]
          </p>
          <ul className=" list-disc my-3">
            <li className="text-gray-50 text-sm">1. The Lakehouse</li>
            <li className="text-gray-50 text-sm">2. The Cabin in the Woods</li>
            <li className="text-gray-50 text-sm">3. The Treehouse Retreat</li>
          </ul>
        </div>
      </div>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
        Property Description
      </p>
      <div className=" w-full dark:bg-[#372F2F33]  gap-6  border border-[#372F2F] p-6 rounded-xl shadow-md">
        <p className="text-sm  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
          Provide a bit more details about what guests see, do and expect here.
        </p>
        <div className="  pb-3  my-3">
          <textarea
            placeholder="Write your property description...."
            className=" border min-h-40 lg:text-base text-sm w-full rounded-lg dark:border-[#372F2F] p-3 2xl:p-5 bg-[#372f2f67] "
          />
        </div>
      </div>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
        Add Images
      </p>
      <div className=" w-full dark:bg-[#372F2F33]  gap-6  border border-[#372F2F] p-6 rounded-xl shadow-md">
        <p className="text-sm  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
          1 Photo Added
        </p>
        <div className=" w-full flex flex-col-reverse gap-4 md:flex-row justify-between">
          <div className="flex items-center flex-wrap gap-1">
            <div className=" w-36 h-36">
              <Image
                src="/images/place1.svg"
                width={100}
                height={100}
                alt="location"
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl"
              />
            </div>
            <div className=" w-36 h-36">
              <Image
                src="/images/place1.svg"
                width={100}
                height={100}
                alt="location"
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl"
              />
            </div>
            <div className=" w-36 h-36">
              <Image
                src="/images/place1.svg"
                width={100}
                height={100}
                alt="location"
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl"
              />
            </div>
          </div>
          <button className=" w-fit h-fit bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg">
            Add or edit photos
          </button>
        </div>
      </div>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
        Profile Picture
      </p>
      <div className=" w-full dark:bg-[#372F2F33] flex items-center gap-6 flex-col md:flex-row justify-between border border-[#372F2F] p-7 rounded-xl shadow-md">
        <div className="flex flex-col">
          <p className="text-sm  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
            Add a profile picture
          </p>
          <div className="  pb-3  my-3">
            <Image
              src="/images/avatar.svg"
              width={100}
              height={100}
              alt="location"
              className=""
            />
          </div>
        </div>
        <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
          <p className=" mb-3 2xl:text-sm text-xs">
            please upload a photo that clearly shows your face. A profile photo
            immediately builds trust with hunters viewing your listing. which
            makes them more likely to book with you.
          </p>
        </div>
      </div>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
        ID Verification
      </p>
      <div className=" w-full dark:bg-[#372F2F33] border flex items-center justify-between gap-4 flex-col md:flex-row border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex flex-col">
          <div className="flex py-5 items-center gap-3   ">
            <Image
              src="/images/added.svg"
              width={30}
              height={30}
              alt="location"
            />

            <p className="text-sm text-gray-300"> information provided</p>
          </div>
          <button className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg">
            Verfy ID
          </button>
        </div>
        <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
          <p className=" mb-3 2xl:text-sm text-xs">
            Here’s how we have your back with every booking :
          </p>
          <Link href={"/"} className="underline text-primary-50 tracking-wide">
            Show More
          </Link>
        </div>
      </div>
      <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
        Insurance
      </p>
      <div className=" w-full dark:bg-[#372F2F33] border flex items-center justify-between gap-4 flex-col md:flex-row border-[#372F2F] p-6 rounded-xl shadow-md">
        <div className="flex flex-col">
          <div className="flex py-5 items-center gap-3   ">
            <Image
              src="/images/missing.svg"
              width={30}
              height={30}
              alt="location"
            />

            <p className="text-sm text-gray-300">
              {" "}
              You are not currently covered under the huntgrounds insurance
              policy <br /> Enrollment period: undefined - undefined
            </p>
          </div>
          <button className=" w-fit bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg">
            Complete
          </button>
        </div>
        <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
          <p className=" mb-3 2xl:text-sm text-xs">
            Here’s how we have your back with every booking :
          </p>
          <Link href={"/"} className="underline text-primary-50 tracking-wide">
            Show More
          </Link>
        </div>
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
        Property Address
      </p>
      <div className=" w-full bg-[#372F2F33] space-y-4 border border-[#372F2F] p-6 rounded-xl shadow-md">
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
        <div className="flex items-center">
          <div className="w-16 flex justify-center ">
            <Image
              src="/images/email2.svg"
              width={30}
              height={30}
              alt="email"
            />
          </div>
          <p className="text-primary-50 md:pl-6 font-bold text-lg">
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
        <div className="flex items-center">
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
          <p className="text-primary-50 md:pl-6 text-lg font-bold">
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
        <div className="flex items-center">
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
          <p className="text-primary-50 md:pl-6 text-lg font-bold">
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
      <div className=" w-full bg-[#352e2e33] space-y-4 border flex flex-col items-center gap-3 border-[#372F2F] p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <div className="w-full bg-[#372F2F33] shadow-inner p-5 rounded-lg flex-col md:flex-row flex items-center justify-center md:justify-between shadow-slate-800">
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
        <div className="w-full bg-[#372F2F33] shadow-inner p-5 rounded-lg flex-col md:flex-row flex items-center justify-center md:justify-between shadow-slate-800">
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
      </div>

      {/* <div className=" w-full flex justify-end my-4">
        <button className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 py-3 text-black font-semibold 2xl:text-lg">
          Update Your Password
        </button>
      </div> */}
    </div>
  );
};
