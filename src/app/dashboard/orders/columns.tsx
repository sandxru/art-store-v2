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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
    header: "#",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const rowdata = row.original;
      const date = new Date(rowdata.createdAt);

      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-US", options);

      return <p>{formattedDate}</p>;
    },
  },
  {
    accessorKey: "cname",
    header: "Customer",
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
          className="h-36 w-auto p-0 border-white border-4 rounded-lg drop-shadow"
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
      var order_frame = rowdata.frameID;
      var label;
      if (order_frame == 0) {
        label = "No Frame";
      } else if (order_frame == 1) {
        label = "6 x 9";
      } else if (order_frame == 3) {
        label = "8 x 12";
      } else if (order_frame == 5) {
        label = "12 x 18";
      }

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
      var order_delivery = rowdata.delivery;
      var label;
      if (order_delivery == 0) {
        label = "Pick-up";
      } else if (order_delivery == 1) {
        label = "Courier";
      } else if (order_delivery == 2) {
        label = "Softcopy Only";
      }

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
                Quick View
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Quick view</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <Label htmlFor="name" className="text-left">
                    Name
                  </Label>
                  <Input id="name" value={rowdata.cname} readOnly />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Label htmlFor="name" className="text-left">
                    Contact
                  </Label>
                  <Input id="name" value={rowdata.contact} readOnly />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Label htmlFor="notes" className="text-left">
                    Notes
                  </Label>
                  <Textarea id="notes" value={rowdata.notes ?? ""} readOnly />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Label htmlFor="address" className="text-left">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={rowdata.address ?? ""}
                    readOnly
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
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
