import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryRegion,
      deliveryCity,
      deliveryAddress,
      deliveryNotes,
      paymentMethod,
      items,
      subtotal,
      deliveryFee,
      total,
      mpesaTxCode,
    } = body;

    if (
      !customerName ||
      !customerPhone ||
      !customerEmail ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required order details" },
        { status: 400 }
      );
    }

    const currentUser = await getCurrentUser();

    // Generate unique order number (e.g. TB-2026-8942)
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `TB-${new Date().getFullYear()}-${randomCode}`;

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: currentUser?.id || null,
        customerName,
        customerPhone,
        customerEmail,
        deliveryRegion: deliveryRegion || "Nairobi",
        deliveryCity: deliveryCity || "Nairobi",
        deliveryAddress: deliveryAddress || "N/A",
        deliveryNotes: deliveryNotes || "",
        paymentMethod: paymentMethod || "STK_PUSH",
        paymentStatus: mpesaTxCode ? "PAID" : "PENDING",
        mpesaTxCode: mpesaTxCode || null,
        orderStatus: "PENDING",
        subtotal: Number(subtotal),
        deliveryFee: Number(deliveryFee || 0),
        total: Number(total),
        items: {
          create: items.map((item: any) => ({
            productId: item.productId || item.id,
            productName: item.name || item.productName,
            quantity: Number(item.quantity),
            unitPrice: Number(item.price || item.unitPrice),
            totalPrice: Number(item.price || item.unitPrice) * Number(item.quantity),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      order,
    });
  } catch (error) {
    console.error("Order creation API error:", error);
    return NextResponse.json(
      { error: "Failed to persist order" },
      { status: 500 }
    );
  }
}
