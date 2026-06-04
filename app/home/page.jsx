"use client";
import Reacct , {useState} from "react"
import Aside from "../components/Aside";
import AddTweet from "../add_tweet/page";
import TwitterPages from "../tweets/page";
import Welcome from "../components/Welcome";
import { useTweets } from "../context/TweetsContext";

export default function Home() {

const {showAddTweet , showFeed } = useTweets()

return (
<div className="flex flex-row border border-red-500 w-full h-[90vh]">
    <Aside></Aside>
    <div className="flex flex-col gap-8 ">
        <Welcome />
        <TwitterPages />
    
    
    </div>


</div>
);
}