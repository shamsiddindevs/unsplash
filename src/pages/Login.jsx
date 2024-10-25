import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "../hooks/useRegister";
import { Modal } from "../components";

// action
export const action = async ({ request, params }) => {
  
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let emailForReset = formData.get("emailForReset");
  
  if (emailForReset?.trim()) {
    return { emailForReset };
  }

  return { email, password };
};

const Login = () => {
//  

  const { registerWithGoogle, signInWithEmail } = useRegister();

  const dataFromAction = useActionData();
  useEffect(() => {
    (dataFromAction?.email&&dataFromAction?.password) &&
      signInWithEmail(dataFromAction.email, dataFromAction.password);
  }, [dataFromAction]);
  // from modal
 
  // console.log(dataFromAction);

  return (
    <>
    <Modal/>
    <div className="flex min-h-screen bg-gray-50">
      {/* Image on the left side */}
      <div
        className="order-last hidden bg-cover bg-center lg:order-first lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-gray-300 lg:p-10"
        style={{ backgroundImage: "url('https://picsum.photos/900/700')" }}
      ></div>
      {/* Form on the right side */}
      <div className="order-first flex flex-1 items-center justify-center p-10 lg:order-last">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Form className="mt-8 space-y-6" action="#" method="POST">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <FormInput
                  name={"email"}
                  type={"email"}
                  placeholder={"Email"}
                  autoComplete="email"
                />
              </div>
              <div>
                <FormInput
                  name={"password"}
                  type={"password"}
                  placeholder={"Password"}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <button
                onClick={signInWithEmail}
                type="submit"
                className="btn btn-secondary btn-sm grow md:btn-md"
              >
                Sign in
              </button>
              <button
                onClick={registerWithGoogle}
                type="button"
                className="btn-light btn btn-sm flex grow gap-1 border border-slate-400 md:btn-md"
              >
                <span>Google</span> <FcGoogle className="h-4 w-4" />
              </button>
            </div>
          </Form>
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div>
              
              <button className="cursor underline" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                Forget password ?
              </button>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
