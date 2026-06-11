import { connectDB } from "@/lib/mongoose";
import Tweet from "@/lib/models/Tweet";
import User from "@/lib/models/User";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();

    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate("author")
      .lean();

    return NextResponse.json(tweets);
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 400 }
    );
  }
}

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();
    const author = formData.get("author");
    const content = formData.get("content");

    if (!author || !content) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    // check user exists (VERY IMPORTANT)
    const userExists = await User.findById(author);
    if (!userExists) {
      return NextResponse.json(
        { message: "Invalid user" },
        { status: 401 }
      );
    }

    // handle multiple media files
    const mediaFiles = formData.getAll("media");

let mediaItems = [];

for (const file of mediaFiles) {
  if (file && typeof file === "object") {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;

    const filePath = path.join(
      process.cwd(),
      "public/uploads",
      filename
    );

    await writeFile(filePath, buffer);

    let mediaType = "image";

    if (file.type.startsWith("video/")) {
      mediaType = "video";
    } else if (
      file.type === "image/gif" ||
      file.name.toLowerCase().endsWith(".gif")
    ) {
      mediaType = "gif";
    }

    mediaItems.push({
      type: mediaType,
      url: `/uploads/${filename}`,
    });
  }
}
    // create tweet
    const tweet = await Tweet.create({
  author,
  content,
  media: mediaItems,
});
    await tweet.populate({
      path: "author",
      select: "name handle avatar",
    });

    return NextResponse.json(tweet, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}