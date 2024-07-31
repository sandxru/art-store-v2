import type { Metadata } from "next";
import { Inter, Oregano } from "next/font/google";
import { cn } from "@/lib/utils";
import NavBar from "@/components/ui/NavBar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-slate-50 font-sans antialiased",
          inter.variable,
          oregano.variable
        )}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
