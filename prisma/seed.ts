import fs from "fs";
import path from "path";

// Ensure DATABASE_URL has sslmode=require
if (fs.existsSync(".env")) {
  const envContent = fs.readFileSync(".env", "utf8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*"(.*)"\s*$/) || line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
}

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

  // 2. Seed Default Categories
  const defaultCategories = [
    { name: "Laptops", slug: "laptops" },
    { name: "Desktops", slug: "desktops" },
    { name: "Accessories", slug: "accessories" },
    { name: "Business Laptops", slug: "business-laptops" },
    { name: "Touchscreen 2-in-1", slug: "touchscreen-2-in-1" },
  ];

  for (const cat of defaultCategories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Seeded default Categories");

  // 3. Seed Default Brands
  const defaultBrands = [
    { name: "HP", slug: "hp" },
    { name: "Dell", slug: "dell" },
    { name: "Lenovo", slug: "lenovo" },
    { name: "Apple", slug: "apple" },
    { name: "Asus", slug: "asus" },
    { name: "Acer", slug: "acer" },
  ];

  for (const brand of defaultBrands) {
    await db.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    });
  }
  console.log("✅ Seeded default Brands");

  // 4. Seed Products
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
          stockQuantity: 5,
          lowStockThreshold: 3,
          active: true,
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

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
