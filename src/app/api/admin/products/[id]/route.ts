import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// GET single product by ID or Slug for Admin Editing
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const product = await db.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        specs: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT update product details, multi-images, and specs
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const {
      name,
      category,
      brand,
      price,
      originalPrice,
      shortDescription,
      description,
      image,
      images,
      inStock,
      stockQuantity,
      badge,
      specs,
    } = body;

    // Verify product exists
    const existingProduct = await db.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const validImages = Array.isArray(images) && images.length > 0 ? images : [image];

    // Transaction to update product and replace specs
    const updatedProduct = await db.$transaction(async (tx) => {
      // Delete existing specs
      await tx.productSpec.deleteMany({
        where: { productId: existingProduct.id },
      });

      // Update product record
      return await tx.product.update({
        where: { id: existingProduct.id },
        data: {
          name: name || existingProduct.name,
          category: category || existingProduct.category,
          brand: brand || existingProduct.brand,
          price: price !== undefined ? parseFloat(price) : existingProduct.price,
          originalPrice: originalPrice !== undefined ? (originalPrice ? parseFloat(originalPrice) : null) : existingProduct.originalPrice,
          shortDescription: shortDescription ?? existingProduct.shortDescription,
          description: description ?? existingProduct.description,
          image: validImages[0] || existingProduct.image,
          images: validImages,
          inStock: inStock !== undefined ? Boolean(inStock) : existingProduct.inStock,
          stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity) : existingProduct.stockQuantity,
          badge: badge !== undefined ? badge : existingProduct.badge,
          specs: {
            create: Array.isArray(specs)
              ? specs.filter((s: any) => s.label?.trim() && s.value?.trim()).map((s: any) => ({
                  label: s.label,
                  value: s.value,
                }))
              : [],
          },
        },
        include: {
          specs: true,
        },
      });
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE product
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

    const existingProduct = await db.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await db.product.delete({
      where: { id: existingProduct.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
