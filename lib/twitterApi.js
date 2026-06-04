
export const getTwitterData = async () => {
  const res = await fetch("http://localhost:3000/api/feed");

  console.log("status:", res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.log(errorText);

    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};


{/*}
// Fetch a single twitter by its Id
export async function getSingleTwitter(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch single Twitter data')
  }
  return res.json()
}
  */}