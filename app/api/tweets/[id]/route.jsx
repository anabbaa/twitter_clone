import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongoose";
import Tweet from "@/lib/models/Tweet";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// delete fn 
export async function DELETE(req, { params }) {
    
    try {
    const token = (await cookies()).get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await connectDB();

    const { id } = await params;
    const tweet = await Tweet.findById(id);

    if (!tweet) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // only the author can delete
    if (tweet.author.toString() !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Tweet.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
    } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
}
}

// edit 

export async function PATCH(req, { params }) {
  await connectDB();

  try {
    const { id } = await params;

    // AUTH
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  find tweet 
    const tweet = await Tweet.findById(id);
    if (!tweet) return NextResponse.json({ message: "Tweet not found" }, { status: 404 });

    //  check tweet belong to user 
    if (tweet.author.toString() !== decoded.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // parse data from the same  tweet 
    const formData = await req.formData();
    const content = formData.get("content");
    const keptMedia = JSON.parse(formData.get("keptMedia") || "[]");

    // save new 
    const mediaFiles = formData.getAll("media");
    let newMediaItems = [];

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

        // make sure uploads folder exists
        //mkdir make anew folder but recrusive true if exist did not create if not create
        await mkdir(path.join(process.cwd(), "public/uploads"), { recursive: true });

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

        newMediaItems.push({
          type: mediaType,
          url: `/uploads/${filename}`,
        });
      }
    }

  // merge new media
    // keep only items the user didn't remove + append newly uploaded ones
    const preserved = tweet.media.filter((m) => keptMedia.includes(m.url));
    tweet.media = [...preserved, ...newMediaItems];

    // update tweet 
    tweet.content = content?.trim() || tweet.content;
    tweet.edited = true;
    await tweet.save();

    return NextResponse.json(tweet);

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}