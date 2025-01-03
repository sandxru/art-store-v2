import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@email.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const email = credentials.email as string;
        const hash = await bcrypt.hash(credentials.password as string, 10);

        let admin: any = await prisma.admin.findUnique({
          where: {
            email,
          },
        });

        if (!admin) {
          console.log("User not found");
          throw new Error("No user found with this email");
        } else {
          console.log("User found");
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            admin.password
          );
          if (!isMatch) {
            console.log("Password does not match");
            throw new Error("Incorect password");
          }
        }

        return admin;
      },
    }),
  ],
});
