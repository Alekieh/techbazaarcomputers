import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [paidOrders, mpesaCount, codCount, bestSellers] = await Promise.all([
      db.order.findMany({
        where: { paymentStatus: "PAID" },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          total: true,
          paymentMethod: true,
          createdAt: true,
        },
      }),
      db.order.count({ where: { paymentMethod: { contains: "STK", mode: "insensitive" } } }),
      db.order.count({ where: { paymentMethod: { contains: "COD", mode: "insensitive" } } }),
      db.orderItem.groupBy({
        by: ["productName"],
        _sum: { quantity: true, totalPrice: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),
    ]);

    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);

    return NextResponse.json({
      reports: {
        totalRevenue,
        paidOrdersCount: paidOrders.length,
        paymentBreakdown: {
          mpesa: mpesaCount,
          cod: codCount,
        },
        bestSellers,
      },
    });
  } catch (error) {
    console.error("Reports API error:", error);
    return NextResponse.json({ error: "Failed to generate sales report" }, { status: 500 });
  }
}
