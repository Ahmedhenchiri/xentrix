import React from "react";
import { UseFormRegister } from "react-hook-form";
import { PropertyFormData } from "@/types";

interface DetailsProps {
  register: UseFormRegister<PropertyFormData>;
}

export default function Details({ register }: DetailsProps) {
  return (
    <>
      <h2 className="block mb-2 font-semibold text-[#151B38] font-workSans text-[16px]">
        Details
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          {...register("propertyReference")}
          placeholder="Property reference"
          className="w-full border border-gray-400 p-4 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)] text-[15px]"
        />

        <input
          type="number"
          {...register("propertyValue", { valueAsNumber: true })}
          placeholder="£ Property value"
          className="w-full border border-gray-400 p-4 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)] text-[15px]"
        />

        <select
          {...register("propertyType")}
          className="w-full border border-gray-400 p-4 rounded-lg bg-[rgba(236,241,244,0.4)] text-[15px] font-workSans"
        >
          <option value="" disabled className="text-gray-400">
            Property Type
          </option>
          <option value="Penthouse">Penthouse</option>
          <option value="Flat">Flat</option>
          <option value="House">House</option>
          <option value="Studio">Studio</option>
        </select>

        <select
          {...register("accessProperty")}
          className="w-full border border-gray-400 p-4 rounded-lg bg-[rgba(236,241,244,0.4)] text-[15px] font-workSans"
        >
          <option value="" disabled className="text-gray-400">
            Access property
          </option>
          <option value="Concierge/Porter">Concierge/Porter</option>
          <option value="Keycode">Keycode</option>
          <option value="Meet Tenant">Meet Tenant</option>
        </select>
      </div>
    </>
  );
}