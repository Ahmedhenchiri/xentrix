import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineAddBox } from "react-icons/md";
type Booking = {
  service: string;
  total: number;
  status: "Completed" | "In progress" | "Pending";
};

const statusColors = {
  Completed: "text-[#14B58B]",
  "In progress": "text-[#E9A20B]",
  Pending: "text-[#E23A3A]",
};

export default function BookingsTable({ data }: { data: Booking[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[18px] font-bold  font-workSans text-[#151B38]">
          Bookings
        </h2>

        <select className=" rounded-md px-1 py-1 text-[14px] font-medium font-workSans bg-[#ECF1F4]">
          <option>January 2026</option>
          <option>December 2025</option>
        </select>
        <HiDotsVertical className=" cursor-pointer w-5 h-5" />
      </div>

      <hr className="my-3 text-gray-400" />

      <div className="grid grid-cols-5 w-full gap-20 text-[16px] font-workSans mt-10 font-medium text-[#151B38]/70 mb-3">
        <p>Service</p>
        <p>Total</p>
        <p>Details</p>
        <p>Status</p>
        <p className="text-right">Add</p>
      </div>

      {data.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-5 py-2 gap-20 items-center text-sm font-workSans font-medium w-full"
        >
          <p className="text-[16px]">{row.service}</p>
          <p className="text-[16px]">{row.total}</p>

          <p className="text-[#151B38] underline cursor-pointer text-[16px] font-semibold">
            View All
          </p>

          <p className={`${statusColors[row.status]} text-[16px]`}>
            {row.status}
          </p>

          <MdOutlineAddBox className="w-5 h-5 justify-self-end" />
        </div>
      ))}
    </div>
  );
}
