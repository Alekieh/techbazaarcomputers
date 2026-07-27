import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { products } from "../src/data/products";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Seed Default Admin User
  const adminEmail = "admin@techbazaar.co.ke";
  const existingAdmin = await db.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("AdminTech2026!", 10);
    const admin = await db.user.create({
      data: {
        name: "Tech Bazaar Admin",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
        phone: "+254700000000",
      },
    });
    console.log(`✅ Created Admin user: ${admin.email} (Password: AdminTech2026!)`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
  }

  // 2. Seed Products
  console.log(`📦 Seeding ${products.length} products into PostgreSQL database...`);

  for (const item of products) {
    const existing = await db.product.findUnique({
      where: { slug: item.slug },
    });

    if (!existing) {
      await db.product.create({
        data: {
          id: item.id,
          name: item.name,
          slug: item.slug,
          category: item.category,
          brand: item.brand,
          price: item.price,
          originalPrice: item.originalPrice,
          description: item.description,
          shortDescription: item.shortDescription,
          image: item.image,
          images: item.images || [item.image],
          inStock: item.inStock ?? true,
          rating: item.rating ?? 5.0,
          reviewCount: item.reviewCount ?? 12,
          badge: item.badge,
          specs: {
            create: item.specs.map((s) => ({
              label: s.label,
              value: s.value,
            })),
          },
        },
      });
    }
  }

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
