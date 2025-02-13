"use client";
import { loginWithCreds } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const FormContent = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const formData = new FormData(e.currentTarget);
    const response = await loginWithCreds(formData);
    setLoading(false); // Set loading to false after response

    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <>
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
                disabled={loading} // Disable input if loading
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
                disabled={loading} // Disable input if loading
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-slate-900"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
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
    </>
  );
};

export default FormContent;
