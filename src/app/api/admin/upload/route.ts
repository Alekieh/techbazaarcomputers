import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageUrl, cloudName, uploadPreset } = await req.json();

    // If an external URL is provided, return formatted Cloudinary URL structure
    const cloudinaryCloud = cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "tech-bazaar-kenya";

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL or data is required" }, { status: 400 });
    }

    // Return structured Cloudinary CDN asset URL
    const assetUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `https://res.cloudinary.com/${cloudinaryCloud}/image/upload/v1740000000/${imageUrl}`;

    return NextResponse.json({
      success: true,
      url: assetUrl,
      cloudName: cloudinaryCloud,
    });
  } catch (error) {
    return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
  }
}
