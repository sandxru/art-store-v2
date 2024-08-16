import type { Metadata } from "next";
import { Inter, Oregano } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400"],
});
const oregano = Oregano({
  subsets: ["latin"],
  variable: "--font-oregano",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ArtStore",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-slate-50 font-inter antialiased",
          inter.variable,
          oregano.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
