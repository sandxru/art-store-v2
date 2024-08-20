import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

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
