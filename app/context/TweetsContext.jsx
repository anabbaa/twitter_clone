"use client"
import { createContext, useContext, useState} from "react";

export const TweetsContext = createContext();

export const TweetsProvider = ({ children }) => {
    const [tweets , setTweets] = useState([])

     const EMOJIS = [
"😀","😂","😍","🥰","😎","🤔","😮","😢","😡","🔥","❤️",
"💯","✅","🎉","👍","👏","🙌","💪","🤝","👀","⚡","🌟",
"💡","🎯","🚀"
];

 const GIFS = [
"https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/200w.gif",
"https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/200w.gif",
"https://media.giphy.com/media/26ufdipQqU2lhNA4g/200w.gif",
"https://media.giphy.com/media/xT9IgG50Lg7russbD6/200w.gif",
];

const contextObject = {
    tweets ,
    setTweets,
    EMOJIS,
    GIFS
    
};

return (
    <TweetsContext.Provider value={contextObject}>
        {children}
    </TweetsContext.Provider>
);
};

export const useTweets = () => {
    const results = useContext(TweetsContext);
    return results;
}