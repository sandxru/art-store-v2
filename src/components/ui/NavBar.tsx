import React from "react";
import Link from "next/link";
import { CircleUser, House, Menu, Package2, Contact } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Brush, ArrowUpRight, Package } from "lucide-react";

const NavBar = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-8">
        <div className="flex p-4">
          <Link
            href="https://github.com/sandxru/art-store-v2"
            className="flex items-center gap-2 font-bold md:text-base"
          >
            <Brush className="h-6 w-6 text-black" />
            <h1 className="text-xl text-slate-700">ArtStore</h1>
            <p className="text-sm font-normal text-slate-300">2.0</p>
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <House className="h-5 w-5 text-muted-foreground" />
          <Link
            href="/orders"
            className="text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <Package className="h-5 w-5 text-muted-foreground" />
          <Link
            href="/orders"
            className="text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <Contact className="h-5 w-5 text-muted-foreground" />
          <Link
            href="/orders"
            className="text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
        </div>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="/orders"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>

            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="justify-end flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavBar;