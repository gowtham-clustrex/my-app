import React, { ChangeEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type customInputPropsType = {
  value: string;
  setValue: (field: string, value: string | number) => void;
  placeHolder?: string | "";
  Icon?: React.ReactNode;
  isPassword?: boolean;
  onBlur: () => void;
  name: string;
};

const CustomInput: React.FC<customInputPropsType> = ({
  value,
  setValue,
  placeHolder,
  Icon,
  isPassword,
  onBlur,
  name,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value);
  };

  return (
    <div className="flex items-center relative border bg-gray-300 border-gray-300 rounded-lg w-[70%] p-2">
      {Icon ? Icon : ""}
      <input
        name={name}
        type={isPassword ? (passwordVisible ? "text" : "password") : "text"}
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
        className="p-2 bg-gray-300  w-full focus:outline-none focus:ring-0 focus:border-gray-300"
        onBlur={onBlur}
      />
      {isPassword && (
        <button
          className="absolute right-4"
          onClick={() => {
            setPasswordVisible((state) => !state);
          }}
        >
          {passwordVisible ? (
            <FaEyeSlash className="text-gray-500" />
          ) : (
            <FaEye className="text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
};

export default CustomInput;
