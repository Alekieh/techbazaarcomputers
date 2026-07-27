import { NextRequest, NextResponse } from "next/server";

// Safaricom Daraja API Credentials (loaded from process.env or fallback for dev simulation)
const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || "";
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || "";
const MPESA_PASSKEY = process.env.MPESA_PASSKEY || "";
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE || "174379";
const MPESA_ENV = process.env.MPESA_ENV || "sandbox"; // 'sandbox' or 'production'

const BASE_URL = MPESA_ENV === "production" 
  ? "https://api.safaricom.co.ke" 
  : "https://sandbox.safaricom.co.ke";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, amount, orderId } = body;

    if (!phone || !amount) {
      return NextResponse.json(
        { error: "Phone number and amount are required." },
        { status: 400 }
      );
    }

    // Format phone number to 2547XXXXXXXX or 2541XXXXXXXX
    let formattedPhone = phone.replace(/\D/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith("7") || formattedPhone.startsWith("1")) {
      formattedPhone = "254" + formattedPhone;
    }

    // If Daraja credentials are not set, return simulated successful STK Push request
    if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET || !MPESA_PASSKEY) {
      console.log(`[M-Pesa Simulation] STK Push sent to ${formattedPhone} for KSh ${amount}`);
      return NextResponse.json({
        success: true,
        isSimulated: true,
        MerchantRequestID: `REQ-${Date.now()}`,
        CheckoutRequestID: `CHK-${Math.floor(100000 + Math.random() * 900000)}`,
        ResponseCode: "0",
        ResponseDescription: "Success. Request accepted for processing",
        CustomerMessage: `Success. Request accepted for processing. Check your phone (${formattedPhone}) for PIN prompt.`,
      });
    }

    // 1. Generate OAuth Token
    const authString = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");
    const authRes = await fetch(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
    });

    if (!authRes.ok) {
      throw new Error("Failed to authenticate with Safaricom Daraja API");
    }

    const authData = await authRes.json();
    const accessToken = authData.access_token;

    // 2. Format Timestamp & Password
    const date = new Date();
    const timestamp =
      date.getFullYear().toString() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    const password = Buffer.from(
      `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    // 3. Initiate STK Push
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://techbazaar.co.ke"}/api/mpesa/callback`;

    const stkRes = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amount),
        PartyA: formattedPhone,
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: orderId || "TechBazaar",
        TransactionDesc: `Payment for Order ${orderId || "TechBazaar"}`,
      }),
    });

    const stkData = await stkRes.json();

    return NextResponse.json({
      success: stkData.ResponseCode === "0",
      isSimulated: false,
      ...stkData,
    });
  } catch (error: any) {
    console.error("M-Pesa STK Push error:", error);
    return NextResponse.json(
      { error: error.message || "M-Pesa STK Push initiation failed." },
      { status: 500 }
    );
  }
}
