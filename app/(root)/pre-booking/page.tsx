import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className=" w-full flex flex-col-reverse md:flex-row gap-4 justify-between p-4 md:p-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl 2xl:text-4xl font-bold">Add Extras</h2>
        <p className="text-sm 2xl:text-base mb-4">
          Make your hunting trip even more fun by adding a little something
          special.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 border-b border-primary-50/30 py-5">
          <Image
            src={"/images/extra.svg"}
            width={155}
            height={155}
            alt="mail"
            className="rounded-xl "
          />
          <div className="flex flex-col">
            <h3 className="2xl:text-lg inline-flex mb-1.5 font-semibold gap-3">
              Wine Tasting{" "}
              <span className=" px-3 py-1 text-xs border border-primary-50 rounded-full text-primary-50">
                9.0
              </span>
            </h3>
            <p className="text-sm 2xl:text-base mb-4 text-gray-300 font-normal max-w-md">
              Notes of ripe berries and subtle oak, balanced with a hint of
              spice. The palate is smooth, with a lingering finish that
              highlights its rich, velvety texture
            </p>
            <div className="flex gap-4 items-center justify-between flex-col md:flex-row">
              <p className="text-sm 2xl:text-base text-gray-300 font-normal max-w-md">
                from only{" "}
                <span className="text-white font-semibold"> CA$88</span> / per
                person
              </p>
              <button className="px-6 text-xs 2xl:text-sm py-2 border-2 border-primary-50 bg-[#FFFFFF4D] rounded-2xl">
                Add to trip
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 border-b border-primary-50/30 py-5">
          <Image
            src={"/images/extra.svg"}
            width={155}
            height={155}
            alt="mail"
            className="rounded-xl "
          />
          <div className="flex flex-col">
            <h3 className="2xl:text-lg inline-flex mb-1.5 font-semibold gap-3">
              Wine Tasting{" "}
              <span className=" px-3 py-1 text-xs border border-primary-50 rounded-full text-primary-50">
                9.0
              </span>
            </h3>
            <p className="text-sm 2xl:text-base mb-4 text-gray-300 font-normal max-w-md">
              Notes of ripe berries and subtle oak, balanced with a hint of
              spice. The palate is smooth, with a lingering finish that
              highlights its rich, velvety texture
            </p>
            <div className="flex gap-4 items-center justify-between flex-col md:flex-row">
              <p className="text-sm 2xl:text-base text-gray-300 font-normal max-w-md">
                from only{" "}
                <span className="text-white font-semibold"> CA$88</span> / per
                person
              </p>
              <button className="px-6 text-xs 2xl:text-sm py-2 border-2 border-primary-50 bg-[#FFFFFF4D] rounded-2xl">
                Add to trip
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold 2xl:text-4xl text-center md:text-start mb-8">
          Booking Details
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
        <div className="flex items-center text-xs my-2 2xl:my-4 2xl:text-sm text-gray-200 justify-between">
          <p>Taxes</p>
          <p>CA$488.96</p>
        </div>
        <div className="flex py-4 border-t border-primary-50/30 items-center text-xs 2xl:text-sm  justify-between">
          <p className="font-bold">Taxes</p>
          <p className="font-bold">CA$488.96</p>
        </div>
        <button className=" w-[96%] px-12 py-3 rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold mt-8">
          Continue
        </button>
        <p className="text-xs font-normal my-3 tracking-wide text-gray-200">
          Dont worry, you won’t be charged yet.
        </p>
      </div>
    </div>
  );
};

export default page;
