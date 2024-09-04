import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditForm from "@/components/ui/EditForm";
import NavBar from "@/components/ui/NavBar";
import { getOrderById, Order } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Order - ArtStore",
};

export default async function OrderEditPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = parseInt(params.id, 10);
  const order: Order = (await getOrderById(orderId)) as Order;

  if (!order) {
    notFound();
  }

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
                  <Link
                    className="text-base text-slate-500"
                    href="/dashboard/orders"
                  >
                    Orders
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    className="text-base text-slate-800"
                    href={`/dashboard/orders/edit-order/${orderId}`}
                  >
                    Edit Order
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-3xl">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle className="text-2xl">Edit Order</CardTitle>
                <CardDescription>Update details of the order</CardDescription>
              </CardHeader>

              <CardContent>
                <EditForm order={order} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
