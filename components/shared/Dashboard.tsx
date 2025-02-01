"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import WithdrawFunds from "@/components/shared/WithdrawFunds";
import { IUser } from "@/lib/types/user";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import PayoutInfo from "@/components/shared/PayoutInfo";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const page = ({
  userData,
  // topCities,
  totalBookings,
  userPayouts,
}: {
  userData: IUser;
  // topCities?: {
  //   _id?: string;
  //   totalBookings?: number;
  // }[];
  totalBookings?: number;
  userPayouts: any;
}) => {
  const [timeFrame, setTimeFrame] = useState("24h"); // Default to '24h'
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleFilterChange = (time: string) => {
    setTimeFrame(time);

    const queryString = formUrlQuery({
      params: searchParams.toString(),
      key: "timeframe",
      value: time,
    });

    router.push(queryString, { scroll: false });
  };

  const totalEarnings = userData.bookingPayments?.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  );
  return (
    <div className="p-4 md:p-20 w-full bg-[#000214] space-y-8">
      <div className=" w-full flex items-center justify-between">
        <h3 className="text-xl md:text-3xl 2xl:text-4xl font-bold">
          Sales Overview
        </h3>
        {/* <div className="flex items-center gap-3">
          <button className=" px-4 text-sm py-2 rounded-full shadow-inner shadow-gray-800 inline-flex gap-2 ">
            <Image
              src={"/images/setting.svg"}
              alt="bg"
              width={18}
              height={18}
            />
            Export
          </button>
          <button className=" hidden md:block text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
            Bulk Edit
          </button>
        </div> */}
      </div>
      <div className=" w-full grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className=" bg-[#16131399] p-4 md:p-8 border border-[#372F2F] rounded-xl">
            <p className="textlg 2xl:text-xl mb-6 text-gray-300">Total Sales</p>
            <div className="flex items-center gap-4">
              <p className="text-3xl 2xl:text-5xl font-semibold">
                ${totalEarnings / 100}
              </p>
              {userData.bookingPayments?.length! > 0 && (
                <p className="flex items-center text-sm gap-1.5 text-[#00C88C] bg-[#00C88C]/20 font-semibold border border-[#00C88C] rounded-full px-3 py-2">
                  <Image
                    src={"/images/up.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                  +{userData.bookingPayments?.length} Sales
                </p>
              )}

              {/* <p className="text-sm text-slate-300">vs last month</p> */}
            </div>
          </div>
          <div className=" bg-[#16131399] p-4 md:p-8 border border-[#372F2F] rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <p className="textlg 2xl:text-xl  text-gray-300">
                Withdrawable Amount
              </p>
              <PayoutInfo />
            </div>
            <div className="flex items-center gap-6">
              <p className="text-3xl 2xl:text-5xl font-semibold">
                $
                {userData.withdrawableAmount! > 0
                  ? userData.withdrawableAmount! / 100
                  : 0}
              </p>
              {userData.withdrawableAmount! > 0 && (
                <WithdrawFunds
                  userId={userData._id!}
                  type={"booking"}
                  isVerified={userData.isVerified!}
                  path={"/dashboard"}
                />
              )}
            </div>
          </div>
        </div>
        {/* <div className=" bg-[#16131399] p-4 md:p-8 border border-[#372F2F] rounded-xl">
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
        </div> */}
        <div className=" bg-[#16131399] p-4 md:p-8 border border-[#372F2F] rounded-xl">
          <p className="textlg 2xl:text-xl mb-3 text-gray-300">User Growth</p>
          <div className="flex items-center gap-3">
            {["12h", "24h", "week", "month"].map((frame) => (
              <button
                key={frame}
                className={`bg-[#372F2F33] text-xs text-nowrap 2xl:text-sm border border-[#312a2a7e] px-4 py-1 rounded-full ${
                  timeFrame === frame ? "bg-primary" : ""
                }`}
                onClick={() => handleFilterChange(frame)}
              >
                {frame === "week"
                  ? "A Week"
                  : frame === "month"
                  ? "A Month"
                  : `${frame}`}
              </button>
            ))}
          </div>

          <div className="mt-12 w-full">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-3xl 2xl:text-4xl">
                {totalBookings ? totalBookings : null}
              </h3>
              {/* <p className="flex w-fit items-center text-sm gap-1.5 text-[#00C88C] bg-[#00C88C]/20 font-semibold border border-[#00C88C] rounded-full px-3 py-2">
                <img src="/images/up.svg" width={12} height={12} alt="arrow" />
                +15%
              </p> */}
            </div>
            {totalBookings ? (
              <div className="w-full h-12 2xl:h-16 my-4 rounded-xl bg-[#372F2F99]">
                {/* Dynamic progress bar logic based on bookings percentage */}
                <div
                  className="h-full bg-primary-50 transition-all rounded-xl shadow-sm"
                  style={{
                    width: `${
                      totalBookings > 0 ? (totalBookings! / 100) * 100 : 0
                    }%`,
                  }} // Set the width dynamically based on percentage
                ></div>
              </div>
            ) : (
              <div className=" w-full p-3 bg-primary-50/20 mb-4  ">
                <p className="text-sm text-gray-300 2xl:text-base w-full text-center font-semibold">
                  No Bookings to show
                </p>
              </div>
            )}

            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-slate-300">Checking totally</p>
              <p className="text-sm text-slate-300">
                +{totalBookings} bookings
              </p>
            </div>
          </div>
        </div>
        {/* <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
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
        </div> */}
      </div>
      {/* <div className="flex items-center gap-4">
        <div className=" w-full bg-[#16131399] p-8 space-y-4 border border-[#372F2F] rounded-xl">
          <p className="textlg 2xl:text-xl mb-3 text-gray-300">
            Most Order By State
          </p>
          {topCities && topCities.length > 0 ? (
            topCities.map((city, index) => (
              <div
                key={index}
                className=" w-full bg-[#372F2F33] rounded-full flex  items-center gap-2.5 p-2 border border-[#372F2F]"
              >
                <p className=" bg-[#372F2F] rounded-full flex items-center justify-center p-1  w-10 h-10  ">
                  #{index + 1}
                </p>
                <div className="text-sm 2xl:text-base  w-full flex items-center justify-between pr-4 capitalize font-semibold">
                  <p className="text-lg font-bold"> {city._id} </p>{" "}
                  <p>{city.totalBookings} Bookings</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-300  2xl:text-base font-semibold">
              No data available
            </p>
          )}
        </div>
      </div> */}

      <div className=" my-12 w-full">
        <h3 className="text-xl 2xl:text-2xl mb-4">Payouts History</h3>
        <Table>
          <TableHeader className=" bg-[#161313] ">
            <TableRow className=" border-none ">
              <TableHead className=" uppercase text-xs 2xl:text-sm">
                Reference
              </TableHead>
              <TableHead className=" uppercase text-xs 2xl:text-sm">
                Amount
              </TableHead>
              <TableHead className=" uppercase text-xs 2xl:text-sm">
                Email
              </TableHead>
              <TableHead className=" uppercase text-xs 2xl:text-sm">
                Status
              </TableHead>
              <TableHead className=" uppercase text-xs 2xl:text-sm">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPayouts.length ? (
              userPayouts.map((payout: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className=" border-b  pb-4 text-emerald text-xs 2xl:text-sm font-semibold border-primary-50/15">
                    {payout._id.slice(0, 8)}
                  </TableCell>
                  <TableCell
                    className={`${
                      payout.status === "completed"
                        ? "text-emerald-100 "
                        : "text-white"
                    } border-b  pb-4  text-xs 2xl:text-sm font-semibold border-primary-50/15`}
                  >
                    ${payout.amount}
                  </TableCell>
                  <TableCell
                    className={`${
                      payout.status === "completed"
                        ? "text-emerald-200"
                        : "text-white"
                    }
                    border-b truncate max-w-[150px]  pb-4 text-xs 2xl:text-sm font-semibold border-primary-50/15`}
                  >
                    {payout.accountEmail}
                  </TableCell>
                  <TableCell
                    className={`${
                      payout.status === "completed"
                        ? "text-emerald-100 "
                        : "text-white"
                    } border-b  pb-4 text-emerald-100 text-xs 2xl:text-sm font-semibold border-primary-50/15`}
                  >
                    {payout.status === "completed" ? (
                      <p className=" px-4 py-1.5 text-xs  border-2 border-[#00c88c70] text-[#00c88cad] w-fit rounded-full bg-[#00C88C1A]">
                        Paid
                      </p>
                    ) : (
                      <p className=" px-4 py-1.5 text-xs  border-2 border-yellow-600 text-yellow-600 w-fit rounded-full bg-yellow-600/30">
                        Pending
                      </p>
                    )}
                  </TableCell>
                  <TableCell
                    className={`${
                      payout.status === "completed"
                        ? "text-emerald-100 "
                        : "text-white"
                    } border-b  pb-4 text-xs 2xl:text-sm font-semibold border-primary-50/15`}
                  >
                    {new Date(payout.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No Payouts Requested
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
