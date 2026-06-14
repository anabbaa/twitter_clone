import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";
import { verifyAuth } from "@/lib/auth/auth";
{/*
Browser sends cookie
        ↓
Verify JWT token
        ↓
Get user ID from token
        ↓
Load user from database
        ↓
Return user data
*/}


export async function GET(req) {
  try {
    const decoded = verifyAuth(req);    
    await connectDB();

    // select user without his password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    handle: user.handle,
    avatar: user.avatar,
    bio: user.bio,
  },
});

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 401 }
    );
  }
}