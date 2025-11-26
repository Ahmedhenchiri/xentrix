import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { PropertyFormData } from "@/types";
import { FaTag } from "react-icons/fa";
import { PiFlagBanner } from "react-icons/pi";

interface ListingTypeProps {
  register: UseFormRegister<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
}

export default function ListingType({ register, watch }: ListingTypeProps) {
  const saleChecked = watch("listingType") === "Sale";
  const letChecked = watch("listingType") === "Let";

  return (
    <div className="flex gap-4">
      <div className="relative w-1/2">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            {...register("listingType")}
            value="Sale"
            className="sr-only peer"
          />
          <div
            className={`w-full border border-gray-400 p-4 rounded-lg bg-[rgba(236,241,244,0.4)] text-[16px] font-workSans font-medium flex items-center justify-center gap-2 transition-colors ${
              saleChecked
                ? "text-[#151B38] border-[#27C499]"
                : "text-gray-400"
            }`}
          >
            <FaTag className={saleChecked ? "text-[#27C499]" : "text-gray-400"} />
            Sale
          </div>
        </label>
      </div>

      <div className="relative w-1/2">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            {...register("listingType")}
            value="Let"
            className="sr-only peer"
          />
          <div
            className={`w-full border border-gray-400 p-4 rounded-lg bg-[rgba(236,241,244,0.4)] text-[16px] font-workSans font-medium flex items-center justify-center gap-2 transition-colors ${
              letChecked
                ? "text-[#151B38] border-[#27C499]"
                : "text-gray-400"
            }`}
          >
            <PiFlagBanner className={letChecked ? "text-[#27C499]" : "text-gray-400"} />
            Let
          </div>
        </label>
      </div>
    </div>
  );
}