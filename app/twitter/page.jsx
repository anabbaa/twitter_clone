import TwitterCard from  "@/app/components/TwitterCard"
import { getTwitterData } from "@/lib/twitterApi";
import React from "react";
import {card} from "@/style/globalStyles"

const TwitterPages = async () => {
  const twitterData =  await getTwitterData()
  
  return (
    <div>
      <h1>Twitter</h1>
      <p>Welcome to our Twitter page!</p>
      <div  className={card.cardWrapper}>
        {twitterData.map((data) => (
          <TwitterCard key={data.id} twitter={data} />
        ))}
      </div>
    </div>
  );
};

export default TwitterPages;