

  const productionLinkAllTweets = "https://twitter-clone-5neo.vercel.app/api/feed"
  const developmentLinkAllTweets = "http://localhost:3000/api/feed";
  const productionLinkSingleTweets = "https://twitter-clone-5neo.vercel.app/api/users"
  const developmentLinkSingleTweets = "http://localhost:3000/api/users";
  
export const getTwitterData = async () => {

  const res = await fetch(productionLink);

  if (!res.ok) {
  
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};



// fetch my /each user see his tweets ) and also work if any user want to 
//see others tweets
export async function getMyTweets(userId) {
  const res = await fetch(`${productionLinkSingleTweets}/${userId}/tweets`);
  if (!res.ok) {
    console.error("Failed to fetch:", res.status);
    throw new Error(`failed to fetch: ${res.status}`);
  }

  return res.json();
}