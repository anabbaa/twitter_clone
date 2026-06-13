"use client"
import React, { useState,  useRef} from "react"
import { FaTwitter } from "react-icons/fa"
import Button from "@/app/components/Button"
import { useRouter } from "next/navigation"
import { FaEye , FaEyeSlash } from "react-icons/fa6";

const SignUp = () => {
    const [showPassword , setShowPassword ] = useState(false)
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    // state to add file to it to upload
    setAvatarFile(file);
    //state to creat a url to a selected file
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
    e.preventDefault();

    const { name, email, password, handle , confirmPassword } = formData;

    if (!name || !email || !password || !handle ) {
    setError("name , email , password and username are required.");
    return;
}

if (password  !== confirmPassword) {
    setError("password is not match")
return ;
}

setLoading(true);

try {
    //formData is an object from the browser its fumction to send files to server
    // file is a JavaScript File object coming from an <input type="file" />.
    //in formData we do not need headers browser handle everything

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword)
    data.append("handle", handle);
    if (avatarFile) {
    data.append("avatar", avatarFile);
}
        
    const res = await fetch("/api/signup", {
        method: "POST",
        body: data, 
    });

    const result = await res.json();

    if (!res.ok) {
        setError(result.message || "Unexpected error occurred");
        return;
    } else {
        console.log("Signed up successfully:", result);
        router.push("/signin");
    }
} catch (err) {
    console.error(err);
    setError(err.message);
} finally {
    setLoading(false);
}
};

const handleShowPassword = () => {
setShowPassword((prev) => !prev);
};
return (
    <div className="h-[85vh] flex flex-col justify-center items-center gap-2">
        <span>
        <FaTwitter size={40} />
        </span>
        <h2 className="text-[28px] font-bold">Create your account</h2>
        
        <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-sm">

<label className="mb-1 text-sm">
    require <span className="text-red-500">*</span>
</label>
        <input
        type="text"
        name="name"
        placeholder="Type Yoir Name Please"
        value={formData.name}
        onChange={handleChange}
        className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none
        focus:border-sky-500 transition"
        />
<label className="mb-1 text-sm">
    require <span className="text-red-500">*</span>
</label>
        <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border border-gray-300 rounded-full px-5 py-3 text-sm outline-none 
        focus:border-sky-500 transition"
        />
        <div className="flex flex-col">
        <label className="mb-1 text-sm">
        require <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-row">

        <input
        type={showPassword ? "tetx":"password"}
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-100 border border-gray-300 rounded-full px-5 py-3 text-sm outline-none
        focus:border-sky-500 transition"
        />
        <button 
        type="button"
        onClick={handleShowPassword}>
        {showPassword ? <FaEye />: <FaEyeSlash />  }</button>
        </div>
        </div>

        <div className="flex flex-col">
        <label className="mb-1 text-sm">
            require  <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-row">
        <input
        type={showPassword ? "text":"password"}
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-100 border border-gray-300 rounded-full px-5 py-3 text-sm outline-none
        focus:border-sky-500 transition"
/>
        <button 
        type="button"
        onClick={handleShowPassword}>
        {showPassword ? <FaEye />: <FaEyeSlash />  }</button>
        </div>
        </div>

        <label className="mb-1 text-sm">
        require  <span className="text-red-500">*</span>
</label>
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
        type="button"
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