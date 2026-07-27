import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { region, city } = await req.json();

    const isNairobi =
      region?.toLowerCase().includes("nairobi") ||
      city?.toLowerCase().includes("nairobi") ||
      city?.toLowerCase().includes("westlands") ||
      city?.toLowerCase().includes("kilimani");

    // Nairobi Metropolitan local delivery rate vs Upcountry G4S courier rate
    const shippingFee = isNairobi ? 300 : 600;
    const courierPartner = isNairobi ? "Tech Bazaar Express Express" : "G4S Courier Kenya";

    return NextResponse.json({
      success: true,
      shippingFee,
      courierPartner,
      estimatedDays: isNairobi ? "Same-Day / 24 Hours" : "24 - 48 Hours Upcountry",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to calculate shipping rate" }, { status: 500 });
  }
}
