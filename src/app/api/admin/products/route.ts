import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { specs: true },
    });

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch admin products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      slug,
      category,
      brand,
      price,
      originalPrice,
      description,
      shortDescription,
      image,
      images,
      inStock,
      badge,
      specs,
    } = body;

    if (!name || !category || !brand || !price) {
      return NextResponse.json(
        { error: "Missing required product fields" },
        { status: 400 }
      );
    }

    // Auto-generate slug if missing
    const generatedSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const product = await db.product.create({
      data: {
        name,
        slug: generatedSlug,
        category,
        brand,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        description: description || name,
        shortDescription: shortDescription || name,
        image: image || "/images/products/hp-elitebook-g8.jpg",
        images: images && images.length > 0 ? images : [image || "/images/products/hp-elitebook-g8.jpg"],
        inStock: inStock !== undefined ? Boolean(inStock) : true,
        badge: badge || null,
        specs: {
          create: specs
            ? specs.map((s: any) => ({
                label: s.label,
                value: s.value,
              }))
            : [],
        },
      },
      include: { specs: true },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Admin Product POST error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A product with this slug already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
