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
import { RxHamburgerMenu, RxCalendar } from "react-icons/rx";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoginModal from "@/components/shared/LoginModal";
import SignupModal from "@/components/shared/SignupModal";
const Navbar = () => {
  const [date, setDate] = React.useState<Date>();

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
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={
                " inline-flex items-center gap-2 text-xs 2xl:text-sm border-r px-2.5 border-gray-500 dark:bg-transparent "
              }
            >
              <Image
                src={"/images/calendar.svg"}
                width={17}
                height={17}
                alt="logo"
              />{" "}
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="text-white">Add Dates +</span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

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
      <Sheet>
        <SheetTrigger className=" block md:hidden">
          <RxHamburgerMenu className="w-7 h-7" />
        </SheetTrigger>
        <SheetContent className=" dark:bg-primary p-4 border-none">
          <Image src={"/images/logo.svg"} width={137} height={137} alt="logo" />
          <div className="flex flex-col items-center -mt-16 justify-center h-full gap-2">
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

            {pathname !== "/start-hosting" ? (
              <div className=" mt-5 flex flex-col-reverse items-center gap-4">
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
              </div>
            ) : (
              <div className=" mt-5 gap-4 flex flex-col">
                <LoginModal />
                <SignupModal />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
