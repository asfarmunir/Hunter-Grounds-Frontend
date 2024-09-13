"use client";
import React from "react";
import Image from "next/image";
import { navlinks } from "@/lib/constants";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoChevronDownOutline, IoSettingsOutline } from "react-icons/io5";
import { HiMoon } from "react-icons/hi2";
import { RiSearchLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMdSearch } from "react-icons/io";

import { RxHamburgerMenu } from "react-icons/rx";
import LoginModal from "@/components/shared/LoginModal";
import SignupModal from "@/components/shared/SignupModal";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className=" w-full  rounded-full px-3 md:pl-10 2xl:pl-12 2xl:px-5 py-3.5 flex items-center justify-between">
      <Image
        src="/images/logo.svg"
        alt="Logo"
        width={130}
        height={130}
        className=" w-36 2xl:w-48  "
      />

      <div className=" bg-[#2A2A2A] px-4 py-2 hidden md:flex items-center gap-2 rounded-lg">
        <button className="inline-flex items-center gap-2 text-xs 2xl:text-sm border-r pr-2.5 border-gray-500">
          <Image
            src={"/images/calendar.svg"}
            width={18}
            height={18}
            alt="logo"
          />
          Add Dates +
        </button>
        <button className="inline-flex items-center gap-2 text-xs 2xl:text-sm border-r px-2.5 border-gray-500">
          <Image src={"/images/guest.svg"} width={18} height={18} alt="logo" />
          Add Guests +
        </button>
        <button className="inline-flex items-center gap-2 text-xs 2xl:text-sm border-r px-2.5 border-gray-500">
          <Image src={"/images/map.svg"} width={18} height={18} alt="logo" />
          Map Area
        </button>

        <IoMdSearch className=" bg-gradient-to-b from-[#FF9900] to-[#10111080] px-1 ml-3 rounded-md w-6 2xl:w-7 h-6 2xl:h-7" />
      </div>
      <div className=" hidden md:flex items-center gap-4">
        {navlinks.map((link, index) => (
          <Link
            key={index}
            className={`text-sm 2xl:text-base font-semibold pb-1.5 mt-1.5
            ${pathname === link.href ? "border-b-2 px-2 border-primary-50" : ""}
        `}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
        {/* <button className="text-sm 2xl:text-base font-semibold">
          Sign Out
        </button> */}
        {pathname === "/start-hosting" ? (
          <>
            <button
              className={`text-sm 2xl:text-base font-semibold pb-1.5 mt-1.5

        `}
            >
              Sign Out
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={"/images/avatar.svg"}
                  width={45}
                  height={45}
                  alt="logo"
                  className="rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-8 mt-2  rounded-xl border border-primary-50 ">
                <DropdownMenuItem
                  asChild
                  className="text-primary-50 hover:text-white px-2 font-semibold hover:bg-primary-50/50 cursor-pointer"
                >
                  <Link href={"/account/settings"}>Accounts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary-50 hover:text-white px-2 font-semibold hover:bg-primary-50/50 cursor-pointer">
                  Trip
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary-50 hover:text-white px-2 font-semibold hover:bg-primary-50/50 cursor-pointer">
                  Help and FAQ
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary-50 hover:text-white px-2 font-semibold hover:bg-primary-50/50 cursor-pointer">
                  Store
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary-50 hover:text-white px-2 font-semibold hover:bg-primary-50/50 cursor-pointer">
                  Earn CA$100
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <LoginModal />
            <SignupModal />
          </>
        )}

        {/* <Image src={"/images/avatar.svg"} width={37} height={37} alt="logo" /> */}
      </div>
    </nav>
  );
};

export default Navbar;
