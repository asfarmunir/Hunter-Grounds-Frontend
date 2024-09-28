"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
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
import axios from "axios";
import GoogleLogin from "./GoogleLogin";
import { signIn } from "next-auth/react";
const formSchema = z.object({
  email: z.string().min(2, { message: "Email is required" }),
  password: z.string().min(2, { message: "Password is required" }),
  firstname: z.string().min(2, { message: "First Name is required" }),
  lastname: z.string().min(2, { message: "Last Name is required" }),
  zip: z.string().min(2, { message: "Zip Code is required" }),
});

const AddClient = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "testtest",
      firstname: "test",
      lastname: "user",
      zip: "12345",
    },
  });

  const router = useRouter();
  async function onSubmit(values: any) {
    console.log(values);
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/signup", values);
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      if (response.data.status !== 200) {
        toast.error(response.data.message);
        return;
      }
      const { email, password } = values;
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      toast.success("User created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`text-xs 2xl:text-sm hover:shadow-inner transition-all hover:shadow-orange-200 font-semibold bg-gradient-to-b from-[#FF9900] to-[#3a3e3a6f] px-4 py-2 rounded-lg
                }`}
      >
        Sign Up
      </AlertDialogTrigger>
      <AlertDialogContent className=" p-0  bg-[#161313CC] border-none  2xl:min-w-[600px]  ">
        <AlertDialogCancel className=" w-fit absolute right-3 top-3 dark:bg-[#161313CC] border-none">
          <IoCloseSharp className="text-3xl text-white p-1 bg-[#372F2F] rounded-full " />
        </AlertDialogCancel>

        <Form {...form}>
          <div
            id="first"
            className="flex flex-col bg-[#161313CC]  items-center max-h-[95svh] overflow-auto justify-start w-full gap-5 md:gap-3 p-5 md:p-8 2xl:px-10 2xl:pt-16 rounded-xl "
          >
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-semibold">
              Signup to continue
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
                name="firstname"
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
                name="lastname"
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
                name="zip"
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
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="   border-none bg-red-50 focus:ring-1 outline-offset-1 
                         shadow  focus:border mr-0 md:mr-6  rounded-lg   p-3 
                          2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight 

                          "
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Image
                            src="/images/eye.svg"
                            width={40}
                            className=" border-l pl-2 border-primary-50/50"
                            height={40}
                            alt="email"
                          />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col w-full mt-2 items-center justify-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] mb-4 inner-shadow  w-full rounded-xl  mt-2 text-black font-bold py-6 px-10 2xl:text-lg flex items-center justify-center   focus:outline-none focus:shadow-outline"
                >
                  {loading ? (
                    <MoonLoader size={25} />
                  ) : (
                    <span className=" capitalize">Sign Up</span>
                  )}
                </Button>
                <p className="text-xs 2xl:text-sm text-slate-400 font-thin w-full text-center">
                  Already have an account? <br /> Click here to
                  <span className="text-white font-semibold ml-1">Login</span>
                </p>
                <Image
                  src="/images/or.svg"
                  alt="line"
                  width={250}
                  height={250}
                  className=" my-1 2xl:my-3"
                />
                <div className="flex w-full items-center gap-5 justify-center ">
                  <GoogleLogin />
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
