import React from "react";
import {Form, useActionData} from "react-router-dom";
import FormInput from "../components/FormInput";

// action
export const action = async ({request}) => {
  let formData = await request.formData();
  let name = formData.get("name");
  let massage = formData.get("massage");
  return {name,massage};
};

const Contact = () => {
  const data = useActionData()
  return (
    <>
      <div className="text-center  h-full flex flex-col  justify-center items-center w-full gap-10">
        <Form method="POST" className="flex w-2/5 flex-col  justify-center items-center gap-5">
          <label htmlFor="contact" className="text-2xl md:text-4xl">Contact</label>
          <FormInput
            type={"text"}
            name={"name"}
            placeholder={"Name"}
            icon={true}
          />
          <FormInput
            type={"text"}
            name={"massage"}
            placeholder={"Massage"}
            icon={true}
          />
          {/* button oshibka */}
          <div className="btn btn-secondary w-full">Submit</div>
        </Form>
      </div>
    </>
  );
};

export default Contact;
