import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/lib/mongoose"
import User from "@/lib/models/User"
import bcrypt from "bcryptjs"
 // to handle nextaith 
const handler = NextAuth({
  // in provider i definte how use log ing
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      // authorize will be handeledd when use login
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials.email
        });

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Wrong password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          handle: user.handle
        };
      }
    })
  ],

  session: {
    strategy: "jwt"
  },
/*Cookie = storage
JWT = data inside cookie
Session = readable user object created from JWT */

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.handle = user.handle;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.handle = token.handle;

      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST }