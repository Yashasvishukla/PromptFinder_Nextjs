import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
// callbacks functions
  callbacks: {
    async session({ session }) {
      const SessionUser = await User.findOne({ email: session.user.email });

      session.user.id = SessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      // serverless functions -> create new connection every time
      try {
        // connect to the database
        await connectToDB();

        // check if the user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image
          });
        }

        return true;
      } catch (error) {
        console.error("Error signing in", error);
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST };
