import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import NextAuth from "next-auth";

const adminEmails = ["teste1@teste1.com"];

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Senha" },
      },
      async authorize(credentials, req) {
        try {
          await mongooseConnect();
          const user = await User.find({
            email: credentials.email,
            password: credentials.password,
          });
          if (user) {
            return { id: user._id };
          } else {
            return null;
          }
        } catch (error) {}
      },
    }),
  ],
  // callbacks: {
  //   session: ({ session, token, user }) => {
  //     console.log(session, token, user);
  //     return session;

  //     //     } else {
  //     //       return false;
  //     //     }
  //   },
  // },
});
