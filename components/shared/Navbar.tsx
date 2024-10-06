"use client";
import React, { useEffect, useState } from "react";
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

const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  const [fromDate, setFromDate] = React.useState<Date>();
  const [toDate, setToDate] = React.useState<Date>();
  const [toggleSearch, setToggleSearch] = React.useState(false);
  const [searchCity, setSearchCity] = React.useState("");
  const [debouncedCity, setDebouncedCity] = useState(""); // Debounced city

  const pathname = usePathname();

  const signOutUser = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/",
    });
    toast.success("Signed out successfully");
    router.refresh();
    router.replace("/");
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
      <Link href={"/"}>
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={130}
          height={130}
          className=" w-36 2xl:w-48  "
        />
      </Link>

      <div
        className=" bg-[#2A2A2A] px-2  min-w-[540px] 
       py-2  hidden md:flex items-center gap-2 rounded-lg"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-2 text-xs 2xl:text-sm border-r px-2.5 border-gray-500">
              <Image
                src={"/images/where.svg"}
                width={18}
                height={18}
                alt="logo"
              />

              {!toggleSearch && <span>Where+</span>}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-4 bg-[#2A2A2A]  rounded-md border-none ">
            <div className="text-slate-50 flex w-fit  hover:text-white py-3 items-center gap-2 px-3 font-semibold hover:bg-primary-50/20 rounded-md cursor-pointer">
              <FiSearch className="text-lg text-primary-50/50" />
              <input
                type="text"
                placeholder="city..."
                // value={searchCity}
                onChange={handleInputChange}
                className=" bg-transparent focus:outline-none "
              />
            </div>
            {mostSearchedCities.map((city, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleCitySelect(city)}
                className="cursor-pointer px-3 inline-flex items-center gap-2 capitalize py-2 hover:bg-primary-50/20 text-white w-full"
              >
                <Image
                  src={"/images/location.svg"}
                  width={13}
                  height={13}
                  alt="logo"
                />
                {city}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
              <span
                className={`${toggleSearch ? "hidden" : "block"}  text-white`}
              >
                Add Dates +
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-4 bg-[#2A2A2A] flex flex-col gap-4  rounded-md border-none   py-4 ">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={
                    " inline-flex items-start gap-3 text-xs w-52 justify-start 2xl:text-sm  px-2.5 border-gray-500 dark:bg-transparent "
                  }
                >
                  <Image
                    src={"/images/calendar.svg"}
                    width={17}
                    height={17}
                    alt="logo"
                  />{" "}
                  {fromDate ? (
                    format(fromDate, "PPP")
                  ) : (
                    <span
                      className={`${
                        toggleSearch ? "hidden" : "block"
                      }  text-white`}
                    >
                      From Date...
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={
                    " inline-flex items-start gap-3 text-xs w-52 justify-start 2xl:text-sm  px-2.5 border-gray-500 dark:bg-transparent "
                  }
                >
                  <Image
                    src={"/images/calendar.svg"}
                    width={17}
                    height={17}
                    alt="logo"
                  />{" "}
                  {toDate ? (
                    format(toDate, "PPP")
                  ) : (
                    <span
                      className={`${
                        toggleSearch ? "hidden" : "block"
                      }  text-white`}
                    >
                      To Date...
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <button
              onClick={handleDateFilter}
              className=" w-[90%] mx-auto  tracking-widest py-2 rounded-lg bg-primary-50/25 text-xs text-white font-semibold"
            >
              Set Filter
            </button>
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="inline-flex items-center gap-2 text-xs 2xl:text-sm border-r px-2.5 border-gray-500">
          <Image src={"/images/guest.svg"} width={18} height={18} alt="logo" />
          {!toggleSearch && <span> Add Guests +</span>}
        </button>
        <button className="inline-flex items-center gap-2 text-xs 2xl:text-sm border-r px-2.5 border-gray-500">
          <Image src={"/images/map.svg"} width={18} height={18} alt="logo" />
          {!toggleSearch && <span>Map Area</span>}
        </button>
        <input
          type="text"
          placeholder="search"
          className={` ${
            toggleSearch ? "block" : "hidden"
          } bg-transparent border border-primary-50/30 flex-grow p-2 transition-all  rounded-full text-xs px-4`}
        />

        <button onClick={() => setToggleSearch(!toggleSearch)}>
          <IoMdSearch className=" bg-gradient-to-b from-[#FF9900] to-[#10111080] px-1  rounded-md w-6 2xl:w-7 h-6 2xl:h-7" />
        </button>
      </div>
      <div className=" hidden md:flex items-center gap-4">
        <Link
          className={`text-sm 2xl:text-base font-thin hover:border-b-2 border-primary-50 hover:-translate-y-1 transition-all   pb-1.5 mt-1.5
        `}
          href={"/chat?id=66f46e6c4ec7d951720cc09b"}
        >
          Chat
        </Link>
        {navlinks.map((link, index) => (
          <Link
            key={index}
            className={`text-sm 2xl:text-base font-thin hover:border-b-2 border-primary-50 hover:-translate-y-1 transition-all   pb-1.5 mt-1.5
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
        {session.status === "authenticated" ? (
          <>
            <button
              onClick={signOutUser}
              className={`text-sm 2xl:text-base transition-all hover:border-b-2 border-primary-50 hover:-translate-y-1 font-semibold pb-1.5 mt-1.5

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
              <DropdownMenuContent className="mr-8 mt-2 p-2 rounded-xl border border-primary-50/6- ">
                <Link href={"/account"}>
                  {" "}
                  <DropdownMenuItem className=" inline-flex items-center gap-2 px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                    <GoPeople className="text-lg text-primary-50" />
                    Accounts
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className=" gap-2 hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                  <FaRegQuestionCircle className="text-lg text-primary-50" />
                  Trip
                </DropdownMenuItem>
                <DropdownMenuItem className=" gap-2 hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                  <FaRegQuestionCircle className="text-lg text-primary-50" />
                  Help and FAQ
                </DropdownMenuItem>
                <DropdownMenuItem className=" gap-2 hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                  <FaRegQuestionCircle className="text-lg text-primary-50" />
                  Store
                </DropdownMenuItem>
                <DropdownMenuItem className=" gap-2 hover:text-white px-2 font-normal hover:bg-primary-50/50 cursor-pointer">
                  <FaRegQuestionCircle className="text-lg text-primary-50" />
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
                      <Link href={"/account"}>Accounts</Link>
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
