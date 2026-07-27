import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const brands = await db.brand.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ brands });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, logo } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Brand name is required" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const brand = await db.brand.create({
      data: { name, slug, logo: logo || null },
    });

    return NextResponse.json({ success: true, brand });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Brand already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 });
  }
}
