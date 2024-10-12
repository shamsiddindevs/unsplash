import React from "react";
import { Form } from "react-router-dom";
import FormInput from "./FormInput";

const Search = () => {
  return (
    <div>
      <Form
        method="post"
        className="mx-auto flex w-full max-w-96 items-center justify-center gap-3 px-6"
      >
        <FormInput type={"text"} name={"search"} placeholder={"Search"} />
        <button className="btn btn-secondary btn-sm md:btn-md lg:hidden">
          Search
        </button>
      </Form>
    </div>
  );
};

export default Search;
