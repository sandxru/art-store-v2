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

export default async function Orders() {
  const pending_data = await getOrdersWithStatusP();
  const completed_data = await getOrdersWithStatusC();
  const all_data = await getOrdersWithStatusAll();

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
              <Tabs defaultValue="tab-pending">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="tab-pending">Pendings</TabsTrigger>
                    <TabsTrigger value="tab-completed">Completed</TabsTrigger>
                    <TabsTrigger value="tab-all">All Orders</TabsTrigger>
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

                <TabsContent value="tab-pending">
                  <div className="mx-auto py-2">
                    <DataTable columns={columns} data={pending_data} />
                  </div>
                </TabsContent>

                <TabsContent value="tab-completed">
                  <div className="mx-auto py-2">
                    <DataTable columns={columns} data={completed_data} />
                  </div>
                </TabsContent>

                <TabsContent value="tab-all">
                  <div className="mx-auto py-2">
                    <DataTable columns={columns} data={all_data} />
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
