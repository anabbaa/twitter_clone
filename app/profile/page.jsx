import { redirect } from "next/navigation";
import ProfileTweets from "@/app/components/ProfileTweets";
import { verifyAuthServer } from "@/lib/auth/auth";

const ProfilePage = async () => {
  let user;

  try {
    user = await verifyAuthServer();
  } catch {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold px-4 mb-4">Your Tweets</h1>
      <ProfileTweets userId={user.id} />
    </div>
  );
};

export default ProfilePage;