import Link from "next/link";
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NavBar from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: "Dashboard - ArtStore",
};

export default async function Dashboard() {
  const month_orders = await countOrdersInCurrentMonth();
  const percent_change = await getOrderPercentageChange();
  const pending_orders = await countPendingOrders();
  const completed_orders = await countCompletedOrders();
  const all_orders = await countAllOrders();
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome, Admin 👋🏻
            </h2>

            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/orders/new-order" className="text-base">
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
                  <Link href="/orders">
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
                      <TableHead className="hidden xl:table-column">
                        Type
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Status
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Liam Johnson</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Jul 17 2024
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Sale
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2023-06-23
                      </TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Olivia Smith</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          olivia@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Refund
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Declined
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2023-06-24
                      </TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Noah Williams</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          noah@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Subscription
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2023-06-25
                      </TableCell>
                      <TableCell className="text-right">$350.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Emma Brown</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          emma@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Sale
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2023-06-26
                      </TableCell>
                      <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Liam Johnson</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          liam@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Sale
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2023-06-27
                      </TableCell>
                      <TableCell className="text-right">$550.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Jackson Lee
                    </p>
                    <p className="text-sm text-muted-foreground">
                      jackson.lee@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$39.00</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
