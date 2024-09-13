"use client";
import React from "react";
import Image from "next/image";
import { navlinks } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

// const links = [
//   {
//     name: "Dashboard",
//     href: "/",
//   },
//   {
//     name: "Bookings",
//     href: "/404",
//   },
//   {
//     name: "Property",
//     href: "/404",
//   },
//   {
//     name: "Calendar",
//     href: "/404",
//   },
//   {
//     name: "Inbox",
//     href: "/404",
//   },
// ];

const Navbar = ({
  links,
}: {
  links: {
    name: string;
    href: string;
  }[];
}) => {
  const pathname = usePathname();
  return (
    <div className=" w-full bg-[#FF99001A]  px-2 md:px-6 md:pl-14 2xl:pl-16 2xl:px-5  flex items-center gap-2 md:gap-8 overflow-x-scroll pb-1 md:pb-0  ">
      {links.map((link, index) => (
        <Link
          key={index}
          className={`text-sm 2xl:text-base capitalize py-3 px-3
            ${pathname === link.href ? " border-b-2 border-[#FF9900]" : ""}`}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
