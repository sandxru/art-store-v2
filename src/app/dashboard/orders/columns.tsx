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
// Mapping for frameID
const frameOptions: Record<number, string> = {
  0: "No Frame",
  1: "6 x 9",
  3: "8 x 12",
  5: "12 x 18",
};

// Mapping for delivery types
const deliveryOptions: Record<number, string> = {
  0: "Pick-up",
  1: "Courier",
  2: "Softcopy Only",
};

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
      const date = new Date(row.original.createdAt).toISOString().split("T")[0];
      return <p>{date}</p>;
    },
  },
  {
    accessorKey: "cname",
    header: "Customer",
  },
  {
    accessorKey: "photo",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.photo}
        alt="Order Image"
        width={1080}
        height={1080}
        className="h-36 w-auto p-0 border-white border-4 rounded-lg drop-shadow"
        unoptimized={false}
        priority
      />
    ),
  },
  {
    accessorKey: "frameID",
    header: "Frame Option",
    cell: ({ row }) => (
      <Badge className="text-xs py-1 rounded-md" variant="outline">
        {frameOptions[row.original.frameID] ?? "Unknown"}
      </Badge>
    ),
  },
  {
    accessorKey: "delivery",
    header: "Delivery",
    cell: ({ row }) => (
      <Badge className="text-xs py-1 rounded-md" variant="outline">
        {deliveryOptions[row.original.delivery] ?? "Unknown"}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusCell id={row.original.id} status={row.original.status} />
    ),
  },
  {
    header: "Action",
    id: "cl_actions",
    cell: ({ row }) => {
      const { id, photo, cname, contact, notes, address } = row.original;

      return (
        <>
          {/* Quick View Button */}
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
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={cname} readOnly />
                </div>
                <div>
                  <Label htmlFor="contact">Contact</Label>
                  <Input id="contact" value={contact} readOnly />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" value={notes ?? ""} readOnly />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" value={address ?? ""} readOnly />
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
              <DropdownMenuItem onClick={() => handleCopyClick(photo)}>
                <LucideLink className="w-5 h-5 pr-1" />
                Copy Image URL
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={"orders/edit-order/" + id}>
                <DropdownMenuItem>
                  <Pencil className="w-5 h-4 pr-1" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="w-5 h-4 pr-1 text-red-500" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
