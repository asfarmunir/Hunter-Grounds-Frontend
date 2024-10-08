"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const socials = [
  {
    img: "yt",
  },
  {
    img: "insta",
  },
  {
    img: "x",
  },
  {
    img: "discord",
  },
  {
    img: "tiktok",
  },
];

const Footer = () => {
  const [email, setEmail] = React.useState("");

  const submit = () => {
    if (!email || !email.includes("@")) {
      return toast.error("Please enter a valid email!", {
        icon: "😢",
        style: {
          borderRadius: "40px",
          background: "black",
          color: "#fff",
        },
        duration: 5000,
      });
    }
    toast.success("Subscribed Successfully!", {
      icon: "😊",
      style: {
        borderRadius: "40px",
        background: "green",
        color: "#fff",
      },
      duration: 5000,
    });
  };

  return (
    <div className=" w-full flex items-center bg-[#000214]  justify-between px-6 pb-12  md:pl-10 2xl:pl-16 md:pr-0 md:h-[35rem] 2xl:h-[40rem] mt-16  overflow-hidden">
      <div className="flex flex-col md:flex-row gap-10 pt-12 md:pt-32 md:pl-8 pb-12 ">
        <div className="flex flex-col gap-2 ">
          <h2 className="text-2xl 2xl:text-4xl font-black">
            Let's Keep in Touch
          </h2>
          <p className="text-sm 2xl:text-base max-w-sm 2xl:max-w-md mb-4">
            We will not clog up your email inbox and will write only in very
            important cases
          </p>
          <div className="flex items-center  border mb-4 border-slate-600 rounded-3xl w-fit pl-3 sm:pl-5">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-transparent focus:outline-none "
            />
            <button
              onClick={submit}
              className=" bg-gradient-to-r 2xl:hover:px-14 hover:px-10 transition-all hover:shadow-inner shadow-orange-400 from-[#FF9900] to-[#FFFFFF] text-xs md:text-sm rounded-3xl px-8 2xl:px-12 py-4  font-semibold 2xl:text-lg"
            >
              Subscribe
            </button>
          </div>
          <h2 className="text-lg font-bold 2xl:text-2xl">Follow Us</h2>
          <div className="flex items-center gap-5 my-3">
            {socials.map((social, index) => (
              <button key={index}>
                <Image
                  src={`/images/${social.img}.svg`}
                  width={30}
                  height={30}
                  className=" hover:-translate-y-1 transition-all "
                  alt="social"
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 my-2">
            <div className="flex items-center gap-3 rounded-2xl bg-primary-50 px-3.5 sm:px-6 py-3">
              <Image
                src={"/images/apple.svg"}
                width={27}
                height={27}
                alt="hehe"
              />
              <div className="flex flex-col ">
                <span className="text-xs font-thin">Download on the</span>
                <p className=" text-xs xs:text-sm md:text-base 2xl:text-lg font-semibold">
                  App Store
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-primary-50 px-3.5 sm:px-6 py-3">
              <Image
                src={"/images/play.svg"}
                width={27}
                height={27}
                alt="hehe"
              />
              <div className="flex flex-col ">
                <span className="text-xs font-thin">Get It on</span>
                <p className=" text-xs xs:text-sm md:text-base 2xl:text-lg font-semibold">
                  Google Play
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm 2xl:text-base font-semibold mt-3 mb-6">
            2024 ©️ HuntGrounds All Rights Reserved.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Link
            className=" 2xl:text-xl font-thin hover:text-primary-50 transition-all"
            href={"/"}
          >
            FAQ
          </Link>
          <Link
            className=" 2xl:text-xl font-thin hover:text-primary-50 transition-all"
            href={"/policies/terms"}
          >
            Terms Of Service
          </Link>

          <Link
            className=" 2xl:text-xl font-thin hover:text-primary-50 transition-all"
            href={"/policies/privacy-policy"}
          >
            Privacy Policy
          </Link>
          <button className=" 2xl:text-xl text-start font-thin hover:text-primary-50 transition-all">
            Write to Us
          </button>
          <p className=" text-pretty justify-center bg-[#05D6FF1A] inline-flex text-sm 2xl:text-base text-primary-50 border border-primary-50 px-3 py-2 rounded-full items-center gap-3">
            <Image src={"/images/mail.svg"} alt="bg" width={25} height={25} />
            Help@HuntGrounds.com
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Link
            className=" 2xl:text-xl font-thin hover:text-primary-50 transition-all"
            href={"policies/cookie-policy"}
          >
            Cookie Policy
          </Link>
          <Link
            className=" 2xl:text-xl font-thin hover:text-primary-50 transition-all"
            href={"policies/refund-policy"}
          >
            Refund Policy
          </Link>
          <Link
            className=" 2xl:text-xl font-thin hover:text-primary-50 transition-all"
            href={"policies/gun-policy"}
          >
            Gun Safety
          </Link>
          <Link
            className=" 2xl:text-xl font-thin hover:text-primary-50 transition-all"
            href={"policies/risk-disclosure"}
          >
            Risk Disclosure
          </Link>
          <p className=" text-pretty inline-flex border bg-[#05D6FF1A] border-[#05d5ff3f] text-primary-50 px-3 py-2 rounded-full items-center justify-center gap-3">
            <span className=" w-4 h-4 bg-primary-50 border-2 border-blue-600 rounded-full"></span>
            18+
          </p>
        </div>
      </div>
      <div className=" hidden md:block w-fit h-full">
        <Image
          src={"/images/footerBg.svg"}
          alt="bg"
          width={400}
          height={400}
          className=" w-full h-full"
        />
      </div>
    </div>
  );
};

export default Footer;
