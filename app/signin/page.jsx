"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useAuth} from "@/app/context/AuthContext"

const Signin = () => {

  const {login} = useAuth()
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    
    if (!res.ok) {
      setError(data.error);
      return;
    }
    await login(form.email , form.password)
    router.push("/home");

  } catch (err) {
    setError("Username or password is invalid");
  } finally {
    setLoading(false);
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
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-sky-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-sky-500"
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="bg-black text-white rounded-full py-3 font-bold disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Signin;