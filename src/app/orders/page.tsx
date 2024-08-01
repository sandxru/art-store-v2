import { Payment, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import Link from "next/link";
import { File, PlusCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/ui/NavBar";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      cl_id: "728ed52f",
      cl_name: "Sandaru Fernando",
      cl_image: "public/images/log.jpg",
      cl_status: "Pending",
      cl_method: 'Pick-up',
      cl_amount: 100,
    
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
    <NavBar/>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
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
                  <Link className="text-base text-slate-800" href="/orders">
                    Orders
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle className="text-2xl">Orders</CardTitle>
              <CardDescription>
                Manage your orders and view their details.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="all">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="tab-pending">Pendings</TabsTrigger>
                    <TabsTrigger value="tab-completed">Completed</TabsTrigger>
                    <TabsTrigger value="tab-all">All Orders</TabsTrigger>
                  </TabsList>

                  <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export
                      </span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Order
                      </span>
                    </Button>
                  </div>
                </div>

                <TabsContent value="tab-pending">
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
