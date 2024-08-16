"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, Pencil, Eye } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import StatusCell from "./StatusCell";
import Link from "next/link";
export type Order = {
  id: number;
  cname: string;
  delivery: number;
  status: "p" | "c";
  notes: string;
  photo: string;
  frameID: number;
  price: number;
  contact: string;
  createdAt: string;
  updatedAt: string;
  address: string;
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
    accessorKey: "price",
    header: "Amount",
    cell: ({ row }) => {
      const rowdata = row.original;
      var order_price = Intl.NumberFormat("en-US").format(rowdata.price);

      return (
        <Badge className="text-xs py-1 rounded-md" variant="outline">
          {order_price + " LKR"}
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
            <Link href={"orders/edit-order/" + id}>
              <DropdownMenuItem>
                <Eye className="w-5 h-5 pr-1" />
                <div className="pr-1" />
                View
              </DropdownMenuItem>
            </Link>
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
      );
    },
  },
];
