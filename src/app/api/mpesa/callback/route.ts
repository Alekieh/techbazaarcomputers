import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📲 Safaricom Daraja M-Pesa Callback Received:", JSON.stringify(body));

    const stkCallback = body?.Body?.stkCallback;
    if (!stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid Payload" });
    }

    const { ResultCode, ResultDesc, CallbackMetadata, MerchantRequestID, CheckoutRequestID } = stkCallback;

    if (ResultCode === 0 && CallbackMetadata?.Item) {
      // Transaction successful
      let mpesaTxCode = "";
      let amount = 0;
      let phone = "";

      for (const item of CallbackMetadata.Item) {
        if (item.Name === "MpesaReceiptNumber") mpesaTxCode = item.Value;
        if (item.Name === "Amount") amount = item.Value;
        if (item.Name === "PhoneNumber") phone = String(item.Value);
      }

      console.log(`✅ Payment Verified: M-Pesa Ref ${mpesaTxCode}, KES ${amount}, Phone ${phone}`);

      // Update matching order in Railway PostgreSQL
      const pendingOrder = await db.order.findFirst({
        where: { paymentStatus: "PENDING" },
        orderBy: { createdAt: "desc" },
      });

      if (pendingOrder) {
        await db.order.update({
          where: { id: pendingOrder.id },
          data: {
            paymentStatus: "PAID",
            mpesaTxCode,
            orderStatus: "CONFIRMED",
          },
        });
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Callback Processed Successfully" });
  } catch (error) {
    console.error("M-Pesa Callback Error:", error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Internal Server Error" }, { status: 500 });
  }
}
