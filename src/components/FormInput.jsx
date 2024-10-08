import React from "react";
import { FaSearch } from "react-icons/fa";

const FormInput = ({type, icon, name, placeholder}) => {
  return (
   
      <label className="input input-bordered flex input-sm md:input-md items-center gap-2 w-full">
        <input
          type={type}
          className="grow"
          placeholder={placeholder}
          name={name}
        />
       {!icon && <FaSearch className="w-4 h-4 opacity-70"/>}
      </label>
   
  );
};

export default FormInput;
