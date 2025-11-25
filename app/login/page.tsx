"use client";

import { useState } from "react";
import Logo from "../components/logo/logo";
import LoginLogo from "../components/loginLogo/LoginLogo";
import { useRouter } from "next/navigation";
import Inputs from "../components/input/Inputs";
import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../../lib/validations/loginShema";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize react-hook-form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
  const result = await signIn("credentials", {
    redirect: false,      // we handle redirect manually
    email: data.email,
    password: data.password,
  });

  if (result?.error) {
    console.log("Login error:", result.error);
    alert("Invalid email or password");
    return;
  }

  router.push("/dashboard");
};


  return (
    <div className="min-h-screen bg-white flex">
      {/* Left visual column */}
      <aside className="hidden lg:flex w-[652px] bg-[#ECF1F4] items-center rounded-tr-[120px] p-16 flex-col justify-between">
        <header className="flex items-center ">
          <Logo width={"330px"} height={"40px"} />
        </header>

        <main className="mb-33 mt-[104px]">
          <h1 className="text-[48px] md:text-[50px] font-workSans font-bold leading-[110%] text-[#151B38] mb-4">
            Welcome Back!
          </h1>
          <p className="text-[18px] text-center font-workSans font-medium text-[#404059] leading-[140%] max-w-xl">
            Login to continue to your account.
          </p>
        </main>

        <LoginLogo />

        <p className="text-[24px] mt-[64px] font-workSans font-medium text-center px-3 text-[#29346D]">
          Capture every detail with premium photos, videos, and 3D visuals.
        </p>
      </aside>

      {/* Right form column */}
      <div className="flex-1 flex items-start justify-center px-6 md:px-12 lg:px-24 py-20">
        <div className="w-full max-w-[366px] ml-5">
          {/* top pills */}
          <div className="flex items-center justify-end p-1 mb-60 border rounded-md border-[#E6EEF0] bg-gray-50">
            <div
              onClick={() => router.push("/register")}
              className="text-center w-1/2 py-1 cursor-pointer rounded-lg font-medium bg-gray-50 text-[#151B38] font-workSans"
            >
              Sign up
            </div>

            <div
              onClick={() => router.push("/login")}
              className="text-center w-1/2 py-1 cursor-pointer rounded-lg bg-[#27C499] font-medium text-white font-workSans font-semibold"
            >
              Sign in
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Inputs
              label="Email"
              name="email"
              type="email"
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
   <p className="font-workSans  text-[14px] underline text-[#404059] text-right"> Forgot password?</p>
            <div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#151B38] text-white py-3 font-workSans font-semibold text-lg shadow"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
