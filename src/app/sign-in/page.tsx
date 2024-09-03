"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TriangleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/Logo";
import { loginWithCreds } from "@/actions/auth";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Log In - ArtStore",
// };

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await loginWithCreds(formData);

    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      setErrorMessage(null);
    }
  };
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div>
          <div className="scale-110 flex justify-center p-7">
            <Logo />
          </div>

          <Card className="mx-auto max-w-sm p-1">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-5">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="me@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      name="password"
                      id="password"
                      type="password"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-slate-900">
                    Login
                  </Button>
                </div>
              </form>
              {errorMessage && (
                <div className="bg-destructive/15 p-2 mt-4 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                  <TriangleAlert className="h-5 w-5" />
                  {errorMessage}
                </div>
              )}
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="underline">
                  Contact Admin
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="min-h-screen hidden bg-muted lg:block">
        <Image
          src="/assets/images/cover-image.jpeg"
          alt="Image"
          width="2160"
          height="2160"
          className="max-h-screen object-cover dark:brightness-[0.2] dark:grayscale"
          unoptimized
        />
      </div>
    </div>
  );
}
