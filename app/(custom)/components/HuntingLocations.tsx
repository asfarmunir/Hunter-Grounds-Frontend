import React from "react";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";

const HuntingLocations = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-xl max-w-6xl mx-auto">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Top Image Card */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          <div className="relative w-full h-[500px]">
            {" "}
            {/* Increased height */}
            <Image
              src="/images/HL1.svg"
              alt="Hunter in mountains"
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              Comprehensive Land Details
            </h2>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="black" color="black" />
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Get essential information on terrain, wildlife, and accessibility
              for each hunting area, helping you make informed decisions before
              you set out.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">17K Views • Likes</span>
              <button className="bg-[#FF7A3D] text-white px-6 py-2 rounded-full flex items-center gap-2">
                Rent a land near you
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Top Card */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">
            Easy Access to Prime Hunting Locations
          </h2>
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="black" color="black" />
            ))}
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Find and explore the best hunting grounds with ease, saving time and
            effort in locating ideal spots for your next adventure.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2">
            Get Hunting Now
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Bottom Image */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
          {" "}
          {/* Increased height */}
          <Image
            src="/images/HL1.svg"
            alt="Buffalo in misty forest"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HuntingLocations;
