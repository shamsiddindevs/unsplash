import React from "react";
import { FaSearch,FaUser ,FaKey } from "react-icons/fa";
import { IoMdMail  } from "react-icons/io";

const FormInput = ({ type, autoComplete, name, placeholder }) => {
  return (
    <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md my-2">
      <input
        type={type}
        className="grow  "
        placeholder={placeholder}
        name={name}
        required
        autoComplete={autoComplete}
      />
      {placeholder =="Search" && <FaSearch className="h-4 w-4 opacity-70" />}
      {placeholder =="User" && <FaUser className="h-4 w-4 opacity-70" />}
      {placeholder =="Email" && <IoMdMail  className="h-4 w-4 opacity-70" />}
      {(placeholder =="Password"||placeholder =="Confirm Password") && <FaKey  className="h-4 w-4 opacity-70" />}
    </label>
  );
};

export default FormInput;
