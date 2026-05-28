"use client"
import React, { useState } from "react"
import { FaTwitter } from "react-icons/fa"
import Button from "@/app/components/Button"

const SignUp = ({ onBack }) => {
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    handle: ""
})

const [loading, setLoading] = useState(false)
const [error, setError] = useState("")

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value ,
        
    })
    setError("")
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const {name , email , password , handle} = formData;
    if (!name || !email || !password || !handle) {
  setError("All fields are required.")
  return
}

    setLoading(true)
    try {
    const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (!res.ok) {
        setError(data.message || "Something went wrong.")
    } else {
        
        console.log("Signed up successfully:", data)
    }
    } catch (err) {
      console.error(err)
  setError(err.message)
    } finally {
    setLoading(false)
    }
}

return (
    <div className="h-[80vh] flex flex-col justify-center items-center gap-4">
        <span>
        <FaTwitter size={40} />
        </span>
        <h2 className="text-[28px] font-bold">Create your account</h2>
        
        <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-sm">

        <input
        type="text"
        name="name"
        placeholder="Type Yoir Name Please"
        value={formData.name}
        onChange={handleChange}
        className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-sky-500 transition"
        />

        <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-sky-500 transition"
        />

        <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-sky-500 transition"
        />
        <input
  type="text"
  name="handle"
  placeholder="Username (e.g. @john)"
  value={formData.handle}
  onChange={handleChange}
  className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-sky-500 transition"
/>

        {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <Button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
        </Button>
    </form>

    <p
        onClick={onBack}
        className="text-sm text-sky-500 cursor-pointer hover:underline mt-2"
    >
        Already have an account? Sign in
    </p>
    </div>
)
}
export default SignUp