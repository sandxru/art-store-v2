import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["info", "warn", "error"],
  });

if (process.env.NODE_ENV === "development") global.prisma = prisma;

// Helper function to get the start and end of a month
const getMonthStartEnd = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return { start, end };
};

// Keep all the Prisma functions in this file.
export async function countOrdersInCurrentMonth(): Promise<number> {
  const { start, end } = getMonthStartEnd(new Date());
  return prisma.order.count({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });
}

export async function countPendingOrders(): Promise<number> {
  return prisma.order.count({
    where: {
      status: "p",
    },
  });
}

export async function countCompletedOrders(): Promise<number> {
  return prisma.order.count({
    where: {
      status: "c",
    },
  });
}

export async function countAllOrders(): Promise<number> {
  return prisma.order.count();
}

export async function countOrdersInRange(
  startDate: Date,
  endDate: Date
): Promise<number> {
  return prisma.order.count({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
}

export async function getOrderPercentageChange(): Promise<string> {
  const now = new Date();
  const currentMonth = getMonthStartEnd(now);
  const previousMonth = getMonthStartEnd(
    new Date(now.getFullYear(), now.getMonth() - 1, 1)
  );

  const [currentMonthCount, previousMonthCount] = await Promise.all([
    countOrdersInRange(currentMonth.start, currentMonth.end),
    countOrdersInRange(previousMonth.start, previousMonth.end),
  ]);

  let percentageChange = 0;
  if (previousMonthCount > 0) {
    percentageChange =
      ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
  }

  const formattedChange = percentageChange.toFixed(2);

  if (percentageChange > 0) {
    return `+${formattedChange}% from last month`;
  } else if (percentageChange < 0) {
    return `${formattedChange}% from last month`;
  } else {
    return `0% change from last month`;
  }
}

export type Order = {
  id: number;
  cname: string;
  delivery: number;
  status: "p" | "c";
  notes: string | null;
  photo: string;
  frameID: number;
  price: number;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  address: string | null;
};

export async function getOrdersWithStatusAll() {
  const orders: Order[] = await prisma.order.findMany({
    where: {
      status: {
        in: ["p", "c"],
      },
    },
  });
  return orders;
}

export async function getOrdersWithStatusP() {
  const orders: Order[] = await prisma.order.findMany({
    where: {
      status: "p",
    },
  });
  return orders;
}

export async function getOrdersWithStatusC() {
  const orders: Order[] = await prisma.order.findMany({
    where: {
      status: "c",
    },
  });
  return orders;
}

export async function createOrder(
  cname: string,
  delivery: number,
  notes: string,
  photo: string,
  frameID: number,
  price: number,
  contact: string,
  address: string
) {
  // Format cname before saving
  const formattedCname = cname
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const orders = await prisma.order.create({
    data: {
      cname: formattedCname,
      delivery: delivery,
      status: "p",
      notes: notes,
      photo: photo,
      frameID: frameID,
      price: price,
      contact: contact,
      address: address,
    },
  });
  return orders;
}
export async function getRecentOrders() {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        cname: true,
        createdAt: true,
        price: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // Format the createdAt field
    const formattedOrders = orders.map((order) => ({
      ...order,
      createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return formattedOrders;
  } catch (error) {
    console.error("Error retrieving latest orders:", error);
    throw error;
  }
}

export async function getOrderById(id: number) {
  return prisma.order.findUnique({
    where: { id },
  });
}

export async function updateOrder(
  id: number,
  cname: string,
  delivery: number,
  notes: string,
  photo: string | undefined,
  frameID: number,
  price: number,
  contact: string,
  address: string
) {
  try {
    await prisma.order.update({
      where: { id },
      data: {
        cname,
        delivery,
        notes,
        photo: photo ?? undefined, // Use existing photo if no new photo URL provided
        frameID,
        price,
        contact,
        address,
      },
    });
    console.log(`Prisma: Order with ID ${id} updated successfully.`);
  } catch (error) {
    console.error(`Prisma: Failed to update order with ID ${id}:`, error);
  }
}

export async function getAdminByEmail(email: string) {
  const admin = prisma.admin.findUnique({
    where: { email },
  });
  return admin;
}

export async function getFrameCounts() {
  const frameCount = {
    one: await prisma.order.count({
      where: {
        frameID: 1,
        status: "p",
      },
    }),
    two: await prisma.order.count({
      where: {
        frameID: 3,
        status: "p",
      },
    }),
    three: await prisma.order.count({
      where: {
        frameID: 5,
        status: "p",
      },
    }),
  };

  return frameCount;
}

export async function countCompletedOrdersLast12Months(): Promise<
  { month: string; count: number }[]
> {
  const now = new Date();
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return date.toLocaleString("default", { month: "long" });
  });

  const counts: { month: string; count: number }[] = [];

  for (let i = 0; i < last12Months.length; i++) {
    const monthName = last12Months[i];

    // Calculate the start and end of the month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0); // Last day of the month

    const count = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    });
    counts.push({ month: monthName, count });
  }

  return counts.reverse();
}

export default prisma;
