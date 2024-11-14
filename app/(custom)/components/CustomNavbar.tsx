"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { navlinks } from "@/lib/constants";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { GoPeople } from "react-icons/go";
import { FaRegQuestionCircle } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IoMdSearch } from "react-icons/io";
import { RxHamburgerMenu, RxCalendar } from "react-icons/rx";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoginModal from "@/components/shared/LoginModal";
import SignupModal from "@/components/shared/SignupModal";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { formUrlQuery } from "@/lib/utils";
const mostSearchedCities = ["oslo", "denver", "new york"]; // Example most searched cities
import GameFilter from "@/components/shared/GamesFilter";

const CustomNavbar = () => {
  const session = useSession();
  const router = useRouter();

  const [fromDate, setFromDate] = React.useState<Date>();
  const [toDate, setToDate] = React.useState<Date>();
  const [toggleSearch, setToggleSearch] = React.useState(false);
  const [searchCity, setSearchCity] = React.useState("");
  const [debouncedCity, setDebouncedCity] = useState(""); // Debounced city
  const [fromPopoverOpen, setFromPopoverOpen] = useState(false);
  const [toPopoverOpen, setToPopoverOpen] = useState(false);
  const loginModalRef = useRef(null);
  const signupModalRef = useRef(null);

  const handleFromDateSelect = (date: Date | undefined) => {
    setFromDate(date);
    setFromPopoverOpen(false); // Close the popover after selecting a date
  };

  const handleToDateSelect = (date: Date | undefined) => {
    setToDate(date);
    setToPopoverOpen(false); // Close the popover after selecting a date
  };
  const pathname = usePathname();

  const signOutUser = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/home",
    });
    toast.success("Signed out successfully");
    router.refresh();
    router.replace("/home");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(searchCity); // Update debounced city after 500ms
    }, 500);

    return () => {
      clearTimeout(handler); // Clean up the timeout
    };
  }, [searchCity]);
  useEffect(() => {
    if (debouncedCity) {
      const queryParams = new URLSearchParams();
      queryParams.set("city", debouncedCity);
      router.push(`?${queryParams.toString()}`, undefined);
    }
  }, [debouncedCity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCity = e.target.value.toLowerCase().replace(/\s+/g, "");
    setSearchCity(formattedCity);
  };

  // Handle city selection from dropdown
  const handleCitySelect = (city: string) => {
    setSearchCity(city); // Set the city from dropdown
    setDebouncedCity(city); // Immediately set debouncedCity
  };

  const searchParams = useSearchParams();

  const handleDateFilter = () => {
    if (!fromDate || !toDate) {
      toast.error("Please select dates to filter!", {
        duration: 2000,
        style: {
          backgroundColor: "#ff0000",
          color: "#fff",
        },
      });
      return;
    }

    if (fromDate > toDate) {
      toast.error("Please add a valid period!", {
        duration: 2000,
        style: {
          backgroundColor: "#ff0000",
          color: "#fff",
        },
      });
      return;
    }

    // Format the dates using local time (avoiding timezone offset)
    const formattedFromDate = fromDate!.toLocaleDateString("en-CA"); // "YYYY-MM-DD"
    const formattedToDate = toDate!.toLocaleDateString("en-CA"); // "YYYY-MM-DD"

    // Create query for the date range
    const updatedUrlWithDateFilter = formUrlQuery({
      params: searchParams.toString(),
      key: "dateFilter",
      value: `${formattedFromDate}-${formattedToDate}`,
    });

    // Push the new URL with the query params
    router.push(updatedUrlWithDateFilter, { scroll: false });
  };

  return (
    <nav className=" w-full  rounded-full px-3 md:pl-10 2xl:pl-12 2xl:px-5 py-3.5 flex items-center justify-between">
      <Link href={"/home"}>
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={130}
          height={130}
          className=" w-36 2xl:w-48  "
        />
      </Link>

      <div className=" hidden md:flex items-center gap-4 pl-5 bg-white text-black p-3 rounded-full">
        {session.status === "authenticated" &&
          navlinks.map((link, index) => (
            <Link
              key={index}
              className={`text-xs 2xl:text-sm font-semibold hover:border-b-2 border-primary-50 hover:-translate-y-1 transition-all   pb-1.5 mt-1.5
            ${pathname === link.href ? "border-b-2 px-2 border-primary-50" : ""}
        `}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        <Link
          className={`text-xs 2xl:text-sm font-semibold hover:border-b-2 border-primary-50 hover:-translate-y-1 transition-all   pb-1.5 mt-1.5`}
          href={
            session.status === "authenticated" ? "/booking" : "/start-hosting"
          }
        >
          Start Hosting
        </Link>
        <Link
          className={`text-xs 2xl:text-sm font-semibold hover:border-b-2 border-primary-50 hover:-translate-y-1 transition-all   pb-1.5 mt-1.5`}
          href={"/home"}
        >
          Get Hunting
        </Link>
        {/* <button className="text-xs 2xl:text-sm font-semibold">
          Sign Out
        </button> */}
        {session.status === "authenticated" ? (
          <>
            <button
              onClick={signOutUser}
              className={`text-xs 2xl:text-sm transition-all hover:border-b-2 border-primary-50 hover:-translate-y-1 font-semibold pb-1.5 mt-1.5

        `}
            >
              Sign Out
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-[50px] h-[50px] rounded-full flex overflow-hidden  items-center object-contain object-center justify-center">
                  <Image
                    src={session.data.user?.image || "/images/avatar.svg"}
                    width={60}
                    alt="avatar"
                    priority
                    height={60}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-8 flex flex-col mt-2 p-2 rounded-xl border border-primary-50/6- ">
                <Link href={"/account"}>
                  {" "}
                  <DropdownMenuItem className=" inline-flex items-center gap-2 px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    <GoPeople className="text-lg text-primary-50" />
                    Accounts
                  </DropdownMenuItem>
                </Link>
                <Link href={"/dashboard"}>
                  {" "}
                  <DropdownMenuItem className=" inline-flex items-center gap-2 px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    <GoPeople className="text-lg text-primary-50" />
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <Link href={"/account"}>
                  <DropdownMenuItem className=" gap-2 hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    <FaRegQuestionCircle className="text-lg text-primary-50" />
                    Trip
                  </DropdownMenuItem>
                </Link>
                {/* <Link href={"https://help.huntgrounds.com"}>
                  <DropdownMenuItem className=" gap-2 hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    <FaRegQuestionCircle className="text-lg text-primary-50" />
                    Help and FAQ
                  </DropdownMenuItem>
                </Link> */}
                <Link href={"/refer-and-earn"}>
                  <DropdownMenuItem className=" gap-2 hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    <FaRegQuestionCircle className="text-lg text-primary-50" />
                    Hunt Cash
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <LoginModal loginRef={loginModalRef} signupRef={signupModalRef} />
            <SignupModal loginRef={loginModalRef} signupRef={signupModalRef} />
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
          <div className=" flex flex-col items-center gap-2">
            {session.status === "authenticated" ? (
              <div className=" flex flex-col items-center  w-full gap-4 text-left mt-4">
                <div className="flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-full flex overflow-hidden  items-center object-contain object-center justify-center">
                    <Image
                      src={session.data.user?.image || "/images/avatar.svg"}
                      width={60}
                      alt="avatar"
                      priority
                      height={60}
                    />
                  </div>

                  <button
                    onClick={signOutUser}
                    className={`text-sm 2xl:text-base shadow-inner shadow-gray-600 bg-primary-50 px-6 py-2 rounded-lg transition-all hover:border-b-2 border-primary-50 hover:-translate-y-1 font-semibold text-black

        `}
                  >
                    Sign Out
                  </button>
                </div>

                <Link href={"/account"}>
                  {" "}
                  <p className=" inline-flex items-center gap-2 px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    Accounts
                  </p>
                </Link>
                <Link href={"/dashboard"}>
                  {" "}
                  <p className=" inline-flex items-center gap-2 px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    Dashboard
                  </p>
                </Link>
                <Link href={"/account"}>
                  <p className=" gap-2 inline-flex items-center hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    Trip
                  </p>
                </Link>
                <Link href={"https://help.huntgrounds.com"}>
                  <p className=" gap-2 inline-flex items-center hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    Help and FAQ
                  </p>
                </Link>
                <Link href={"/refer-and-earn"}>
                  <p className=" gap-2 inline-flex items-center hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    Hunt Cash
                  </p>
                </Link>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-4">
                <SignupModal
                  loginRef={loginModalRef}
                  signupRef={signupModalRef}
                />
                <LoginModal
                  loginRef={loginModalRef}
                  signupRef={signupModalRef}
                />
              </div>
            )}
            {session.status === "authenticated" &&
              navlinks.map((link, index) => (
                <Link
                  key={index}
                  className={`text-sm 2xl:text-base font-semibold hover:border-b-2 border-primary-50 hover:-translate-y-1 transition-all   pb-1.5 mt-1.5
            ${pathname === link.href ? "border-b-2 px-2 border-primary-50" : ""}
        `}
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            <Link
              className={`text-sm 2xl:text-base font-semibold hover:border-b-2 border-primary-50 hover:-translate-y-1 transition-all   pb-1.5 mt-1.5`}
              href={
                session.status === "authenticated"
                  ? "/booking"
                  : "/start-hosting"
              }
            >
              Start Hosting
            </Link>
            <Link
              className={`text-sm 2xl:text-base font-semibold hover:border-b-2 border-primary-50 hover:-translate-y-1 transition-all   pb-1.5 mt-1.5`}
              href={
                session.status === "authenticated"
                  ? "/booking"
                  : "/start-hosting"
              }
            >
              Get Hunting
            </Link>

            {/* <button className="text-sm 2xl:text-base font-semibold">
          Sign Out
        </button> */}

            {/* <Image src={"/images/avatar.svg"} width={37} height={37} alt="logo" /> */}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default CustomNavbar;
