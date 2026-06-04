"use client"
import { createContext, useContext , useState} from "react";

export const TweetContext = createContext()

export function TweetProvider ({children}){

const [showAddTweet, setShowAdddTweet] = useState();
const [showFeed , setShowFeed] = useState(false);

console.log(showAddTweet)


const contextObject = {
    showAddTweet,
    showFeed,
    setShowAdddTweet,
    setShowFeed
}
      return (
    <TweetContext.Provider value={contextObject}>
      {children}
    </TweetContext.Provider>
  );

}

export const useTweets = ()=> {
    const results = useContext(TweetContext);
    return results;
}

