import React from "react";
import { useForm } from "react-hook-form";

const mockUser = {
  userId: "mock@test.com",
  password: "123456",
};
const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Login = ({ setIsLoggedIn, setLoggedInUser }) => {
  const loginHandler = ({ email, password }) => {
    if (email === mockUser.userId && password === mockUser.password) {
      localStorage.setItem("userId", mockUser.userId);
      setLoggedInUser({
        userId: email,
        password: "mockxxxxxxxxxxxx" + password,
      });
      setIsLoggedIn(true);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  return (
    <>
      <div className="mt-32 mx-auto max-w-sm flex flex-col px-2 shadow-lg">
        <h1 className="mb-1 font-semibold text-2xl text-white bg-gray-800 text-center rounded-sm">
          Demo Album Navigator
        </h1>
        <span className="text-white font-semibold bg-gray-700 text-center"></span>
        <form className="flex flex-col" onSubmit={handleSubmit(loginHandler)}>
          <input
            placeholder="Email"
            type="email"
            className="formInput text-lg mb-1 text-black"
            {...register("email", {
              required: true,
              pattern: pattern,
            })}
          />
          {errors.email && (
            <h3 className="text-red-400 font-semibold">Email is required</h3>
          )}

          {errors.email?.type === "pattern" && (
            <h3 className="text-red-400 font-semibold">put valid email</h3>
          )}
          <input
            placeholder="Password"
            className="formInput text-lg text-black"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <h3 className="text-red-400 font-semibold">
              please check password
            </h3>
          )}
          <button
            className={`bg-indigo-300 btn my-1 text-black mx-0 font-semibold text-xl p-2 ${
              isValid ? "" : "pointer-events-none"
            }`}
            type="submit"
          >
            L o g i n
          </button>
        </form>
      </div>
      <p className="mx-5 text-right p-3 mt-7 border-yellow-400 border">
        userId & password:<br></br>
        <br></br>mock@test.com, 123456
      </p>
    </>
  );
};
