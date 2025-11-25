import React from "react";
import SvgLogo from "./SvgLogo";
export default function Hero() {
  return (
    <div className="bg-[#151B38] rounded-xl shadow-lg p-4  px-16 text-white flex flex-col lg:flex-row items-center gap-6">
      {/* Left Side Text */}
      <div className="flex-1">
        <h1 className="text-[40px] font-workSans  font-extrabold leading-tight">
          Capture the <span className="text-[#14B58B]">Essence</span>,<br />
          Sell the <span className="text-[#14B58B]">Dream</span>.
        </h1>

       

        <button className="mt-6 inline-block bg-[rgba(39,196,153,1)] font-bold text-white font-workSans text-[16px] py-4 px-6 rounded-md ">
          Book Now
        </button>
      </div>

      
      <div className="w-100 h-60 flex-shrink-0 flex items-center justify-center ">
        {/* CITY SVG ILLUSTRATION */}
        
        <SvgLogo/>
      </div>
    </div>
  );
}
