import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import PropertyMap from "@/components/shared/PropertyMap";
import Properties from "@/components/shared/Properties";
import { getAllPropertiesLocation } from "@/database/actions/property.action";

const Home = async () => {
  const huntgrounds = await getAllPropertiesLocation();

  return (
    <div className=" min-h-screen p-4 md:px-16 flex gap-12 2xl:gap-20  w-full flex-col md:flex-row items-center relative ">
      <div className="flex text-xs md:text-sm items-center gap-3 bg-[#141428] rounded-full px-4 py-2 shadow-inner shadow-slate-800 absolute -bottom-12 md:right-[40%]">
        <Image src="/images/check.svg" width={20} height={20} alt="logo" />
        <p className="text-sm font-semibold">Hunt Where You Feel Free.</p>
      </div>
      <div className=" w-full pt-8">
        <div className="flex  mb-6  md:mb-0 items-center px-3 md:px-0 pt-4 justify-center flex-col gap-1 max-w-xl 2xl:max-w-2xl">
          <p className="text-sm 2xl:text-base mb-1 font-thin  capitalize">
            price range{" "}
          </p>
          <div className="flex items-center justify-between w-full px-1.5 mb-2 max-w-xs 2xl:max-w-sm">
            <p className=" font-thin  text-xs  capitalize">From</p>
            <p className=" font-thin  text-xs  capitalize">To</p>
          </div>
          <Slider
            defaultValue={[4, 96]}
            max={100}
            className=" max-w-xs 2xl:max-w-sm mx-auto "
            step={1}
          />
          <div className="flex items-center justify-between w-full  mt-2 max-w-xs 2xl:max-w-sm">
            <p className=" font-thin  text-xs  capitalize">$10</p>
            <p className=" font-thin  text-xs  capitalize">$50000$</p>
          </div>
        </div>
        <h2 className=" 2xl:text-lg text-sm font-bold mb-5">123 Places</h2>
        <Properties />
      </div>
      <div className="md:w-[75%] pt-12 rounded-md overflow-hidden ">
        <PropertyMap properties={huntgrounds.propertiesLocation} />
      </div>
    </div>
  );
};

export default Home;
