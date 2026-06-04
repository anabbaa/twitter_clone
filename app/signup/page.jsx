"use client"
import React, { useState,  useRef} from "react"
import { FaTwitter } from "react-icons/fa"
import Button from "@/app/components/Button"
import { useRouter } from "next/navigation"

const SignUp = () => {
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    handle: ""
})
const [avatarFile, setAvatarFile] = useState(null);
const [avatarPreview, setAvatarPreview] = useState(null);

const router  = useRouter()
const [loading, setLoading] = useState(false)
const [error, setError] = useState("")

const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
};

const avatarRef = useRef(null);

const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (avatarRef.current) {
    avatarRef.current.value = "";
}
};

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value ,
        
    })
    setError("")
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const {name , email , password , handle} = formData;
    if (!name || !email || !password || !handle ){
        setError("All fields are required.")
        return
}

    setLoading(true)
    try {
    const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...formData,
            avatar: avatarPreview || ""
})
    })

    const data = await res.json()

    if (!res.ok) {
        setError(data.message || "Something went wrong.")
    } else {
        
        console.log("Signed up successfully:", data)
        router.push("/signin")
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
        className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none
        focus:border-sky-500 transition"
        />

        <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none 
        focus:border-sky-500 transition"
        />

        <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none
        focus:border-sky-500 transition"
        />
        <input
        type="text"
        name="handle"
        placeholder="Username (e.g. @john)"
        value={formData.handle}
        onChange={handleChange}
        className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none 
        focus:border-sky-500 transition"
/>

    <label
    htmlFor="avatar" 
    className="cursor-pointer border border-gray-300 rounded-full px-5 py-3 text-sm text-center 
    hover:border-sky-500 transition block"
>
    Upload Profile Picture
</label>
    <input
    id="avatar"
    ref={avatarRef}
    type="file"
    accept="image/*"
    onChange={handleAvatarChange}
    className="hidden"
/>

{avatarPreview && (
    <div className="flex flex-col items-center gap-2">
    <img
      src={avatarPreview}
      alt="Preview"
      className="w-20 h-20 rounded-full object-cover"
    />

    <Button
        type="Button"
        onClick={handleRemoveAvatar}
        className="text-red-500 text-sm cursor-pointer"
    >
        Remove Photo
    </Button>
    </div>
)}
        {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <Button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
        </Button>
    </form>

    <p
        onClick={()=> router.push("/signin")}
        className="text-sm text-sky-500 cursor-pointer hover:underline mt-2"
    >
        Already have an account? Sign in
    </p>
    </div>
)
}
export default SignUp