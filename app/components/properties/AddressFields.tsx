import React from "react";
import { UseFormRegister } from "react-hook-form";
import { PropertyFormData } from "@/types";

interface AddressFieldsProps {
  register: UseFormRegister<PropertyFormData>;
}

export default function AddressFields({ register }: AddressFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block font-semibold text-[#151B38] font-workSans text-[16px]">
          Address
        </label>
        <input
          {...register("address")}
          className="w-full border border-gray-400 p-3 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)]"
          placeholder="Address"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-semibold text-[#151B38] font-workSans text-[16px] opacity-0">
          City
        </label>
        <input
          {...register("city")}
          placeholder="City"
          className="w-full border border-gray-400 p-3 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)]"
        />
      </div>

      <div>
        <label className="block font-semibold text-[#151B38] font-workSans text-[16px] opacity-0">
          Country
        </label>
        <input
          {...register("country")}
          placeholder="Country"
          className="w-full border border-gray-400 p-3 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)]"
        />
      </div>

      <div>
        <label className="block font-semibold text-[#151B38] font-workSans text-[16px] opacity-0">
          Post Code
        </label>
        <input
          {...register("postCode")}
          placeholder="Post Code"
          className="w-full border border-gray-400 p-3 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)]"
        />
      </div>
    </div>
  );
}