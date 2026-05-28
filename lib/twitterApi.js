export const getTwitterData =  async ()=> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw  new Error("no data found")
  }
  else {
    return res.json();
  }
}




// Fetch a single twitter by its Id
export async function getSingleTwitter(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch single Twitter data')
  }
  return res.json()
}