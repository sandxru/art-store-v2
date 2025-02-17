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
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Quick View</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <Label
                    htmlFor="name"
                    className="text-left text-sm text-slate-800"
                  >
                    Name
                  </Label>
                  <div className="text-sm text-slate-500">{rowdata.cname}</div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Label
                    htmlFor="contact"
                    className="text-left text-sm text-slate-800"
                  >
                    Contact
                  </Label>
                  <div className="text-sm text-slate-500">
                    {rowdata.contact}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Label
                    htmlFor="notes"
                    className="text-left text-sm text-slate-800"
                  >
                    Notes
                  </Label>
                  <div className="text-sm text-slate-500">
                    {rowdata.notes ?? "No notes"}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Label
                    htmlFor="address"
                    className="text-left text-sm text-slate-800"
                  >
                    Address
                  </Label>
                  <div className="text-sm text-slate-500">
                    {rowdata.address ?? "No address"}
                  </div>
                </div>
              </div>
              <SheetFooter>
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
