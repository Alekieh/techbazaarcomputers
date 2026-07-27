import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ wishlists: [] });
    }

    const wishlists = await db.wishlist.findMany({
      where: { userId: user.id },
      include: {
        product: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ wishlists });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const existing = await db.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    if (existing) {
      await db.wishlist.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ success: true, action: "removed" });
    } else {
      await db.wishlist.create({
        data: {
          userId: user.id,
          productId,
        },
      });
      return NextResponse.json({ success: true, action: "added" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Wishlist update failed" }, { status: 500 });
  }
}
