import { useEffect } from "react";
import { useRouter } from "next/navigation"
import {useAuth} from "@/app/context/AuthContext"
import Load from "./Load"

const Welcome = () =>{
    const {user , loading} = useAuth()
    const router = useRouter()
// we use useeffect because we cannot render router and we in the proces of
//  rendering another component
useEffect(() => {
    if (!loading && !user) {
        router.push("/signin");
    }
}, [user, loading, router]);
if (loading) {
    return <Load />;
}
if (!user) {
    //reurn null so donot render anything let zs wait untill router render
    return null;
}

return (
<div className="w-full flex justify-center px-3">
    <article className="flex flex-col items-center w-full max-w-md sm:max-w-lg">

      {/* HEADER */}
    <div className="w-full bg-blue-500 rounded-lg py-3 px-4">
        <h1 className="text-white text-center font-bold text-lg sm:text-2xl">
            Welcome {user.name}
        </h1>
    </div>

      {/* NAV BAR */}
    <div className="w-full mt-3 bg-blue-500 rounded-lg flex flex-col sm:flex-row items-center
    justify-between gap-2 sm:gap-0 px-2 sm:px-4 py-2">

        <h2 
        onClick={() => router.push("/tweets")}  
        className="text-white hover:bg-sky-500 px-4 py-2 rounded-md cursor-pointer 
        transition-colors w-full text-center"
        >
        Feed
        </h2>

        <h2
        onClick={() => router.push("/add_tweet")}
        className="text-white hover:bg-sky-500 px-4 py-2 rounded-md cursor-pointer
        transition-colors w-full text-center"
        >
        Add A Tweet
        </h2>

    </div>

    </article>
</div>
    )

}
export default Welcome