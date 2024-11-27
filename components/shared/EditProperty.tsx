"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IUser } from "@/lib/types/user";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  createProperty,
  updateProperty,
} from "@/database/actions/property.action";
import axios from "axios";
import { Checkbox } from "../ui/checkbox";
import { gameOptions } from "@/lib/constants";
import { IProperty } from "@/lib/types/property";
const initialSettings = [
  { name: "Property Address", status: "pending" },
  { name: "Acres", status: "pending" },
  { name: "Price Per Night", status: "pending" },
  { name: "Property Name", status: "pending" },
  { name: "Property Description", status: "pending" },
  { name: "Photos", status: "pending" },
  { name: "Profile Picture", status: "completed" },
  // { name: "Insurance", status: "pending" },
  { name: "Game Available", status: "pending" },
];

const page = ({
  userDetails,
  property,
}: {
  userDetails: IUser;
  property: IProperty;
}) => {
  const [propertyDetails, setPropertyDetails] = useState({
    address: property.address || "",
    acres: property.acres || 0,
    price: property.pricePerNight || 0,
    name: property.name || "",
    description: property.description || "",
    extraServices: property.extraServices || "",
    city: property.city || "",
    location: property.location || {
      latitude: 0,
      longitude: 0,
    },
    gameAvailable: property.gameAvailable || [],
    profilePicture: userDetails.profileImage || "",
  });

  const [selectedGames, setSelectedGames] = useState<string[]>(
    property.gameAvailable || []
  );

  const handleCheckboxChange = (game: string) => {
    if (selectedGames.includes(game)) {
      setSelectedGames(
        selectedGames.filter((selectedGame) => selectedGame !== game)
      );
    } else {
      setSelectedGames([...selectedGames, game]);
    }
  };
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState<boolean>(false);
  //-------------
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    property.photos || []
  );
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10 || selectedFiles.length + files.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  //-------------

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
              status: imagePreviews.length > 0 ? "completed" : "pending",
            };
          case "Profile Picture":
            return {
              ...s,
              status: userDetails.profileImage ? "completed" : "pending",
            };
          // case "Insurance":
          //   return {
          //     ...s,
          //     status: propertyDetails.insurance ? "completed" : "pending",
          //   };
          case "Game Available":
            return {
              ...s,
              status: selectedGames.length > 0 ? "completed" : "pending",
            };

          default:
            return s;
        }
      })
    );
  }, [propertyDetails, imagePreviews, userDetails, selectedGames]);

  useEffect(() => {
    updateStatus();
  }, [
    propertyDetails,
    imagePreviews,
    updateStatus,
    userDetails,
    selectedGames,
  ]);

  // const getCoordinatesFromMapbox = async (address: string) => {
  //   const accessToken =
  //     "pk.eyJ1IjoiaHVudGdyb3VuZHMiLCJhIjoiY20xaHl5ZTdpMDZtdjJscHg3bHlwd2o5cCJ9.NyZWUQjoQ07M0q_Uehvxow"; // Replace with your actual Mapbox access token
  //   const encodedAddress = encodeURIComponent(address); // URL encode the address to ensure it's properly formatted

  //   try {
  //     const response = await axios.get(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?&access_token=${accessToken}`
  //     );

  //     if (response.data.features.length > 0) {
  //       const { center } = response.data.features[0]; // `center` contains longitude and latitude
  //       const [longitude, latitude] = center;
  //       return { latitude, longitude };
  //     } else {
  //       throw new Error("No results found for the given address");
  //     }
  //   } catch (error) {
  //     console.error("Geocoding error:", error);
  //     return null;
  //   }
  // };

  const getCoordinatesFromMapbox = async (address: string) => {
    const accessToken =
      "pk.eyJ1IjoiaHVudGdyb3VuZHMiLCJhIjoiY20xaHl5ZTdpMDZtdjJscHg3bHlwd2o5cCJ9.NyZWUQjoQ07M0q_Uehvxow"; // Replace with your actual Mapbox access token
    const encodedAddress = encodeURIComponent(address); // URL encode the address to ensure it's properly formatted

    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${encodedAddress}?&access_token=${accessToken}`
      );
      // const response = await axios.get(
      //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?&access_token=${accessToken}`
      // );

      if (response.data.features.length > 0) {
        const { geometry } = response.data.features[0]; // `center` contains longitude and latitude
        const latitude = geometry.coordinates[1];
        const longitude = geometry.coordinates[0];
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

    if (settings.some((s) => s.status === "pending")) {
      toast.error("Please complete all the fields before submitting");
      setLoading(false);
      return;
    }

    const coordinates = await getCoordinatesFromMapbox(propertyDetails.address);
    if (!coordinates) {
      toast.error("Invalid address. Please provide a valid address");
      setLoading(false);
      return;
    }
    // propertyDetails.location = coordinates;

    if (imagePreviews.length === 0) {
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
    toast.loading(" Updating Your Land....", {
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
    });

    try {
      let uploadedUrls = [];

      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await axios.post(
            "/api/cloudinary/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          return response.data.imgUrl;
        });
        uploadedUrls = await Promise.all(uploadPromises);
      }
      toast.dismiss();
      const data = {
        ...propertyDetails,
        pricePerNight: propertyDetails.price,
        photos: uploadedUrls.length ? uploadedUrls : property.photos,
        owner: userDetails._id,
        city: propertyDetails.city.trim().replace(/\s+/g, "").toLowerCase(),
        gameAvailable: selectedGames,
        location: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
      };
      const res = await updateProperty(property._id, data);
      if (res.status !== 200) {
        toast.error("Something went wrong while creating property");
        setLoading(false);
        return;
      }
      toast.success("Property Updated Successfully! ", {
        duration: 3000,
        style: {
          backgroundColor: "green",
          color: "#fff",
        },
      });
      router.push("/user-properties");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.dismiss();
      toast.error("something went wrong!");
    } finally {
      setUploading(false);
    }
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
              Update Property
            </button>
          </div>
        </div>
        <div className=" w-full bg-[#16131399] p-4 ">
          <h2 className=" w-full p-5 text-2xl rounded-lg font-bold bg-[#161313]">
            Edit Your Property
          </h2>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Property Address
          </p>
          <div className=" w-full dark:bg-[#372F2F33] border flex flex-col items-center md:items-start border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm 2xl:text-base  tracking-wide text-[#FFFFFF80] mb-2">
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
          <div className=" w-full dark:bg-[#372F2F33] border border-[#372F2F] px-6 pt-6 pb-3 rounded-xl shadow-md">
            <p className="text-sm 2xl:text-base  tracking-wide text-[#FFFFFF80] mb-2">
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
              <p className="text-xs  tracking-wide text-[#FF9900] mt-4">
                * this is required
              </p>
            </div>
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Price Per Night
          </p>
          <div className=" w-full dark:bg-[#372F2F33] border border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm 2xl:text-base  tracking-wide text-[#FFFFFF80] mb-2">
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
          <div className=" w-full dark:bg-[#372F2F33] flex items-center gap-6 flex-col md:flex-row justify-between border border-[#372F2F] px-6 pt-6 pb-4 rounded-xl shadow-md">
            <div className="flex flex-col">
              <p className="text-sm 2xl:text-base tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
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
                <p className="text-xs  tracking-wide text-[#FF9900] mt-4">
                  * this is required
                </p>
              </div>
            </div>
            <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
              <p className="font-semibold mb-3 2xl:text-sm text-xs">
                A formula that does well:
              </p>
              <p className="text-[#FFFFFF80] 2xl:text-sm text-xs">
                [point of interest, location or activity] + [accommodation
                type/s]
              </p>
              <ul className=" list-disc my-3">
                <li className="text-[#FFFFFF80] text-sm">1. The Lakehouse</li>
                <li className="text-[#FFFFFF80] text-sm">
                  2. The Cabin in the Woods
                </li>
                <li className="text-[#FFFFFF80] text-sm">
                  3. The Treehouse Retreat
                </li>
              </ul>
            </div>
          </div>
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Property Description
          </p>
          <div className=" w-full dark:bg-[#372F2F33]  gap-6  border border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm 2xl:text-base  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
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
          {/* <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Extra Services
          </p>
          <div className=" w-full dark:bg-[#372F2F33]  gap-6  border border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm 2xl:text-base  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
              Do you offer any extra services or amenities? (Optional)
            </p>
            <div className="  pb-3  my-3">
              <textarea
                required
                value={propertyDetails.extraServices}
                placeholder="Please add details here...."
                onChange={(e) =>
                  setPropertyDetails({
                    ...propertyDetails,
                    extraServices: e.target.value,
                  })
                }
                className=" border min-h-40 lg:text-base text-sm w-full rounded-lg dark:border-[#372F2F] p-3 2xl:p-5 bg-[#372f2f67] "
              />
            </div>
          </div> */}
          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Game Available
          </p>
          <div className=" w-full dark:bg-[#372F2F33]  gap-6  border border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm 2xl:text-base  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
              Select the game available on your property.
            </p>
            <div className="grid grid-cols-2  md:grid-cols-4 2xl:grid-col-6 mt-4 2xl:mt-7 gap-4 2xl:gap-6">
              {gameOptions.map((game) => (
                <div key={game} className="flex items-center">
                  <Checkbox
                    value={game}
                    name={game}
                    checked={selectedGames.includes(game)}
                    onCheckedChange={() => handleCheckboxChange(game)}
                    className="mr-2 2xl:mr-2.5"
                  />

                  <label
                    htmlFor={game}
                    className=" capitalize text-[#FFFFFF80]"
                  >
                    {game}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg  font-normal text-gray-400 mt-8 mb-2.5">
            Add Images
          </p>
          <div className=" w-full dark:bg-[#372F2F33]  gap-6  border border-[#372F2F] p-6 rounded-xl shadow-md">
            <p className="text-sm  tracking-wide text-[#FFFFFF80] max-w-lg mb-2">
              {imagePreviews.length} Photos Added
            </p>
            <div className=" w-full flex flex-col gap-4 md:flex-row justify-between">
              <div className="flex flex-col gap-2 w-full">
                <div className=" w-full flex items-center flex-wrap gap-4  ">
                  {imagePreviews.length > 0 ? (
                    imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="flex relative items-center flex-wrap w-28 2xl:w-36 h-28 overflow-hidden object-cover object-center  gap-4 mb-4"
                      >
                        <Image
                          src={preview}
                          alt={`Selected Image ${index + 1}`}
                          width={150}
                          height={150}
                          className="rounded"
                        />
                        {/* Button to remove image */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 text-xs flex items-center justify-center p-0.5 rounded-full"
                        >
                          X
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center md:justify-start flex-wrap gap-4 ">
                      <div className=" w-28 2xl:w-36 h-28 border flex items-center justify-center border-primary-200/55 2xl:h-36 object-cover object-center rounded-lg overflow-hidden">
                        <p className="text-7xl text-primary-200">+</p>
                      </div>
                      <div className=" w-28 2xl:w-36 h-28 border flex items-center justify-center border-primary-200/55 2xl:h-36 object-cover object-center rounded-lg overflow-hidden">
                        <p className="text-7xl text-primary-200">+</p>
                      </div>
                      <div className=" w-28 2xl:w-36 h-28 border flex items-center justify-center border-primary-200/55 2xl:h-36 object-cover object-center rounded-lg overflow-hidden">
                        <p className="text-7xl text-primary-200">+</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs  tracking-wide text-[#FF9900] mt-4">
                  You can upload upto 10 images
                </p>
              </div>

              <div className=" relative  ">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className=" absolute top-2 opacity-0"
                  disabled={selectedFiles.length >= 10 || uploading} // Disable if already 3 images or uploading
                />
                <p className=" w-fit h-fit  text-nowrap  text-xs md:text-sm bg-gradient-to-t hover:cursor-wait from-[#FF9900] to-[#FFE7A9] rounded-xl px-6 md:px-12 py-2.5 text-black font-semibold 2xl:text-lg">
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
              <p className="text-sm 2xl:text-base  tracking-wide text-[#FFFFFF80] max-w-lg mb-4">
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
              <p className=" mb-3 2xl:text-sm text-xs text-[#FFFFFF80]">
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
              {userDetails.isVerified ? (
                <div className="flex py-5 items-center gap-3   ">
                  <Image
                    src="/images/added.svg"
                    width={30}
                    height={30}
                    alt="location"
                  />

                  <p className="text-sm text-[#FFFFFF80]">
                    {" "}
                    You are verified!{" "}
                  </p>
                </div>
              ) : (
                <Link
                  href={"/kyc"}
                  className=" bg-gradient-to-t text-xs md:text-sm from-[#FF9900] to-[#FFE7A9] rounded-xl px-12 py-2.5 text-black font-semibold 2xl:text-lg"
                >
                  Verfy ID
                </Link>
              )}
            </div>
            <div className=" p-5 rounded-xl max-w-[17rem] 2xl:max-w-xs bg-[#372F2FB2] border border-[#372F2F]">
              <p className=" mb-3 2xl:text-sm text-xs text-[#FFFFFF80]">
                Here’s how we have your back with every booking :
              </p>
              <Link
                href={"/home"}
                className="underline text-primary-50 tracking-wide"
              >
                Show More
              </Link>
            </div>
          </div>
          {/* <p className="text-lg  font-normal text-[#FFFFFF80] mt-8 mb-2.5">
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

                <p className="text-xs 2xl:text-base md:text-sm text-[#FFFFFF80]">
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
              <p className=" mb-3 2xl:text-sm text-xs text-[#FFFFFF80]">
                Here’s how we have your back with every booking :
              </p>
              <Link
                href={"/home"}
                className="underline text-primary-50 tracking-wide"
              >
                Show More
              </Link>
            </div>
          </div> */}
          <div className=" w-full flex justify-end mr-4">
            <button className=" bg-[#FFFFFF4D] border-2 border-primary-50/70 rounded-xl font-bold  px-6 py-2.5 text-sm mt-8 ">
              Continue to sites
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
