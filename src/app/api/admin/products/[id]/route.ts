import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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

    // Delete existing specs first if new specs are provided
    if (specs) {
      await db.productSpec.deleteMany({
        where: { productId: id },
      });
    }

    const product = await db.product.update({
      where: { id },
      data: {
        name,
        slug,
        category,
        brand,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        description,
        shortDescription,
        image,
        images: images || [image],
        inStock: Boolean(inStock),
        badge,
        specs: specs
          ? {
              create: specs.map((s: any) => ({
                label: s.label,
                value: s.value,
              })),
            }
          : undefined,
      },
      include: { specs: true },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Admin Product PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin Product DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
