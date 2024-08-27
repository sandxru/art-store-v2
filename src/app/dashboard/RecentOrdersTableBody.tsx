import React from "react";
import Link from "next/link";
import { getRecentOrders } from "@/lib/prisma";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default async function RecentOrdersTableBody() {
  const recent_orders = await getRecentOrders();
  return (
    <TableBody>
      {recent_orders.map((order, index) => (
        <TableRow key={index}>
          <Link href={`/dashboard/orders/edit-order/${order.id}`}>
            <TableCell>
              <div className="font-medium">{order.cname}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {order.createdAt}
              </div>
            </TableCell>
          </Link>
          <TableCell className="text-right">
            {order.price?.toLocaleString("en-US") + " LKR"}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
