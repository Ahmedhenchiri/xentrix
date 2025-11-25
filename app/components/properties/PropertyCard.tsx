"use client";

import Image from "next/image";
import { IoBedSharp } from "react-icons/io5";
import { BiBath } from "react-icons/bi";
import { IoExpand } from "react-icons/io5";
export default function PropertyCard({ property }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md  overflow-hidden w-full">
      <Image
        src={property.image}
        alt={property.propertyName}
        width={600}
        height={400}
        className="w-full h-[220px] object-cover"
      />

      <div className="p-5 space-y-2">
        <h3 className="text-[24px] font-workSans font-semibold text-[#151B38]">
          {property.propertyName} 
        </h3>

        <p className="text-[16px] font-workSans font-medium text-[#404059]">{property.address}</p>

        {/* SPECS */}
        <div className="flex items-center gap-4 text-[#14B58B] mt-3">
          <span className="flex items-center gap-1">
            <IoBedSharp /> <span className="text-[#404059] text[16px] font-medium">{property.beds} Beds</span>
          </span>
          <span className="flex items-center gap-1">
           <BiBath /> <span className="text-[#404059] text[16px] font-medium">{property.baths} Bathrooms</span>
          </span>
          <span className="flex items-center gap-1">
            <IoExpand /> <span className="text-[#404059] text[16px] font-medium">{property.dimension} m²</span>
          </span>
        </div>

        {/* STATS */}
        <div className="mt-5 pt-3 border-t w-full flex justify-between text-[14px] font-medium text-[#151B38]">
          <div className="flex flex-col ">
            <span className="text-[16px] font-workSans text-start text-[#151B38] font-semibold pb-3">Marketing</span>
            <span className="text-[#404059] bg-[#14B58B]/10 px-14 py-1 rounded-lg ">
              {property.marketing}% 
            </span>
          </div>

          <div className="flex flex-col ">
            <span className="text-[16px] font-workSans text-start text-[#151B38] font-semibold pb-3">Compliance</span>
            <span className="text-[#404059] bg-[#14B58B]/10 px-14 py-1 rounded-lg">
              {property.compliance}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
