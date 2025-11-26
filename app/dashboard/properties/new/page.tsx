"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { PropertyFormData } from "@/types";
import ImageUpload from "../../../components/properties/ImageUpload";
import AddressFields from "../../../components/properties/AddressFields";
import Details from "../../../components/properties/Details";
import ListingType from "../../../components/properties/ListingType";
import NumbersInput from "../../../components/properties/NumbersInput";
import FeaturesCheckbox from "../../../components/properties/FeaturesCheckbox";

const Page = () => {
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id ?? "";
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PropertyFormData>({
    defaultValues: {
      parking: false,
      garden: false,
      garage: false,
      userId: userId,
    },
  });

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    await handleFileUpload(file);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return null;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      
      if (response.ok) {
        const { imageUrl } = await response.json();
        setValue("imageUrl", imageUrl);
        return imageUrl;
      } else {
        alert("Failed to upload image. Please try again.");
        return null;
      }
    } catch (error) {
      alert("Error uploading image. Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    try {
      if (selectedFile && !data.imageUrl) {
        const imageUrl = await handleFileUpload(selectedFile);
        if (imageUrl) data.imageUrl = imageUrl;
      }

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId }),
      });

      if (response.ok) {
        const property = await response.json();
        console.log("Property created:", property);
        setSelectedFile(null);
        setPreviewUrl("");
        setValue("imageUrl", "");
        alert("Property created successfully!");
      } else {
        const error = await response.json();
        alert("Failed to create property. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold font-workSans text-[rgba(21,27,56,1)]">
        My Properties
      </h2>
      <p className="font-workSans text-[16px] text-[#404059] font-medium pb-7">
        Easily manage and track all your properties in one place.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="max-w-2xl">
          <h2 className="text-[18px] font-workSans pb-8 font-bold text-[#151B38]">
            Add property
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-lg">
            {/* Image Upload */}
            <ImageUpload
              previewUrl={previewUrl}
              uploading={uploading}
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              setValue={setValue}
            />

            {/* Property Name */}
            <div>
              <label className="block mb-2 font-semibold text-[#151B38] font-workSans text-[16px]">
                Property Name
              </label>
              <input
                {...register("title", { required: "Property name is required" })}
                className="w-full border border-gray-400 p-3 rounded-lg placeholder:font-workSans placeholder:font-medium bg-[#ECF1F4]/40"
                placeholder="Enter property name"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Address Fields */}
            <AddressFields register={register} />

            {/* Property Details */}
            <Details register={register} />

            {/* Sale/Let */}
            <ListingType register={register} watch={watch} />

            {/* Numbers Input */}
            <NumbersInput register={register} />

            {/* Features Checkbox */}
            <FeaturesCheckbox register={register} watch={watch} />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 flex-row py-4 mb-2 font-workSans font-bold bg-[#151B38] text-white rounded-lg hover:bg-blue-900 mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding Property..." : "Add Property"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;