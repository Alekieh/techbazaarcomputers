import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ orders: [] });
    }

    const orders = await db.order.findMany({
      where: {
        OR: [
          { userId: user.id },
          { customerEmail: user.email },
        ],
      },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, image: true, slug: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customer orders" }, { status: 500 });
  }
}
