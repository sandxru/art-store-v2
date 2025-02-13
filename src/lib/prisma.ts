import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  //  global.prisma ||
  new PrismaClient({
    log: ["info", "warn", "error"],
  }).$extends(withAccelerate());

//if (process.env.NODE_ENV === "development") global.prisma = prisma;

// Keep all the Prisma functions in this file.
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

export default prisma;
