import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/Logo";
import { Metadata } from "next";
import Image from "next/image";
import FormContent from "./FormContent";

export const metadata: Metadata = {
  title: "Log In - ArtStore",
};

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
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <FormContent />
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
