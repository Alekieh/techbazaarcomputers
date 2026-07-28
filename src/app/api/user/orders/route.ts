import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || searchParams.get("search");

    const user = await getCurrentUser();

    // Build search conditions
    const OR_conditions: any[] = [];

    if (query) {
      const q = query.trim();
      OR_conditions.push(
        { orderNumber: { equals: q, mode: "insensitive" } },
        { customerPhone: { contains: q, mode: "insensitive" } },
        { customerEmail: { contains: q, mode: "insensitive" } },
        { mpesaTxCode: { contains: q, mode: "insensitive" } },
        { trackingNumber: { contains: q, mode: "insensitive" } }
      );
    }

    if (user) {
      OR_conditions.push({ userId: user.id }, { customerEmail: user.email });
    }

    if (OR_conditions.length === 0) {
      return NextResponse.json({ orders: [] });
    }

    const orders = await db.order.findMany({
      where: {
        OR: OR_conditions,
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
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
