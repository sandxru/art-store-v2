"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Trash2, Pencil, Eye } from "lucide-react";
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

export type Order = {
  id: number;
  cname: string;
  delivery: number;
  status: "p" | "c";
  //cl_notes: string;
  photo: string;
  frameID: number;
  price: number;
  // contact:string;
  // createdAt: string;
  // updatedAt: string;
  // address: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "cname",
    header: "Name",
  },
  {
    accessorKey: "photo",
    header: "Image",
    cell: ({ row }) => {
      const photo = row.original;

      return (
        <Image
          src={photo.photo}
          alt="img"
          width={1080}
          height={1080}
          className="h-44 w-auto p-0 border-white border-4 rounded-lg drop-shadow"
        />
      );
    },
  },
  {
    accessorKey: "frameID",
    header: "Frame Option",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "delivery",
    header: "Delivery Method",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    header: "Action",
    id: "cl_actions",
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuItem>
              <Eye className="w-5 h-5 pr-1" />
              <div className="pr-1" />
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pencil className="w-5 h-4 pr-1" />
              <div className="pr-1" />
              Edit
            </DropdownMenuItem>
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
