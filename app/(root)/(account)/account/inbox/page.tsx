import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className=" p-4 md:p-8 md:pr-16 w-full flex flex-col md:flex-row justify-center gap-12 ">
      <div className="bg-[#161313CC] min-h-[500px] 2xl:min-h-[600px] p-5 md:min-w-[340px] 2xl:min-w-[420px] rounded-xl">
        <h2 className="text-lg 2xl:text-2xl  font-semibold mb-5">Messages</h2>
        <div className="flex flex-col w-full gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-start py-3 border-b border-primary-50/20 hover:bg-[#372F2F] p-2 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/avatar.svg"
                  width={50}
                  height={50}
                  alt="avatar"
                  className="rounded-full
                  
                  w-[40px] h-[40px] 2xl:w-[50px] 2xl:h-[50px]
                  "
                />
                <div className="flex flex-col gap-1">
                  <h2 className=" text-sm 2xl:text-lg font-semibold">
                    John Lock
                  </h2>
                  <p className="text-xs 2xl:text-sm font-thin text-[#D4D4D4]">
                    Life is beautiful
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <p className=" text-xs font-thin text-[#D4D4D4]">11:11 AM</p>
                <p className="2xl:w-2.5 2xl:mb-0.5 w-2 h-2 2xl:h-2.5 p1 rounded-full bg-primary-50"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#161313CC] pb-20 flex flex-col md:flex-row gap-3 md:gap-0  w-full rounded-xl">
        <div className=" border-r  border-[#ebebeb2f]">
          <div className="  flex items-center justify-between border-b p-5 border-[#ebebeb28]">
            <div className="flex items-center gap-3  w-[220px] 2xl:w-[250px] ">
              <Image
                src="/images/avatar.svg"
                width={50}
                height={50}
                alt="avatar"
                className="rounded-full
                  
                  w-[45px] h-[50px] 2xl:w-[50px] 2xl:h-[50px]
                  "
              />
              <div className="flex flex-col gap-1">
                <h2 className="2xl:text-lg font-semibold">John Lock</h2>
                <p className="text-xs 2xl:text-sm max-w-sm truncate">
                  Life is beautiful
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <p className="2xl:w-2.5 2xl:mb-0.5 w-2 h-2 2xl:h-2.5 p1 rounded-full bg-[#06C167]"></p>
              <p className=" text-xs font-thin text-[#06C167]">Active</p>
            </div>
          </div>

          <div className=" p-5">
            <h3 className="2xl:text-lg ">
              Photos & Videos
              <span className="text-sm text-brown-200/60 ml-3">(15 files)</span>
            </h3>
            <div className="flex items-center my-3 mb-6 gap-3">
              <Image
                src="/images/food.svg"
                width={80}
                height={80}
                alt="avatar"
                className="rounded-xl"
              />
              <Image
                src="/images/food.svg"
                width={80}
                height={80}
                alt="avatar"
                className="rounded-xl"
              />
            </div>
            <h3 className="2xl:text-lg ">
              Shared Files
              <span className="text-sm text-brown-200/60 ml-3">(15 files)</span>
            </h3>
          </div>
        </div>
        <div className="  relative  flex-grow  ">
          <div className="flex flex-col gap-2 p-5">
            <p className=" bg-white text-black p-5 text-xs 2xl:text-sm rounded-md font-thin w-fit max-w-[16rem]">
              Lorem ipsum dolor sit amet
            </p>
            <p className=" bg-white text-black p-5 text-xs 2xl:text-sm rounded-md font-thin w-fit max-w-[16rem]">
              Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet
            </p>
          </div>
          <div className="flex flex-col items-end w-full p-5  gap-2">
            <p className=" bg-primary-50/75 text-white p-5 text-xs 2xl:text-sm rounded-md font-thin w-fit max-w-[16rem]">
              Lorem ipsum dolor sit amet
            </p>
            <p className=" bg-primary-50/75 text-white p-5 text-xs 2xl:text-sm rounded-md font-thin w-fit max-w-[16rem]">
              Lorem ipsum dolor sit hurray, Lorem ipsum dolor sit lesgoo, Lorem
              ipsum dolor sit ininr, Lorem ipsum dolor sit amet,
            </p>
          </div>
          <div className=" w-full bg-[#372F2F80] p-3 flex absolute -bottom-20 items-center gap-1 ">
            <input
              type="text"
              placeholder="Type a message"
              className=" w-full text-white text-xs 2xl:text-sm border-white border-2 rounded-full p-2 2xl:p-3 bg-[#FFFFFF33]"
            />
            <button className=" p-2 ">
              <Image
                src="/images/link2.svg"
                width={30}
                height={30}
                alt="send"
              />
            </button>
            <button className=" p-2 ">
              <Image
                src="/images/photo.svg"
                width={30}
                height={30}
                alt="send"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
