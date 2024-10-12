import React from "react";
import { FaSearch } from "react-icons/fa";

const FormInput = ({ type, icon, name, placeholder }) => {
  return (
    <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md">
      <input
        type={type}
        className="grow"
        placeholder={placeholder}
        name={name}
      />
      {!icon && <FaSearch className="h-4 w-4 opacity-70" />}
    </label>
  );
};

export default FormInput;
