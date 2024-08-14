import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { id: Number(params.id) },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update the status" },
      { status: 500 }
    );
  }
}
