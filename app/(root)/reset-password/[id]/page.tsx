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
import { ColorRing } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password should be at least 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Please re-enter your password",
  }),
});

interface props {
  params: {
    id: string;
  };
  searchParams: {
    token: string;
  };
}

const Page = ({ params: { id }, searchParams: { token } }: props) => {
  const router = useRouter();
  console.log("this is the id: ", id);
  console.log("this is the searchParams: ", token);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  async function onSubmit(values: any) {
    setLoading(true);

    if (values.password !== values.confirmPassword) {
      setValidationError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        `/api/reset-password/${id}?token=${token}`,
        {
          password: values.password,
          confirmPassword: values.confirmPassword,
          token,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error("An error occurred during the password reset");
    }
    setLoading(false);
  }

  return (
    <div className="w-full flex h-[70vh] items-center justify-center mt-[4rem] gap-16 pb-4">
      <div className="bg-primary-200 w-full sm:w-fit sm:min-w-[459px] 2xl:mt-6 2xl:min-w-[500px] mt-24 md:mt-0 flex flex-col items-center rounded-lg p-7 px-[2.18rem] 2xl:p-10">
        <h2 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-white mb-1 2xl:mb-2">
          Reset Your Password
        </h2>

        <Form {...form}>
          <div
            id="password-reset"
            className="flex flex-col items-center justify-center w-full gap-6 md:gap-4 mt-6"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-[1.05rem] text-gray-300 mb-2.5">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        className="focus:ring-1 outline-offset-1 shadow dark:border dark:border-primary-50/15 mr-0 md:mr-6 rounded-lg bg-[#333547]/60 w-full p-4 2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-[1.05rem] text-gray-300 mb-2.5">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Re-enter your password"
                        {...field}
                        className="focus:ring-1 outline-offset-1 shadow dark:border dark:border-primary-50/15 mr-0 md:mr-6 rounded-lg bg-[#333547]/60 w-full p-4 2xl:py-6 2xl:px-6 text-[#848BAC] leading-tight"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {validationError && (
                <p className="text-xs inline-flex w-full bg-[#F74418]/15 rounded-xl gap-3 border border-[#F74418]/20 py-2 px-3 items-center 2xl:text-sm text-[#F74418] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <span className="text-[#F74418]">{validationError}</span>
                </p>
              )}

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
                <p className="text-xs 2xl:text-sm text-start w-full mt-2 text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Didn’t get the email?{" "}
                  <span className="text-primary-50">Resend it</span>.
                </p>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Page;
