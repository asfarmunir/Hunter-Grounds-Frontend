"use client";
// @ts-ignore
import { Veriff } from "@veriff/js-sdk";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import { useEffect } from "react";
// import { toast } from "react-toastify";
// import { useVerifyKyc } from "@/app/hooks/useVerifyKyc";
// import { useGetKyc } from "@/app/hooks/useGetKyc";

const KYCVerification = () => {
  //   GET KYC STATUS
  //   const {
  //     mutate: getKyc,
  //     data,
  //     isPending,
  //   } = useGetKyc({
  //     onSuccess: (data) => {
  //       //
  //     },
  //     onError: (error) => {
  //       //
  //     },
  //   });

  //   VERIFY KYC
  //   const { mutate: verifyKYC } = useVerifyKyc({
  //     onSuccess: () => {
  //       getKyc();
  //       toast.success("KYC verification successful");
  //     },
  //     onError: (error: any) => {
  //       toast.error("Error verifying KYC");
  //     },
  //   });

  const startVerification = async () => {
    const veriff = Veriff({
      apiKey: "d6c9eaf5-e31b-4a4c-8a94-73029ccc5ed6",
      parentId: "veriff-root",
      onSession: function (err: any, response: any) {
        console.log("response", response);
        createVeriffFrame({
          url: response.verification.url,
          onEvent: function (msg) {
            switch (msg) {
              case MESSAGES.STARTED:
                console.log("verification started");
                // iframe was closed
                break;
              case MESSAGES.CANCELED:
                console.log("verification canceled");
                // an error occurred
                break;

              case MESSAGES.FINISHED:
                // verification is finished
                // verifyKYC();
                console.log("response", response);
                console.log("KYC verification successful");
                break;
            }
          },
        });
        console.log("err", err);
      },
    });

    veriff.setParams({
      person: {
        givenName: " ",
        lastName: " ",
      },
      vendorData: "66f414368b1494d49d97e75f",
    });
    veriff.mount({
      submitBtnText: "Get verified",
    });
  };

  //   useEffect(() => {
  //     getKyc();
  //   }, []);

  useEffect(() => {
    startVerification();
  }, []);

  return (
    <div className="flex flex-col justify-center pt-12 h-96 items-center">
      {/* {isPending && <div className="text-white">Loading...</div>}

      {!isPending && data && data.kycVerified && (
        <div className="text-white">KYC already verified</div>
      )}

      {!isPending && data && !data.kycVerified && (
        <> */}
      <h1 className="text-white font-semibold text-lg 2xl:text-xl uppercase text-center w-full">
        Verify Your Identity
      </h1>
      <div
        id="veriff-root"
        className="py-8 [&_p.veriff-description]:!text-white [&_p.veriff-description>a]:!text-blue-500 [&_p.veriff-description>a:hover]:!underline
      [&_input]:!bg-[#292a3a] [&_input]:!text-white [&_.veriff-submit]:!bg-[#1A5B0B] [&_.veriff-submit]:!border-[#52FC18] [&_.veriff-submit]:cursor-pointer [&_.veriff-submit:hover]:!rounded-full
      "
      />
      {/* </>
      )} */}
    </div>
  );
};

export default KYCVerification;
