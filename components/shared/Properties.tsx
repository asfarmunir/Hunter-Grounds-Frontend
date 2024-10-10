"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/animations";
import Image from "next/image";
import { IProperty } from "@/lib/types/property";
import Link from "next/link";
import { BsSave } from "react-icons/bs";
import { addSavedProperty } from "@/database/actions/user.action";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Properties = ({ properties }: { properties: IProperty[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  return (
    <div className=" ">
      {properties && properties.length ? (
        <motion.div
          variants={containerVariants}
          initial="initial"
          viewport={{ once: true }}
          whileInView="animate"
          className="grid grid-cols-1 w-full sm:grid-cols-2 gap-y-10 place-items-start max-w-xl 2xl:max-w-2xl gap-4 lg:grid-cols-3"
        >
          {properties.map((property, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center px-6 md:px-0 md:max-w-[12rem] 2xl:max-w-full w-full"
            >
              {/* <Link href={`/pre-booking/${property._id}`}> */}
              <div
                className="w-full h-[180px] relative 2xl:h-[210px] bg-red-50 flex items-center hover:shadow-lg hover:shadow-primary-50/50 transition-all justify-center object-cover object-center mb-4 rounded-xl"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image
                  src={property.photos[0]}
                  width={250}
                  priority
                  className="rounded-lg w-full h-full object-cover"
                  height={250}
                  alt="property image"
                />
                {hoveredIndex === index &&
                  session.status === "authenticated" && (
                    <button
                      disabled={loading}
                      type="button"
                      onClick={async (e) => {
                        setLoading(true);
                        e.stopPropagation(); // Prevent the link from being triggered
                        const res = await addSavedProperty(
                          // @ts-ignore
                          session.data.user!.id,
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
                        toast.success("Property saved successfully");
                        setLoading(false);
                      }}
                      className="absolute disabled:cursor-wait top-2 right-2 bg-primary-50/70 opacity-70 hover:opacity-100 transition-all rounded-full p-2"
                    >
                      <BsSave className="text-black" />
                    </button>
                  )}
              </div>
              {/* </Link> */}
              <Link
                href={`/pre-booking/${property._id}`}
                className="text-center"
              >
                <h4 className="font-bold mx-auto text-sm 2xl:text-lg capitalize text-nowrap mb-3">
                  {property.name}
                  <span className="bg-primary-50 text-xs p-1 rounded ml-2">
                    9.0
                  </span>
                </h4>
                <p className="font-thin text-slate-50 capitalize text-sm">
                  <span className="font-semibold">{property.acres}</span> acres
                  huntground in {property.city} from only{" "}
                  <span className="font-semibold">
                    CA${property.pricePerNight}
                  </span>{" "}
                  / night
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex justify-center items-center pt-12 w-full h-full">
          <h1 className="text-2xl border-b-2 border-t-2 border-primary-50/30 py-12 bg-primary-50/10 font-bold capitalize px-20 rounded-lg">
            No properties found!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Properties;
