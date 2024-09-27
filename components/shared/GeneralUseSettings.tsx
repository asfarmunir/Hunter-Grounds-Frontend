"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RiDeleteBinLine } from "react-icons/ri";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { linkSync } from "fs";
import { signOut, useSession } from "next-auth/react";
import ImageUploader from "@/components/shared/ImageUploader";
import {
  getUserDetails,
  updateUserDetails,
  updateUserPassword,
  updateUserProfileImage,
} from "@/database/actions/user.action";
const links = [
  {
    name: " Edit Profile",
    link: "edit-profile",
  },
  {
    name: "Change Password",
    link: "change-password",
  },
  {
    name: "Emails & SMS",
    link: "emails-sms",
  },
  {
    name: "Payment Details",
    link: "payment-details",
  },
];

import { IUser } from "@/lib/types/user";
import toast from "react-hot-toast";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { generatePermittedFileTypes } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";
import { convertFileToUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

const page = ({ userDetails }: { userDetails: IUser }) => {
  const [tab, setTab] = useState("edit-profile");
  const router = useRouter();
  const signoutUser = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/",
    });
    toast.success("Signed out successfully");
    router.refresh();
    router.replace("/");
  };

  return (
    <div className=" w-full p-4 md:px-20 py-12 relative">
      <div className=" hidden md:block absolute right-0 top-[30%] h-[600px]  ">
        <Image
          src={"/images/footerBg.svg"}
          alt="bg"
          width={400}
          height={400}
          className=" w-full h-full opacity-45"
        />
      </div>
      <div className=" w-full flex flex-col md:flex-row gap-12  ">
        <div className=" w-full md:w-[30%] ">
          <div className=" p-5 rounded-xl w-full flex flex-col bg-gradient-to-bl from-primary to-[#FF990080]/20 ">
            <Link
              href={"/account"}
              className="2xl:text-lg inline-flex items-center gap-3 "
            >
              <FaArrowLeftLong className="text-xl text-primary-50" />
              Manager Account
            </Link>
            <div className=" my-5 flex flex-col gap-4 items-start">
              {links.map((link, index) => (
                <button
                  key={index}
                  className={`
                    ${
                      tab === link.link
                        ? " bg-[#372F2F] text-gray-300"
                        : "text-gray-400"
                    } text-sm 2xl:text-base font-normal py-2 px-4 w-full text-start rounded-lg `}
                  onClick={() => setTab(link.link)}
                >
                  {link.name}{" "}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={signoutUser}
              className={`
                     text-sm 2xl:text-base text-gray-400 font-normal py-2 mt-9 px-4 w-full text-start rounded-lg `}
            >
              Log Out{" "}
            </button>
          </div>
        </div>
        {
          {
            "edit-profile": <GeneralSettings data={userDetails} />,
            "change-password": <ChangePassword email={userDetails.email} />,
            // "emails-sms": <EmailsAndSms />,
            // "payment-details": <PaymentDetails />,
          }[tab]
        }
      </div>
    </div>
  );
};

export default page;

const GeneralSettings = ({ data }: { data: IUser }) => {
  const [userData, setUserData] = useState<IUser>({
    email: data.email || "",
    firstname: data.firstname || "",
    lastname: data.lastname || "",
    password: data.password || "",
    zip: data.zip || "",
    profileImage: data.profileImage || "",
    address: data.address || "",
    city: data.city || "",
    phone: data.phone || "",
    suitNumber: data.suitNumber || "",
    country: data.country || "",
    state: data.state || "",
    publicLocation: data.publicLocation || "",
    personalUrl: data.personalUrl || "",
    twitterHandle: data.twitterHandle || "",
    instagramHandle: data.instagramHandle || "",
    huntgroundBio: data.huntgroundBio || "",
  });
  const [files, setFiles] = useState<File[]>([]);
  //   const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  let uploadedImageUrl: string[] = [];
  if (files.length > 0) {
    files.forEach((file) => {
      const url = convertFileToUrl(file);
      uploadedImageUrl.push(url);
    });
  }
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Updating your details");
    await updateUserDetails(userData.email, userData, "/account/settings");
    toast.dismiss();
    toast.success("Details updated successfully");
  };

  const updateImage = async (profileImage: string) => {
    const res = await updateUserProfileImage(userData.email, profileImage);
    if (res.status !== 200) {
      toast.error("An error occured while updating your profile image");
      return;
    }
  };

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Files: ", res);
      setUserData((prev) => ({ ...prev, profileImage: res[0].url }));
      setFiles([]);
      uploadedImageUrl = [];
      updateImage(res[0].url);
      toast.dismiss();
      toast.success("Updated successfully!");
    },
    onUploadError: () => {
      toast.error("Something went wrong while updating, please try again");
    },
    onUploadBegin: () => {
      toast.loading("Updating your profile picture");
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  return (
    <div className=" w-full  bg-[#16131399] p-4 ">
      <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
        Edit Profile{" "}
      </h2>
      <p className="text-lg 2xl:text-xl      font-normal text-gray-400 mt-8 mb-4">
        Perosnal Information
      </p>
      <form action="" onSubmit={submitHandler}>
        <div className=" w-full     bg-[#352e2e33] border border-[#372F2F] p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row py-8 border-b border-primary-50/15  gap-4 md:gap-16">
            <p className=" min-w-16 md:min-w-36">Profile Picture</p>
            <div className="flex flex-col gap-3 mb-3">
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-6">
                  <div {...getRootProps()} className="flex items-center gap-3">
                    {uploadedImageUrl.length ? (
                      <div className="w-[50px] h-[50px] rounded-full flex overflow-hidden  items-center object-contain object-center justify-center">
                        <Image
                          src={uploadedImageUrl[0]}
                          alt="uploaded image"
                          width={60}
                          height={60}
                        />
                      </div>
                    ) : (
                      <div className="w-[50px] h-[50px] rounded-full flex overflow-hidden  items-center object-contain object-center justify-center">
                        <Image
                          src={userData.profileImage || "/images/avatar.svg"}
                          width={60}
                          alt="avatar"
                          height={60}
                        />
                      </div>
                    )}
                    {uploadedImageUrl.length > 0 ? (
                      <>
                        <div className=" ">
                          {files.length > 0 && (
                            <button
                              type="button"
                              className={`text-xs  2xl:text-sm font-semibold bg-gradient-to-b
                     hover:bg-gradient-to-br transition-all duration-500 from-[#FF9900]
                      to-[#10111080] px-4 py-2 rounded-lg
                }`}
                              onClick={() => startUpload(files)}
                            >
                              Upload Photo
                            </button>
                          )}
                        </div>
                        <button
                          type="button"
                          className={`text-xs  2xl:text-sm font-semibold bg-red-600
                      transition-all duration-500 
                       px-4 py-2 rounded-lg
                }`}
                          onClick={() => {
                            setFiles([]);
                            uploadedImageUrl = [];
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <input {...getInputProps()} className=" bg-red-400" />
                        <p
                          className={`text-xs  2xl:text-sm cursor-pointer font-semibold bg-gradient-to-b
                     hover:bg-gradient-to-br transition-all duration-500 from-[#FF9900]
                      to-[#10111080] px-4 py-2 rounded-lg
                }`}
                        >
                          Choose Profile Picture
                        </p>{" "}
                      </>
                    )}
                  </div>
                </div>{" "}
              </div>
              <p className="text-xs md:text-sm text-gray-400 max-w-3xl font-thin tracking-wide">
                Please upload a profile picture where your face is clearly
                visible. Sharing a clear image of yourself helps to build trust
                within the Hipcamp Community, and helps Hosts and Hipcampers
                recognize each other when meeting on properties. Max size: 08 Mb
              </p>
            </div>
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className=" min-w-16 md:min-w-36">First Name</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              required
              value={userData.firstname}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, firstname: e.target.value }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className=" min-w-16 md:min-w-36">Last Name</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              required
              value={userData.lastname}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, lastname: e.target.value }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className=" min-w-16 md:min-w-36">Facebook</p>
            <button
              className={`text-sm 2xl:text-base font-semibold bg-[#05D6FF80] px-4 py-2 rounded-lg
                }`}
            >
              + Connect Facebook
            </button>{" "}
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className=" min-w-16 md:min-w-36">Email</p>
            <p className="">{userData.email}</p>
          </div>
        </div>
        <p className="text-lg      font-normal text-gray-400 mt-8 mb-2">
          Contact Information
        </p>
        <div className=" w-full     bg-[#352e2e33] border border-[#372F2F] p-6 rounded-xl shadow-md">
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">Street Address</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.address}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">Apt or suite number</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.suitNumber}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, suitNumber: e.target.value }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">City</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.city}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">State</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.state}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, state: e.target.value }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">Country</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.country}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">Zip Code</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              required
              value={userData.zip}
              placeholder="zip code"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, zip: e.target.value }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">Phone Number</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.phone}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
        </div>
        <p className="text-lg      font-normal text-gray-400 mt-8 mb-2">
          How you publicly appear around HuntGround
        </p>
        <div className=" w-full     bg-[#352e2e33] border border-[#372F2F] p-6 rounded-xl shadow-md">
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">HuntGrounds Bio</p>
            <textarea
              className=" bg-transparent px-3 w-full"
              value={userData.huntgroundBio}
              placeholder="
              A short description of yourself as a Hunt Grounder
              "
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  huntgroundBio: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">public location</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.publicLocation}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  publicLocation: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">Personal URL</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.personalUrl}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  personalUrl: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">Instagram Handle</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.instagramHandle}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  instagramHandle: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex py-8 border-b border-primary-50/15  gap-16">
            <p className="  min-w-16 md:min-w-36">Twitter Handle</p>
            <input
              type="text"
              className=" bg-transparent px-3"
              value={userData.twitterHandle}
              placeholder="Optional"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  twitterHandle: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className=" w-full pt-4    flex justify-end my-4">
          <button
            type="submit"
            className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 py-3 text-black font-semibold 2xl:text-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const ChangePassword = ({ email }: { email: string }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== newPassword) {
      console.log("passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    const res = await updateUserPassword(email, password);
    if (res.status !== 200) {
      toast.error("An error occured while updating your password");
      return;
    }
    toast.success("Password updated successfully");
  };

  return (
    <form
      onSubmit={submitHandler}
      className=" w-full z-50  bg-[#16131399] p-4 "
    >
      <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
        Change Password{" "}
      </h2>
      <p className="text-lg 2xl:text-xl  font-normal text-gray-400 mt-8 mb-4">
        Change your password
      </p>
      <div className=" w-full bg-[#352e2e33] space-y-4 border border-[#372F2F] p-6 rounded-xl shadow-md">
        {/* <div className=" border-b pb-3 border-primary-50/30">
          <Input
            type="password"
            placeholder="Enter your current password"
            className=" border-none lg:text-lg text-sm border-b pb-4 border-primary-50/15"
          />
        </div> */}
        <div className=" border-b pb-3 flex items-center justify-between  w-full gap-4  border-primary-50/15">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" border-none lg:text-lg text-sm border-b  pb-4 border-primary-50/15"
          />

          <p>
            {showPassword ? (
              <button
                onClick={() => setShowPassword(false)}
                className="cursor-pointer"
                type="button"
              >
                <Image
                  src="/images/eye.svg"
                  className="invert"
                  width={20}
                  height={20}
                  alt="eye"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowPassword(true)}
                className="cursor-pointer"
              >
                <Image src="/images/eye.svg" width={20} height={20} alt="eye" />
              </button>
            )}
          </p>
        </div>
        <div className=" border-b pb-3 flex items-center justify-between  w-full gap-4  border-primary-50/15">
          <Input
            type={showPassword ? "text" : "password"}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Confirm new password"
            className=" border-none lg:text-lg text-sm"
          />
          <p>
            {showPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword(false)}
                className="cursor-pointer"
              >
                <Image
                  src="/images/eye.svg"
                  className="invert"
                  width={20}
                  height={20}
                  alt="eye"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowPassword(true)}
                className="cursor-pointer"
              >
                <Image src="/images/eye.svg" width={20} height={20} alt="eye" />
              </button>
            )}
          </p>
        </div>
      </div>

      <div className=" w-full flex justify-end my-4">
        <button
          type="submit"
          className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 py-3 text-black font-semibold 2xl:text-lg"
        >
          Update Your Password
        </button>
      </div>
    </form>
  );
};
// const EmailsAndSms = () => {
//   return (
//     <div className=" w-full  bg-[#16131399] p-4 ">
//       <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
//         Email & SMS{" "}
//       </h2>

//       <div className=" w-full bg-[#352e2e33] space-y-5 border my-5  border-[#372F2F] p-6 rounded-xl shadow-md">
//         <div className="flex items-center gap-3">
//           <div className="w-16 flex justify-center ">
//             <Image
//               src="/images/email2.svg"
//               width={30}
//               height={30}
//               alt="email"
//             />
//           </div>
//           <p className="text-primary-50 md:pl-6 text-xs font-bold md:text-lg">
//             Optional communication from the Huntground team
//           </p>
//         </div>
//         <div className="flex items-center border-b border-primary-50/15 pb-3">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Personalized Recommendations</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/15 pb-3">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Exclusive offers, news and tips</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/15 pb-3">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">New features announcement</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/15 pb-3">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Feedback and surveys</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/15 pb-3">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Safety tips and reminders</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className=" w-full bg-[#352e2e33] space-y-5 border my-5  border-[#372F2F] p-6 rounded-xl shadow-md">
//         <div className="flex items-center border-b border-primary-50/10 pb-4 gap-2">
//           <div className="w-16 flex justify-center ">
//             <Image
//               src="/images/email2.svg"
//               width={30}
//               height={30}
//               alt="email"
//             />
//           </div>
//           <div className="w-16 flex justify-center ">
//             <Image src="/images/phone.svg" width={30} height={30} alt="email" />
//           </div>
//           <p className="text-primary-50 md:pl-6 text-xs md:text-lg font-bold">
//             Huntground experience communications
//           </p>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Personalized Recommendations</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Exclusive offers, news and tips</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">New features announcement</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Feedback and surveys</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="w-16 flex justify-center">
//             <Checkbox />
//           </div>
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Safety tips and reminders</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className=" w-full flex justify-end my-4">
//         <button className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 py-3 text-black font-semibold 2xl:text-lg">
//           Save Changes
//         </button>
//       </div>
//       <div className=" w-full bg-[#352e2e33] space-y-5 border my-5  border-[#372F2F] p-6 rounded-xl shadow-md">
//         <div className="flex items-center border-b border-primary-50/10 pb-4 gap-3">
//           <div className="w-16 flex justify-center  ">
//             <Image
//               src="/images/email2.svg"
//               width={30}
//               height={30}
//               alt="email"
//             />
//           </div>
//           <div className="w-16 flex justify-center ">
//             <Image src="/images/phone.svg" width={30} height={30} alt="email" />
//           </div>
//           <p className="text-primary-50 md:pl-6 text-sm md:text-lg font-bold">
//             Optional communication from the Huntground team
//           </p>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Referral notification</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Invite to trip notification</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Gift card notification</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">
//               Huntground photographer notifications
//             </p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center border-b border-primary-50/10 pb-4">
//           <div className="flex flex-col gap-1 pl-6">
//             <p className="font-semibold">Forgot your password notification</p>
//             <p className="text-xs 2xl:text-sm text-gray-400">
//               Sent to shares huntgrounds you might like
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PaymentDetails = () => {
//   const [toggle, setToggle] = React.useState(false);

//   return (
//     <div className=" w-full  bg-[#16131399] p-4 ">
//       <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
//         Saved Cards{" "}
//       </h2>
//       <p className="text-lg 2xl:text-xl  font-normal text-gray-400 mt-8 mb-4">
//         Your saved cards
//       </p>
//       <div className=" w-full bg-[#16131399] space-y-4 border flex flex-col  gap-3 border-[#372F2F] p-6 rounded-xl shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
//         <div className="w-full bg-[#372F2F33] shadow-inner p-5 rounded-lg flex-col md:flex-row flex items-center justify-center gap-4 md:justify-between shadow-slate-800">
//           <div className="flex  items-center gap-3">
//             <Image src="/images/visa.svg" width={35} alt="visa" height={35} />
//             <div className="flex flex-col gap-1">
//               <p className="text-sm">Visa Ending in 7830</p>
//               <p className="text-xs text-gray-400">Exp. Date 06/24</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="text-sm font-semibold  bg-white text-black rounded-xl px-4 py-2 ">
//               Default
//             </button>
//             <button className="text-lg font-semibold text-white">
//               <RiDeleteBinLine />
//             </button>
//           </div>
//         </div>
//         <div className="w-full bg-[#372F2F33] shadow-inner p-5 rounded-lg flex-col md:flex-row flex items-center justify-center gap-4 md:justify-between shadow-slate-800">
//           <div className="flex  items-center gap-3">
//             <Image src="/images/visa.svg" width={35} alt="visa" height={35} />
//             <div className="flex flex-col gap-1">
//               <p className="text-sm">Visa Ending in 7830</p>
//               <p className="text-xs text-gray-400">Exp. Date 06/24</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="text-sm font-semibold  bg-[#372F2F] border border-slate-900  rounded-xl px-4 py-2 ">
//               Set as Default
//             </button>
//             <button className="text-lg font-semibold text-white">
//               <RiDeleteBinLine />
//             </button>
//           </div>
//         </div>

//         {!toggle && (
//           <button
//             onClick={() => setToggle(true)}
//             className=" my-3 px-5 py-2.5 rounded-full w-fit text-[#00C88C] border border-[#00C88C] bg-[#00C88C]/10"
//           >
//             Add new card
//           </button>
//         )}
//         {toggle && (
//           <div className=" my-6 w-full bg-[#16131399] space-y-2 flex flex-col items-center rounded-xl p-5 border border-[#2a2c2a21]">
//             <h3 className=" mx-auto 2xl:text-lg mb-5 ">Add New Card</h3>
//             <div className="flex flex-col gap-2 w-full">
//               <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
//                 Card Number
//               </p>
//               <input
//                 type="text"
//                 className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
//                 placeholder=" Enter card number "
//               />
//             </div>
//             <div className="flex flex-col gap-2 w-full">
//               <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
//                 Card Number
//               </p>
//               <input
//                 type="text"
//                 className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
//                 placeholder=" Enter card number "
//               />
//             </div>
//             <div className="flex flex-col gap-2 w-full">
//               <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
//                 Card Name
//               </p>
//               <input
//                 type="text"
//                 className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
//                 placeholder=" Enter card name "
//               />
//             </div>
//             <div className=" w-full flex flex-col md:flex-row items-center gap-4  justify-between">
//               <div className="flex flex-col w-full gap-1.5">
//                 <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
//                   Date
//                 </p>
//                 <input
//                   type="text"
//                   className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
//                   placeholder=" mm / yy "
//                 />
//               </div>
//               <div className="flex flex-col w-full gap-1.5">
//                 <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
//                   CVV
//                 </p>
//                 <input
//                   type="text"
//                   className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
//                   placeholder=" X X X "
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 w-full mb-4">
//               <p className="text-xs 2xl:text-base font-semibold  tracking-wide">
//                 Zip Code
//               </p>
//               <input
//                 type="text"
//                 className="bg-[#372F2F33] border border-gray-800 rounded-lg text-sm 2xl:text-base px-4 py-2.5 2xl:py-3"
//                 placeholder=" Enter zip code"
//               />
//             </div>

//             <div className="flex items-center px-2 py-4 gap-3 justify-center w-full ">
//               <button className=" text-black font-semibold px-8 md:w-1/4 text-sm 2xl:text-lg text-nowrap py-2 rounded-xl bg-gradient-to-t from-[#FF9900] to-[#FFE7A9]  ">
//                 Add New Card
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* <div className=" w-full flex justify-end my-4">
//         <button className=" bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 py-3 text-black font-semibold 2xl:text-lg">
//           Update Your Password
//         </button>
//       </div> */}
//     </div>
//   );
// };
