import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

// Prisma Query Function
export async function countLast30Orders(days: number = 30): Promise<number> {
  const count = await prisma.order.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - days)),
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

export default prisma;
