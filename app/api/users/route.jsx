import { connectDB } from "@/lib/mongoose"
import User from  "@/lib/models/User"
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
        
    const { name, email, password , handle} = await req.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "This email is already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      handle
    });

    return Response.json(
      {
        message: "You have successfully registered",
        user,
      },
      { status: 201 }
    );

  } catch (err) {
    console.error(err);

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}