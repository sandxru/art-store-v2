import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import NavBar from "@/components/ui/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getOrdersWithStatusAll,
  getOrdersWithStatusC,
  getOrdersWithStatusP,
} from "@/lib/prisma";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { columns } from "./columns";

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Orders - ArtStore",
};

export default async function Orders({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab = searchParams.tab || "pending";

  // Fetch data based on active tab
  let data;
  switch (activeTab) {
    case "pending":
      data = await getOrdersWithStatusP();
      break;
    case "completed":
      data = await getOrdersWithStatusC();
      break;
    case "all":
      data = await getOrdersWithStatusAll();
      break;
    default:
      data = await getOrdersWithStatusP();
  }

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <Toaster />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-base text-slate-500" href="/dashboard">
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    className="text-base text-slate-800"
                    href="/dashboard/orders"
                  >
                    Orders
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle className="text-2xl">Orders</CardTitle>
              <CardDescription>Manage and view order.</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab}>
                <div className="flex items-center">
                  <TabsList>
                    <Link href="/dashboard/orders?tab=pending" replace>
                      <TabsTrigger value="pending">Pendings</TabsTrigger>
                    </Link>
                    <Link href="/dashboard/orders?tab=completed" replace>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </Link>
                    <Link href="/dashboard/orders?tab=all" replace>
                      <TabsTrigger value="all">All Orders</TabsTrigger>
                    </Link>
                  </TabsList>

                  <div className="ml-auto flex items-center gap-2">
                    <Link href="/dashboard/orders/new-order">
                      <Button
                        size="sm"
                        className="gap-1 hover:scale-105 transition-transform duration-200 ease-in-out"
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          New Order
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>

                <TabsContent value="pending">
                  <div className="mx-auto py-2">
                    <DataTable columns={columns} data={data} />
                  </div>
                </TabsContent>

                <TabsContent value="completed">
                  <div className="mx-auto py-2">
                    <DataTable columns={columns} data={data} />
                  </div>
                </TabsContent>

                <TabsContent value="all">
                  <div className="mx-auto py-2">
                    <DataTable columns={columns} data={data} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
