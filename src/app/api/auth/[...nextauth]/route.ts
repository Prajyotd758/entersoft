import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import { User } from "../schemas/user";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
        userType: { label: "UserType", type: "text" },
      },
      async authorize(credentials) {
        let user = null;
        await mongoose.connect(`${process.env.databaseURL}`);

        user = await User.findOne({
          email: `${credentials?.email as string}`,
          userType: `${credentials?.userType as string}`,
        });

        if (!user) {
          return null;
        }
        return {
          id: user._id.toString(),
          name: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.sub || ""; // Ensure `id` exists
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      await mongoose.connect(process.env.databaseURL!);

      if (user) {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            email: user.email,
            password: "",
          });
        }

        token.sub = existingUser._id.toString();
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
