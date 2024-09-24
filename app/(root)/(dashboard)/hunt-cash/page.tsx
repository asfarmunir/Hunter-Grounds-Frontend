import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  return (
    <div className="p-4 md:p-20 w-full space-y-8 ">
      <div className=" w-full flex items-center justify-between">
        <h3 className="text-xl md:text-3xl 2xl:text-4xl font-bold">HuntCash</h3>
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
      <div className=" my-7 w-full ">
        <h3 className="text-xl mb-4">Last 30 Days</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 w-full">
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/dollar-circle.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Referals
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">09</p>
                <p className="flex items-center text-sm gap-1.5 text-[#00C88C] bg-[#00C88C]/20 font-semibold border border-[#00C88C] rounded-full px-3 py-2">
                  <Image
                    src={"/images/up.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                  +15%
                </p>
              </div>
              <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
                View All
              </button>{" "}
            </div>
          </div>
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/visit.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Visits
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">31</p>
                <p className="flex items-center text-sm gap-1.5 text-[#FF3B30] bg-[#FF3B30]/20 font-semibold border border-[#FF3B30] rounded-full px-3 py-2">
                  <Image
                    src={"/images/down.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                  +15%
                </p>
              </div>
              <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
                View All
              </button>{" "}
            </div>
          </div>
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/rate.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Conversion Rate
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">5.77%</p>
                <p className="flex items-center text-sm gap-1.5 text-[#00C88C] bg-[#00C88C]/20 font-semibold border border-[#00C88C] rounded-full px-3 py-2">
                  <Image
                    src={"/images/up.svg"}
                    width={15}
                    height={15}
                    alt="arrow"
                  />
                  +59.9%
                </p>
              </div>
              <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
                View All
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className=" my-7 w-full ">
        <h3 className="text-xl mb-4">All Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 w-full">
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/dollar-circle.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Referals
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">233</p>
              </div>
            </div>
          </div>
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/visit.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Visits
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">131</p>
              </div>
              <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
                View All
              </button>{" "}
            </div>
          </div>
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/rate.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Conversion Rate
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">5.77%</p>
              </div>
              <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
                View All
              </button>{" "}
            </div>
          </div>
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/visit.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Visits
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">131</p>
              </div>
              <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
                View All
              </button>{" "}
            </div>
          </div>
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/rate.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Conversion Rate
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">5.77%</p>
              </div>
              <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
                View All
              </button>{" "}
            </div>
          </div>
          <div className=" bg-[#16131399] p-8 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/visit.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Visits
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">131</p>
              </div>
              <button className=" text-black font-semibold  px-4 text-sm py-2 rounded-full bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
                View All
              </button>{" "}
            </div>
          </div>
          <div className=" bg-[#16131399] p-8 md:col-span-2 border border-[#372F2F] rounded-xl">
            <h2 className="flex items-center mb-6 text-sm text-gray-200 gap-2">
              <Image
                src={"/images/dollar-circle.svg"}
                width={22}
                height={22}
                alt="withdraw"
              />
              Total Earnings
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl 2xl:text-5xl font-semibold ">$10,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-7 w-full">
        <h3 className="text-xl mb-4">Recent Referral Activitys</h3>
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
                Description
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
            {Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className=" border-b  pb-4 text-emerald-100 text-xs 2xl:text-sm font-semibold border-primary-50/15">
                  620491
                </TableCell>
                <TableCell className=" border-b  pb-4 text-emerald-100 text-xs 2xl:text-sm font-semibold border-primary-50/15">
                  $37.25
                </TableCell>
                <TableCell className=" border-b  pb-4 text-emerald-100 text-xs 2xl:text-sm font-semibold border-primary-50/15">
                  My Test Product
                </TableCell>
                <TableCell className=" border-b  pb-4 text-emerald-100 text-xs 2xl:text-sm font-semibold border-primary-50/15">
                  <p className=" px-4 py-1.5 text-xs  border-2 border-[#00c88c70] text-[#00c88cad] w-fit rounded-full bg-[#00C88C1A]">
                    Paid
                  </p>
                </TableCell>
                <TableCell className=" border-b  pb-4 text-emerald-100 text-xs 2xl:text-sm font-semibold border-primary-50/15">
                  April 16, 2025 5:11 pm
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
