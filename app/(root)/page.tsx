"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { containerVariants, fadeInVariants } from "@/lib/animations";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import GeocoderControl from "@/components/shared/GeocoderControls";
type City = {
  city: string;
  state: string;
  latitude: number;
  population: string;
  image: string;
  longitude: number;
};

const CITIES: City[] = [
  {
    city: "New York",
    population: "8,175,133",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
    state: "New York",
    latitude: 40.6643,
    longitude: -73.9385,
  },
  {
    city: "Los Angeles",
    population: "3,792,621",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg",
    state: "California",
    latitude: 34.0194,
    longitude: -118.4108,
  },
  {
    city: "Chicago",
    population: "2,695,598",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2008-06-10_3000x1000_chicago_skyline.jpg/240px-2008-06-10_3000x1000_chicago_skyline.jpg",
    state: "Illinois",
    latitude: 41.8376,
    longitude: -87.6818,
  },
  {
    city: "Houston",
    population: "2,100,263",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg/240px-Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg",
    state: "Texas",
    latitude: 29.7805,
    longitude: -95.3863,
  },
  {
    city: "Phoenix",
    population: "1,445,632",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Downtown_Phoenix_Aerial_Looking_Northeast.jpg/207px-Downtown_Phoenix_Aerial_Looking_Northeast.jpg",
    state: "Arizona",
    latitude: 33.5722,
    longitude: -112.088,
  },
  {
    city: "Philadelphia",
    population: "1,526,006",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Philly_skyline.jpg/240px-Philly_skyline.jpg",
    state: "Pennsylvania",
    latitude: 40.0094,
    longitude: -75.1333,
  },
  {
    city: "San Antonio",
    population: "1,327,407",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Downtown_San_Antonio_View.JPG/240px-Downtown_San_Antonio_View.JPG",
    state: "Texas",
    latitude: 29.4724,
    longitude: -98.5251,
  },
  {
    city: "San Diego",
    population: "1,307,402",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg/240px-US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg",
    state: "California",
    latitude: 32.8153,
    longitude: -117.135,
  },
  {
    city: "Dallas",
    population: "1,197,816",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dallas_skyline_daytime.jpg/240px-Dallas_skyline_daytime.jpg",
    state: "Texas",
    latitude: 32.7757,
    longitude: -96.7967,
  },
  {
    city: "San Jose",
    population: "945,942",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Downtown_San_Jose_skyline.PNG/240px-Downtown_San_Jose_skyline.PNG",
    state: "California",
    latitude: 37.2969,
    longitude: -121.8193,
  },
  {
    city: "Austin",
    population: "790,390",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Austin2012-12-01.JPG/240px-Austin2012-12-01.JPG",
    state: "Texas",
    latitude: 30.3072,
    longitude: -97.756,
  },
  {
    city: "Jacksonville",
    population: "821,784",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg/240px-Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg",
    state: "Florida",
    latitude: 30.337,
    longitude: -81.6613,
  },
  {
    city: "San Francisco",
    population: "805,235",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg",
    state: "California",
    latitude: 37.7751,
    longitude: -122.4193,
  },
  {
    city: "Columbus",
    population: "787,033",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Columbus-ohio-skyline-panorama.jpg/240px-Columbus-ohio-skyline-panorama.jpg",
    state: "Ohio",
    latitude: 39.9848,
    longitude: -82.985,
  },
  {
    city: "Indianapolis",
    population: "820,445",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Downtown_indy_from_parking_garage_zoom.JPG/213px-Downtown_indy_from_parking_garage_zoom.JPG",
    state: "Indiana",
    latitude: 39.7767,
    longitude: -86.1459,
  },
  {
    city: "Fort Worth",
    population: "741,206",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/d/db/FortWorthTexasSkylineW.jpg/240px-FortWorthTexasSkylineW.jpg",
    state: "Texas",
    latitude: 32.7795,
    longitude: -97.3463,
  },
  {
    city: "Charlotte",
    population: "731,424",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Charlotte_skyline45647.jpg/222px-Charlotte_skyline45647.jpg",
    state: "North Carolina",
    latitude: 35.2087,
    longitude: -80.8307,
  },
  {
    city: "Seattle",
    population: "608,660",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/240px-SeattleI5Skyline.jpg",
    state: "Washington",
    latitude: 47.6205,
    longitude: -122.3509,
  },
  {
    city: "Denver",
    population: "600,158",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/DenverCP.JPG/240px-DenverCP.JPG",
    state: "Colorado",
    latitude: 39.7618,
    longitude: -104.8806,
  },
  {
    city: "El Paso",
    population: "649,121",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg",
    state: "Texas",
    latitude: 31.8484,
    longitude: -106.427,
  },
];

const Home = () => {
  const [popupInfo, setPopupInfo] = useState<City | null>(null);

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
        <motion.div
          variants={containerVariants} // Apply the container variant for staggering
          initial="initial"
          viewport={{ once: true }}
          whileInView="animate"
          className="grid grid-cols-1 w-full  sm:grid-cols-2 gap-y-10 place-items-center  max-w-xl 2xl:max-w-2xl gap-4  lg:grid-cols-3"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              variants={fadeInVariants} // Each child fades in
              viewport={{ once: true }}
              key={index}
              className=" flex flex-col items-center px-6 md:px-0  md:max-w-[12rem] 2xl:max-w-full w-full"
            >
              <Image
                src="/images/place1.svg"
                width={250}
                className="rounded-xl mb-4 w-full "
                height={250}
                alt="hehe"
              />
              <h4 className=" font-bold text-sm 2xl:text-lg text-nowrap mb-3">
                Braine Le Chateau
                <span className="bg-primary-50 text-xs p-1  rounded ml-2">
                  9.0
                </span>
              </h4>
              <p className=" font-thin  text-slate-50  text-sm">
                11 sites Lodging 800 acres Harrington, QC from only{" "}
                <span className=" font-semibold"> CA$88</span> / night
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="md:w-[75%] pt-12 rounded-md overflow-hidden ">
        <Map
          mapboxAccessToken="pk.eyJ1IjoiaHVudGdyb3VuZHMiLCJhIjoiY20xaHl5ZTdpMDZtdjJscHg3bHlwd2o5cCJ9.NyZWUQjoQ07M0q_Uehvxow"
          initialViewState={{
            longitude: -75.1333,
            latitude: 40.0094,
            zoom: 11,
          }}
          style={{ width: 600, height: 700 }}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        >
          <NavigationControl position="top-right" />
          <FullscreenControl position="top-right" />
          <GeolocateControl position="top-right" />
          <GeocoderControl
            mapboxAccessToken={
              "pk.eyJ1IjoiaHVudGdyb3VuZHMiLCJhIjoiY20xaHl5ZTdpMDZtdjJscHg3bHlwd2o5cCJ9.NyZWUQjoQ07M0q_Uehvxow"
            }
            position="top-left"
          />

          {CITIES.map((city, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={city.longitude}
              latitude={city.latitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(city);
              }}
            >
              <div className="p-1.5  px-4 bg-[#FF9900] rounded-lg  cursor-pointer relative ">
                <Image
                  src={"/images/vector.svg"}
                  width={28}
                  height={28}
                  alt="logo"
                  className=" absolute -z-10 right-[30%] "
                />
                CA $120
              </div>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              anchor="top"
              style={{
                color: "black",
              }}
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              closeOnClick={true}
              onClose={() => setPopupInfo(null)}
            >
              <div className=" px-3 ">
                {popupInfo.city}, {popupInfo.state}
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default Home;
