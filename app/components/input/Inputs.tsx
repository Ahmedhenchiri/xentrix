import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputsProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string | null;
}

export default function Inputs({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error
}: InputsProps) {
  
  // Local state per input (unique for each field)
  const [show, setShow] = useState(false);

  // Determine input type
  const inputType =
    type === "password" ? (show ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[15px] font-medium text-[#111928]">
        {label}
      </label>

      <div className="relative">
        <input
          {...register(name)}
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 border rounded-lg text-[15px]
            outline-none focus:border-[#27C499]
            ${error ? "border-red-500" : "border-gray-300"}
          `}
        />

        {type === "password" && (
          <span
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
