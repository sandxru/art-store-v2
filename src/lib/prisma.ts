import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

// Prisma Query Functions
export async function countOrdersInCurrentMonth(): Promise<number> {
  const now = new Date();
  // Calculate start and end dates for the current calendar month
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  ); // End of current month
  // Count orders in the current month
  const count = await prisma.order.count({
    where: {
      createdAt: {
        gte: currentMonthStart,
        lt: currentMonthEnd,
      },
    },
  });
  return count;
}

export async function countPendingOrders(): Promise<number> {
  const count = await prisma.order.count({
    where: {
      status: "p",
    },
  });
  return count;
}

export async function countCompletedOrders(): Promise<number> {
  const count = await prisma.order.count({
    where: {
      status: "c",
    },
  });
  return count;
}

export async function countAllOrders(): Promise<number> {
  const count = await prisma.order.count();
  return count;
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
  // Current month start and end dates
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  ); // End of current month

  // Previous month start and end dates
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  ); // End of previous month

  // Count orders
  const currentMonthCount = await countOrdersInRange(
    currentMonthStart,
    currentMonthEnd
  );
  const previousMonthCount = await countOrdersInRange(
    previousMonthStart,
    previousMonthEnd
  );

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

export async function getOrdersWithStatusP() {
  const orders = await prisma.order.findMany({
    where: {
      status: "p",
    },
  });
  return orders;
}

export async function getOrdersWithStatusC() {
  const orders = await prisma.order.findMany({
    where: {
      status: "c",
    },
  });
  return orders;
}

export async function getOrdersWithStatusAll() {
  const orders = await prisma.order.findMany({
    where: {
      status: {
        in: ["p", "c"],
      },
    },
  });
  return orders;
}

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
  const orders = await prisma.order.create({
    data: {
      cname: cname,
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

export async function getLatestOrders() {
  try {
    const orders = await prisma.order.findMany({
      select: {
        cname: true,
        createdAt: true,
        price: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
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

export default prisma;
