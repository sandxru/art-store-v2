"use server";

import { signIn, signOut } from "@/auth";
import { getAdminByEmail } from "@/lib/prisma";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/dashboard" });
  revalidatePath("/dashboard");
};

export const logout = async () => {
  await signOut({ redirectTo: "/sign-in" });
  revalidatePath("/sign-in");
};

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/dashboard",
  };

  const existingUser = await getAdminByEmail(formData.get("email") as string);
  console.log("Existing user:", existingUser?.email);

  try {
    await signIn("credentials", rawFormData);
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
  revalidatePath("/");
};
