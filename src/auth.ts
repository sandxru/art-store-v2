import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
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
        email: { label: "Email", type: "email" },
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
        } else {
          console.log("User found");
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            admin.password
          );
          if (!isMatch) {
            throw new Error("Incorect password");
          }
        }

        return admin;
      },
    }),
  ],
});
