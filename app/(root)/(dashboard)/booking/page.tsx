import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllBookingsForUserProperties } from "@/database/actions/booking.action";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userBookings = await getAllBookingsForUserProperties(session.user.id);
  console.log("🚀 ~ page ~ userBookings:", userBookings);
  return (
    <div className="w-full flex flex-col items-center mt-12  pb-8 gap-12 md:pb-0 justify-center  ">
      <div className=" max-w-3xl 2xl:max-w-5xl relative  ">
        <Image
          src="/yoywhatsupfambro.svg"
          alt="background"
          width={920}
          height={600}
        />
        <Link
          href={"/dashboard/add-property"}
          className=" opacity-0 absolute bottom-8 2xl:bottom-10 py-4 w-full"
        >
          go
        </Link>

        <div className=" w-full  p-3"></div>
      </div>
      <h2 className=" font-bold text-2xl 2xl:text-4xl tracking-wide border-b-2 px-3 pb-2 border-primary-50 ">
        Ground Bookings
      </h2>
      {userBookings.error && (
        <div className="flex flex-col items-center gap-3 p-4 bg-primary-100 rounded-lg">
          <p className="text-sm text-gray-400 text-center">
            Bookings not found for your properties.
          </p>
        </div>
      )}
      <div className=" w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
        {userBookings.bookings &&
          userBookings.bookings.map((booking, index) => (
            <div
              key={index}
              className="flex flex-col p-3 pt-6 items-center border border-primary-50/20  bg-primary-100 rounded-lg "
            >
              <p className="text-xs 2xl:text-sm text-gray-400">#{index + 1}</p>
              <h2 className="font-bold text-lg capitalize 2xl:text-xl">
                {booking.propertyName}
              </h2>
              <p className="text-sm text-gray-200 capitalize tracking-wide">
                {booking.propertyAddress}
              </p>
              <div className=" w-full flex items-center flex-col  gap-5 mt-6 bg-primary rounded-lg py-6 p-4">
                <div className=" flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-400">Booked By</p>
                    <p className="text-sm font-semibold capitalize">
                      {booking.userName}
                    </p>

                    <p className="text-xs text-gray-400 mt-3">Email</p>
                    <p className="text-sm font-semibold">{booking.userEmail}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-400">Total Amount</p>
                    <p className="text-sm font-semibold capitalize">
                      ${booking.totalAmount / 100}
                    </p>
                    <p className="text-xs text-gray-400 mt-3">Payment Status</p>
                    <p className=" px-3 py-1 text-xs mt-1 bg-green-700/30 text-green-600 border border-green-600 rounded-full w-fit">
                      {booking.paymentStatus}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start w-full ">
                  <p className="text-xs text-gray-400">Check In</p>
                  <p className="text-sm font-semibold capitalize">
                    {new Date(booking.checkIn).toDateString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">Check Out</p>
                  <p className="text-sm font-semibold capitalize">
                    {new Date(booking.checkOut).toDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
