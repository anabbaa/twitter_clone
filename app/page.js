"use client"

import React from "react"
import Button from "@/app/components/Button"
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation"

const Home = ()=> {
    const router = useRouter() 

return (
    
<div className="h-[80vh] flex flex-col justify-center items-center gap-4 ">
    <span><FaTwitter size={66} /></span>
        <h1 className="text-[44px]"> Happening Now</h1>
        <h3 className="text-[33px]">Join Twitter Today</h3>
        <Button onClick={() => router.push("/signup")}>Sign Up</Button>
        <h3>Already Registered</h3>
        <Button onClick={()=> router.push("/signin")}>Sign In</Button>
</div>  
)
}
export default Home
