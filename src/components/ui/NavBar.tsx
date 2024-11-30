"use client";
import { logout } from "@/actions/auth";
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
import {
  CircleUser,
  Layers,
  Headset,
  House,
  LogOut,
  Menu,
  Package,
  Settings,
  Settings2Icon,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NavBar = () => {
  const [adminName, setAdminName] = useState(null);
  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await fetch("/api/authdata");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAdminName(data.user.name);
      } catch (error) {
        console.error("Error fetching admin name:", error);
      }
    };
    fetchAdminName();
  }, []);

  return (
    <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
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
            href="/dashboard/orders"
            className="text-base text-slate-500 transition-colors hover:text-slate-600"
          >
            Orders
          </Link>
        </div>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-2 items-center  border-r-2 border-slate-100 pr-5">
              <Package className="h-5 w-5 text-muted-foreground" />
              <Link
                href="/orders"
                className="text-base text-slate-500 transition-colors hover:text-slate-600"
              >
                Orders
              </Link>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-base text-slate-500 transition-colors hover:text-slate-600">
              <div className="pr-1" />
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base text-slate-500 transition-colors hover:text-slate-600">
              <div className="pr-1" />
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base text-slate-500 transition-colors hover:text-slate-600">
              <div className="pr-1" />
              All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <div className="flex gap-2 items-center ">
          <Layers className="h-5 w-5 text-muted-foreground" />
          <Link
            href="/dashboard/stock"
            className="text-base text-slate-500 transition-colors hover:text-slate-600"
          >
            Stock
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
                href="/dashboard/orders"
                className="text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                Orders
              </Link>
            </div>

            <div className="flex gap-2 items-center">
              <Layers className="h-5 w-5 text-muted-foreground" />
              <Link
                href="/dashboard/stock"
                className="text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                Stock
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="justify-end flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-6 w-6" />

              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="min-w-48">
              <DropdownMenuLabel className="py-2">
                {adminName}
              </DropdownMenuLabel>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-5 h-4 pr-1" />
              <div className="pr-1" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings2Icon className="w-5 h-4 pr-1" />
              <div className="pr-1" />
              <div className="pr-1" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="w-5 h-4 pr-1" />
              <div className="pr-1" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Headset className="w-5 h-4 pr-1" />
              <div className="pr-1" />
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-500" onClick={() => logout()}>
              <LogOut id="icon-log-out" className="text-red-500 w-5 h-4 pl-1" />
              <div className="pr-1" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavBar;
