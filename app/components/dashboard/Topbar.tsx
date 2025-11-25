"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { IoSearchOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
export default function Topbar() {
  const { data: session } = useSession();


  return (
    <header className="flex items-center justify-between bg-[#F1F5F7] px-6 py-6 border-b border-gray-400">
      <div className="flex items-center   gap-70">
        <h2 className="text-2xl font-medium font-workSans text-[#111827]">
          Hello, User Name!
        </h2>
        <div className="hidden md:block ">
          <div className="relative">
            <input
              className="border border-gray-400 bg-white rounded-md px-4 py-2 w-80 text-sm placeholder:font-workSans placeholder:font-medium"
              placeholder={`       Search...`}
            />
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex items-center ">
        <div className="flex items-center gap-4 px-10">
          <button className="relative rounded-md hover:bg-gray-100">
            <IoNotificationsOutline className="w-6 h-6" />

            <span className="absolute top-0 -right-0 block w-1 h-1 bg-red-500 rounded-full"></span>
          </button>

          <button className=" rounded-md hover:bg-gray-100">
            <IoSettingsOutline className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center  gap-2 mr-2">
          <Image
            src={"/images/profile-logo.jpg"}
            alt="user"
            width={36}
            height={36}
            className="rounded-full w-10 h-10 object-cover"
          />
          <span className="text-base font-medium ">User Name</span><MdExpandMore className="w-7 h-7"/>
        </div>
      </div>
    </header>
  );
}
