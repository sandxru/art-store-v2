import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./Logo";
import {
  CircleUser,
  House,
  Menu,
  Package2,
  Contact,
  Package,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex p-4">
          <Logo />
        </div>

        <div className="flex gap-2 items-center border-r-2 border-slate-100 pr-5">
          <House className="h-5 w-5 text-muted-foreground" />
          <Link
            href="/dashboard"
            className="text-base text-slate-500 transition-colors hover:text-slate-600"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex gap-2 items-center border-r-2 border-slate-100 pr-5">
          <Package className="h-5 w-5 text-muted-foreground" />
          <Link
            href="/orders"
            className="text-base text-slate-500 transition-colors hover:text-slate-600"
          >
            Orders
          </Link>
        </div>

        <div className="flex gap-2 items-center ">
          <Contact className="h-5 w-5 text-muted-foreground" />
          <Link
            href="/orders"
            className="text-base text-slate-500 transition-colors hover:text-slate-600"
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
            <Logo />

            <div className="flex gap-2 items-center">
              <House className="h-5 w-5 text-muted-foreground" />
              <Link
                href="/dashboard"
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
