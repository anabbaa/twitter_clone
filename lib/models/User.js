import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String, required: true, lowercase: true, trim: true, unique: true 
    },

    password: {
      type: String,
      required: true,
    },
    handle: { type: String, required: true, lowercase: true, trim: true, unique: true },
    avatar: { type: String,
    default: "/avatars/default-male.png"},
    
    bio: { type: String, maxlength: 160 },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;