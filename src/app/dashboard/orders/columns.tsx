"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/lib/prisma";
import { ColumnDef } from "@tanstack/react-table";
import {
  Link as LucideLink,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StatusCell from "./StatusCell";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

// Constants for frame and delivery labels
const FRAME_LABELS: Record<number, string> = {
  0: "No Frame",
  1: "6 x 9",
  3: "8 x 12",
  5: "12 x 18",
};

const DELIVERY_LABELS: Record<number, string> = {
  0: "Pick-up",
  1: "Courier",
  2: "Softcopy Only",
};

// Date formatter instance
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Function to handle clipboard copy
const handleCopyClick = (url: string) => {
  navigator.clipboard
    .writeText(url)
    .then(() => toast.success("Copied to clipboard!", { duration: 1000 }))
    .catch(() => toast.error("Failed to copy!"));
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const rowdata = row.original;
      const date = new Date(rowdata.createdAt);
      const formattedDate = dateFormatter.format(date);
      return <p>{formattedDate}</p>;
    },
  },
  {
    accessorKey: "cname",
    header: "Customer",
    cell: ({ row }) => {
      const fullName = row.original.cname || "";
      const firstName = fullName.split(" ")[0]; // Extracts only the first word
      return <p>{firstName}</p>;
    },
  },
  {
    accessorKey: "photo",
    header: "Image",
    cell: ({ row }) => {
      const rowdata = row.original;

      return (
        <Image
          src={rowdata.photo}
          alt="img"
          width={1080}
          height={1080}
          className="h-32 w-auto p-0 border-white border-4 rounded-lg drop-shadow"
          unoptimized
        />
      );
    },
  },
  {
    accessorKey: "frameID",
    header: "Frame Option",
    cell: ({ row }) => {
      const rowdata = row.original;
      const label = FRAME_LABELS[rowdata.frameID] || "Unknown Frame";

      return (
        <Badge className="text-xs py-1 rounded-md" variant="outline">
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "delivery",
    header: "Delivery",
    cell: ({ row }) => {
      const rowdata = row.original;
      const label = DELIVERY_LABELS[rowdata.delivery] || "Unknown Delivery";

      return (
        <Badge className="text-xs py-1 rounded-md" variant="outline">
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { id, status } = row.original;
      return <StatusCell id={id} status={status} />;
    },
  },
  {
    header: "Action",
    id: "cl_actions",
    cell: ({ row }) => {
      const rowdata = row.original;
      const id = rowdata.id;

      return (
        <>
          {/* View Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="link" className="text-blue-500">
                View
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-slate-50">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Badge
                    variant="outline"
                    className="text-sm font-medium px-2 py-1 bg-white"
                  >
                    Order #{rowdata.id}
                  </Badge>
                </SheetTitle>
              </SheetHeader>

              <Card x-chunk="dashboard-06-chunk-0" className="mt-4">
                <CardContent className="p-4 space-y-4">
                  <SheetTitle>Order Details</SheetTitle>

                  {/* Frame Size & Delivery in the same row */}
                  <div className="flex gap-4 relative">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-slate-500">
                        Frame Size
                      </p>
                      <p className="text-sm text-slate-800">
                        {rowdata.frameID}
                      </p>
                    </div>

                    {/* Center-align Delivery */}
                    <div className="flex flex-col absolute right-1/2 transform translate-x-1/2">
                      <p className="text-sm font-medium text-slate-500">
                        Delivery
                      </p>
                      <p className="text-sm text-slate-800">
                        {rowdata.delivery}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-slate-500">Notes</p>
                    <p className="text-sm text-slate-800">
                      {rowdata.notes ?? "No notes"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-06-chunk-0" className="mt-4">
                <CardContent className="p-4 space-y-4">
                  <SheetTitle>Customer Details</SheetTitle>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-slate-500">Name</p>
                    <p className="text-sm text-slate-800">{rowdata.cname}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-slate-500">
                      Contact
                    </p>
                    <p className="text-sm text-slate-800">{rowdata.contact}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-slate-500">
                      Address
                    </p>
                    <p className="text-sm text-slate-800">
                      {rowdata.address ?? "No address"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <SheetFooter className="flex justify-end mt-4">
                <SheetClose asChild></SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleCopyClick(rowdata.photo)}>
                <LucideLink className="w-5 h-5 pr-1" />
                <div className="pr-1" />
                Copy Image URL
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={"orders/edit-order/" + id}>
                <DropdownMenuItem>
                  <Pencil className="w-5 h-4 pr-1" />
                  <div className="pr-1" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="w-5 h-4 pr-1 text-red-500" />
                <div className="pr-1" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
