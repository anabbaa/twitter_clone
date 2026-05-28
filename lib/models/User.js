import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
        email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    handle: { type: String, required: true, lowercase: true, trim: true, unique: true },
    avatarUrl: { type: String },
    bio: { type: String, maxlength: 160 },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;