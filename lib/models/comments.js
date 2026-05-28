import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 280
    },
    
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Comment = mongoose.models.comment || mongoose.model("comment", CommentSchema); // This line checks if the model has already been compiled (which can happen in development with hot reloading) and uses the existing model if it exists, otherwise it compiles a new model. This prevents errors related to trying to compile the same model multiple times.

export default Comment;