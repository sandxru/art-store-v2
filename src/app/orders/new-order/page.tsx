//@ts-nocheck

import { Metadata } from "next";
import { Order, columns } from "../columns";
import { DataTable } from "@/components/ui/data-table";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { File, PlusCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/ui/NavBar";

import {
  getOrdersWithStatusP,
  countCompletedOrders,
  getOrdersWithStatusC,
  getOrdersWithStatusAll,
} from "@/lib/prisma";

export const metadata: Metadata = {
  title: "New Order - ArtStore",
};

export default async function Orders() {
  const pending_data = await getOrdersWithStatusP();
  const completed_data = await getOrdersWithStatusC();
  const all_data = await getOrdersWithStatusAll();
  const method = "delivery";

  return (
    <>
      <NavBar />
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
                  <Link className="text-base text-slate-500" href="/orders">
                    Orders
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-base text-slate-800" href="/new-order">
                    New Order
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-3xl">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle className="text-2xl">New Order</CardTitle>
                <CardDescription>Add new order to the system</CardDescription>
              </CardHeader>

              <CardContent>
              <form id="myForm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Customer Name</Label>
                    <Input id="cname" type="text" required />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="apple">Delivery</SelectItem>
                          <SelectItem value="banana">Pick-up</SelectItem>
                          <SelectItem value="blueberry">
                            Softcopy Only
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Frame</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="apple">No frame</SelectItem>
                          <SelectItem value="apple">6 x 0</SelectItem>
                          <SelectItem value="banana">8 x 12</SelectItem>
                          <SelectItem value="blueberry">12 x 18</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Price</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Contact Info</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Image</Label>
                    <Input id="email" type="file" required />
                  </div>

                  <div className="grid gap-3 col-span-1 md:col-span-2">
                    <Label htmlFor="email">Notes</Label>
                    <Textarea rows={6} />
                  </div>

                  <div className="grid gap-3 col-span-1 md:col-span-2">
                    <Label htmlFor="email">Address</Label>
                    <Textarea rows={6} />
                  </div>

                  <Button type="submit">Submit</Button>
                  <Button type="reset">Reset</Button>
                </div></form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
