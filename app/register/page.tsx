"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import Inputs from "../components/input/Inputs";
import Logo from "../components/logo/logo";
import RegisterLogo from "../components/registerLogo/RegisterLogo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "../../lib/validations/registerShema";

const RegisterPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

   const onSubmit = async (data: RegisterSchemaType) => {

    // setApiError(null);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();


      if (response.ok) {
        // Registration successful
        console.log('Registration successful:', result);
        alert('Account created successfully! You can now login.');
        router.push('/login');
      } else {
        // Handle API errors
        // setApiError(result.error);
        console.error('Registration failed:', result.error);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // setApiError('Registration failed. Please try again.');
    } 
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column */}
      <aside className="hidden lg:flex w-[652px] bg-[#ECF1F4] items-center rounded-tr-[120px] p-16 flex-col justify-between">
        <header className="flex items-center">
          <Logo width={"330px"} height={"40px"} />
        </header>

        <main className="mb-18 ">
          <h1 className="text-[48px] md:text-[50px] font-workSans font-bold leading-[110%] text-[#151B38] mb-4">
            Get Started!
          </h1>
          <p className="text-[18px] text-center font-workSans font-medium text-[#404059] leading-[140%] max-w-xl">
            Create an account to continue.
          </p>
        </main>

        <RegisterLogo />

        <p className="text-[24px] mb-20 mt-[5px] font-workSans font-medium text-center px-3 text-[#29346D]">
          Capture every detail with premium photos, videos, and 3D visuals.
        </p>
      </aside>

      {/* Right Column */}
      <div className="flex-1 flex items-start justify-center px-6 md:px-12 lg:px-24 py-20">
        <div className="w-full max-w-[366px] ml-5">
          {/* Toggle Pills */}
          <div className="flex items-center justify-end p-1 mb-10 border rounded-md border-[#E6EEF0] bg-gray-50">
            <div
              onClick={() => router.push("/register")}
              className={`text-center w-1/2 py-1 cursor-pointer rounded-lg font-medium ${
                pathname === "/register"
                  ? "bg-[#27C499] text-white"
                  : "bg-gray-200 text-[#8A8AA3]"
              } font-workSans`}
            >
              Sign up
            </div>
            <div
              onClick={() => router.push("/login")}
              className={`text-center w-1/2 py-1 cursor-pointer rounded-lg font-medium ${
                pathname === "/login"
                  ? "bg-[#27C499] text-white"
                  : "bg-gray-50 text-[#404059]"
              } font-workSans font-semibold`}
            >
              Sign in
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Inputs
              label="Business Name"
              name="businessName"
              placeholder="Enter Business Name"
              register={register}
              error={errors.businessName?.message}
            />

            <Inputs
              label="Office Address"
              name="officeAddress"
              placeholder="Enter Office Address"
              register={register}
              error={errors.officeAddress?.message}
            />

            <Inputs
              label="Post Code"
              name="postCode"
              placeholder="Enter Post Code"
              register={register}
              error={errors.postCode?.message}
            />

            <Inputs
              label="Email"
              name="email"
              placeholder="Enter your email"
              register={register}
              error={errors.email?.message}
            />

            <Inputs
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors.password?.message}
            />

            <Inputs
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-[#151B38] text-white py-3 font-workSans font-semibold text-lg shadow"
            >
              Sign up
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm font-medium text-[rgba(64,64,89,0.9)] font-workSans">
            By signing up I accept Company’s{" "}
            <span className="text-[#151B38] underline underline-offset-4">
              Terms of use & Privacy Policy.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
