'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaTag } from "react-icons/fa";
import { PiFlagBanner } from "react-icons/pi";
import { LuCircleParking } from "react-icons/lu";
import { PiGarageLight } from "react-icons/pi";
import { FaTree } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
interface PropertyFormData {
  title: string
  description?: string
  imageUrl?: string
  address?: string
  city?: string
  country?: string
  postCode?: string
  propertyReference?: string
  propertyValue?: number
  propertyType?: string
  accessProperty?: string
  listingType?: string
  dimension?: number
  bedrooms?: number
  bathrooms?: number
  floors?: number
  parking: boolean
  garden: boolean
  garage: boolean
  userId: string
}

const Page = () => {
    const { data: session } = useSession();
    const userId = (session?.user as any)?.id ?? '';
     const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<PropertyFormData>({
    defaultValues: {
      parking: false,
      garden: false,
      garage: false,
      userId: 'user-id-here' // You'll need to get this from your auth system
    }
  })
  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    
    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    // Upload file immediately after selection
    await handleFileUpload(file);
  }

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file) return null;

    setUploading(true);
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        const { imageUrl } = await response.json()
        setValue('imageUrl', imageUrl)
        console.log('File uploaded successfully:', imageUrl)
        return imageUrl
      } else {
        console.error('Upload failed')
        alert('Failed to upload image. Please try again.')
        return null
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image. Please try again.')
      return null
    } finally {
      setUploading(false);
    }
  }

  const onSubmit = async (data: PropertyFormData) => {
    try {
      // If we have a selected file but no imageUrl, upload it first
      if (selectedFile && !data.imageUrl) {
        const imageUrl = await handleFileUpload(selectedFile);
        if (imageUrl) {
          data.imageUrl = imageUrl;
        }
      }

      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, userId}),
      })

      if (response.ok) {
        const property = await response.json()
        console.log('Property created:', property)
        // Reset form
        setSelectedFile(null);
        setPreviewUrl('');
        setValue('imageUrl', '');
        alert('Property created successfully!')
      } else {
        const error = await response.json()
        console.error('Failed to create property:', error)
        alert('Failed to create property. Please try again.')
      }
    } catch (error) {
      console.error('Error creating property:', error)
      alert('An error occurred. Please try again.')
    }
  }

  // Watch checkbox values for real-time updates
  const saleChecked = watch('listingType') === 'Sale'
  const letChecked = watch('listingType') === 'Let'

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
            {/* IMAGE UPLOAD */}
           <div className='flex flex-row gap-3'>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-[#F8FAFC] w-[130px] h-[124px] flex items-center justify-center">
                <div className="max-w-md mx-auto">
                  {previewUrl ? (
                    // Show image preview
                    <div className="relative">
                      <img 
                        src={previewUrl} 
                        alt="Property preview" 
                        className="w-16 h-16 object-cover rounded mx-auto mb-2"
                      />
                      {uploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                          <span className="text-white text-xs">Uploading...</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Show upload icon
                    <div className="mb-2 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.99994 7.75839C10.74 7.26392 11.61 7 12.5 7C13.0714 7 13.5346 7.46322 13.5346 8.03464C13.5346 8.60606 13.0714 9.06928 12.5 9.06928C12.0193 9.06928 11.5493 9.21184 11.1496 9.47893C10.7498 9.74602 10.4383 10.1256 10.2543 10.5698C10.0703 11.014 10.0222 11.5027 10.116 11.9742C10.2098 12.4457 10.4413 12.8788 10.7812 13.2188C11.1212 13.5587 11.5543 13.7902 12.0258 13.884C12.4973 13.9778 12.986 13.9297 13.4302 13.7457C13.8744 13.5617 14.254 13.2502 14.5211 12.8504C14.7882 12.4507 14.9307 11.9807 14.9307 11.5C14.9307 10.9286 15.3939 10.4654 15.9654 10.4654C16.5368 10.4654 17 10.9286 17 11.5C17 12.39 16.7361 13.26 16.2416 14.0001C15.7471 14.7401 15.0443 15.3169 14.2221 15.6575C13.3998 15.998 12.495 16.0872 11.6221 15.9135C10.7492 15.7399 9.94736 15.3113 9.31802 14.682C8.68868 14.0526 8.2601 13.2508 8.08647 12.3779C7.91283 11.505 8.00195 10.6002 8.34254 9.77792C8.68314 8.95566 9.25991 8.25285 9.99994 7.75839Z" fill="#404059"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M34.9802 13C35.5434 13 36 13.4661 36 14.041V22.7574C36 27.2164 35.1375 30.6085 32.9439 32.8604C30.7489 35.1136 27.4407 36 23.094 36H12.906C8.56063 36 5.25258 35.114 3.05723 32.861C0.863226 30.6094 0 27.2173 0 22.7574L0 12.541C0 11.9661 0.456559 11.5 1.01975 11.5C1.58295 11.5 2.03951 11.9661 2.03951 12.541V22.7574C2.03951 27.014 2.87587 29.7227 4.50321 31.3928C6.12922 33.0615 8.76429 33.9181 12.906 33.9181H23.094C27.2371 33.9181 29.8721 33.0611 31.4977 31.3923C33.1248 29.7221 33.9605 27.0134 33.9605 22.7574V14.041C33.9605 13.4661 34.417 13 34.9802 13Z" fill="#404059"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.09967 3.07527C5.32422 0.868234 8.6763 0 13.0827 0H19.9716C20.5396 0 21 0.456808 21 1.02031C21 1.58381 20.5396 2.04062 19.9716 2.04062H13.0827C8.87924 2.04062 6.20419 2.88106 4.55405 4.51821C2.90392 6.15535 2.05681 8.80935 2.05681 12.9797C2.05681 13.5432 1.59638 14 1.0284 14C0.460432 14 0 13.5432 0 12.9797C0 8.60801 0.875122 5.28231 3.09967 3.07527Z" fill="#404059"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M23 6C23 5.44772 23.4792 5 24.0704 5H33.9296C34.5208 5 35 5.44772 35 6C35 6.55228 34.5208 7 33.9296 7H24.0704C23.4792 7 23 6.55228 23 6Z" fill="#404059"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M29 0C29.5523 0 30 0.479239 30 1.07041V10.9296C30 11.5208 29.5523 12 29 12C28.4477 12 28 11.5208 28 10.9296V1.07041C28 0.479239 28.4477 0 29 0Z" fill="#404059"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M28.2768 19.675L21.4017 25.8014L21.3834 25.8173C20.5476 26.5267 19.4988 26.9145 18.4165 26.9145C17.3341 26.9145 16.2854 26.5267 15.4495 25.8173C15.4405 25.8096 15.4316 25.8018 15.4229 25.7939L14.8922 25.3101C14.4477 24.941 13.9019 24.7253 13.3318 24.694C12.7582 24.6624 12.1897 24.8191 11.7078 25.1414L3.55157 30.8241C3.09631 31.1413 2.47798 31.0177 2.1705 30.5481C1.86302 30.0784 1.98282 29.4405 2.43809 29.1233L10.6148 23.4264C11.4515 22.8634 12.4402 22.5897 13.4377 22.6445C14.4353 22.6994 15.3901 23.0802 16.164 23.7318C16.1741 23.7402 16.184 23.7489 16.1937 23.7578L16.726 24.2429C17.2037 24.6434 17.8006 24.8622 18.4165 24.8622C19.034 24.8622 19.6326 24.6422 20.1109 24.2396L26.986 18.1131L27.0043 18.0972C27.8401 17.3878 28.8889 17 29.9713 17C31.0536 17 32.1024 17.3878 32.9382 18.0972L32.9565 18.1132L35.6555 20.5185C36.0713 20.889 36.1171 21.537 35.758 21.9659C35.3989 22.3947 34.7707 22.4421 34.355 22.0716L31.6657 19.6749C31.1873 19.2723 30.5888 19.0523 29.9713 19.0523C29.3537 19.0523 28.7551 19.2723 28.2768 19.675Z" fill="#404059"/>
                      </svg>
                    </div>
                  )}
                  
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                      disabled={uploading}
                    />
                    <span className="text-[#404059] inline rounded-lg font-workSans font-semibold text-[9px] hover:text-[#22b08c] transition-colors inline-block">
                      {uploading ? 'Uploading...' : (previewUrl ? 'Change Image' : 'Upload Image')}
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="text-[14px] text-gray-500 font-medium mb-4 font-workSans leading-relaxed">
                Recommended resolution<br />
                is 640*640 with file size<br />
                less than 2MB
              </div>
            </div>

            {/* PROPERTY NAME */}
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

            {/* ADDRESS FIELDS */}
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

            {/* PROPERTY DETAILS */}
            <h2 className="block mb-2 font-semibold text-[#151B38] font-workSans text-[16px]">Details</h2>

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
                <option value="" disabled className="text-gray-400">Property Type</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Studio">Studio</option>
              </select>

              <select
                {...register("accessProperty")}
                className="w-full border border-gray-400 p-4 rounded-lg bg-[rgba(236,241,244,0.4)] text-[15px] font-workSans"
              >
                <option value="" disabled className="text-gray-400">Access property</option>
                <option value="Concierge/Porter">Concierge/Porter</option>
                <option value="Keycode">Keycode</option>
                <option value="Meet Tenant">Meet Tenant</option>
              </select>
            </div>

            {/* SALE / LET */}
            <div className="flex gap-4">
              {/* Sale Checkbox */}
              <div className="relative w-1/2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register("listingType")}
                    value="Sale"
                    className="sr-only peer"
                  />
                  <div className={`w-full border border-gray-400 p-4 rounded-lg bg-[rgba(236,241,244,0.4)] text-[16px] font-workSans font-medium flex items-center justify-center gap-2 transition-colors ${
                    saleChecked ? 'text-[#151B38] border-[#27C499]' : 'text-gray-400'
                  }`}>
                    <FaTag className={saleChecked ? 'text-[#27C499]' : 'text-gray-400'} />
                    Sale
                  </div>
                </label>
              </div>

              {/* Let Checkbox */}
              <div className="relative w-1/2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register("listingType")}
                    value="Let"
                    className="sr-only peer"
                  />
                  <div className={`w-full border border-gray-400 p-4 rounded-lg bg-[rgba(236,241,244,0.4)] text-[16px] font-workSans font-medium flex items-center justify-center gap-2 transition-colors ${
                    letChecked ? 'text-[#151B38] border-[#27C499]' : 'text-gray-400'
                  }`}>
                    <PiFlagBanner className={letChecked ? 'text-[#27C499]' : 'text-gray-400'} />
                    Let
                  </div>
                </label>
              </div>
            </div>

            {/* NUMBERS */}
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

            {/* EXTRA OPTIONS */}
            <div className="flex gap-4">
              {['parking', 'garden', 'garage'].map((feature) => (
                <div key={feature} className="relative w-1/3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register(feature as keyof PropertyFormData)}
                      className="sr-only peer"
                    />
                    <div className={`w-full border border-gray-400 p-4 rounded-lg bg-[rgba(236,241,244,0.4)] text-[15px] font-workSans font-medium flex items-center justify-center gap-2 transition-colors ${
                      watch(feature as keyof PropertyFormData) ? 'text-[#151B38] border-[#27C499]' : 'text-gray-400'
                    }`}>
                      {feature === 'parking' && (
                        <LuCircleParking className={watch('parking') ? 'text-[#27C499]' : 'text-gray-400'} />
                      )}
                      {feature === 'garden' && (
                        <FaTree className={watch('garden') ? 'text-[#27C499]' : 'text-gray-400'} />
                      )}
                      {feature === 'garage' && (
                        <PiGarageLight className={watch('garage') ? 'text-[#27C499]' : 'text-gray-400'} />
                      )}
                      {feature.charAt(0).toUpperCase() + feature.slice(1)}
                    </div>
                  </label>
                </div>
              ))}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 flex-row py-4 mb-2 font-workSans font-bold bg-[#151B38] text-white rounded-lg hover:bg-blue-900 mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding Property...' : 'Add Property'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page