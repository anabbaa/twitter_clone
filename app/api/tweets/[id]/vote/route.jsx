import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongoose";
import Tweet from "@/lib/models/Tweet";

export async function PATCH(req, { params }) {
  try {
    const token = (await cookies()).get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { direction } = await req.json();

    await connectDB();

    const { id } = await params;
    const tweet = await Tweet.findById(id);
    
    if (!tweet) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const alreadyLiked = tweet.likedBy.some(id => id.toString() === userId);
    const alreadyDisliked = tweet.dislikedBy.some(id => id.toString() === userId);

    if (direction === "up") {
      if (alreadyLiked) {
        tweet.likedBy.pull(userId);
        tweet.upvotes = Math.max(0, tweet.upvotes - 1);
      } else {
        tweet.likedBy.push(userId);
        tweet.upvotes += 1;
        if (alreadyDisliked) {
        tweet.dislikedBy.pull(userId);
        tweet.downvotes = Math.max(0, tweet.downvotes - 1);
        }
      }
    } else if (direction === "down") {
      if (alreadyDisliked) {
        tweet.dislikedBy.pull(userId);
        tweet.downvotes = Math.max(0, tweet.downvotes - 1);
      } else {
        tweet.dislikedBy.push(userId);
        tweet.downvotes += 1;
        if (alreadyLiked) {
          tweet.likedBy.pull(userId);
          tweet.upvotes = Math.max(0, tweet.upvotes - 1);
        }
      }
    }

    await tweet.save();
    return NextResponse.json({
      upvotes: tweet.upvotes,
      downvotes: tweet.downvotes,
      likedBy: tweet.likedBy,
      dislikedBy: tweet.dislikedBy,
    });
  } catch (error) {
    console.error("VOTE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}