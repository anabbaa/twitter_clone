"use client";
import TwitterCard from "@/app/components/TwitterCard";
import { useEffect } from "react";
import { getTwitterData } from "@/lib/twitterApi";
import { useTweets } from "../context/TweetsContext";

const TwitterPages = () => {
  const  {tweets , setTweets} = useTweets()

  useEffect(() => {
    async function loadData() {
      const data = await getTwitterData();
      setTweets(data);
    }
    loadData();
  }, []);

  const handleDelete = (deletedId) => {
    setTweets(prev => prev.filter(item => item._id !== deletedId));
  };


  return (
    <div >
      {tweets.map((tweet) => (
        <TwitterCard key={tweet._id} tweet={tweet} onDelete={handleDelete} />
      ))}
  
    </div>
  );
};

export default TwitterPages;