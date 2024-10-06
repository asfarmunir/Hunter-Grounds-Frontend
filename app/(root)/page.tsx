import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import PropertyMap from "@/components/shared/PropertyMap";
import Properties from "@/components/shared/Properties";
import {
  getAllProperties,
  getAllPropertiesLocation,
} from "@/database/actions/property.action";
import Pagination from "@/components/shared/Pagination";
import PriceRangeSlider from "@/components/shared/PriceRangeSlider";
import CityFilter from "@/components/shared/CityFilter";
import DateFilter from "@/components/shared/DateFilter";

type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
};
const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const city = (searchParams?.city as string) || "";
  const priceRangeParam = Array.isArray(searchParams?.priceRange)
    ? searchParams?.priceRange[0] // Use the first element if it's an array
    : searchParams?.priceRange;
  const priceRange = priceRangeParam?.split("-");
  const dateFilter = searchParams?.dateFilter || "";

  const fromDate = dateFilter.slice(0, 10);
  const toDate = dateFilter.slice(11);

  const huntgrounds = await getAllPropertiesLocation();
  const properties = await getAllProperties({
    limit: 6,
    page,
    city,
    priceRange: priceRange
      ? { min: Number(priceRange[0]), max: Number(priceRange[1]) }
      : null,
    fromDate,
    toDate,
  });

  return (
    <div className=" min-h-screen p-4 md:px-16 flex gap-12 2xl:gap-20  w-full flex-col md:flex-row items-start relative ">
      <div className="flex text-xs md:text-sm items-center gap-3 bg-[#141428] rounded-full px-4 py-2 shadow-inner shadow-slate-800 absolute -bottom-12 md:right-[40%]">
        <Image src="/images/check.svg" width={20} height={20} alt="logo" />
        <p className="text-sm font-semibold">Hunt Where You Feel Free.</p>
      </div>
      <div className=" w-full pt-8">
        <PriceRangeSlider />
        <div className="flex  flex-col mb-5">
          <h2 className=" 2xl:text-lg text-sm font-bold mb-2">
            {properties.totalProperties || 0} Places
          </h2>
          {city && <CityFilter city={city} />}
          {fromDate && toDate && <DateFilter from={fromDate} to={toDate} />}
          {priceRange && (
            <p className=" italic mt-2">
              showing properties from price range{" "}
              <span className=" not-italic text-primary-50 font-bold">
                CA${priceRange?.[0]}
              </span>{" "}
              -{" "}
              <span className=" not-italic text-primary-50 font-bold">
                CA$
                {priceRange?.[1]}{" "}
              </span>{" "}
              /night
            </p>
          )}
        </div>
        <Properties properties={properties.properties} />
        <Pagination page={page} totalPages={properties.totalPages} />
      </div>
      <div className="md:w-[75%] pt-12 rounded-md overflow-hidden ">
        <PropertyMap properties={huntgrounds.propertiesLocation} />
      </div>
    </div>
  );
};

export default Home;
