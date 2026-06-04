import { connectDB } from "@/lib/mongoose"
import  Tweet from "@/lib/models/Tweet"
import User from "@/lib/models/User"

export async function POST(req) {
    await connectDB()

    try {
        const body = await req.json()
        const { author, content, media } = body

        const tweet = await Tweet.create({
            author,
            content,
            media: media || []
        })

        tweet.populate("author")

        return Response.json(tweet, { status: 201 })

    } catch (err) {
        console.error(err)
        return Response.json(
            { message: err.message },
            { status: 500 }
        )
    }
}


export async function GET() {
  try {
    await connectDB();

    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate("author")
      .lean(); 

    return Response.json(tweets, {
      status: 200,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
