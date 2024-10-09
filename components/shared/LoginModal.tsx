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
import { Checkbox } from "../ui/checkbox";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
import GoogleLogin from "./GoogleLogin";

const formSchema = z.object({
  email: z.string().min(2, { message: "Email is required" }),
  password: z.string().min(2, { message: "Password is required" }),
});

const AddClient = ({
  loginRef,
  signupRef,
}: {
  loginRef: React.LegacyRef<HTMLButtonElement>;
  signupRef: React.LegacyRef<HTMLButtonElement>;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "testtest",
    },
  });

  const router = useRouter();
  async function onSubmit(values: any) {
    setLoading(true);
    const { email, password } = values;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);
    if (!res!.ok) {
      toast.error(res!.error);
      setLoading(false);
      return;
    }
    toast.success("Logged in successfully");
    // router.push("/");
    setLoading(false);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        ref={loginRef}
        className={`text-sm 2xl:text-base font-semibold hover:border-b-2 border-primary-50 hover:-translate-y-1 transition-all   pb-1.5 mt-1.5 }`}
      >
        Login
      </AlertDialogTrigger>
      <AlertDialogContent className=" p-0  bg-[#161313CC] border-none  2xl:min-w-[600px]  ">
        <AlertDialogCancel className=" w-fit absolute right-3 top-3 dark:bg-[#161313CC] border-none">
          <IoCloseSharp className="text-3xl text-white p-1 bg-[#372F2F] rounded-full " />
        </AlertDialogCancel>

        <Form {...form}>
          <div
            id="first"
            className="flex flex-col bg-[#161313CC]  items-center justify-center w-full gap-5 md:gap-3 p-5 md:p-8 2xl:px-10 2xl:pt-16 rounded-xl "
          >
            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold 2xl:mb-2">
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
              <div className="flex justify-between pt-4 items-center w-full">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <p className="text-xs 2xl:text-sm text-brown-100 font-semibold">
                    Remember password
                  </p>
                </div>
                <Link
                  href={"/reset-password"}
                  className="text-xs 2xl:text-sm font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="flex flex-col w-full mt-2 items-center justify-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] mb-4 inner-shadow  w-full rounded-xl  mt-2 text-black font-bold py-6 px-10 2xl:text-lg flex items-center justify-center   focus:outline-none focus:shadow-outline"
                >
                  {loading ? (
                    <MoonLoader size={25} />
                  ) : (
                    <span className=" capitalize">Log In</span>
                  )}
                </Button>
                <p className="text-xs 2xl:text-sm text-slate-400 font-thin w-full text-center">
                  Dont already have an account? <br /> Click Here To{" "}
                  <button
                    type="button"
                    onClick={() => {
                      // @ts-ignore
                      if (loginRef.current) loginRef.current.click();
                      // @ts-ignore
                      if (signupRef.current) signupRef.current.click();
                    }}
                    className="text-white font-semibold"
                  >
                    Sign up
                  </button>
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
                  <button
                    type="button"
                    onClick={() => {
                      // @ts-ignore
                      if (loginRef.current) loginRef.current.click();
                      router.push("/policies/privacy-policy");
                    }}
                    className="text-white font-semibold"
                  >
                    Privacy Policy
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => {
                      // @ts-ignore
                      if (loginRef.current) loginRef.current.click();
                      router.push("/policies/terms");
                    }}
                    className="text-white font-semibold"
                  >
                    Terms of Service
                  </button>{" "}
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
