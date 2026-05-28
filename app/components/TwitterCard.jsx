//import { card, pageLayout } from "@/style/globalStyles";
import React from "react";

const TwitterCard = ({ twitter }) => {
  const { id, title, body } = twitter;
  return (
    <div  >
      <h2 >{title}</h2>
      <p >{body}</p>
      <small>ID: {id}</small>
    </div>
  );
};

export default TwitterCard;