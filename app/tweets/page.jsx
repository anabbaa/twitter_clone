"use client";
import TwitterCard from "@/app/components/TwitterCard";
import { useEffect, useState } from "react";
import {getTwitterData} from "@/lib/twitterApi"

const TwitterPages = () => {
  const [tweetsData, setTweetsData] = useState({});

  console.log(typeof tweetsData)

  useEffect(() => {
    async function loadData() {
      const data = await getTwitterData();
      setTweetsData(data);
    }

    loadData();
  }, []);

  return (
<div>
  {Object.values(tweetsData).map((tweet) => (
    <TwitterCard key={tweet._id} tweet={tweet} />
  ))}
</div>
  );
};
export default TwitterPages