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

const formSchema = z.object({
  email: z.string().min(2, { message: "Email is required" }),
  password: z.string().min(2, { message: "Password is required" }),
});

const AddClient = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  async function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`text-sm 2xl:text-base font-semibold 
                }`}
      >
        Login
      </AlertDialogTrigger>
      <AlertDialogContent className=" p-0  bg-[#161313CC] border-none  2xl:min-w-[600px]  ">
        <AlertDialogCancel className=" w-fit absolute right-3 top-3">
          <IoCloseSharp className="text-lg text-primary  bg-primary-50 rounded-full " />
        </AlertDialogCancel>

        <Form {...form}>
          <div
            id="first"
            className="flex flex-col bg-[#161313CC]  items-center justify-center w-full gap-5 md:gap-3 p-5 md:p-8 2xl:px-10 2xl:py-16 rounded-xl "
          >
            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-bold">
              Login to continue
            </h2>
            <p className="font-semibold mb-2 ">
              Welcome back! Let’s get you{" "}
              <span className="text-primary-50 mx-1">hunting</span>{" "}
            </p>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full px-12 "
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
                          className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
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
              <div className="flex justify-end items-center w-full">
                <Link href={"/"} className="text-xs 2xl:text-sm font-semibold">
                  Forgot Password?
                </Link>
              </div>

              <div className="flex flex-col w-full mt-2 items-center justify-center">
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
                  <span className=" capitalize">LOG IN</span>
                  {/* )} */}
                </Button>
                <p className="text-xs 2xl:text-sm text-slate-400 font-thin w-full text-center">
                  Dont already have an account? <br /> Click Here To{" "}
                  <span className="text-white font-semibold">Sign up</span>
                </p>
                <Image
                  src="/images/or.svg"
                  alt="line"
                  width={250}
                  height={250}
                  className=" my-1 2xl:my-3"
                />
                <div className="flex w-full items-center gap-5 justify-center ">
                  <button>
                    <Image
                      src="/images/google.svg"
                      alt="google"
                      width={35}
                      height={35}
                    />
                  </button>
                  <button>
                    <Image
                      src="/images/facebook.svg"
                      alt="google"
                      width={35}
                      height={35}
                    />
                  </button>
                  <button>
                    <Image
                      src="/images/apple.svg"
                      alt="google"
                      width={28}
                      height={28}
                    />
                  </button>
                </div>
                <p className="text-[0.7rem] 2xl:text-sm mt-6 text-slate-400 font-thin w-full text-center">
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
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddClient;
