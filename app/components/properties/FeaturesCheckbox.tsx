import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { PropertyFormData } from "@/types";
import { LuCircleParking } from "react-icons/lu";
import { FaTree } from "react-icons/fa";
import { PiGarageLight } from "react-icons/pi";

interface FeaturesCheckboxProps {
  register: UseFormRegister<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
}

export default function FeaturesCheckbox({ register, watch }: FeaturesCheckboxProps) {
  const features = [
    { key: "parking" as const, label: "Parking", icon: LuCircleParking },
    { key: "garden" as const, label: "Garden", icon: FaTree },
    { key: "garage" as const, label: "Garage", icon: PiGarageLight },
  ];

  return (
    <div className="flex gap-4">
      {features.map(({ key, label, icon: Icon }) => (
        <div key={key} className="relative w-1/3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register(key)}
              className="sr-only peer"
            />
            <div
              className={`w-full border border-gray-400 p-4 rounded-lg bg-[rgba(236,241,244,0.4)] text-[15px] font-workSans font-medium flex items-center justify-center gap-2 transition-colors ${
                watch(key)
                  ? "text-[#151B38] border-[#27C499]"
                  : "text-gray-400"
              }`}
            >
              <Icon className={watch(key) ? "text-[#27C499]" : "text-gray-400"} />
              {label}
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}