import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "@/lib/types/user";
import { IBooking } from "@/lib/types/booking";

const UserProfile = ({
  userDetails,
  userBookings,
}: {
  userDetails: IUser;
  userBookings: IBooking[];
}) => {
  const date = new Date(userDetails.createdAt!);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return (
    <div className=" p-5 md:px-20 py-12 w-full flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-[25%] flex flex-col gap-5">
        <div className=" p-5 rounded-xl bg-gradient-to-b flex flex-col gap-1 from-primary to-orange-500/20 ">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full flex overflow-hidden  items-center object-contain object-center justify-center">
              <Image
                src={userDetails.profileImage || "/images/avatar.svg"}
                width={50}
                alt="avatar"
                height={50}
              />
            </div>
            <p className="text-lg font-semibold capitalize">
              {userDetails.firstname} {userDetails.lastname}
            </p>
          </div>
          <p className="mt-5  inline-flex items-center gap-2">
            <Image
              src={"/images/heart.svg"}
              width={17}
              height={17}
              alt="mail"
            />
            <span className="text-sm">
              Member since {month} {year}
            </span>
          </p>
          {userDetails.city && userDetails.country && (
            <p className="mt-1 mb-4 inline-flex items-center gap-2">
              <Image
                src={"/images/location.svg"}
                width={14}
                height={14}
                alt="mail"
              />
              <span className="text-sm">
                {userDetails.city}, {userDetails.country}
              </span>
            </p>
          )}

          <div className="flex gap-3 mb-5 mt-2 items-start ">
            <h3 className="font-bold">Intro:</h3>
            <p className="text-xs 2xl:text-sm mt-0.5">
              {userDetails.huntgroundBio || "No bio provided"}
            </p>
          </div>
          <Link
            href={"/account/settings"}
            className=" px-20 text-sm py-3 text-center rounded-xl  bg-[#372F2F] "
          >
            Edit Profile
          </Link>
        </div>
        <div className=" p-5 rounded-xl flex flex-col bg-gradient-to-b from-primary to-orange-500/20 ">
          <p className="text-xl font-semibold">Trusted HuntGround</p>
          <p className="mt-5 mb-2  inline-flex items-center gap-2">
            <Image
              src={"/images/check2.svg"}
              width={17}
              height={17}
              alt="mail"
            />
            <span className="text-sm">Email Adress</span>
          </p>
          {userDetails.isVerified && (
            <p className="mt-b  inline-flex items-center gap-2">
              <Image
                src={"/images/check2.svg"}
                width={17}
                height={17}
                alt="mail"
              />
              <span className="text-sm">Kyc Verified</span>
            </p>
          )}
        </div>
        <div className=" p-5 rounded-xl flex flex-col bg-gradient-to-b from-primary to-orange-500/20 ">
          <div className="flex items-center gap-3">
            <p className=" border border-primary-50/60 px-4 py-1 text-sm rounded-full text-primary-50/60">
              CA% 10
            </p>
            <p className="text-sm text-gray-400">Balance</p>
          </div>
          <Link
            href={"/refer-and-earn"}
            className=" w-[96%] px-12 py-2  text-center rounded-xl bg-gradient-to-b from-[#FF9900] to-[#FFE7A9] text-black font-semibold mt-8"
          >
            Earn Huntcash
          </Link>
        </div>
      </div>
      <div className=" w-full md:w-[65%]  ">
        <div className=" w-full px-3 pt-3 rounded-2xl bg-[#161313] flex gap-3  ">
          <button className=" border-b pb-3 border-primary-50 px-3">
            {userBookings && userBookings.length} <br />
            Trip
          </button>
          <button className=" border-b pb-3 border-primary-50 px-3">
            0 <br />
            Saves
          </button>
          <button className=" border-b pb-3 border-primary-50 px-3">
            0 <br />
            Review
          </button>
        </div>
        <div className=" w-full bg-[#372F2F33] my-4 pb-6 ">
          <Image
            src={"/images/scene.svg"}
            width={900}
            height={400}
            alt="user"
            className="w-full rounded-xl"
          />
          <p className="border rounded-full px-3 mt-4 py-1.5 text-sm  w-fit ml-4  bg-primary-100">
            Booked Trips
          </p>
          {userBookings.map((booking) => {
            // const fromDate = new Date(booking.checkIn);
            // const toDate = new Date(booking.checkOut);
            return (
              <div className="flex w-full px-4 items-center justify-between flex-col md:flex-row">
                <div>
                  <p className="mt-4 mb-2 px-3 text-xl font-semibold">
                    {booking.property.name}
                  </p>
                  <p className="text-sm px-3 text-gray-400 mb-4">
                    in {booking.property.address} from{" "}
                    {new Date(booking.checkIn).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    to{" "}
                    {new Date(booking.checkOut).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {booking.property.owner !== userDetails._id && (
                  <Link
                    href={`/chat?id=${
                      booking.property.owner
                    }&propertyName=${encodeURIComponent(
                      booking.property.name
                    )}`}
                  >
                    Contact Owner
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        <div className=" w-full bg-[#372F2F33] my-4 pb-6 pt-2 ">
          {/* <Image
            src={"/images/scene.svg"}
            width={900}
            height={400}
            alt="user"
            className="w-full rounded-xl"
          /> */}
          <p className="border  rounded-full px-3 py-1.5 text-sm mt-2 w-fit ml-4  bg-primary-100">
            Past Trips
          </p>
          <p className="mt-4 mb-2 px-3 text-xl font-semibold">
            Paradis d’artistes 3 Baysie
          </p>
          <p className="text-sm px-3 text-gray-400 mb-4">
            in Paradis d’Artistes , Quebec
          </p>
          <div className="flex items-center gap-5 px-5 mx-4 py-4 rounded-xl bg-[#372F2F80] justify-between flex-col-reverse md:flex-row p-3">
            <div className=" space-y-3">
              <h3 className="text-lg text-primary-50">
                An exceptional experience
              </h3>
              <p className="text-gray-400 max-w-md 2xl:max-w-lg text-xs 2xl:text-sm">
                We loved our stay! Real and Johanne were great hostess , we will
                100 recommend!
              </p>
              <div className="flex items-center justify-between max-w-md 2xl:max-w-lg w-full">
                <div className="flex gap-2">
                  <Image
                    src={"/images/avatar.svg"}
                    width={20}
                    height={20}
                    alt="mail"
                  />
                  <p className="text-sm">John Maximus</p>
                </div>
                <p className="text-primary-50/60 text-sm">June 21st , 2022</p>
              </div>
            </div>
            <Image
              src={"/images/food.svg"}
              width={155}
              height={155}
              alt="mail"
              className="rounded-xl "
            />
          </div>
          <div className="w-full items-center justify-between flex gap-4 flex-col md:flex-row">
            <div className="flex items-center mx-4 my-4 px-5 rounded-xl bg-[#372F2F80] gap-3 w-full md:w-fit  p-3">
              <p className="font-normal">Share trip</p>
              <button>
                <Image
                  src={"/images/messenger.svg"}
                  width={35}
                  height={35}
                  alt="mail"
                />
              </button>
              <button>
                <Image
                  src={"/images/facebook2.svg"}
                  width={35}
                  height={35}
                  alt="mail"
                />
              </button>
              <button>
                <Image
                  src={"/images/pintrest.svg"}
                  width={35}
                  height={35}
                  alt="mail"
                />
              </button>
              <button>
                <Image
                  src={"/images/twitter.svg"}
                  width={35}
                  height={35}
                  alt="mail"
                />
              </button>
              <button>
                <Image
                  src={"/images/link.svg"}
                  width={27}
                  height={27}
                  alt="mail"
                />
              </button>
            </div>
            <Link
              href={"/"}
              className="px-5 mr-3 w-full md:w-fit rounded-xl bg-[#372F2F80] py-3"
            >
              {" "}
              Trips Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
