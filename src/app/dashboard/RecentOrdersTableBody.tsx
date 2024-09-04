import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getRecentOrders } from "@/lib/prisma";
import Link from "next/link";

export default async function RecentOrdersTableBody() {
  const recent_orders = await getRecentOrders();
  return (
    <TableBody>
      {recent_orders.map((order, index) => (
        <TableRow key={index}>
          <TableCell>
            <Link href={`/dashboard/orders/edit-order/${order.id}`}>
              <div className="font-medium">{order.cname}</div>
            </Link>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {order.createdAt}
            </div>
          </TableCell>
          <TableCell className="text-right">
            {order.price?.toLocaleString("en-US") + " LKR"}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
