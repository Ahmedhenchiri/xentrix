import React from "react";
import { FiExternalLink } from "react-icons/fi";

export default function StatusList({
  title,
  items,
}: {
  title: string;
  items: { name: string; service: string }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[18px] text-[#151B38] font-workSans font-bold">{title}</h3>
        <p className="text-[#27C499] font-semibold font-workSans text-[16px] underline cursor-pointer">View More</p>
      </div>

      <hr className="mb-4 border-gray-400 pb-5" />

      {items.map((item, i) => (
        <div key={i} className="flex items-center   justify-between mb-4 pb-3 border-b border-gray-400">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-gray-300 rounded-full " />
            <div>
              <p className="font-medium font-workSans text-[14px]">{item.name}</p>
              <p className="text-[14px] font-medium font-workSans text-[#404059]">{item.service}</p>
            </div>
          </div>

          <FiExternalLink className="cursor-pointer w-5 h-5" />
        </div>
      ))}
    </div>
  );
}
