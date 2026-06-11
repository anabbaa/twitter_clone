import { connectDB } from "@/lib/mongoose";
import Tweet from "@/lib/models/Tweet";
import { NextResponse } from "next/server";
import { Mongoose } from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    //find only the tweet that queer to a specific author
    const tweets = await Tweet.find({ author: id })
      .sort({ createdAt: -1 })
      .populate("author")
      .lean();
      
    return NextResponse.json(tweets);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}