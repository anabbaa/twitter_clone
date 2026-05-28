import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema); // This line checks if the model has already been compiled (which can happen in development with hot reloading) and uses the existing model if it exists, otherwise it compiles a new model. This prevents errors related to trying to compile the same model multiple times.

export default Tweet;