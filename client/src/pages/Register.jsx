import React, { useState } from "react";
import { SiFacebook } from "react-icons/si";
import { FaGoogle } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

function Register() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
    // onError: (error) => {
    //   const errorMessage =
    //     error.response.data.msg || error.message || "Registration failed";
    //   showToast({
    //     message: errorMessage,
    //     type: "ERROR",
    //   });
    // },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log(data);
    // try {
    //   const response = await apiClient.register(data);
    //   if (response.success) {
    //     showToast({ message: "Registration Successful", type: "success" });
    //     navigate("/");
    //   } else {
    //     showToast({ message: response.message, type: "error" });
    //   }
    // } catch (error) {
    //   showToast({
    //     message: "Registration failed. Please try again.",
    //     type: "error",
    //   });
    // }
  });
  return (
    <div className="flex flex-col  items-center justify-center w-full min-h-screen">
      <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
        <form className="my-8 text-sm" onSubmit={onSubmit}>
          <h2 className="text-center text-3xl font-bold tracking-wide capitalize">
            Create An Account
          </h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 hover:underline"
              title="Sign In"
            >
              Sign in here
            </a>
          </p>

          <div className="flex flex-col my-4 md:flex-row gap-5">
            <label className="text-sm text-gray-700 font-bold flex-1">
              First Name
              <input
                type="text"
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("firstName", {
                  required: "This field is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </label>
            <label className="text-sm text-gray-700 font-bold flex-1">
              Last Name
              <input
                type="text"
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("lastName", {
                  required: "This field is required",
                })}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </label>
          </div>
          <label className="text-sm text-gray-700 font-bold flex-1">
            Email
            <input
              type="email"
              autoComplete="username"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
          <div className="flex flex-col my-4">
            <label className="text-sm text-gray-700 font-bold flex-1 relative">
              Password
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be atleast 6 characters ",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
              <button
                type="button"
                className="absolute right-10 top-[37%] bg-transparent flex items-center justify-center text-gray-700"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </label>
          </div>
          <div className="flex flex-col my-4 ">
            <label className="text-sm text-gray-700 font-bold flex-1 relative">
              Confirm Password
              <input
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                className="border rounded w-full py-1 px-2 font-normal "
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "This field is required";
                    } else if (watch("password") !== val) {
                      return "Your passwords do not match!";
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 absolute left-0 top-14">
                  {errors.confirmPassword.message}
                </span>
              )}
              <button
                type="button"
                className="absolute right-10 bottom-[10%] bg-transparent flex items-center justify-center text-gray-700"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember_me"
              id="remember_me"
              {...register("acceptTerms", {
                required: "You must accept the terms and conditions",
              })}
            />
            {errors.acceptTerms && (
              <span className="text-red-500 my-4">
                {errors.acceptTerms.message}
              </span>
            )}
            <label htmlFor="remember_me" className="text-gray-700">
              I accept the{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                privacy policy
              </a>
            </label>
          </div>

          <div className="my-4 flex items-center justify-center space-x-4">
            <button
              onSubmit={() => navigate("/")}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>
        <div className="text-sm my-6">
          <a
            href=""
            className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <FaGoogle className="text-blue-600" />{" "}
            <span>Sign Up with Google</span>
          </a>
          <a
            href=""
            className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <SiFacebook className="text-blue-600" />{" "}
            <span>Sign Up with Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
