import { Metadata } from "next";
import { Label } from "@/components/ui/label";
import Link from "next/link";
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
import NavBar from "@/components/ui/NavBar";

import { addOrder } from "./newordersubmit";
import NewForm from "@/components/ui/NewForm";

export const metadata: Metadata = {
  title: "New Order - ArtStore",
};

export default async function Orders() {
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
                {/* <form action={addOrder} method="post">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="grid gap-3">
                      <Label>Customer Name</Label>
                      <Input id="cname" name="cname" type="text" required />
                    </div>

                    <div className="grid gap-3">
                      <Label>Method</Label>
                      <Select
                        onValueChange={(value) =>
                          ((
                            document.getElementById(
                              "delivery"
                            ) as HTMLInputElement
                          ).value = value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">Courier</SelectItem>
                            <SelectItem value="0">Pick-up</SelectItem>
                            <SelectItem value="2">Softcopy Only</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <input type="hidden" id="delivery" name="delivery" />
                    </div>

                    <div className="grid gap-3">
                      <Label>Frame</Label>
                      <Select
                        onValueChange={(value) =>
                          ((
                            document.getElementById(
                              "frameID"
                            ) as HTMLInputElement
                          ).value = value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="0">No frame</SelectItem>
                            <SelectItem value="1">6 x 8</SelectItem>
                            <SelectItem value="3">8 x 12</SelectItem>
                            <SelectItem value="5">12 x 18</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <input type="hidden" id="frameID" name="frameID" />
                    </div>

                    <div className="grid gap-3">
                      <Label>Price</Label>
                      <Input id="price" type="number" name="price" required />
                    </div>

                    <div className="grid gap-3">
                      <Label>Contact Info</Label>
                      <Input id="contact" type="text" name="contact" required />
                    </div>

                    <div className="grid gap-3">
                      <Label>Image</Label>
                      <Input id="photo" type="file" name="photo" required />
                    </div>

                    <div className="grid gap-3 col-span-1 md:col-span-2">
                      <Label>Notes</Label>
                      <Textarea id="note" name="notes" rows={6} />
                    </div>

                    <div className="grid gap-3 col-span-1 md:col-span-2">
                      <Label>Address</Label>
                      <Textarea id="address" name="address" rows={6} />
                    </div>

                    <Button type="submit">Submit</Button>
                    <Button type="reset">Reset</Button>
                  </div>
                </form> */}
<NewForm></NewForm>


              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
