import { connectDB } from "@/lib/mongoose";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.formData();
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword")
    const handle = data.get("handle");
    const avatar = data.get("avatar");

    //  basic validation
    if (!name || !email || !password || !handle ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return  NextResponse.json(
        {message: "password is not match"},
        {status: 400 }
      )
    }

    // check duplicates
    const existing = await User.findOne({
  $or: [
    { email },
    {name},
    { handle }
  ]
});

if (existing) {
  if (existing.email === email) {
    return NextResponse.json(
      { message: "Email already registered" },
      { status: 400 }
    );
  }

  if (existing.handle === handle) {
    return NextResponse.json(
      { message: "Username already taken" },
      { status: 400 }
    );
  }
  if(existing.name === name) {
    return NextResponse.json(
      {message: "This name is already used"},
      {status: 400}
    )
  }
}
    // handle avatar upload
    // create a variable to store the final image URL.
    let avatarUrl = "";

    if (avatar && typeof avatar === "object") {
      //Converts the uploaded file into raw binary data (ArrayBuffer
      const bytes = await avatar.arrayBuffer();
     // Node.js uses Buffer to handle binary data
//This converts browser-style data into something Node can write to disk
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${avatar.name}`;

      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      avatarUrl = `/uploads/${fileName}`;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      handle,
      avatar: avatarUrl,
    });
// we will not return password 
    return NextResponse.json(
  {
    message: "You have successfully registered",
    user: {
      id: user._id,
      name: user.name,
      handle: user.handle,
      avatar: user.avatar,
    },
  },
  { status: 201 }
);
  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}