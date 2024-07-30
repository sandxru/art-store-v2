import React from "react";
import Link from "next/link";
import { Brush } from "lucide-react";

const Logo = () => {
  return (
    <Link
      href="https://github.com/sandxru/art-store-v2"
      className="flex items-center gap-2 font-bold md:text-base"
    >
      <Brush className="h-6 w-6 text-black" />
      <h1 className="font-serif text-xl text-slate-700 mt-1">ArtStore</h1>
      <p className="text-sm font-normal text-slate-300 mt-2">2.0</p>
    </Link>
  );
};

export default Logo;
