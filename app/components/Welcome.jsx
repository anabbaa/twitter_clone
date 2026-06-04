import { useSession } from "next-auth/react"
import { useTweets } from "../context/TweetsContext"
import { useRouter } from "next/navigation"

const Welcome = () =>{

    const {setShowAdddTweet , setShowFeed} = useTweets()
const router = useRouter()
    const {data: session} = useSession()

    return (
    <div>
        <article className="flex flex-col  items-center  w-[60vw]">
        <div className="w-[23vw] bg-blue-500">
            <h1 className="text-white text-center font-bold text-2xl">
                Welcome {session?.user?.name}</h1>    
        </div>
        <div className=" bg-blue-500 w-[23vw] flex flex-row items-center justify-between">
            <h2 onClick={()=> setShowFeed(true)} className="text-white hover:bg-sky-500 px-4 py-3 rounded-md cursor-pointer
            transition-colors">Feed
            </h2> 
            <h2  onClick={()=> router.push("/add_tweet")}
            className="text-white hover:bg-sky-500 px-4 py-3 rounded-md cursor-pointer
            transition-colors">Add A Tweet</h2>    
        </div>
    </article>
    </div>
    )

}
export default Welcome