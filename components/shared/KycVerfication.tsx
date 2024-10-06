"use client";
// @ts-ignore
import { Veriff } from "@veriff/js-sdk";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getAllProperties } from "@/database/actions/property.action";
import { updateUserStatus } from "@/database/actions/user.action";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { useVerifyKyc } from "@/app/hooks/useVerifyKyc";
// import { useGetKyc } from "@/app/hooks/useGetKyc";

const KYCVerification = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const startVerification = async () => {
    const veriff = Veriff({
      apiKey: "d6c9eaf5-e31b-4a4c-8a94-73029ccc5ed6",
      parentId: "veriff-root",
      onSession: function (err: any, response: any) {
        // received the response, verification can be started / triggered now

        // redirect
        // window.location.href = response.verification.url;

        // or open in the iframe
        createVeriffFrame({
          url: response.verification.url,
          onEvent: async function (msg) {
            switch (msg) {
              case MESSAGES.FINISHED:
                await updateUserStatus(userId);
                toast.success("Verification Successful!", {
                  duration: 5000,
                  style: {
                    backgroundColor: "green",
                    color: "#fff",
                  },
                });
                router.push("/dashboard/add-property");
                break;
            }
          },
        });
      },
    });

    veriff.mount({});
  };

  useEffect(() => {
    startVerification();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center border-2 rounded-xl w-fit mx-auto p-9  md:mt-16 2xl:mt-20  border-primary-50/20 bg-primary-200/60">
      <h1 className="text-white font-semibold  text-lg 2xl:text-xl uppercase text-center w-full">
        Verify Your Identity
      </h1>
      <div
        id="veriff-root"
        className="py-8 [&_p.veriff-description]:!text-white [&_p.veriff-description>a]:!text-blue-500  [&_p.veriff-description>a:hover]:!underline
      [&_input]:!bg-[#292a3a] [&_input]:!text-white [&_.veriff-submit]:!bg-primary-50/30 [&_.veriff-submit]:!border-primary [&_.veriff-submit]:cursor-pointer [&_.veriff-submit:hover]:!rounded-full
      "
      />
    </div>
  );
};

export default KYCVerification;
