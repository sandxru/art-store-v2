import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import {
  countOrdersInCurrentMonth,
  getOrderPercentageChange,
  countPendingOrders,
  countCompletedOrders,
  countAllOrders,
} from "@/lib/prisma";

import {
  Plus,
  ArrowUpRight,
  Package,
  Package2,
  Calendar,
  PackageCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import NavBar from "@/components/ui/NavBar";
import { auth } from "@/auth";

const RecentOrdersTableBody = dynamic(() => import("./RecentOrdersTableBody"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Dashboard - ArtStore",
};

export default async function Dashboard() {
  const month_orders = await countOrdersInCurrentMonth();
  const percent_change = await getOrderPercentageChange();
  const pending_orders = await countPendingOrders();
  const completed_orders = await countCompletedOrders();
  const all_orders = await countAllOrders();
  const admin_name = (await auth())?.user?.name;

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome, {admin_name} 👋🏻
            </h2>

            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/orders/new-order" className="text-base">
                <Plus className="h-5 w-5" />
                New Order
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 mt-1">
                <CardTitle className="text-lg font-medium text-slate-700">
                  This Month
                </CardTitle>
                <Calendar className="h-10 w-10 text-muted-foreground text-slate-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{month_orders}</div>
              </CardContent>
              <CardContent>
                <div className="text-sm text-muted-foreground -mt-4">
                  {percent_change}
                </div>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 mt-1">
                <CardTitle className="text-lg font-medium text-slate-700">
                  Pending Orders
                </CardTitle>
                <Package className="h-10 w-10 text-muted-foreground text-slate-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-5">{pending_orders}</div>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 mt-1">
                <CardTitle className="text-lg font-medium text-slate-700">
                  Completed Orders
                </CardTitle>
                <PackageCheck className="h-10 w-10 text-muted-foreground text-slate-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completed_orders}</div>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 mt-1">
                <CardTitle className="text-lg font-medium text-slate-700">
                  All Orders
                </CardTitle>
                <Package2 className="h-10 w-10 text-muted-foreground text-slate-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{all_orders}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle className="text-2xl">Recent Orders</CardTitle>
                  <CardDescription>
                    Recent orders from your store.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/dashboard/orders">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>

                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <RecentOrdersTableBody />
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
