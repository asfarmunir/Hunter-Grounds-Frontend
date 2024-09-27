"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ColorRing } from "react-loader-spinner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: any) {
    setLoading(true);
    console.log("this is the value : ", values);
    try {
      const response = await axios.post("/api/reset-password", {
        email: values.email,
      });
      console.log("this is the response in th page : ", response);
      if (response.status === 200) {
        toast.success("Reset link has been sent!");
      }
    } catch (error) {
      toast.error("Invalid Email or issue sending email.");
    }
    setLoading(false);
  }

  return (
    <div className=" w-full flex h-[70svh] items-center mt-[4rem] justify-center gap-16 pb-4">
      <div className=" bg-primary-200 w-full sm:w-fit sm:min-w-[459px] 2xl:mt-6 2xl:min-w-[500px] mt-24 md:mt-0 flex flex-col items-center rounded-lg p-7  2xl:p-10 ">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={150}
          height={150}
          className="mb-4"
        />
        <h2 className=" text-xl md:text-2xl 2xl:text-3xl font-bold text-white mb-1 2xl:mb-2">
          VERIFY YOUR EMAIL
        </h2>
        <p className=" max-w-md text-[#848BAC] text-sm mb-5 font-light">
          Please enter your email to receive a password reset link.
        </p>

        <Form {...form}>
          <div
            id="email-verification"
            className="flex flex-col items-center justify-center w-full gap-6 md:gap-4 mt-6"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-[1.05rem] text-gray-300 mb-2.5">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="focus:ring-1 outline-offset-1 shadow dark:border dark:border-primary-50/15 mr-0 md:mr-6 rounded-lg bg-[#333547]/60 w-full p-4 2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col w-full mt-2 items-center justify-center">
                <Button
                  type="submit"
                  className="dark:bg-gradient-to-b from-[#FF9900] to-[#262826cf] mb-4  w-full rounded-xl  mt-4 dark:text-white font-semibold py-5 px-10 2xl:text-lg focus:outline-none focus:shadow-outline"
                >
                  {loading ? (
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
                  ) : (
                    <span className="capitalize">Submit</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Page;
