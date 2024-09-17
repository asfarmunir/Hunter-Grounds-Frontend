"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { IoMdAdd } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoArrowBack, IoCloseSharp } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import codes from "country-calling-code";
import Roadmap from "@/components/shared/Roadmap";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().min(2, { message: "Email is required" }),
  password: z.string().min(2, { message: "Password is required" }),
  firstName: z.string().min(2, { message: "First Name is required" }),
  lastName: z.string().min(2, { message: "Last Name is required" }),
  zipCode: z.string().min(2, { message: "Zip Code is required" }),
  phone: z.string().min(2, { message: "Phone is required" }),
});
const page = () => {
  const [countryCode, setCountryCode] = React.useState("+1");
  console.log("🚀 ~ page ~ countryCode:", countryCode);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      zipCode: "",
      phone: "",
    },
  });

  const router = useRouter();
  async function onSubmit(values: any) {
    console.log(values);
  }
  return (
    <div className="  py-8 relative overflow-x-hidden  ">
      <div className=" md:pl-12 relative 2xl:pl-20 flex flex-col items-center md:items-start w-full pb-4">
        <motion.div
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            x: -200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.1, duration: 1.2, ease: "easeInOut" },
          }}
        >
          <Form {...form}>
            <div
              id="first"
              className="flex flex-col bg-[#161313CC] mb-12 py-8 md:py-0  items-center  overflow-auto justify-start w-fit  gap-5 md:gap-3  md:p-8 2xl:px-10 2xl:py-16 rounded-xl "
            >
              <h2 className="text-2xl md:text-3xl 2xl:text-5xl  font-bold">
                Own land? <span className="text-primary-50">Earn money </span>{" "}
                <br /> on HuntGrounds
              </h2>
              <p className="font-normal mb-2 mt-1 ">
                Sign up for free, host when you want, <br /> and get
                <span className="text-primary-50 mx-1 font-semibold">
                  paid
                </span>{" "}
                every week.
              </p>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full px-6 md:px-12 "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Image
                            src="/images/email.svg"
                            width={25}
                            height={25}
                            alt="email"
                          />
                          <Input
                            placeholder="Email* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Input
                            placeholder="First Name* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Input
                            placeholder="Last Name* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Input
                            placeholder="Zip Code* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Image
                            src="/images/password.svg"
                            width={25}
                            height={25}
                            alt="email"
                          />
                          <Input
                            placeholder="Password* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1  outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3 
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                          <Image
                            src="/images/eye.svg"
                            width={30}
                            className=" border-l pl-2 border-primary-50/50"
                            height={30}
                            alt="email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-start  gap-3 ">
                  <div className="flex items-center   px-3 p-0.5 md:p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="border-none  bg-transparent focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0  rounded-lg   
                          p-3  text-[#848BAC] leading-tight truncate w-16 md:w-32 
                          "
                    >
                      {codes.map((code, index) => (
                        <option key={index} value={code.countryCodes[0]}>
                          {code.isoCode2} +{code.countryCodes[0]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full ">
                        <FormControl className="">
                          <div className="flex items-center  px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                            <Input
                              placeholder="Phone Number* "
                              {...field}
                              className="   border-none bg-red-50  focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3 
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col w-full mt-6 items-center justify-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] mb-4 inner-shadow  w-full rounded-xl  mt-2 text-black font-bold py-6 px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
                  >
                    {/* {isLoading ? (
                    <ColorRing
                      visible={true}
                      height="35"
                      width="35"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                      ]}
                    />
                  ) : ( */}
                    <span className=" capitalize">Start Earning</span>
                    {/* )} */}
                  </Button>
                  <p className="text-[0.7rem] 2xl:text-sm  text-slate-400 font-thin w-full text-center">
                    This site is protected reCAPTCHA and the Google <br />
                    <span className="text-white font-semibold">
                      Privacy Policy
                    </span>{" "}
                    and{" "}
                    <span className="text-white font-semibold">
                      Terms of Service
                    </span>{" "}
                    apply.{" "}
                  </p>
                </div>
              </form>
            </div>
          </Form>
        </motion.div>

        <div className="flex items-center gap-3 bg-[#141428] rounded-full px-4 py-2 shadow-inner shadow-slate-800 absolute bottom-0 md:right-[40%]">
          <Image src="/images/check.svg" width={20} height={20} alt="logo" />
          <p className="text-xs xs:text-sm font-semibold">
            Hunt Where You Feel Free.
          </p>
        </div>
        <motion.div
          viewport={{ amount: 0.25, once: true }}
          initial={{
            opacity: 0,
            x: 200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.1, duration: 1.2, ease: "easeInOut" },
          }}
          className=" bg-[#161313CC] hidden md:block absolute bottom-0 right-0  p-4 2xl:p-7  max-w-sm 2xl:max-w-lg rounded-xl shadow"
        >
          <h2 className="text-4xl 2xl:text-5xl  text-primary-50 px-8">
            $1 Million USD <span className="text-white">Included</span>{" "}
          </h2>
          <p className="text-sm 2xl:text-base font-semibold text-[#D3DAFF] my-3">
            In the rare event of a guest injury while occupying a HuntGrounds
            hosted property, rest assured that our insurance policy protects
            Hosts on every booking for up to $1 million USD in general liability
            claims.
          </p>
        </motion.div>
      </div>
      <div className=" w-full flex pt-16 md:pt-0 items-center bg-[#000214]  justify-between px-6 md:pl-10 2xl:pl-20 md:pr-0 md:h-[34rem] 2xl:h-[40rem] mt-16  overflow-hidden">
        <motion.div
          viewport={{ amount: 0.25, once: true }}
          initial={{
            opacity: 0,
            x: -200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.1, duration: 1.2, ease: "easeInOut" },
          }}
          className=" bg-[#161313CC]   p-4 md:p-6 2xl:p-10  max-w-xl 2xl:max-w-3xl rounded-2xl shadow"
        >
          <h2 className="text-3xl mb-6 2xl:mb-12 md:text-5xl 2xl:text-6xl font-semibold text-white text-center w-full ">
            Why <span className="text-primary-50">Host?</span>{" "}
          </h2>
          <p className=" 2xl:text-lg  my-3">
            HuntGround is the world’s premier booking platform for hunting
            lodges, cabins, and outdoor adventures. With over 7 million users,
            we connect your business with the perfect hunting enthusiasts,
            ensuring more bookings throughout the year. Whether you offer a
            rustic cabin, a treehouse hideaway, or a prime hunting spot,
            HuntGrounds is tailored to bring you the right guests for every
            season.
          </p>
        </motion.div>
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
      <div className=" w-full px-4 py-20 md:p-20 bg-[#000214] ">
        <motion.div
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.1, duration: 0.5, ease: "easeInOut" },
          }}
          className="text-3xl md:text-5xl text-center md:text-center 2xl:text-6xl font-semibold text-white   "
        >
          The  <span className="text-primary-50">Benefits</span> <br /> of
          HuntGrounds
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.15, duration: 0.8, ease: "easeOut" },
          }}
          className="flex items-center justify-center w-full gap-5 flex-wrap lg:flex-nowrap  mt-16  mb-12"
        >
          <div className="flex gap-4">
            <Image
              src="/images/relax.svg"
              width={90}
              height={90}
              className=" w-[50px] h-[50px] md:w-[90px] md:h-[90px]"
              alt="logo"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-xs 2xl:text-sm text-primary-50 font-semibold">
                Relax
              </p>
              <h2 className="text-xl md:text-3xl 2xl:text-4xl font-bold">
                Offer bookings at anytime you want
              </h2>
              <p className="text-xs  md:text-base 2xl:text-lg  font-thin text-gray-400">
                Offer bookings at any time that suits you, putting control of
                your schedule right in your hands.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Image
              src="/images/paid.svg"
              width={90}
              className=" w-[50px] h-[50px] md:w-[90px] md:h-[90px]"
              height={90}
              alt="logo"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-xs 2xl:text-sm text-primary-50 font-semibold">
                Your Rules
              </p>
              <h2 className="text-xl md:text-3xl 2xl:text-4xl font-bold">
                Get paid weekly
              </h2>
              <p className="text-xs md:text-base 2xl:text-lg   font-thin text-gray-400">
                Receive your payments weekly, ensuring a steady and reliable
                income stream.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.15, duration: 0.8, ease: "easeOut" },
          }}
          className="flex items-center justify-center w-full gap-3 flex-wrap lg:flex-nowrap  mb-12"
        >
          <div className="flex gap-3">
            <Image
              src="/images/benefit.svg"
              width={50}
              height={50}
              alt="logo"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-xs 2xl:text-sm text-primary-50 font-semibold">
                Benefit
              </p>
              <h2 className="text-xl 2xl:text-2xl font-bold">
                We only take 10%
              </h2>
              <p className="2xl:text-lg text-sm  font-thin text-gray-400">
                We only take a 10% commission, so you keep the majority of your
                earnings.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Image
              src="/images/advantage.svg"
              width={50}
              height={50}
              alt="logo"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-xs 2xl:text-sm text-primary-50 font-semibold">
                Advantage
              </p>
              <h2 className="text-xl 2xl:text-2xl font-bold">
                We do the marketing for you
              </h2>
              <p className="2xl:text-lg text-sm  font-thin text-gray-400">
                We handle the marketing for you, so you can focus on what you do
                best.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Image
              src="/images/freedom.svg"
              width={50}
              height={50}
              alt="logo"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-xs 2xl:text-sm text-primary-50 font-semibold">
                Freedom
              </p>
              <h2 className="text-xl 2xl:text-2xl font-bold">
                More bookings, no hassle.
              </h2>
              <p className="2xl:text-lg text-sm  md:max-w-lg font-thin text-gray-400">
                Get more bookings without the hassle. We take care of the
                details so you can focus on providing an exceptional experience.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className=" w-full py-12 bg-[#000214]  flex flex-col items-center">
        <motion.div
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.1, duration: 0.5, ease: "easeInOut" },
          }}
          className="text-2xl md:text-5xl 2xl:text-6xl max-w-2xl 2xl:max-w-4xl 2xl:mb-8 text-center w-full font-semibold text-white   "
        >
          What does <span className="text-primary-50">HuntGrounds</span>{" "}
          provide?
        </motion.div>
        <Roadmap />
      </div>
      <div className=" md:pl-12 relative 2xl:pl-20 pt-12 md:pt-0 flex flex-col items-center md:items-start w-full pb-4">
        <motion.div
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            x: -200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.1, duration: 1.2, ease: "easeInOut" },
          }}
        >
          <Form {...form}>
            <div
              id="first"
              className="flex flex-col bg-[#161313CC] py-8 md:py-0 mb-12  items-center  overflow-auto justify-start w-fit  gap-5 md:gap-3  md:p-8 2xl:px-10 2xl:py-16 rounded-xl "
            >
              <h2 className="text-2xl md:text-3xl 2xl:text-5xl  font-bold">
                Own land? <span className="text-primary-50">Earn money </span>{" "}
                <br /> on HuntGrounds
              </h2>
              <p className="font-normal mb-2 mt-1 ">
                Sign up for free, host when you want, <br /> and get
                <span className="text-primary-50 mx-1 font-semibold">
                  paid
                </span>{" "}
                every week.
              </p>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full px-6 md:px-12 "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Image
                            src="/images/email.svg"
                            width={25}
                            height={25}
                            alt="email"
                          />
                          <Input
                            placeholder="Email* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Input
                            placeholder="First Name* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Input
                            placeholder="Last Name* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Input
                            placeholder="Zip Code* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormControl className="">
                        <div className="flex items-center px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                          <Image
                            src="/images/password.svg"
                            width={25}
                            height={25}
                            alt="email"
                          />
                          <Input
                            placeholder="Password* "
                            {...field}
                            className="   border-none bg-red-50 focus:ring-1  outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3 
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                          />
                          <Image
                            src="/images/eye.svg"
                            width={30}
                            className=" border-l pl-2 border-primary-50/50"
                            height={30}
                            alt="email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-start  gap-3 ">
                  <div className="flex items-center   px-3 p-0.5 md:p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="border-none  bg-transparent focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0  rounded-lg   
                          p-3  text-[#848BAC] leading-tight truncate w-16 md:w-32 
                          "
                    >
                      {codes.map((code, index) => (
                        <option key={index} value={code.countryCodes[0]}>
                          {code.isoCode2} +{code.countryCodes[0]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full ">
                        <FormControl className="">
                          <div className="flex items-center  px-3 p-1 rounded-lg gap-2.5 bg-[#2A2A2A]">
                            <Input
                              placeholder="Phone Number* "
                              {...field}
                              className="   border-none bg-red-50  focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3 
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col w-full mt-6 items-center justify-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] mb-4 inner-shadow  w-full rounded-xl  mt-2 text-black font-bold py-6 px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
                  >
                    {/* {isLoading ? (
                    <ColorRing
                      visible={true}
                      height="35"
                      width="35"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                      ]}
                    />
                  ) : ( */}
                    <span className=" capitalize">Start Earning</span>
                    {/* )} */}
                  </Button>
                  <p className="text-[0.7rem] 2xl:text-sm  text-slate-400 font-thin w-full text-center">
                    This site is protected reCAPTCHA and the Google <br />
                    <span className="text-white font-semibold">
                      Privacy Policy
                    </span>{" "}
                    and{" "}
                    <span className="text-white font-semibold">
                      Terms of Service
                    </span>{" "}
                    apply.{" "}
                  </p>
                </div>
              </form>
            </div>
          </Form>
        </motion.div>
        <motion.div
          viewport={{ amount: 0.25, once: true }}
          initial={{
            opacity: 0,
            x: 200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.1, duration: 1.2, ease: "easeInOut" },
          }}
          className=" bg-[#161313CC] hidden md:block absolute bottom-0 right-0  p-4 2xl:p-7  max-w-sm 2xl:max-w-lg rounded-xl shadow"
        >
          <h2 className="text-4xl 2xl:text-5xl  text-primary-50 px-8">
            $1 Million USD <span className="text-white">Included</span>{" "}
          </h2>
          <p className="text-sm 2xl:text-base font-semibold text-[#D3DAFF] my-3">
            In the rare event of a guest injury while occupying a HuntGrounds
            hosted property, rest assured that our insurance policy protects
            Hosts on every booking for up to $1 million USD in general liability
            claims.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
