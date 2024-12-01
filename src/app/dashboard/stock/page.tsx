import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavBar from "@/components/ui/NavBar";
import { getFrameCounts } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stock - ArtStore",
};

const frameRate = {
  one: 720,
  two: 870,
  three: 1380,
};

export default async function Orders() {
  const frameCounts = await getFrameCounts();
  const frametotal =
    frameCounts.one * frameRate.one +
    frameCounts.two * frameRate.two +
    frameCounts.three * frameRate.three;

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
                    className="text-base text-slate-800"
                    href="/dashboard/orders"
                  >
                    Stock
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-3xl">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle className="text-2xl">Frame Stock</CardTitle>
                <CardDescription>
                  Manage and view frame stock details.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Frame Size</TableHead>
                      <TableHead>Needed Stock</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium"> 6 x 9</TableCell>
                      <TableCell>{frameCounts.one}</TableCell>
                      <TableCell>{frameRate.one}</TableCell>
                      <TableCell className="text-right">
                        {frameCounts.one * frameRate.one}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium"> 8 x 12</TableCell>
                      <TableCell>{frameCounts.two}</TableCell>
                      <TableCell>{frameRate.two}</TableCell>
                      <TableCell className="text-right">
                        {frameCounts.two * frameRate.two}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium"> 12 x 18</TableCell>
                      <TableCell>{frameCounts.three}</TableCell>
                      <TableCell>{frameRate.three}</TableCell>
                      <TableCell className="text-right">
                        {frameCounts.three * frameRate.three}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">
                        {frametotal + " LKR"}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
