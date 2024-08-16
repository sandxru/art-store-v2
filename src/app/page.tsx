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
          <div className="mt-4 text-center text-sm">
            Click here to{" "}
            <Link href="/sign-in" className="underline">
              Sign In
            </Link>
          </div>
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
