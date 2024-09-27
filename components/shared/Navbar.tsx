"use client";
import React from "react";
import Image from "next/image";
import { navlinks } from "@/lib/constants";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { IUser } from "@/lib/types/user";
const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  const [date, setDate] = React.useState<Date>();
  const [toggleSearch, setToggleSearch] = React.useState(false);
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
            <DropdownMenuItem className="text-slate-50 hover:text-white py-3 items-center gap-1.5 px-3 font-semibold hover:bg-primary-50/20 rounded-md cursor-pointer">
              <Image
                src={"/images/map.svg"}
                width={19}
                height={19}
                alt="logo"
              />
              Lagos
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-50 hover:text-white py-3 items-center gap-1.5 px-3 font-semibold hover:bg-primary-50/20 rounded-md cursor-pointer">
              <Image
                src={"/images/map.svg"}
                width={19}
                height={19}
                alt="logo"
              />
              Oslo
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-50 hover:text-white py-3 items-center gap-1.5 px-3 font-semibold hover:bg-primary-50/20 rounded-md cursor-pointer">
              <Image
                src={"/images/map.svg"}
                width={19}
                height={19}
                alt="logo"
              />
              Denver
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
                <span
                  className={`${toggleSearch ? "hidden" : "block"}  text-white`}
                >
                  Add Dates +
                </span>
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
