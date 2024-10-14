"use client";
import React, { useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import GeocoderControl from "@/components/shared/GeocoderControls";
import Image from "next/image";
import Link from "next/link";
import { SiGoogleadsense } from "react-icons/si";

type property = {
  name: string;
  location: { latitude: number; longitude: number };
  pricePerNight: number;
  id: string;
};
const PropertyMap = ({ properties }: { properties: property[] }) => {
  const [popupInfo, setPopupInfo] = useState<property | null>(null);

  if (!properties || !properties.length)
    return (
      <Map
        mapboxAccessToken="pk.eyJ1IjoiaHVudGdyb3VuZHMiLCJhIjoiY20xaHl5ZTdpMDZtdjJscHg3bHlwd2o5cCJ9.NyZWUQjoQ07M0q_Uehvxow"
        initialViewState={{
          longitude: -73.9385,
          latitude: 40.6643,
          zoom: 11,
        }}
        style={{ width: 600, height: 700 }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      />
    );

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiaHVudGdyb3VuZHMiLCJhIjoiY20xaHl5ZTdpMDZtdjJscHg3bHlwd2o5cCJ9.NyZWUQjoQ07M0q_Uehvxow"
      initialViewState={{
        longitude: properties[0].location.longitude,
        latitude: properties[0].location.latitude,
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

      {properties.map((property, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={property.location.longitude}
          latitude={property.location.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(property);
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
            CA ${property.pricePerNight}
          </div>
        </Marker>
      ))}

      {popupInfo && (
        <Popup
          anchor="top"
          style={{
            color: "black",
          }}
          longitude={Number(popupInfo.location.longitude)}
          latitude={Number(popupInfo.location.latitude)}
          closeOnClick={true}
          onClose={() => setPopupInfo(null)}
        >
          <Link
            href={`/pre-booking/${popupInfo.id}`}
            className=" px-3 border border-white capitalize flex items-center gap-1 "
            scroll={true}
          >
            {popupInfo.name}
            <SiGoogleadsense className="text-xs" />
          </Link>
        </Popup>
      )}
    </Map>
  );
};

export default PropertyMap;
