import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import { LuCalendar } from "react-icons/lu";

export default function Home() {
  return (
    <div className="bg-[#ECF1F4] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-16 md:pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Text */}
        <div className="self-stretch">
          <p className="text-xs md:text-sm font-bold text-[#404059] tracking-wide">
            WELCOME TO PROPERTY MOTION
          </p>

          <h1 className="font-workSans text-[34px] md:text-[50px] font-bold leading-[120%] mt-3 text-[#151B38]">
            Market Faster,<br />
            Stay Compliant,<br />
            <span className="text-[#27C499]">Simplify Everything.</span>
          </h1>

          <p className="mt-6 font-workSans text-[15px] md:text-[16px] font-medium text-[#404059] leading-[140%]">
            Property Motion is your centralised platform for property marketing
            and compliance. From professional photography and EPCs to branded
            brochures and landlord safety checks, we streamline everything so
            you can focus on growth.
          </p>

          <button className="mt-8 px-6 md:px-7 py-3 md:py-4 bg-[#151B38] text-white font-bold rounded-lg shadow hover:bg-black transition flex items-center gap-2">
            <LuCalendar className="w-4 h-4" />
            Book a Demo
          </button>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center pb-8">
          <Image
            src="/images/dashbordImage.png"
            alt="Dashboard Preview"
            width={624}
            height={381}
            className="rounded-xl shadow-lg w-full max-w-[550px] h-auto"
          />
        </div>
      </section>

      {/* Trusted Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center gap-60 text-[#151B38]">

          {/* Left Text */}
          <div>
            <h2
              className="text-[28px] md:text-[32px] font-bold leading-[120%] font-workSans"
            >
              Trusted by more than 500<br />
              property <span className="text-[#27C499]">professionals.</span>
            </h2>
          </div>

          {/* Right Stats */}
          <div className="flex items-center flex-wrap md:flex-nowrap gap-10 md:gap-16">

            {/* Rating */}
            <div>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                  >
                    <path
                      d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                      fill="#FBC120"
                    />
                  </svg>
                ))}
              </div>

              <p className="mt-2 text-[20px] md:text-[24px] font-medium font-workSans">
                4.9/5 <span className="pl-2">rating</span>
              </p>
            </div>

            {/* Delivery */}
            <div className="text-center md:text-left mb-1">
              <p className="text-[26px] md:text-[28px] font-bold">48hr</p>
              <p className="text-[18px] md:text-[22px] font-medium ">
                delivery
              </p>
            </div>

            {/* Coverage */}
            <div className="text-center md:text-left mb-1">
              <p className="text-[26px] md:text-[28px] font-bold">UK-wide</p>
              <p className="text-[18px] md:text-[22px] font-medium ">
                coverage
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
