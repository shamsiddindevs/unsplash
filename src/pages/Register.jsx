import React, { useEffect } from "react";
import { Form, Link, useActionData } from "react-router-dom"; // For navigation back to the login page if needed
import { FcGoogle } from "react-icons/fc";
import FormInput from "../components/FormInput";
import { useRegister } from "../hooks/useRegister";
import { toast } from "react-toastify";


// Action data from Form routes
export const action = async ({ request, params }) => {
  let formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  let password = formData.get("password");
  let confirmPasword = formData.get("confirmPassword");
  if(password == confirmPasword){
    return { name, email, password};
  }else{
    toast.warning("password is not equal !")
    return null
  }
};

const Register = () => {
  const {registerWithGoogle,registerWithEmail} = useRegister()

  // using action data
  const dataFromAction = useActionData();
  useEffect(()=>{
    dataFromAction && registerWithEmail(dataFromAction.name,dataFromAction.email,dataFromAction.password)
  },[dataFromAction])

 

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className="order-last hidden bg-cover bg-center lg:order-first lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-gray-300 lg:p-10"
        style={{ backgroundImage: "url('https://picsum.photos/700/900')" }}
      ></div>
      <div className="order-first flex flex-1 items-center justify-center p-10 lg:order-last">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <Form className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <FormInput
                  name={"name"}
                  type={"text"}
                  placeholder={"User"}
                  autoComplete="name"
                />
              </div>
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
              <div>
                <FormInput
                  name={"confirmPassword"}
                  type={"password"}
                  placeholder={"Confirm Password"}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="flex gap-5 flex-col md:flex-row">
              <button
              onClick={registerWithEmail}
                type="submit"
                className="btn btn-sm md:btn-md grow btn-secondary"
              >
                Register
              </button>
              <button
              onClick={registerWithGoogle}
                type="button"
                className="btn btn-sm md:btn-md grow btn-light border border-slate-400 flex gap-1"
              >
              <span>Google</span> <FcGoogle className="h-4 w-4" />
              </button>
            </div>
          </Form>
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
