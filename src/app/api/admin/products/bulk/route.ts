import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No product IDs provided" }, { status: 400 });
    }

    if (action === "out_of_stock") {
      await db.product.updateMany({
        where: { id: { in: ids } },
        data: { inStock: false, stockQuantity: 0 },
      });
    } else if (action === "in_stock") {
      await db.product.updateMany({
        where: { id: { in: ids } },
        data: { inStock: true, stockQuantity: 5 },
      });
    } else if (action === "archive") {
      await db.product.updateMany({
        where: { id: { in: ids } },
        data: { active: false },
      });
    } else if (action === "restore") {
      await db.product.updateMany({
        where: { id: { in: ids } },
        data: { active: true },
      });
    }

    return NextResponse.json({ success: true, count: ids.length });
  } catch (error) {
    console.error("Bulk action error:", error);
    return NextResponse.json({ error: "Bulk operation failed" }, { status: 500 });
  }
}
