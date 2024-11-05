"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "@/lib/types/user";
import { IBooking } from "@/lib/types/booking";
import { IProperty } from "@/lib/types/property";
import { MdBookmarkRemove } from "react-icons/md";
import { removeSavedProperty } from "@/database/actions/user.action";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { IoChatboxEllipses } from "react-icons/io5";
import ReviewMaker from "./Review";
import { addRatings } from "@/database/actions/booking.action";

const UserProfile = ({
  userDetails,
  userBookings,
  savedProperties,
  userReviews,
}: {
  userDetails: IUser;
  userReviews: number;
  userBookings: IBooking[];
  savedProperties: IProperty[];
}) => {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "trips";
  const [tab, setTab] = React.useState(defaultTab);
  const date = new Date(userDetails.createdAt!);
  const [loading, setLoading] = React.useState(false);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const onRatingSubmit = async (rating: number, bookingId: string) => {
    console.log("🚀 ~ onRatingSubmit ~ bookingId:", bookingId);
    console.log(rating);
    toast.promise(addRatings(bookingId, rating, userDetails._id!), {
      loading: "Submitting rating...",
      success: "Rating submitted successfully",
      error: "Failed to submit rating",
    });
  };

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

          {/* <div className="flex gap-3 mb-5 mt-2 items-start ">
            <h3 className="font-bold">Intro:</h3>
            <p className="text-xs 2xl:text-sm mt-0.5">
              {userDetails.huntgroundBio || "No bio provided"}
            </p>
          </div> */}
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
            <span className="text-sm">Email Address</span>
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
            <p className="text-gray-200">Balance</p>
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
          <button
            onClick={() => setTab("trips")}
            className={`${
              tab === "trips" ? "border-primary-50 border-b-2  " : ""
            }px-3.5 pb-3`}
          >
            {userBookings && userBookings.length - userReviews} <br />
            Trip
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`${
              tab === "saved" ? "border-primary-50 border-b-2 " : ""
            }px-3.5 pb-3`}
          >
            {userDetails.savedProperties && userDetails.savedProperties.length}{" "}
            <br />
            Saves
          </button>
          <button
            onClick={() => setTab("review")}
            className={`${
              tab === "review" ? "border-primary-50 border-b-2 " : ""
            }px-3.5 pb-3`}
          >
            {userReviews ? userReviews : 0} <br />
            Review
          </button>
        </div>
        {tab === "saved" ? (
          <>
            {" "}
            {!savedProperties.length && (
              <div className="flex flex-col items-center  mt-12 2xl:mt-16 2xl:gap-2">
                <Image
                  src="/images/logoIcon.svg"
                  alt="coming soon"
                  width={80}
                  height={80}
                  className=" mb-6 pr-5"
                />
                <p className="text-center w-full text-lg 2xl:text-xl  mx-auto text-gray-400 ">
                  You have not saved any <br /> properties yet! <br />
                  <span className="text-sm font-semibold underline pt-4">
                    <Link href={"/"} className="text-primary-50">
                      Explore Properties
                    </Link>
                  </span>
                </p>
              </div>
            )}
            <div className="grid px-4 mt-8 w-full  grid-cols-1  sm:grid-cols-2 gap-y-10 place-items-start   gap-4 lg:grid-cols-3">
              {savedProperties.map((property, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center px-6 md:px-0 md:max-w-[12rem] 2xl:max-w-full w-full"
                >
                  {/* <Link href={`/pre-booking/${property._id}`}> */}
                  <div className="w-[220px] h-[180px] relative 2xl:h-[210px] bg-red-50 flex items-center hover:shadow-lg hover:shadow-primary-50/50 transition-all justify-center object-cover object-center mb-4 rounded-xl">
                    <Image
                      src={property.photos[0]}
                      width={250}
                      priority
                      className="rounded-lg w-full h-full object-cover"
                      height={250}
                      alt="property image"
                    />
                    <button
                      disabled={loading}
                      type="button"
                      onClick={async () => {
                        setLoading(true);
                        const res = await removeSavedProperty(
                          userDetails._id!,
                          property._id
                        );
                        if (res.status !== 200) {
                          toast.error(res.message, {
                            duration: 4000,
                            style: {
                              background: "#333",
                              color: "#fff",
                            },
                          });
                          setLoading(false);
                          return;
                        }
                        toast.success("Property Removed successfully", {
                          duration: 4000,
                          style: {
                            background: "#333",
                            color: "#fff",
                          },
                        });
                        setLoading(false);
                      }}
                      className="absolute disabled:cursor-wait top-2 right-2 bg-red-500 transition-all rounded-full p-2"
                    >
                      <MdBookmarkRemove className="" />
                    </button>
                  </div>
                  {/* </Link> */}
                  <Link
                    href={`/pre-booking/${property._id}`}
                    className="text-center"
                  >
                    <h4 className="font-bold mx-auto text-sm 2xl:text-lg capitalize text-nowrap mb-3">
                      {property.name}
                    </h4>
                    <p className="font-thin text-slate-50 capitalize text-sm">
                      <span className="font-semibold">{property.acres}</span>{" "}
                      acres huntground in {property.city} from only{" "}
                      <span className="font-semibold">
                        CA${property.pricePerNight}
                      </span>{" "}
                      / night
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : tab === "trips" ? (
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
            {userBookings && userBookings.length === 0 && (
              <p className="text-center text-gray-400 mt-4">
                You have not booked any trips yet
              </p>
            )}
            {userBookings &&
              userBookings
                .filter((booking) => new Date(booking.checkOut) >= new Date()) // Filter to show only future bookings
                .map((booking) => {
                  return (
                    <div
                      className="flex w-full px-4 items-center justify-between flex-col md:flex-row"
                      key={booking._id}
                    >
                      <div>
                        <p className="mt-4 mb-2 capitalize px-3 text-xl font-semibold">
                          {booking.property.name}
                        </p>
                        <p className="text-sm px-3 capitalize text-gray-400 mb-4">
                          in {booking.property.address} from{" "}
                          {new Date(booking.checkIn).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}{" "}
                          to{" "}
                          {new Date(booking.checkOut).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      {booking.property.owner !== userDetails._id && (
                        <Link
                          href={`/chat?id=${
                            booking.property.owner
                          }&propertyName=${encodeURIComponent(
                            booking.property.name
                          )}`}
                          className="flex items-center gap-2 text-sm"
                        >
                          <IoChatboxEllipses className="text-2xl mt-0.5 text-primary-50" />
                          Chat with owner
                        </Link>
                      )}
                    </div>
                  );
                })}
          </div>
        ) : (
          <div className=" w-full bg-[#372F2F33] my-4 pb-6 pt-2 ">
            <p className="border rounded-full px-3 mt-4 py-1.5 text-sm  w-fit ml-4  bg-primary-100">
              Completed Trips
            </p>
            {userBookings &&
              userBookings
                .filter((booking) => new Date(booking.checkOut) < new Date()) // Filter to show only past bookings
                .map((booking) => {
                  const existingReview = booking.property.reviews.find(
                    (review) => review.user === userDetails._id // Ensure `userId` is available in your context
                  );

                  // Get the rating if the review exists, otherwise set default to 0 or null
                  const defaultRating = existingReview
                    ? existingReview.rating
                    : 0;

                  return (
                    <div
                      className="flex w-full px-4 items-center justify-between flex-col md:flex-row"
                      key={booking._id}
                    >
                      <div>
                        <p className="mt-4 mb-2 capitalize px-3 text-xl font-semibold">
                          {booking.property.name}
                        </p>
                        <p className="text-sm px-3 capitalize text-gray-400 mb-4">
                          in {booking.property.address} from{" "}
                          {new Date(booking.checkIn).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}{" "}
                          to{" "}
                          {new Date(booking.checkOut).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <ReviewMaker
                        defaultRating={defaultRating} // Pass the existing rating to ReviewMaker
                        onRatingSubmit={(rating) =>
                          onRatingSubmit(rating, booking._id!)
                        }
                      />
                    </div>
                  );
                })}
            {/* <div className="flex items-center gap-5 px-5 mx-4 py-4 rounded-xl bg-[#372F2F80] justify-between flex-col-reverse md:flex-row p-3">
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
          </div> */}
            {userBookings &&
              userBookings.some(
                (booking) => new Date(booking.checkOut) < new Date()
              ) && (
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
                    Trip Page
                  </Link>
                </div>
              )}

            {userBookings &&
              !userBookings.some(
                (booking) => new Date(booking.checkOut) < new Date()
              ) && (
                <>
                  <div className="flex flex-col items-center  mt-12 2xl:mt-16 2xl:gap-2">
                    <Image
                      src="/images/logoIcon.svg"
                      alt="coming soon"
                      width={80}
                      height={80}
                      className=" mb-6 pr-5"
                    />
                    <p className="text-center w-full text-lg 2xl:text-xl  mx-auto text-gray-400 ">
                      You have not Booked any <br /> huntground yet! <br />
                      <span className="text-sm font-semibold underline pt-8">
                        <Link href={"/"} className="text-primary-50">
                          Explore Huntgrounds
                        </Link>
                      </span>
                    </p>
                  </div>
                </>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
