//import { card, pageLayout } from "@/style/globalStyles";
import React from "react";

const TwitterCard = ({ tweet }) => {
  const {  author , content , media } = tweet;
  console.log(tweet.author.avatar

  )
  return (
    <div  >

      <img 
      src={author?.avatar}
      />

       <h2>{author?.name}</h2>
      <p>@{author?.handle}</p>
      <p>{content}</p>
    </div>
  );
};

export default TwitterCard;