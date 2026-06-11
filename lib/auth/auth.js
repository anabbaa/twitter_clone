import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

//helper for backend check
export function verifyAuth(req) {
const token = req.cookies.get("auth-token")?.value;

if (!token) {
    throw new Error("Unauthorized");
}

return jwt.verify(
    token,
    process.env.JWT_SECRET
);
}

// helper for profile check
// lib/auth/verifyAuthServer.js

export async function verifyAuthServer() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
}