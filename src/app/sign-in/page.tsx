import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function Login() {
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
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={loginWithCreds}>
                <div className="grid gap-5">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
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
          src="/assets/images/log.jpg"
          alt="Image"
          width="1080"
          height="1080"
          className="max-h-screen object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
