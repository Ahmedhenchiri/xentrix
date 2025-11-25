"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../logo/logo";
import { MdHelpOutline } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { LuCalendarPlus2 } from "react-icons/lu";
import { FiMaximize } from "react-icons/fi";
import { FaWallet, FaBuilding } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: <RxDashboard /> },
  { href: "/dashboard/bookings", label: "Bookings", icon: <CiCalendar /> },
  {
    href: "/dashboard/new-booking",
    label: "New Booking",
    icon: <LuCalendarPlus2 />,
  },
  { href: "/dashboard/amendments", label: "Amendments", icon: <FiMaximize /> },
  {
    href: "/dashboard/properties",
    label: "My Properties",
    icon: <FaBuilding />,
  },
  { href: "/dashboard/payments", label: "Payments", icon: <FaWallet /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-[#151B38] min-h-screen text-white p-6 flex flex-col">
      <Logo color="white" />

      <nav className="mt-20 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 py-3 px-4 font-workSans text-[18px]
                transition-all
                ${
                  isActive
                    ? "bg-white/3 font-semibold border-l-2 pl-2"
                    : "hover:bg-slate-800/40"
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto w-full flex flex-col gap-4 pt-10 ">
        {/* Help Center */}
        <button className="flex items-center gap-3 text-white/60 hover:text-white transition text-[18px] font-workSans">
          <MdHelpOutline className="w-6 h-6" />
          Help Center
        </button>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 text-white/60 hover:text-white transition text-[18px] font-workSans"
        >
          <FiLogOut className="w-6 h-6" />
          Log out
        </button>
      </div>
    </aside>
  );
}
