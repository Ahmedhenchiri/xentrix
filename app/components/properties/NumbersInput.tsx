import React from "react";
import { UseFormRegister } from "react-hook-form";
import { PropertyFormData } from "@/types";

interface NumbersInputProps {
  register: UseFormRegister<PropertyFormData>;
}

export default function NumbersInput({ register }: NumbersInputProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <input
        type="number"
        {...register("dimension", { valueAsNumber: true })}
        placeholder="Dimension"
        className="w-full border border-gray-400 p-4 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)] text-[15px]"
      />

      <input
        type="number"
        {...register("bedrooms", { valueAsNumber: true })}
        placeholder="No. Bedrooms"
        className="w-full border border-gray-400 p-4 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)] text-[15px]"
      />

      <input
        type="number"
        {...register("bathrooms", { valueAsNumber: true })}
        placeholder="No. Bathrooms"
        className="w-full border border-gray-400 p-4 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)] text-[15px]"
      />

      <input
        type="number"
        {...register("floors", { valueAsNumber: true })}
        placeholder="Floors"
        className="w-full border border-gray-400 p-4 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[rgba(236,241,244,0.4)] text-[15px]"
      />
    </div>
  );
}