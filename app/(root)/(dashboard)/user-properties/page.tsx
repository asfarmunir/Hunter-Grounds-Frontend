import { getUserProperties } from "@/database/actions/property.action";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import bg from "@/public/new.svg";
import { IProperty } from "@/lib/types/property";
const page = async () => {
  const session = await getServerSession(authOptions);
  const properties = await getUserProperties(session.user.id);
  return (
    <div className="w-full flex flex-col items-center mt-10  pb-8 gap-12 md:pb-0 justify-center  ">
      <div className=" max-w-3xl flex justify-center 2xl:max-w-5xl relative  ">
        <Image src={bg} alt="background" width={920} height={600} />
        <Link
          href={"/dashboard/add-property"}
          className="  absolute bottom-10 2xl:bottom-14  bg-gradient-to-b  from-[#FF9900] to-[#3a3e3a6f] font-semibold  px-8 py-3 rounded-lg "
        >
          List Property
        </Link>

        <div className=" w-full  p-3"></div>
      </div>
      <div className=" px-14 py-12 md:p-8 2xl:p-12 w-full  ">
        <h2 className="text-2xl 2xl:text-4xl font-bold tracking-wide mb-2">
          Manage Your Properties
        </h2>
        <p className="text-sm 2xl:text-base mb-6 2xl:mb-8">
          Here you can manage your properties, edit bookings and more.
        </p>
        {properties && properties.properties.length ? (
          <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-y-10 place-items-start gap-4 lg:grid-cols-6">
            {properties.properties.map((property: IProperty, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center px-6 md:px-0 md:max-w-[12rem] 2xl:max-w-full "
              >
                <Link
                  href={`/user-properties/${property._id}`}
                  className=" w-full"
                >
                  <div className="w-full h-[180px] relative 2xl:h-[210px] bg-red-50 flex items-center hover:shadow-lg hover:shadow-primary-50/50 transition-all justify-center object-cover object-center mb-4 rounded-xl">
                    <Image
                      src={property.photos[0]}
                      width={250}
                      priority
                      className="rounded-lg w-full h-full cursor-pointer object-cover"
                      height={250}
                      alt="property image"
                    />
                  </div>
                </Link>
                <Link
                  href={`/user-properties/${property._id}`}
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
        ) : (
          <div className="flex justify-center items-center pt-12 w-full h-full">
            <h1 className="text-2xl border-b-2 border-t-2 border-primary-50/30 py-12 bg-primary-50/10 font-bold capitalize px-20 rounded-lg">
              No properties found!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
