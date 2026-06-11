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

    await connectDB();

    const { id } = await params;
    const tweet = await Tweet.findById(id);

    if (!tweet) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const alreadyWatched = tweet.watchedBy.some(id => id.toString() === userId);
    if (!alreadyWatched) {
    tweet.watchedBy.push(userId);
    tweet.views += 1;
    await tweet.save();
    }

    return NextResponse.json({ views: tweet.views });
    } catch (error) {
    console.error("VIEW ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
}
}