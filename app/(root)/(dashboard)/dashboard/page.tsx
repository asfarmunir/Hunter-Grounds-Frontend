import Image from "next/image";
import React from "react";
import WithdrawFunds from "@/components/shared/WithdrawFunds";
const page = () => {
  return (
    <div className="p-4 md:p-20 w-full space-y-8">
      <div className=" w-full flex items-center justify-between">
        <h3 className="text-xl md:text-3xl 2xl:text-4xl font-bold">
          Sales Overview
        </h3>
        <div className="flex items-center gap-3">
          <button className=" px-4 text-sm py-2 rounded-full shadow-inner shadow-gray-800 inline-flex gap-2 ">
            <Image
              src={"/images/setting.svg"}
              alt="bg"
              width={18}
              height={18}
            />
            Export
          </button>
          <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
            Bulk Edit
          </button>
        </div>
      </div>
      <div className=" w-full grid grid-cols-1 gap-4 md:grid-cols-3  lg:grid-col-3">
        <div className="flex flex-col gap-3">
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <p className="textlg 2xl:text-xl mb-6 text-gray-300">Total Sales</p>
            <div className="flex items-center gap-4">
              <p className="text-2xl 2xl:text-5xl font-semibold">$9,343</p>
              <p className="flex items-center text-sm gap-1.5 text-[#00C88C] bg-[#00C88C]/20 font-semibold border border-[#00C88C] rounded-full px-3 py-2">
                <Image
                  src={"/images/up.svg"}
                  width={15}
                  height={15}
                  alt="arrow"
                />
                +15%
              </p>
              <p className="text-sm text-slate-300">vs last month</p>
            </div>
          </div>
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <p className="textlg 2xl:text-xl mb-6 text-gray-300">
              Withdrawal Status
            </p>
            <div className="flex items-center gap-6">
              <p className="text-2xl 2xl:text-5xl font-semibold">$4,592</p>
              <WithdrawFunds />
            </div>
          </div>
        </div>
        <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
          <p className="textlg 2xl:text-xl mb-3 text-gray-300">User Growth</p>
          <div className="flex items-center gap-3">
            <button className="bg-[#372F2F33] text-xs text-nowrap  2xl:text-sm border border-[#312a2a7e] px-4 py-1 rounded-full">
              12h
            </button>
            <button className="bg-[#372F2F33] text-xs text-nowrap  2xl:text-sm border border-[#312a2a7e] px-4 py-1 rounded-full">
              24h
            </button>
            <button className="bg-[#372F2F33] text-xs text-nowrap  2xl:text-sm border border-[#312a2a7e] px-4 py-1 rounded-full">
              A Week
            </button>
            <button className="bg-[#372F2F33] text-xs text-nowrap  2xl:text-sm border border-[#312a2a7e] px-4 py-1 rounded-full">
              A Month
            </button>
          </div>
          <div className="  mt-12 w-full ">
            <div className=" w-full  flex items-center justify-between">
              <h3 className="text-3xl 2xl:text-4xl">112</h3>
              <p className="flex w-fit items-center text-sm gap-1.5 text-[#00C88C] bg-[#00C88C]/20 font-semibold border border-[#00C88C] rounded-full px-3 py-2">
                <Image
                  src={"/images/up.svg"}
                  width={12}
                  height={12}
                  alt="arrow"
                />
                +15%
              </p>
            </div>
            <div className=" w-full h-12 2xl:h-16 my-4 rounded-xl bg-[#372F2F99]">
              <div className="w-[50%] h-full bg-primary-50 rounded-xl shadow-sm "></div>
            </div>
            <div className=" w-full flex items-center justify-between">
              <p className="text-sm text-slate-300">Checking totally</p>
              <p className="text-sm text-slate-300">+120 Today</p>
            </div>
          </div>
        </div>
        <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
          <p className="textlg 2xl:text-xl mb-3 text-gray-300">
            Customer Volume
          </p>
          <div className="  mt-6 w-full ">
            <div className=" w-full  flex items-center justify-between">
              <h3 className="text-xl 2xl:text-4xl">112</h3>
              <p className="flex w-fit items-center text-sm gap-1.5 text-[#00C88C] bg-[#00C88C]/20 font-semibold border border-[#00C88C] rounded-full px-3 py-2">
                <Image
                  src={"/images/up.svg"}
                  width={12}
                  height={12}
                  alt="arrow"
                />
                +15%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className=" w-full bg-[#16131399] p-8 space-y-4 border border-[#372F2F] rounded-xl">
          <p className="textlg 2xl:text-xl mb-3 text-gray-300">
            Most Order By State
          </p>
          <div className=" w-full bg-[#372F2F33] rounded-full flex  items-center gap-2.5 p-2 border border-[#372F2F]">
            <p className=" bg-[#372F2F] rounded-full flex items-center justify-center p-1  w-10 h-10  ">
              #1
            </p>
            <p className="text-sm 2xl:text-base font-semibold">California</p>
          </div>
          <div className=" w-full bg-[#372F2F33] rounded-full flex  items-center gap-2.5 p-2 border border-[#372F2F]">
            <p className=" bg-[#372F2F] rounded-full flex items-center justify-center p-1  w-10 h-10  ">
              #2
            </p>
            <p className="text-sm 2xl:text-base font-semibold">
              {" "}
              San Fransisco
            </p>
          </div>
          <div className=" w-full bg-[#372F2F33] rounded-full flex  items-center gap-2.5 p-2 border border-[#372F2F]">
            <p className=" bg-[#372F2F] rounded-full flex items-center justify-center p-1  w-10 h-10  ">
              #3
            </p>
            <p className="text-sm 2xl:text-base font-semibold">Chicago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
