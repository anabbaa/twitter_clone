//this componet any user can see all tweets for a specific user
import ProfileTweets from "@/app/components/ProfileTweets";

export default async function UserPage({ params }) {
const { id } = await params;

return (
<div className="flex flex-col justify-center items-center h-screen">
  <div className=" h-[75%] ">
    <ProfileTweets userId={id} />
  </div>
</div>
);
}