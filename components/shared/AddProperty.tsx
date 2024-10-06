"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { generatePermittedFileTypes } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";
import { convertFileToUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IUser } from "@/lib/types/user";
import { RiDeleteBinLine } from "react-icons/ri";
import { createProperty } from "@/database/actions/property.action";
import axios from "axios";

const initialSettings = [
  { name: "Property Address", status: "pending" },
  { name: "Acres", status: "pending" },
  { name: "Price Per Night", status: "pending" },
  { name: "Property Name", status: "pending" },
  { name: "Property Description", status: "pending" },
  { name: "Photos", status: "pending" },
  { name: "Profile Picture", status: "completed" },
  { name: "Insurance", status: "pending" },
  { name: "Game Available", status: "pending" },
];

const page = ({ userDetails }: { userDetails: IUser }) => {
  const [propertyDetails, setPropertyDetails] = useState({
    address: " 20, los angeles",
    acres: 20,
    city: "los angeles",
    name: "bolo bolo bolo",
    description: "lesgoooo",
    photos: [] as string[],
    profilePicture: "",
    location: {
      longitude: 0,
      latitude: 0,
    },
    insurance: "",
    price: 200,
    gameAvailable: "",
  });

  const [settings, setSettings] = useState(initialSettings);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // Function to update the status based on user input
  const updateStatus = useCallback(() => {
    setSettings((prevSettings) =>
      prevSettings.map((s) => {
        switch (s.name) {
          case "Property Address":
            return {
              ...s,
              status:
                propertyDetails.address.length > 12 ? "completed" : "pending",
            };
          case "Acres":
            return {
              ...s,
              status: propertyDetails.acres ? "completed" : "pending",
            };
          case "Price Per Night":
            return {
              ...s,
              status: propertyDetails.price > 0 ? "completed" : "pending",
            };

          case "Property Name":
            return {
              ...s,
              status: propertyDetails.name ? "completed" : "pending",
            };
          case "Property Description":
            return {
              ...s,
              status: propertyDetails.description ? "completed" : "pending",
            };
          case "Photos":
            return {
              ...s,
              status: files.length > 0 ? "completed" : "pending",
            };
          case "Profile Picture":
            return {
              ...s,
              status: userDetails.profileImage ? "completed" : "pending",
            };
          case "Insurance":
            return {
              ...s,
              status: propertyDetails.insurance ? "completed" : "pending",
            };
          case "Game Available":
            return {
              ...s,
              status: propertyDetails.gameAvailable ? "completed" : "pending",
            };
          default:
            return s;
        }
      })
    );
  }, [propertyDetails, files, userDetails]);

  useEffect(() => {
    updateStatus();
  }, [propertyDetails, files, updateStatus]);

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

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("🚀 ~ page ~ res:", res);
      setFiles([]);
      uploadedImageUrl = [];
    },
    onUploadError: (error) => {
      toast.dismiss();
      if (error.message === "Invalid config: FileCountMismatch")
        toast.error("You can only upload 3 images", {
          duration: 5000,
          style: {
            backgroundColor: "#ff0000",
            color: "#fff",
          },
        });
      else if (error.message === "Invalid config: FileSizeMismatch")
        toast.error("File size should be less than 08MB", {
          duration: 5000,
          style: {
            backgroundColor: "#ff0000",
            color: "#fff",
          },
        });
      else {
        toast.error("Something went wrong while uploading images", {
          duration: 5000,
          style: {
            backgroundColor: "#ff0000",
            color: "#fff",
          },
        });
      }

      //   setTimeout(() => {
      //     toast.dismiss();
      //   }, 5000);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  const getCoordinatesFromMapbox = async (address: string) => {
    const accessToken =
      "pk.eyJ1IjoiaHVudGdyb3VuZHMiLCJhIjoiY20xaHl5ZTdpMDZtdjJscHg3bHlwd2o5cCJ9.NyZWUQjoQ07M0q_Uehvxow"; // Replace with your actual Mapbox access token
    const encodedAddress = encodeURIComponent(address); // URL encode the address to ensure it's properly formatted

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?country=PK&access_token=${accessToken}`
      );

      if (response.data.features.length > 0) {
        const { center } = response.data.features[0]; // `center` contains longitude and latitude
        const [longitude, latitude] = center;
        return { latitude, longitude };
      } else {
        throw new Error("No results found for the given address");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const router = useRouter();
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const coordinates = await getCoordinatesFromMapbox(propertyDetails.address);
    if (!coordinates) {
      toast.error("Invalid address. Please provide a valid address");
      setLoading(false);
      return;
    }
    console.log("🚀 ~ submitHandler ~ coordinates:", coordinates);
    propertyDetails.location = coordinates;

    // if (settings.some((s) => s.status === "pending")) {
    //   toast.error("Please fill all the required fields");
    //   return;
    // }

    if (files.length === 0) {
      toast.error("Please Upload atleast one image for your property", {
        duration: 5000,
        style: {
          backgroundColor: "#ff0000",
          color: "#fff",
        },
      });
      setLoading(false);
      return;
    }

    let uploadedImagesUrl: string[] = [];
    toast.loading(" Making your property live....", {
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
    });
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImages.map((img) => uploadedImagesUrl.push(img.url));
    }
    toast.dismiss();

    const data = {
      ...propertyDetails,
      pricePerNight: propertyDetails.price,
      photos: uploadedImagesUrl,
      owner: userDetails._id,
      city: propertyDetails.city.trim().replace(/\s+/g, "").toLowerCase(), // Remove spaces and convert to lowercase
    };
    const res = await createProperty(data);
    if (res.status !== 200) {
      toast.error("Something went wrong while creating property");
      setLoading(false);
      return;
    }
    toast.success("Property Listed Successfully! ", {
      duration: 3000,
      style: {
        backgroundColor: "green",
        color: "#fff",
      },
    });
    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className=" w-full p-4 md:px-20 py-12 relative">
      <div className=" hidden md:block absolute right-0 h-[600px]">
        <Image
          src={"/images/footerBg.svg"}
          alt="bg"
          width={400}
          height={400}
          className=" w-full h-full opacity-45"
        />
      </div>
      <form
        onSubmit={submitHandler}
        className="w-full flex flex-col md:flex-row gap-12"
      >
        <div className="w-full md:w-[30%]">
          <div className="p-5 rounded-xl w-full flex flex-col bg-gradient-to-b from-primary to-orange-500/20">
            <Link
              href={"/dashboard"}
              className="2xl:text-lg inline-flex items-center gap-3"
            >
              <FaArrowLeftLong className="text-xl text-primary-50" />
              Back
            </Link>
            <div className="my-5 flex flex-col gap-2 items-start">
              {settings.map((s, index) => (
                <p
                  key={index}
                  className={`${
                    s.status === "completed"
                      ? "text-primary-50 font-semibold"
                      : "text-gray-400"
                  } text-sm 2xl:text-base font-normal inline-flex items-center gap-2 py-2 px-4 w-full text-start rounded-lg`}
                >
                  <Image
                    src={`/images/${s.status}.svg`}
                    width={20}
                    height={20}
                    alt={s.status}
                  />
                  {s.name}
                </p>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-b disabled:cursor-not-allowed text-xs md:text-sm from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg"
            >
              Add Property
            </button>
          </div>
        </div>
        <div className=" w-full bg-[#16131399] p-4 ">
          <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
            Add Your Property
          </h2>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Property Address
          </p>
          <div className=" w-full dark:bg-[#372F2F33] border flex flex-col items-center md:items-start border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm  tracking-wide text-[#FFFFFF80] mb-2">
              Where is your property located? This will be shown on your
              listing!
            </p>
            <div className="flex  py-4 items-center gap-3 w-full      ">
              <Image
                src={
                  propertyDetails.address.length > 12
                    ? "/images/added.svg"
                    : "/images/missing.svg"
                }
                width={30}
                height={30}
                alt="location"
              />

              <input
                type="text"
                required
                placeholder="Enter your complete address"
                className="   px-4 py-2 focus:outline-none bg-transparent rounded-lg focus:ring-2 focus:ring-primary-50 focus:ring-opacity-10 w-full "
                value={propertyDetails.address}
                onChange={(e) =>
                  setPropertyDetails({
                    ...propertyDetails,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex  py-4 items-center gap-3 w-full      ">
              <Image
                src={
                  propertyDetails.city.length > 3
                    ? "/images/added.svg"
                    : "/images/missing.svg"
                }
                width={30}
                height={30}
                alt="location"
              />

              <input
                type="text"
                required
                placeholder="Enter City"
                className="   px-4 py-2 focus:outline-none bg-transparent rounded-lg focus:ring-2 focus:ring-primary-50 focus:ring-opacity-10 w-full "
                value={propertyDetails.city}
                onChange={(e) =>
                  setPropertyDetails({
                    ...propertyDetails,
                    city: e.target.value,
                  })
                }
              />
            </div>
            {/* <button className=" bg-gradient-to-t text-xs md:text-sm from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg">
              Change Adress
            </button> */}
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Acres
          </p>
          <div className=" w-full dark:bg-[#372F2F33] border border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm  tracking-wide text-[#FFFFFF80] mb-2">
              A rough estimate is ok! This helps guests know what to expect.
            </p>
            <div className="  pb-3  my-3">
              <Input
                type="number"
                placeholder="10 acres"
                required
                value={propertyDetails.acres}
                onChange={(e) =>
                  setPropertyDetails({
                    ...propertyDetails,
                    acres: parseInt(e.target.value),
                  })
                }
                className=" border lg:text-base text-sm rounded-lg dark:border-[#372F2F] p-4 2xl:p-6 dark:bg-[#372f2f67] "
              />
            </div>
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Price Per Night
          </p>
          <div className=" w-full dark:bg-[#372F2F33] border border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm  tracking-wide text-[#FFFFFF80] mb-2">
              How much do you want to charge per night? This can be changed
              later.
            </p>
            <div className="  pb-3  my-3">
              <Input
                type="number"
                required
                value={propertyDetails.price}
                onChange={(e) =>
                  setPropertyDetails({
                    ...propertyDetails,
                    price: parseInt(e.target.value),
                  })
                }
                className=" border lg:text-base text-sm rounded-lg dark:border-[#372F2F] p-4 2xl:p-6 dark:bg-[#372f2f67] "
              />
            </div>
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Property Name
          </p>
          <div className=" w-full dark:bg-[#372F2F33] flex items-center gap-6 flex-col md:flex-row justify-between border border-[#372F2F] p-6 rounded-xl shadow-md">
            <div className="flex flex-col">
              <p className="text-sm  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
                Give your property a special name. Be creative and capture its
                essence to attract more guests!
              </p>
              <div className="  pb-3  my-3">
                <Input
                  type="text"
                  required
                  value={propertyDetails.name}
                  placeholder="Write your property name....."
                  onChange={(e) =>
                    setPropertyDetails({
                      ...propertyDetails,
                      name: e.target.value,
                    })
                  }
                  className=" border lg:text-base text-sm rounded-lg dark:border-[#372F2F] p-4 2xl:p-6 dark:bg-[#372f2f67] "
                />
              </div>
            </div>
            <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
              <p className="font-semibold mb-3 2xl:text-sm text-xs">
                A formula that does well:
              </p>
              <p className="text-gray-50 2xl:text-sm text-xs">
                [point of interest, location or activity] + [accommodation
                type/s]
              </p>
              <ul className=" list-disc my-3">
                <li className="text-gray-50 text-sm">1. The Lakehouse</li>
                <li className="text-gray-50 text-sm">
                  2. The Cabin in the Woods
                </li>
                <li className="text-gray-50 text-sm">
                  3. The Treehouse Retreat
                </li>
              </ul>
            </div>
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Property Description
          </p>
          <div className=" w-full dark:bg-[#372F2F33]  gap-6  border border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
              Provide a bit more details about what guests see, do and expect
              here.
            </p>
            <div className="  pb-3  my-3">
              <textarea
                required
                value={propertyDetails.description}
                placeholder="Write your property description...."
                onChange={(e) =>
                  setPropertyDetails({
                    ...propertyDetails,
                    description: e.target.value,
                  })
                }
                className=" border min-h-40 lg:text-base text-sm w-full rounded-lg dark:border-[#372F2F] p-3 2xl:p-5 bg-[#372f2f67] "
              />
            </div>
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Add Images
          </p>
          <div className=" w-full dark:bg-[#372F2F33]  gap-6  border border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
              {uploadedImageUrl.length} Photos Added
            </p>
            <div className=" w-full flex flex-col gap-4 md:flex-row justify-between">
              <div className="flex items-center justify-center md:justify-start flex-wrap gap-4 ">
                {uploadedImageUrl.length > 0 &&
                  uploadedImageUrl.map((url, index) => (
                    <div
                      key={index}
                      className=" w-28 2xl:w-36 h-28 border flex items-center justify-center border-primary-200/55 2xl:h-36 object-cover object-center rounded-lg overflow-hidden"
                    >
                      <Image
                        src={url}
                        width={100}
                        height={100}
                        alt="location"
                      />
                      <RiDeleteBinLine className="absolute top-1 right-1 text-primary-50" />
                    </div>
                  ))}
                {uploadedImageUrl.length < 3 && (
                  <div className=" w-28 2xl:w-36 h-28 border flex items-center justify-center border-primary-200/55 2xl:h-36 object-cover object-center rounded-lg overflow-hidden">
                    <p className="text-7xl text-primary-200">+</p>
                  </div>
                )}
              </div>
              <div {...getRootProps()}>
                <input {...getInputProps()} className=" bg-red-400" />
                <p className=" w-fit h-fit text-xs md:text-sm bg-gradient-to-t hover:cursor-pointer from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg">
                  Add or edit photos
                </p>
              </div>
            </div>
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Profile Picture
          </p>
          <div className=" w-full dark:bg-[#372F2F33] flex items-center gap-6 flex-col md:flex-row justify-between border border-[#372F2F] p-7 rounded-xl shadow-md">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm  tracking-wide text-[#FFFFFF80] max-w-lg mb-4">
                Add a profile picture
              </p>
              {userDetails.profileImage ? (
                <div className="w-[90px] h-[90px] rounded-full flex overflow-hidden  items-center object-contain object-center justify-center">
                  <Image
                    src={userDetails.profileImage}
                    width={100}
                    alt="avatar"
                    height={100}
                  />
                </div>
              ) : (
                <Link
                  href={"/account/settings"}
                  className=" italic font-thin text-primary-50/70 text-sm"
                >
                  *Upload from here.
                </Link>
              )}
            </div>
            <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
              <p className=" mb-3 2xl:text-sm text-xs">
                please upload a photo that clearly shows your face. A profile
                photo immediately builds trust with hunters viewing your
                listing. which makes them more likely to book with you.
              </p>
            </div>
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            ID Verification
          </p>
          <div className=" w-full dark:bg-[#372F2F33] border flex items-center justify-between gap-4 flex-col md:flex-row border-[#372F2F] p-6 rounded-xl shadow-md">
            <div className="flex flex-col">
              <div className="flex py-5 items-center gap-3   ">
                <Image
                  src="/images/added.svg"
                  width={30}
                  height={30}
                  alt="location"
                />

                <p className="text-sm text-gray-300"> information provided</p>
              </div>
              <button className=" bg-gradient-to-t text-xs md:text-sm from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg">
                Verfy ID
              </button>
            </div>
            <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
              <p className=" mb-3 2xl:text-sm text-xs">
                Here’s how we have your back with every booking :
              </p>
              <Link
                href={"/"}
                className="underline text-primary-50 tracking-wide"
              >
                Show More
              </Link>
            </div>
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Insurance
          </p>
          <div className=" w-full dark:bg-[#372F2F33] border flex items-center justify-between gap-4 flex-col md:flex-row border-[#372F2F] p-6 rounded-xl shadow-md">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex py-5 items-center gap-3   ">
                <Image
                  src="/images/missing.svg"
                  width={30}
                  height={30}
                  alt="location"
                />

                <p className="text-xs md:text-sm text-gray-300">
                  {" "}
                  You are not currently covered under the huntgrounds insurance
                  policy <br /> Enrollment period: undefined - undefined
                </p>
              </div>
              <button className=" w-fit text-xs md:text-sm bg-gradient-to-t from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg">
                Complete
              </button>
            </div>
            <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
              <p className=" mb-3 2xl:text-sm text-xs">
                Here’s how we have your back with every booking :
              </p>
              <Link
                href={"/"}
                className="underline text-primary-50 tracking-wide"
              >
                Show More
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
