import { connectDB } from "@/lib/mongoose"
import User from  "@/lib/models/User"
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password , handle , avatar} = await req.json();
    
    const existingUser = await User.findOne({
      $or: [
        {email},
        {handle}
      ]
    });
    
  const emailExists = await User.findOne({ email });
if (emailExists) {
  return Response.json(
    { message: "Email already registered" },
    { status: 400 }
  );
}

const handleExists = await User.findOne({ handle });
if (handleExists) {
  return Response.json(
    { message: "user name already taken" },
    { status: 400 }
  );
}
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name ,
      email ,
      password: hashedPassword,
      handle,
    
    }
    if (avatar) userData.avatar = avatar

    const user = await User.create(userData)
  
    console.log(user)

    return Response.json(
      {
        message: "You have successfully registered",
        user
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