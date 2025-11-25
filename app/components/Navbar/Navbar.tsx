"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../logo/logo";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full py-6 bg-[#ECF1F4]">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center ">
         <Logo width={"238px"} height={"28px"}/>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-[#151B38] font-medium text-[16px] font-workSans">
          <li><Link href="/" className="font-bold">Home</Link></li>
          <li><Link href="#">Services</Link></li>
          <li><Link href="#">Pricing</Link></li>
          <li><Link href="#">About</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 border border-gray-800 rounded-lg hover:bg-gray-200 transition"
          >
            <span className="font-workSans text-base font-bold leading-[140%] tracking-[0.64px]">
              Sign in
            </span>
          </Link>

          <button className="px-8 py-3 bg-[#151B38] font-bold text-white rounded-lg hover:bg-gray-800 transition">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#151B38] text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#ECF1F4] px-6 mt-4 pb-6 animate-slide-down font-workSans">

          <ul className="flex flex-col gap-4 text-[#151B38] font-medium text-[16px]">
            <li><Link href="/" className="font-bold">Home</Link></li>
            <li><Link href="#">Services</Link></li>
            <li><Link href="#">Pricing</Link></li>
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>

          <div className="flex flex-col mt-6 gap-4">
            <Link
              href="/login"
              className="w-full text-center px-4 py-3 border border-gray-800 rounded-lg hover:bg-gray-200 transition"
            >
              <span className="font-workSans text-base font-bold leading-[140%] tracking-[0.64px]">
                Sign in
              </span>
            </Link>

            <button className="w-full px-4 py-3 bg-[#151B38] font-bold text-white rounded-lg hover:bg-gray-800 transition">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
