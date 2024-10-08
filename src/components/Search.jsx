import React from "react";
import {Form} from "react-router-dom";
import FormInput from "./FormInput";

const Search = () => {
  return (
    <div >
      <Form method="post" className="max-w-96 w-full mx-auto px-6 flex justify-center items-center gap-3">
        <FormInput type={'text'} name={'search'} placeholder={'Search'} />
        <button className="lg:hidden btn-sm md:btn-md btn btn-secondary">Search</button>
      </Form>
    </div>
  );
};

export default Search;
