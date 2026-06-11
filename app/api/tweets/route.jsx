

{/*}
export async function GET() {
  await connectDB();
  const tweets = await Tweet.find()
    .sort({ createdAt: -1 })
    .populate("author")
    .populate({ path: "comments", populate: { path: "author" } })
    .lean(); 
  return Response.json(tweets);
}

export async function POST(request) {
  await connectDB();

  const body = await request.json();
  console.log("received new tweet", body);

  const {
    content,
    authorName,
    authorHandle,
    avatarUrl,
    bio,
  } = body;

  // 1️create or find user
  const user = await User.findOneAndUpdate(
    { handle: authorHandle.toLowerCase().trim() },
    {
      name: authorName,
      handle: authorHandle.toLowerCase().trim(),
      avatarUrl: avatarUrl || `https://i.pravatar.cc/150?u=${authorHandle}`,
      bio: bio || "",
    },
    { upsert: true, new: true }// if user not there create it if there update it
  );

  // 2️ create tweet with correct author reference
  const tweet = await Tweet.create({
    author: user._id,
    content,
  });

  // 3️ populate author (replace ID with user data)
  await tweet.populate("author");

  // 4️ return response
  return Response.json(tweet, { status: 201 });

{/*  if (!content || !authorName || !authorHandle) {
    return Response.json(
      { error: "content, authorName, and authorHandle are required" },
      { status: 400 }
    );
  }

  const user = await User.findOneAndUpdate(//this find use if ther ok if not create him
    { handle: authorHandle.toLowerCase().trim() }, // this is the condition 
    {
      name: authorName,
      handle: authorHandle.toLowerCase().trim(),
      avatarUrl: avatarUrl || `https://i.pravatar.cc/150?u=${authorHandle}`,
      bio: bio || "",
    },
    { upsert: true, new: true }// update user and get the newest version of him
  );
  */}


  // Note: Code cuts off here in the screenshot, but you would typically 
  // save the new Tweet linking this user._id right after this step.







{/*import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "db.json");

  console.log(filePath);

  const rawData = await fs.readFile(filePath, {
    encoding: "utf8",
  });

  console.log(rawData);

  const database = JSON.parse(rawData);

    // Join user data with tweets and calculate reaction counts


  const tweetsWithAuthor = database.tweets.map((tweet) => {
    const author = database.users.find(
      (user) => user.id === tweet.authorId
    );

    if (!author) {
      throw new Error(`Author not found for tweet ${tweet.id}`);
    }

    const likesCount = database.likes.filter(
      (like) => like.tweetId === tweet.id
    ).length;

    const dislikesCount = database.dislikes.filter(
      (dislike) => dislike.tweetId === tweet.id
    ).length;

    return {
      id: tweet.id,
      username: author.username,
      handle: author.handle,
      avatar: author.avatar,
      content: tweet.content,
      timestamp: tweet.createdAt,
      reactions: {
        likes: likesCount,
        dislikes: dislikesCount,
      },
      views: tweet.views,
      userid: tweet.authorId,
    };
  });

  return NextResponse.json(tweetsWithAuthor);
}
  */}