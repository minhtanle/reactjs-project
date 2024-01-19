import { register } from "@/services/authService";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    register(state.email, state.password)
      .catch((error) => {
        const { code } = error
        const errorMessage = code.split('/')[1].replaceAll('-',' ')

        toast.warn(errorMessage)
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm items-center">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-sky-900">
          REGISTER
        </h2>
        <div className="text-center">Create a account for enjoy app</div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={state.email}
                onChange={handleInputChange}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Input email"
                required
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={state.password}
                onChange={handleInputChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Input password"
                minLength={6}
                required
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full text-white btn bg-sky-600	hover:bg-sky-600 py-1.5"
            >
              Register
            </button>
          </div>



        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          I`m a member?{" "}
          <NavLink
            to="/login"
            className="font-semibold leading-6 text-blue-800 hover:text-sky-500"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
