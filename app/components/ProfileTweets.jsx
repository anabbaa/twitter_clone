"use client";
import TwitterCard from "@/app/components/TwitterCard";
import { useEffect, useState } from "react";
import { getMyTweets } from "@/lib/twitterApi";
import Load from "./Load";

const ProfileTweets = ({ userId }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!userId) return;
  async function getTweets() {

    try {
      const data = await getMyTweets(userId);
      setTweets(data);
  
    } finally {
      setLoading(false);
    }
  }

  getTweets();
}, [userId]);

  const handleDelete = (deletedId) => {
    setTweets((prev) => prev.filter((t) => t._id !== deletedId));
  };

  if (loading) {
  return <Load />;
}

if (tweets.length === 0) {
  return (
    <p className="text-center text-gray-500 mt-8">
      No tweets yet.
    </p>
  );
}

  return (
    <div>
      {tweets.map((tweet) => (
        <TwitterCard key={tweet._id} tweet={tweet} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ProfileTweets;