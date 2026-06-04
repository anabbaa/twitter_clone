"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const Signin = () => {
  const [siginData, setSigninData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: siginData.email,
      password: siginData.password,
      redirect: false,
    });
    console.log("SignIn response:", res)

    if (res?.error) {
      setSigninData((prev) => ({
        ...prev,
        error: "Invalid email or password",
      }));
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setSigninData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-sky-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setSigninData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-sky-500"
        />

        {siginData.error && (
          <p className="text-red-500 text-sm text-center">
            {siginData.error}
          </p>
        )}

        <button
          type="submit"
          className="bg-black text-white cursor-pointer rounded-full py-3 font-bold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;