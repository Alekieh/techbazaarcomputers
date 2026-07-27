export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "laptops" | "desktops" | "accessories";
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  specs: ProductSpec[];
  features: string[];
  image: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  badge?: "new" | "sale" | "bestseller";
}

// Real High-Resolution Photography Catalog
const IMG_HP_EBOOK_G8 = "/images/products/hp-elitebook-g8.jpg";
const IMG_HP_X360_TENT = "/images/products/hp-x360-tent.jpg";
const IMG_DELL_7000 = "/images/products/dell-latitude-7000.jpg";
const IMG_THINKPAD_T490 = "/images/products/thinkpad-t490s.jpg";
const IMG_THINKPAD_YOGA = "/images/products/thinkpad-x1-yoga.jpg";

// Real Unsplash Photography URLs for variety
const U_HP_SILVER = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80";
const U_HP_X360 = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80";
const U_DELL_LATITUDE = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80";
const U_THINKPAD_BLACK = "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80";
const U_YOGA_2IN1 = "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80";
const U_LAPTOP_BUSINESS = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80";
const U_LAPTOP_DARK = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80";
const U_TECH_WORK = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80";

export const products: Product[] = [
  // ==========================================
  // HP ELITEBOOK & PROBOOK (35 ITEMS)
  // ==========================================
  {
    id: "hp-x360-1040-g6-i5-16-256",
    name: "HP x360 1040 G6 i5 16/256",
    slug: "hp-x360-1040-g6-i5-16-256",
    category: "laptops",
    brand: "HP",
    price: 42000,
    originalPrice: 48000,
    description: "Real photograph of the premium convertible 2-in-1 HP EliteBook x360 1040 G6 with 360-degree hinge, 8th Gen Intel Core i5, 16GB RAM, and 256GB NVMe SSD. Touchscreen display.",
    shortDescription: '14" Touch 360° | Core i5 | 16GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "Storage", value: "256GB PCIe NVMe SSD" },
      { label: "Display", value: '14" FHD IPS Touchscreen 360° Convertible' },
      { label: "OS", value: "Windows 11 Pro" }
    ],
    features: ["360° Convertible Hinge", "Touchscreen Display", "HP Sure View Privacy Screen", "Backlit Keyboard"],
    image: IMG_HP_X360_TENT,
    images: [IMG_HP_X360_TENT, U_HP_X360],
    inStock: true,
    rating: 4.8,
    reviewCount: 42,
    badge: "bestseller"
  },
  {
    id: "hp-830-g8-i7-16-512-touch",
    name: "HP 830 G8 i7 16/512 Touch",
    slug: "hp-830-g8-i7-16-512-touch",
    category: "laptops",
    brand: "HP",
    price: 49000,
    originalPrice: 56000,
    description: "Actual photograph of the ultra-modern 11th Gen Intel Core i7 HP EliteBook 830 G8 with 16GB RAM and 512GB SSD. Beautiful FHD Touchscreen in precision aluminum chassis.",
    shortDescription: '13.3" FHD Touch | Core i7 11th Gen | 16GB RAM | 512GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (11th Gen)" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "Storage", value: "512GB NVMe SSD" },
      { label: "Display", value: '13.3" FHD Touchscreen' },
      { label: "OS", value: "Windows 11 Pro" }
    ],
    features: ["11th Gen Core i7 Power", "Bang & Olufsen Premium Audio", "Thunderbolt 4 Ports", "Fingerprint Reader"],
    image: IMG_HP_EBOOK_G8,
    images: [IMG_HP_EBOOK_G8, U_HP_SILVER],
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
    badge: "new"
  },
  {
    id: "hp-830-g8-i7-16-512-nontouch",
    name: "HP 830 G8 i7 16/512 Non-touch",
    slug: "hp-830-g8-i7-16-512-nontouch",
    category: "laptops",
    brand: "HP",
    price: 47000,
    originalPrice: 53000,
    description: "HP EliteBook 830 G8 powered by 11th Gen Intel Core i7 processor, 16GB RAM, 512GB SSD, Anti-glare FHD display.",
    shortDescription: '13.3" FHD Anti-glare | Core i7 11th Gen | 16GB RAM | 512GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (11th Gen)" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: '13.3" FHD IPS Anti-glare' },
      { label: "OS", value: "Windows 11 Pro" }
    ],
    features: ["Ultra-lightweight Aluminum Body", "11th Gen Performance", "All-day Battery Life"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER, IMG_HP_EBOOK_G8],
    inStock: true,
    rating: 4.7,
    reviewCount: 29
  },
  {
    id: "hp-830-g8-i5-8-256-touch",
    name: "HP 830 G8 i5 8/256 Touch",
    slug: "hp-830-g8-i5-8-256-touch",
    category: "laptops",
    brand: "HP",
    price: 39000,
    originalPrice: 44000,
    description: "11th Gen HP EliteBook 830 G8 featuring Core i5, 8GB RAM, 256GB SSD, and responsive FHD Touchscreen.",
    shortDescription: '13.3" Touch | Core i5 11th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (11th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB NVMe SSD" },
      { label: "Display", value: '13.3" FHD Touchscreen' }
    ],
    features: ["Touchscreen Display", "HP Noise Cancellation", "Slim Bezel Design"],
    image: IMG_HP_EBOOK_G8,
    images: [IMG_HP_EBOOK_G8],
    inStock: true,
    rating: 4.6,
    reviewCount: 24
  },
  {
    id: "hp-840-g7-i5-8-256-touch",
    name: "HP 840 G7 i5 8/256 Touch",
    slug: "hp-840-g7-i5-8-256-touch",
    category: "laptops",
    brand: "HP",
    price: 35000,
    originalPrice: 40000,
    description: "Real picture of the sleek 10th Gen HP EliteBook 840 G7 featuring Core i5 processor, 8GB RAM, 256GB SSD, and 14-inch Touchscreen.",
    shortDescription: '14" Touch | Core i5 10th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (10th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB NVMe SSD" },
      { label: "Display", value: '14" FHD IPS Touch' }
    ],
    features: ["14-inch Touch Display", "Premium Silver Finish", "Backlit Keyboard"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER, IMG_HP_EBOOK_G8],
    inStock: true,
    rating: 4.7,
    reviewCount: 31,
    badge: "sale"
  },
  {
    id: "hp-x360-830-g7-i7-16-512",
    name: "HP x360 830 G7 i7 16/512",
    slug: "hp-x360-830-g7-i7-16-512",
    category: "laptops",
    brand: "HP",
    price: 44000,
    originalPrice: 50000,
    description: "Versatile 10th Gen Core i7 HP EliteBook x360 830 G7 2-in-1 touch laptop. Equipped with 16GB RAM and 512GB SSD.",
    shortDescription: '13.3" Touch 360° | Core i7 10th Gen | 16GB RAM | 512GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (10th Gen)" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "Storage", value: "512GB NVMe SSD" },
      { label: "Display", value: '13.3" FHD Touch 360°' }
    ],
    features: ["360° Hinge", "10th Gen Core i7", "512GB High Speed Storage"],
    image: IMG_HP_X360_TENT,
    images: [IMG_HP_X360_TENT, U_HP_X360],
    inStock: true,
    rating: 4.8,
    reviewCount: 35
  },
  {
    id: "hp-830-g7-i5-8-256-touch",
    name: "HP 830 G7 i5 8/256 Touch",
    slug: "hp-830-g7-i5-8-256-touch",
    category: "laptops",
    brand: "HP",
    price: 34000,
    originalPrice: 38000,
    description: "Compact 13.3-inch HP EliteBook 830 G7 with 10th Gen Core i5, 8GB RAM, 256GB SSD, Touchscreen display.",
    shortDescription: '13.3" Touch | Core i5 10th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (10th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '13.3" FHD Touch' }
    ],
    features: ["Compact Portable Design", "Touchscreen Navigation", "Fast NVMe SSD"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.5,
    reviewCount: 19
  },
  {
    id: "hp-x360-1030-g3g4-i7-16-512",
    name: "HP x360 1030 G3/G4 i7 16/512",
    slug: "hp-x360-1030-g3g4-i7-16-512",
    category: "laptops",
    brand: "HP",
    price: 44000,
    originalPrice: 50000,
    description: "Top-tier HP EliteBook x360 1030 G3/G4 with Intel Core i7, 16GB RAM, 512GB SSD, Ultra-thin aluminum unibody.",
    shortDescription: '13.3" Touch 360° | Core i7 | 16GB RAM | 512GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (8th Gen)" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "Storage", value: "512GB NVMe SSD" },
      { label: "Display", value: '13.3" FHD Touchscreen 360°' }
    ],
    features: ["Executive Design", "4 Speakers Bang & Olufsen", "360° Touch Flip"],
    image: U_HP_X360,
    images: [U_HP_X360, IMG_HP_X360_TENT],
    inStock: true,
    rating: 4.8,
    reviewCount: 56,
    badge: "bestseller"
  },
  {
    id: "hp-x360-1030-g3g4-i5-8-256",
    name: "HP x360 1030 G3/G4 i5 8/256",
    slug: "hp-x360-1030-g3g4-i5-8-256",
    category: "laptops",
    brand: "HP",
    price: 35000,
    originalPrice: 40000,
    description: "HP EliteBook x360 1030 G3/G4 Core i5 with 8GB RAM, 256GB SSD. Sleek convertible touchscreen laptop.",
    shortDescription: '13.3" Touch 360° | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '13.3" FHD Touch 360°' }
    ],
    features: ["2-in-1 Tablet Mode", "Backlit Keyboard", "Face ID Camera"],
    image: IMG_HP_X360_TENT,
    images: [IMG_HP_X360_TENT],
    inStock: true,
    rating: 4.6,
    reviewCount: 28
  },
  {
    id: "hp-x360-1030-g2-i5-16-512",
    name: "HP x360 1030 G2 i5 16/512",
    slug: "hp-x360-1030-g2-i5-16-512",
    category: "laptops",
    brand: "HP",
    price: 33000,
    originalPrice: 38000,
    description: "Popular HP EliteBook x360 1030 G2 with 16GB RAM, 512GB SSD, Core i5 processor. Aluminum 2-in-1 touchscreen.",
    shortDescription: '13.3" Touch 360° | Core i5 | 16GB RAM | 512GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (7th Gen)" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "Storage", value: "512GB NVMe SSD" },
      { label: "Display", value: '13.3" FHD Touch 360°' }
    ],
    features: ["16GB Large RAM", "512GB High Capacity SSD", "360° Flip"],
    image: U_HP_X360,
    images: [U_HP_X360],
    inStock: true,
    rating: 4.5,
    reviewCount: 33
  },
  {
    id: "hp-840-g8-i5-8-256",
    name: "HP 840 G8 i5 8/256",
    slug: "hp-840-g8-i5-8-256",
    category: "laptops",
    brand: "HP",
    price: 39000,
    originalPrice: 45000,
    description: "Modern 11th Gen Intel Core i5 HP EliteBook 840 G8 with 8GB RAM, 256GB SSD, 14-inch FHD display.",
    shortDescription: '14" FHD | Core i5 11th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (11th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB NVMe SSD" },
      { label: "Display", value: '14" FHD IPS Anti-glare' }
    ],
    features: ["11th Gen Processor", "14-inch Full HD Display", "Precision Touchpad"],
    image: IMG_HP_EBOOK_G8,
    images: [IMG_HP_EBOOK_G8],
    inStock: true,
    rating: 4.7,
    reviewCount: 22,
    badge: "new"
  },
  {
    id: "hp-830-g6-i7-16-512-touch",
    name: "HP 830 G6 i7 16/512 Touch",
    slug: "hp-830-g6-i7-16-512-touch",
    category: "laptops",
    brand: "HP",
    price: 37000,
    originalPrice: 42000,
    description: "High performance HP EliteBook 830 G6 with 8th Gen Core i7, 16GB RAM, 512GB SSD, Touchscreen.",
    shortDescription: '13.3" Touch | Core i7 | 16GB RAM | 512GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (8th Gen)" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: '13.3" FHD Touch' }
    ],
    features: ["Core i7 Performance", "16GB RAM Multitasking", "Touch Display"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.6,
    reviewCount: 27
  },
  {
    id: "hp-745-g6-ryzen5-8-256-touch",
    name: "HP 745 G6 Ryzen 5 8/256 Touch",
    slug: "hp-745-g6-ryzen5-8-256-touch",
    category: "laptops",
    brand: "HP",
    price: 30000,
    originalPrice: 35000,
    description: "AMD Ryzen 5 powered HP EliteBook 745 G6 with Vega graphics, 8GB RAM, 256GB SSD, and FHD Touchscreen.",
    shortDescription: '14" Touch | AMD Ryzen 5 Pro | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "AMD Ryzen 5 PRO" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB NVMe SSD" },
      { label: "Display", value: '14" FHD Touch' },
      { label: "Graphics", value: "Radeon Vega Graphics" }
    ],
    features: ["Radeon Vega Graphics", "Touchscreen", "Slim Silver Body"],
    image: U_LAPTOP_BUSINESS,
    images: [U_LAPTOP_BUSINESS],
    inStock: true,
    rating: 4.5,
    reviewCount: 18
  },
  {
    id: "hp-745-g6-ryzen5-8-256-nontouch",
    name: "HP 745 G6 Ryzen 5 8/256 Non-touch",
    slug: "hp-745-g6-ryzen5-8-256-nontouch",
    category: "laptops",
    brand: "HP",
    price: 28000,
    originalPrice: 32000,
    description: "HP EliteBook 745 G6 featuring AMD Ryzen 5 PRO processor, 8GB RAM, 256GB SSD, anti-glare display.",
    shortDescription: '14" FHD Anti-glare | AMD Ryzen 5 Pro | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "AMD Ryzen 5 PRO" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" FHD Anti-glare' }
    ],
    features: ["Great Value AMD Power", "Quiet Cooling", "Metal Chassis"],
    image: U_LAPTOP_BUSINESS,
    images: [U_LAPTOP_BUSINESS],
    inStock: true,
    rating: 4.4,
    reviewCount: 20
  },
  {
    id: "hp-840-g5-i7-16-512",
    name: "HP 840 G5 i7 16/512",
    slug: "hp-840-g5-i7-16-512",
    category: "laptops",
    brand: "HP",
    price: 35000,
    originalPrice: 40000,
    description: "Classic high-spec HP EliteBook 840 G5 with Core i7 (8th Gen), 16GB RAM, 512GB SSD, 14-inch Full HD display.",
    shortDescription: '14" FHD | Core i7 8th Gen | 16GB RAM | 512GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (8th Gen)" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: '14" FHD IPS' }
    ],
    features: ["Core i7 Quad-Core", "16GB RAM", "512GB Fast SSD"],
    image: IMG_HP_EBOOK_G8,
    images: [IMG_HP_EBOOK_G8],
    inStock: true,
    rating: 4.7,
    reviewCount: 45,
    badge: "bestseller"
  },
  {
    id: "hp-840-g5-i5-8-256-touch",
    name: "HP 840 G5 i5 8/256 Touch",
    slug: "hp-840-g5-i5-8-256-touch",
    category: "laptops",
    brand: "HP",
    price: 31000,
    originalPrice: 35000,
    description: "HP EliteBook 840 G5 Core i5 8th Gen, 8GB RAM, 256GB SSD, and responsive 14-inch Touchscreen.",
    shortDescription: '14" Touch | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" FHD Touch' }
    ],
    features: ["Touch Screen", "Durable Aluminum Case", "USB Type-C"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.6,
    reviewCount: 26
  },
  {
    id: "hp-840-g5-i5-8-256",
    name: "HP 840 G5 i5 8/256",
    slug: "hp-840-g5-i5-8-256",
    category: "laptops",
    brand: "HP",
    price: 28000,
    originalPrice: 32000,
    description: "Best seller HP EliteBook 840 G5 with Core i5 (8th Gen), 8GB RAM, 256GB SSD, 14-inch display.",
    shortDescription: '14" FHD | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" FHD Anti-glare' }
    ],
    features: ["Reliable Workhorse", "Slim Aluminum Body", "Long Battery Life"],
    image: IMG_HP_EBOOK_G8,
    images: [IMG_HP_EBOOK_G8],
    inStock: true,
    rating: 4.6,
    reviewCount: 65,
    badge: "bestseller"
  },
  {
    id: "hp-x360-830-g5g6-i5-8-256",
    name: "HP x360 830 G5/G6 i5 8/256",
    slug: "hp-x360-830-g5g6-i5-8-256",
    category: "laptops",
    brand: "HP",
    price: 33000,
    originalPrice: 37000,
    description: "HP EliteBook x360 830 G5/G6 2-in-1 convertible touchscreen with Core i5, 8GB RAM, 256GB SSD.",
    shortDescription: '13.3" Touch 360° | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '13.3" Touch 360°' }
    ],
    features: ["360° Flip Mode", "Touchscreen", "Lightweight"],
    image: IMG_HP_X360_TENT,
    images: [IMG_HP_X360_TENT],
    inStock: true,
    rating: 4.5,
    reviewCount: 22
  },
  {
    id: "hp-830-g5-i5-8-256",
    name: "HP 830 G5 i5 8/256",
    slug: "hp-830-g5-i5-8-256",
    category: "laptops",
    brand: "HP",
    price: 28000,
    originalPrice: 32000,
    description: "Compact 13.3-inch HP EliteBook 830 G5 with Core i5 8th Gen, 8GB RAM, 256GB SSD.",
    shortDescription: '13.3" FHD | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '13.3" FHD' }
    ],
    features: ["Compact 13.3-inch", "Core i5 Power", "Quiet Cooling"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.5,
    reviewCount: 17
  },
  {
    id: "hp-840-g3-i7-8-256",
    name: "HP 840 G3 i7 8/256",
    slug: "hp-840-g3-i7-8-256",
    category: "laptops",
    brand: "HP",
    price: 25000,
    originalPrice: 29000,
    description: "HP EliteBook 840 G3 featuring Core i7 processor, 8GB RAM, 256GB SSD, 14-inch display.",
    shortDescription: '14" FHD | Core i7 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (6th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" FHD' }
    ],
    features: ["Core i7 Speed", "Slim Aluminum Design", "Spill Resistant Keyboard"],
    image: U_LAPTOP_BUSINESS,
    images: [U_LAPTOP_BUSINESS],
    inStock: true,
    rating: 4.4,
    reviewCount: 30
  },
  {
    id: "hp-840-g3-touch",
    name: "HP 840 G3 Touch",
    slug: "hp-840-g3-touch",
    category: "laptops",
    brand: "HP",
    price: 26000,
    originalPrice: 30000,
    description: "HP EliteBook 840 G3 Touchscreen with Core i5, 8GB RAM, 256GB SSD, 14-inch display.",
    shortDescription: '14" Touch | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (6th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" FHD Touchscreen' }
    ],
    features: ["Touchscreen Display", "Silver Aluminum Finish", "DisplayPort + VGA"],
    image: U_LAPTOP_BUSINESS,
    images: [U_LAPTOP_BUSINESS],
    inStock: true,
    rating: 4.4,
    reviewCount: 21
  },
  {
    id: "hp-840-g4-i5-touch",
    name: "HP 840 G4 i5 Touch",
    slug: "hp-840-g4-i5-touch",
    category: "laptops",
    brand: "HP",
    price: 27000,
    originalPrice: 31000,
    description: "HP EliteBook 840 G4 Touchscreen with Core i5 (7th Gen), 8GB RAM, 256GB SSD.",
    shortDescription: '14" Touch | Core i5 7th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (7th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" FHD Touchscreen' }
    ],
    features: ["7th Gen Core i5", "FHD Touchscreen", "Robust Build Quality"],
    image: U_LAPTOP_BUSINESS,
    images: [U_LAPTOP_BUSINESS],
    inStock: true,
    rating: 4.5,
    reviewCount: 25
  },
  {
    id: "hp-840-g3-i5",
    name: "HP 840 G3 i5",
    slug: "hp-840-g3-i5",
    category: "laptops",
    brand: "HP",
    price: 23000,
    originalPrice: 27000,
    description: "Highly affordable HP EliteBook 840 G3 Core i5, 8GB RAM, 256GB SSD.",
    shortDescription: '14" HD/FHD | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (6th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" Display' }
    ],
    features: ["Unbeatable Price", "Durable Business Laptop", "Fast SSD Boot"],
    image: U_LAPTOP_BUSINESS,
    images: [U_LAPTOP_BUSINESS],
    inStock: true,
    rating: 4.4,
    reviewCount: 52,
    badge: "sale"
  },
  {
    id: "hp-820-g4-i5",
    name: "HP 820 G4 i5",
    slug: "hp-820-g4-i5",
    category: "laptops",
    brand: "HP",
    price: 22000,
    originalPrice: 26000,
    description: "Compact 12.5-inch ultraportable HP EliteBook 820 G4 Core i5 (7th Gen), 8GB RAM, 256GB SSD.",
    shortDescription: '12.5" Compact | Core i5 7th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (7th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" Anti-glare' }
    ],
    features: ["12.5-inch Lightweight", "7th Gen Core i5", "Ultra Portable"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.3,
    reviewCount: 14
  },
  {
    id: "hp-820-g3-i5",
    name: "HP 820 G3 i5",
    slug: "hp-820-g3-i5",
    category: "laptops",
    brand: "HP",
    price: 21000,
    originalPrice: 25000,
    description: "Ultra portable 12.5-inch HP EliteBook 820 G3 Core i5, 8GB RAM, 256GB SSD.",
    shortDescription: '12.5" Compact | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (6th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" Display' }
    ],
    features: ["Compact Design", "High Portability", "Great Value"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.3,
    reviewCount: 16
  },
  {
    id: "hp-840-g2-i5",
    name: "HP 840 G2 i5",
    slug: "hp-840-g2-i5",
    category: "laptops",
    brand: "HP",
    price: 20000,
    originalPrice: 24000,
    description: "Budget-friendly HP EliteBook 840 G2 Core i5, 8GB RAM, 256GB SSD.",
    shortDescription: '14" Display | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (5th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" HD' }
    ],
    features: ["Budget Friendly", "Solid Business Performance", "SSD Included"],
    image: U_LAPTOP_BUSINESS,
    images: [U_LAPTOP_BUSINESS],
    inStock: true,
    rating: 4.2,
    reviewCount: 19
  },
  {
    id: "hp-640-g3-i5",
    name: "HP 640 G3 i5",
    slug: "hp-640-g3-i5",
    category: "laptops",
    brand: "HP",
    price: 23000,
    originalPrice: 27000,
    description: "Sturdy HP ProBook 640 G3 Core i5, 8GB RAM, 256GB SSD with DVD Drive option and full connectivity.",
    shortDescription: '14" Display | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (7th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" HD/FHD' }
    ],
    features: ["Full Port Selection", "VGA & Ethernet Built-in", "Durable ProBook Body"],
    image: U_LAPTOP_BUSINESS,
    images: [U_LAPTOP_BUSINESS],
    inStock: true,
    rating: 4.3,
    reviewCount: 15
  },
  {
    id: "hp-folio-9470m",
    name: "HP Folio 9470m",
    slug: "hp-folio-9470m",
    category: "laptops",
    brand: "HP",
    price: 17000,
    originalPrice: 21000,
    description: "Ultra-slim HP EliteBook Folio 9470m Core i5, 8GB RAM, 256GB SSD.",
    shortDescription: '14" Slim | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" HD' }
    ],
    features: ["Super Slim Profile", "Lightweight Silver Body", "Great Starter Laptop"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.2,
    reviewCount: 22
  },
  {
    id: "hp-folio-9480m",
    name: "HP Folio 9480m",
    slug: "hp-folio-9480m",
    category: "laptops",
    brand: "HP",
    price: 18000,
    originalPrice: 22000,
    description: "Refined HP EliteBook Folio 9480m Core i5, 8GB RAM, 256GB SSD.",
    shortDescription: '14" Slim | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (4th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" HD' }
    ],
    features: ["Sleek Metallic Finish", "Responsive Performance", "Backlit Keyboard"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.3,
    reviewCount: 18
  },
  {
    id: "hp-probook-x360-11-g6",
    name: "HP ProBook x360 11 G6",
    slug: "hp-probook-x360-11-g6",
    category: "laptops",
    brand: "HP",
    price: 25000,
    originalPrice: 29000,
    description: "Rugged HP ProBook x360 11 G6 2-in-1 Touchscreen laptop. Perfect for students and field work.",
    shortDescription: '11.6" Touch 360° | Intel Core / Celeron | 8GB RAM | 128/256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Processor" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '11.6" HD Touch 360°' }
    ],
    features: ["Rubber Bumper Edge Protection", "360° Flip Screen", "Spill Resistant Keyboard"],
    image: IMG_HP_X360_TENT,
    images: [IMG_HP_X360_TENT],
    inStock: true,
    rating: 4.4,
    reviewCount: 11
  },
  {
    id: "hp-probook-x360-11-g4",
    name: "HP ProBook x360 11 G4",
    slug: "hp-probook-x360-11-g4",
    category: "laptops",
    brand: "HP",
    price: 22000,
    originalPrice: 25000,
    description: "Compact 11.6-inch HP ProBook x360 11 G4 Touchscreen convertible.",
    shortDescription: '11.6" Touch 360° | Intel | 4/8GB RAM | 128/256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Processor" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "128GB/256GB SSD" },
      { label: "Display", value: '11.6" HD Touch 360°' }
    ],
    features: ["Touchscreen 360", "Durable Build", "Long Battery"],
    image: IMG_HP_X360_TENT,
    images: [IMG_HP_X360_TENT],
    inStock: true,
    rating: 4.3,
    reviewCount: 9
  },
  {
    id: "hp-probook-x360-11-g2",
    name: "HP ProBook x360 11 G2",
    slug: "hp-probook-x360-11-g2",
    category: "laptops",
    brand: "HP",
    price: 20000,
    originalPrice: 23000,
    description: "Student favorite HP ProBook x360 11 G2 convertible touchscreen laptop.",
    shortDescription: '11.6" Touch 360° | Intel | 4GB RAM | 128GB SSD',
    specs: [
      { label: "Processor", value: "Intel Processor" },
      { label: "RAM", value: "4GB/8GB" },
      { label: "Storage", value: "128GB SSD" },
      { label: "Display", value: '11.6" HD Touch 360°' }
    ],
    features: ["Affordable 2-in-1", "Rugged Design", "Lightweight"],
    image: IMG_HP_X360_TENT,
    images: [IMG_HP_X360_TENT],
    inStock: true,
    rating: 4.2,
    reviewCount: 13
  },
  {
    id: "hp-probook-x360-11-g1",
    name: "HP ProBook x360 11 G1",
    slug: "hp-probook-x360-11-g1",
    category: "laptops",
    brand: "HP",
    price: 15000,
    originalPrice: 18000,
    description: "Entry level HP ProBook x360 11 G1 Touchscreen 360 laptop.",
    shortDescription: '11.6" Touch 360° | Intel | 4GB RAM | 128GB SSD',
    specs: [
      { label: "Processor", value: "Intel Processor" },
      { label: "RAM", value: "4GB" },
      { label: "Storage", value: "128GB SSD" },
      { label: "Display", value: '11.6" HD Touch 360°' }
    ],
    features: ["Super Affordable Touchscreen", "360 Flip", "Good Battery"],
    image: IMG_HP_X360_TENT,
    images: [IMG_HP_X360_TENT],
    inStock: true,
    rating: 4.1,
    reviewCount: 15,
    badge: "sale"
  },
  {
    id: "hp-8460-8470",
    name: "HP 8460/8470",
    slug: "hp-8460-8470",
    category: "laptops",
    brand: "HP",
    price: 15000,
    originalPrice: 18000,
    description: "Ultra heavy-duty HP EliteBook 8460p/8470p Core i5, 4GB/8GB RAM, SSD/HDD.",
    shortDescription: '14" Heavy Duty | Core i5 | 4GB/8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5" },
      { label: "RAM", value: "4GB / 8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" HD' }
    ],
    features: ["Titanium Alloy Construction", "Extreme Durability", "Full Interfaces"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.2,
    reviewCount: 20
  },
  {
    id: "hp-8560-8570",
    name: "HP 8560/8570",
    slug: "hp-8560-8570",
    category: "laptops",
    brand: "HP",
    price: 15000,
    originalPrice: 18000,
    description: "Large 15.6-inch HP EliteBook 8560p/8570p with numeric keypad, Core i5, SSD.",
    shortDescription: '15.6" Big Screen | Core i5 | 4GB/8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5" },
      { label: "RAM", value: "4GB / 8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '15.6" Big Screen with Numpad' }
    ],
    features: ["15.6-inch Large Screen", "Numeric Keypad", "Solid Metal Shell"],
    image: U_HP_SILVER,
    images: [U_HP_SILVER],
    inStock: true,
    rating: 4.2,
    reviewCount: 14
  },

  // ==========================================
  // DELL LATITUDE (6 ITEMS)
  // ==========================================
  {
    id: "dell-latitude-5300-i5-touch",
    name: "Dell Latitude 5300 i5 Touch",
    slug: "dell-latitude-5300-i5-touch",
    category: "laptops",
    brand: "Dell",
    price: 29000,
    originalPrice: 34000,
    description: "Real photo of the 8th Gen Core i5 Dell Latitude 5300 with 8GB RAM, 256GB SSD, and 13.3-inch Touchscreen display.",
    shortDescription: '13.3" Touch | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB NVMe SSD" },
      { label: "Display", value: '13.3" FHD Touchscreen' }
    ],
    features: ["Touchscreen Display", "Compact Black Frame", "Fast ExpressCharge"],
    image: IMG_DELL_7000,
    images: [IMG_DELL_7000, U_DELL_LATITUDE],
    inStock: true,
    rating: 4.7,
    reviewCount: 29,
    badge: "bestseller"
  },
  {
    id: "dell-latitude-7280-i5",
    name: "Dell Latitude 7280 i5",
    slug: "dell-latitude-7280-i5",
    category: "laptops",
    brand: "Dell",
    price: 21000,
    originalPrice: 25000,
    description: "Compact 12.5-inch executive ultrabook Dell Latitude 7280 Core i5 (7th Gen), 8GB RAM, 256GB SSD.",
    shortDescription: '12.5" Ultrabook | Core i5 7th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (7th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" FHD IPS' }
    ],
    features: ["Ultra-portable 12.5-inch", "Magnesium Alloy Frame", "Backlit Keyboard"],
    image: U_DELL_LATITUDE,
    images: [U_DELL_LATITUDE, IMG_DELL_7000],
    inStock: true,
    rating: 4.5,
    reviewCount: 31
  },
  {
    id: "dell-latitude-7270-i5",
    name: "Dell Latitude 7270 i5",
    slug: "dell-latitude-7270-i5",
    category: "laptops",
    brand: "Dell",
    price: 19000,
    originalPrice: 23000,
    description: "Dell Latitude 7270 Core i5 (6th Gen), 8GB RAM, 256GB SSD, lightweight 12.5-inch business laptop.",
    shortDescription: '12.5" Ultrabook | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (6th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" HD/FHD' }
    ],
    features: ["Soft Touch Carbon Fiber Lid", "Lightweight", "Reliable Performance"],
    image: IMG_DELL_7000,
    images: [IMG_DELL_7000],
    inStock: true,
    rating: 4.4,
    reviewCount: 22
  },
  {
    id: "dell-latitude-e7240-i7",
    name: "Dell Latitude E7240 i7",
    slug: "dell-latitude-e7240-i7",
    category: "laptops",
    brand: "Dell",
    price: 19000,
    originalPrice: 23000,
    description: "High speed Core i7 Dell Latitude E7240, 8GB RAM, 256GB SSD, compact 12.5-inch display.",
    shortDescription: '12.5" Compact | Core i7 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (4th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" HD' }
    ],
    features: ["Core i7 Performance", "Metal Hinges", "Fast Boot"],
    image: U_DELL_LATITUDE,
    images: [U_DELL_LATITUDE],
    inStock: true,
    rating: 4.4,
    reviewCount: 19
  },
  {
    id: "dell-latitude-e7240-i5",
    name: "Dell Latitude E7240 i5",
    slug: "dell-latitude-e7240-i5",
    category: "laptops",
    brand: "Dell",
    price: 17000,
    originalPrice: 20000,
    description: "Budget favorite Dell Latitude E7240 Core i5, 8GB RAM, 256GB SSD.",
    shortDescription: '12.5" Compact | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" HD' }
    ],
    features: ["Super Affordable", "Compact 12.5-inch", "SSD Speed"],
    image: U_DELL_LATITUDE,
    images: [U_DELL_LATITUDE],
    inStock: true,
    rating: 4.3,
    reviewCount: 25,
    badge: "sale"
  },
  {
    id: "dell-3190-x360",
    name: "Dell 3190 x360",
    slug: "dell-3190-x360",
    category: "laptops",
    brand: "Dell",
    price: 18000,
    originalPrice: 21000,
    description: "Rugged 2-in-1 Dell Education 3190 x360 touchscreen convertible laptop. Spill resistant keyboard.",
    shortDescription: '11.6" Touch 360° | Intel | 4GB/8GB RAM | 128GB SSD',
    specs: [
      { label: "Processor", value: "Intel Quad Core" },
      { label: "RAM", value: "4GB / 8GB" },
      { label: "Storage", value: "128GB SSD" },
      { label: "Display", value: '11.6" Touch 360°' }
    ],
    features: ["Ruggedized Corners", "360° Flip Screen", "Ideal for Students"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1],
    inStock: true,
    rating: 4.4,
    reviewCount: 16
  },

  // ==========================================
  // LENOVO THINKPAD (26 ITEMS)
  // ==========================================
  {
    id: "thinkpad-x1-yoga-i7-16-512",
    name: "ThinkPad X1 Yoga i7 16/512",
    slug: "thinkpad-x1-yoga-i7-16-512",
    category: "laptops",
    brand: "Lenovo",
    price: 42000,
    originalPrice: 48000,
    description: "Real photo of flagship Lenovo ThinkPad X1 Yoga convertible 2-in-1 touchscreen with Core i7, 16GB RAM, 512GB NVMe SSD, and integrated stylus pen.",
    shortDescription: '14" Touch 360° | Core i7 | 16GB RAM | 512GB SSD | Pen',
    specs: [
      { label: "Processor", value: "Intel Core i7 (8th Gen)" },
      { label: "RAM", value: "16GB LPDDR3" },
      { label: "Storage", value: "512GB PCIe NVMe SSD" },
      { label: "Display", value: '14" WQHD/FHD Touchscreen 360°' }
    ],
    features: ["Built-in Stylus Pen", "Legendary ThinkPad Keyboard", "Carbon Fiber & Magnesium Chassis", "360° Foldable"],
    image: IMG_THINKPAD_YOGA,
    images: [IMG_THINKPAD_YOGA, U_YOGA_2IN1],
    inStock: true,
    rating: 4.9,
    reviewCount: 51,
    badge: "bestseller"
  },
  {
    id: "thinkpad-x390-yoga-i7",
    name: "ThinkPad X390 Yoga i7",
    slug: "thinkpad-x390-yoga-i7",
    category: "laptops",
    brand: "Lenovo",
    price: 36000,
    originalPrice: 41000,
    description: "High performance 8th Gen Core i7 ThinkPad X390 Yoga with 16GB RAM, 512GB SSD, integrated pen, 13.3-inch 360° touchscreen.",
    shortDescription: '13.3" Touch 360° | Core i7 | 16GB RAM | 512GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (8th Gen)" },
      { label: "RAM", value: "16GB" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: '13.3" FHD Touch 360°' }
    ],
    features: ["Integrated ThinkPad Pen Pro", "360 Degree Hinge", "Rapid Charge"],
    image: IMG_THINKPAD_YOGA,
    images: [IMG_THINKPAD_YOGA, U_YOGA_2IN1],
    inStock: true,
    rating: 4.8,
    reviewCount: 34,
    badge: "new"
  },
  {
    id: "thinkpad-x380-yoga-i5-16-256",
    name: "ThinkPad X380 Yoga i5 16/256",
    slug: "thinkpad-x380-yoga-i5-16-256",
    category: "laptops",
    brand: "Lenovo",
    price: 31000,
    originalPrice: 36000,
    description: "Lenovo ThinkPad X380 Yoga Core i5 8th Gen with 16GB RAM, 256GB SSD, and FHD Touchscreen with active pen.",
    shortDescription: '13.3" Touch 360° | Core i5 | 16GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "16GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '13.3" FHD Touch 360°' }
    ],
    features: ["16GB RAM for Heavy Multitasking", "Active Pen Included", "TrackPoint"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1, IMG_THINKPAD_YOGA],
    inStock: true,
    rating: 4.7,
    reviewCount: 29
  },
  {
    id: "thinkpad-x390-yoga-i5",
    name: "ThinkPad X390 Yoga i5",
    slug: "thinkpad-x390-yoga-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 30000,
    originalPrice: 34000,
    description: "8th Gen Core i5 ThinkPad X390 Yoga with 8GB RAM, 256GB SSD, 13.3-inch Touchscreen with garaged pen.",
    shortDescription: '13.3" Touch 360° | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '13.3" FHD Touch 360°' }
    ],
    features: ["Garaged Stylus Pen", "Thunderbolt 3", "Match-on-Chip Fingerprint"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1],
    inStock: true,
    rating: 4.6,
    reviewCount: 22
  },
  {
    id: "thinkpad-x380-yoga-i5-8-256",
    name: "ThinkPad X380 Yoga i5 8/256",
    slug: "thinkpad-x380-yoga-i5-8-256",
    category: "laptops",
    brand: "Lenovo",
    price: 28000,
    originalPrice: 32000,
    description: "Versatile ThinkPad X380 Yoga Core i5 8th Gen, 8GB RAM, 256GB SSD, 13.3-inch 360° Touchscreen.",
    shortDescription: '13.3" Touch 360° | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '13.3" FHD Touch 360°' }
    ],
    features: ["360 degree display", "Built-in Pen", "Durable ThinkPad Chassis"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1],
    inStock: true,
    rating: 4.5,
    reviewCount: 20
  },
  {
    id: "thinkpad-x370-yoga-i5",
    name: "ThinkPad X370 Yoga i5",
    slug: "thinkpad-x370-yoga-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 25000,
    originalPrice: 29000,
    description: "Lenovo ThinkPad Yoga 370 Core i5 (7th Gen), 8GB RAM, 256GB SSD, 13.3-inch FHD Touchscreen.",
    shortDescription: '13.3" Touch 360° | Core i5 7th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (7th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '13.3" FHD Touch 360°' }
    ],
    features: ["360 Flip Design", "Pen Support", "Black Finish"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1],
    inStock: true,
    rating: 4.4,
    reviewCount: 17
  },
  {
    id: "thinkpad-yoga-260-i7",
    name: "ThinkPad Yoga 260 i7",
    slug: "thinkpad-yoga-260-i7",
    category: "laptops",
    brand: "Lenovo",
    price: 25000,
    originalPrice: 29000,
    description: "Core i7 Lenovo ThinkPad Yoga 260 2-in-1 convertible with 8GB RAM, 256GB SSD, 12.5-inch Touchscreen.",
    shortDescription: '12.5" Touch 360° | Core i7 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (6th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" Touch 360°' }
    ],
    features: ["Core i7 Speed", "Lift 'n' Lock Keyboard", "Compact 12.5-inch"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1],
    inStock: true,
    rating: 4.4,
    reviewCount: 15
  },
  {
    id: "thinkpad-yoga-260-i5",
    name: "ThinkPad Yoga 260 i5",
    slug: "thinkpad-yoga-260-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 23000,
    originalPrice: 27000,
    description: "Lenovo ThinkPad Yoga 260 Core i5, 8GB RAM, 256GB SSD, 12.5-inch 360° Touchscreen.",
    shortDescription: '12.5" Touch 360° | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (6th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" Touch 360°' }
    ],
    features: ["Lift and Lock Keyboard", "Integrated Stylus Pen", "Affordable 2-in-1"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1],
    inStock: true,
    rating: 4.3,
    reviewCount: 22
  },
  {
    id: "lenovo-yoga-11e-i5",
    name: "Lenovo Yoga 11e i5",
    slug: "lenovo-yoga-11e-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 20000,
    originalPrice: 24000,
    description: "Rugged Lenovo Yoga 11e with Intel Core i5 processor, 8GB RAM, 128/256GB SSD, 11.6-inch Touchscreen.",
    shortDescription: '11.6" Touch 360° | Core i5 | 8GB RAM | 128/256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '11.6" HD Touch 360°' }
    ],
    features: ["Rugged Build", "360 Convertible", "Core i5 Power"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1],
    inStock: true,
    rating: 4.4,
    reviewCount: 14
  },
  {
    id: "lenovo-yoga-11e-m3",
    name: "Lenovo Yoga 11e M3",
    slug: "lenovo-yoga-11e-m3",
    category: "laptops",
    brand: "Lenovo",
    price: 19000,
    originalPrice: 23000,
    description: "Lenovo Yoga 11e Core M3 energy-efficient touchscreen 360 laptop with fanless quiet operation.",
    shortDescription: '11.6" Touch 360° | Core M3 | 4/8GB RAM | 128GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core M3" },
      { label: "RAM", value: "4GB / 8GB" },
      { label: "Storage", value: "128GB SSD" },
      { label: "Display", value: '11.6" Touch 360°' }
    ],
    features: ["Silent Fanless Design", "Rugged Corners", "Touchscreen"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1],
    inStock: true,
    rating: 4.2,
    reviewCount: 11
  },
  {
    id: "thinkpad-t490s-i5",
    name: "ThinkPad T490s i5",
    slug: "thinkpad-t490s-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 30000,
    originalPrice: 35000,
    description: "Real picture of the slim professional Lenovo ThinkPad T490s Core i5 (8th Gen Quad-Core), 8GB/16GB RAM, 256GB SSD, 14-inch FHD display.",
    shortDescription: '14" FHD | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB NVMe SSD" },
      { label: "Display", value: '14" FHD IPS Anti-glare' }
    ],
    features: ["Slim T-Series Profile", "Quad-Core i5", "Legendary Ergonomic Keyboard"],
    image: IMG_THINKPAD_T490,
    images: [IMG_THINKPAD_T490, U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.8,
    reviewCount: 48,
    badge: "bestseller"
  },
  {
    id: "thinkpad-t480s-i5-touch",
    name: "ThinkPad T480s i5 Touch",
    slug: "thinkpad-t480s-i5-touch",
    category: "laptops",
    brand: "Lenovo",
    price: 29000,
    originalPrice: 34000,
    description: "Highly rated ThinkPad T480s Core i5 8th Gen Quad-Core with 8GB RAM, 256GB SSD, and 14-inch FHD Touchscreen.",
    shortDescription: '14" Touch | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB NVMe SSD" },
      { label: "Display", value: '14" FHD Touchscreen' }
    ],
    features: ["FHD Touchscreen", "Thunderbolt 3", "Slim T480s Body"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK, IMG_THINKPAD_T490],
    inStock: true,
    rating: 4.7,
    reviewCount: 39
  },
  {
    id: "thinkpad-t480s-i5",
    name: "ThinkPad T480s i5",
    slug: "thinkpad-t480s-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 26000,
    originalPrice: 30000,
    description: "Iconic ThinkPad T480s Quad-Core i5 (8th Gen), 8GB RAM, 256GB NVMe SSD, 14-inch FHD IPS display.",
    shortDescription: '14" FHD | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" FHD IPS' }
    ],
    features: ["Quad-Core Speed", "Fast SSD", "Lightweight Tough Frame"],
    image: IMG_THINKPAD_T490,
    images: [IMG_THINKPAD_T490],
    inStock: true,
    rating: 4.7,
    reviewCount: 55,
    badge: "sale"
  },
  {
    id: "thinkpad-t470s-i5",
    name: "ThinkPad T470s i5",
    slug: "thinkpad-t470s-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 23000,
    originalPrice: 27000,
    description: "Slim business laptop ThinkPad T470s Core i5 (7th Gen), 8GB RAM, 256GB SSD, dual battery system.",
    shortDescription: '14" FHD | Core i5 7th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (7th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" FHD IPS' }
    ],
    features: ["Dual Battery Technology", "USB Type-C", "Lightweight Matte Finish"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.5,
    reviewCount: 31
  },
  {
    id: "thinkpad-t460s-i5",
    name: "ThinkPad T460s i5",
    slug: "thinkpad-t460s-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 20000,
    originalPrice: 24000,
    description: "Reliable ThinkPad T460s Core i5 (6th Gen), 8GB RAM, 256GB SSD, 14-inch display.",
    shortDescription: '14" FHD | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (6th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" FHD' }
    ],
    features: ["Slim T-Series", "FHD Crisp Screen", "TrackPoint"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.4,
    reviewCount: 26
  },
  {
    id: "thinkpad-t440s-i5",
    name: "ThinkPad T440s i5",
    slug: "thinkpad-t440s-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 18000,
    originalPrice: 22000,
    description: "Budget business ThinkPad T440s Core i5, 8GB RAM, 256GB SSD.",
    shortDescription: '14" Display | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (4th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '14" HD/FHD' }
    ],
    features: ["Great Entry Price", "Classic ThinkPad Keyboard", "SSD Speed"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.3,
    reviewCount: 20
  },
  {
    id: "thinkpad-x390-i5",
    name: "ThinkPad X390 i5",
    slug: "thinkpad-x390-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 25000,
    originalPrice: 30000,
    description: "Ultra compact 13.3-inch ThinkPad X390 Core i5 (8th Gen Quad-Core), 8GB RAM, 256GB SSD.",
    shortDescription: '13.3" Compact | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "256GB NVMe SSD" },
      { label: "Display", value: '13.3" FHD IPS' }
    ],
    features: ["13.3-inch Ultra Compact", "PrivacyGuard Screen Shutter", "Thunderbolt 3"],
    image: IMG_THINKPAD_T490,
    images: [IMG_THINKPAD_T490],
    inStock: true,
    rating: 4.6,
    reviewCount: 27
  },
  {
    id: "thinkpad-x280-i7",
    name: "ThinkPad X280 i7",
    slug: "thinkpad-x280-i7",
    category: "laptops",
    brand: "Lenovo",
    price: 27000,
    originalPrice: 32000,
    description: "High speed Core i7 ThinkPad X280, 8GB RAM, 256GB SSD, ultra-portable 12.5-inch design.",
    shortDescription: '12.5" Ultraportable | Core i7 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (8th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" FHD IPS' }
    ],
    features: ["Core i7 Quad Core", "RapidCharge (80% in 60min)", "1.1kg Lightweight"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.7,
    reviewCount: 30
  },
  {
    id: "thinkpad-x280-i5-touch",
    name: "ThinkPad X280 i5 Touch",
    slug: "thinkpad-x280-i5-touch",
    category: "laptops",
    brand: "Lenovo",
    price: 25000,
    originalPrice: 29000,
    description: "ThinkPad X280 Core i5 8th Gen Quad-Core with Touchscreen display, 8GB RAM, 256GB SSD.",
    shortDescription: '12.5" Touch | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" FHD Touchscreen' }
    ],
    features: ["FHD Touchscreen", "Lightweight 12.5-inch", "Fast NVMe SSD"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.6,
    reviewCount: 21
  },
  {
    id: "thinkpad-x280-i5",
    name: "ThinkPad X280 i5",
    slug: "thinkpad-x280-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 23000,
    originalPrice: 27000,
    description: "Popular ultraportable ThinkPad X280 Core i5 8th Gen, 8GB RAM, 256GB SSD.",
    shortDescription: '12.5" Ultraportable | Core i5 8th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (8th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" FHD' }
    ],
    features: ["8th Gen Quad-Core i5", "Extreme Portability", "Great Value"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.5,
    reviewCount: 41
  },
  {
    id: "thinkpad-x270-touch",
    name: "ThinkPad X270 Touch",
    slug: "thinkpad-x270-touch",
    category: "laptops",
    brand: "Lenovo",
    price: 22000,
    originalPrice: 26000,
    description: "ThinkPad X270 Core i5 (7th Gen) with Touchscreen display, 8GB RAM, 256GB SSD.",
    shortDescription: '12.5" Touch | Core i5 7th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (7th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" HD/FHD Touch' }
    ],
    features: ["Dual Battery Hot-Swap Bridge", "Touchscreen", "Sturdy Frame"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.4,
    reviewCount: 18
  },
  {
    id: "thinkpad-x270",
    name: "ThinkPad X270",
    slug: "thinkpad-x270",
    category: "laptops",
    brand: "Lenovo",
    price: 20000,
    originalPrice: 24000,
    description: "ThinkPad X270 Core i5 (7th Gen), 8GB RAM, 256GB SSD, hot-swappable dual battery design.",
    shortDescription: '12.5" Compact | Core i5 7th Gen | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (7th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" HD' }
    ],
    features: ["Dual Battery Support", "Compact Size", "HDMI & USB-C"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.4,
    reviewCount: 23
  },
  {
    id: "thinkpad-x260-i7",
    name: "ThinkPad X260 i7",
    slug: "thinkpad-x260-i7",
    category: "laptops",
    brand: "Lenovo",
    price: 20000,
    originalPrice: 24000,
    description: "ThinkPad X260 Core i7 (6th Gen), 8GB RAM, 256GB SSD.",
    shortDescription: '12.5" Compact | Core i7 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i7 (6th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" HD' }
    ],
    features: ["Core i7 Processor", "Military Spec Tested", "Compact"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.4,
    reviewCount: 17
  },
  {
    id: "thinkpad-x260-i5",
    name: "ThinkPad X260 i5",
    slug: "thinkpad-x260-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 19000,
    originalPrice: 23000,
    description: "Lenovo ThinkPad X260 Core i5 (6th Gen), 8GB RAM, 256GB SSD.",
    shortDescription: '12.5" Compact | Core i5 | 8GB RAM | 256GB SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (6th Gen)" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: '12.5" HD' }
    ],
    features: ["Affordable Compact Laptop", "Fast SSD", "Long Battery"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.3,
    reviewCount: 28
  },
  {
    id: "lenovo-yoga-300e",
    name: "Lenovo Yoga 300e",
    slug: "lenovo-yoga-300e",
    category: "laptops",
    brand: "Lenovo",
    price: 17000,
    originalPrice: 20000,
    description: "Rugged Lenovo Yoga 300e Touchscreen 360 convertible laptop.",
    shortDescription: '11.6" Touch 360° | Intel | 4GB RAM | 128GB SSD',
    specs: [
      { label: "Processor", value: "Intel Processor" },
      { label: "RAM", value: "4GB" },
      { label: "Storage", value: "128GB SSD" },
      { label: "Display", value: '11.6" HD Touch 360°' }
    ],
    features: ["Pencil Touch Technology", "360 Degree Fold", "Drop Resistant"],
    image: U_YOGA_2IN1,
    images: [U_YOGA_2IN1],
    inStock: true,
    rating: 4.2,
    reviewCount: 15
  },
  {
    id: "thinkpad-x230-i5",
    name: "ThinkPad X230 i5",
    slug: "thinkpad-x230-i5",
    category: "laptops",
    brand: "Lenovo",
    price: 12000,
    originalPrice: 15000,
    description: "Super budget friendly classic ThinkPad X230 Core i5, 4GB/8GB RAM, SSD.",
    shortDescription: '12.5" Compact | Core i5 | 4GB/8GB RAM | SSD',
    specs: [
      { label: "Processor", value: "Intel Core i5 (3rd Gen)" },
      { label: "RAM", value: "4GB / 8GB" },
      { label: "Storage", value: "128GB / 256GB SSD" },
      { label: "Display", value: '12.5" HD' }
    ],
    features: ["Lowest Price Point", "Legendary Keyboard Feel", "Built Like A Tank"],
    image: U_THINKPAD_BLACK,
    images: [U_THINKPAD_BLACK],
    inStock: true,
    rating: 4.3,
    reviewCount: 35,
    badge: "sale"
  },

  // ==========================================
  // DESKTOPS
  // ==========================================
  {
    id: "hp-desktop-pro-g2",
    name: "HP Desktop Pro G2 Microtower",
    slug: "hp-desktop-pro-g2",
    category: "desktops",
    brand: "HP",
    price: 35999,
    originalPrice: 42000,
    description: "The HP Desktop Pro G2 Microtower provides reliable desktop performance for small businesses and home offices.",
    shortDescription: "Intel Core i5-9500 | 8GB RAM | 256GB SSD | Win 11 Pro",
    specs: [
      { label: "Processor", value: "Intel Core i5-9500" },
      { label: "Memory", value: "8GB DDR4" },
      { label: "Storage", value: "256GB SSD" }
    ],
    features: ["Tool-free chassis", "Multiple expansion slots"],
    image: "/images/categories/desktops.jpg",
    images: ["/images/categories/desktops.jpg"],
    inStock: true,
    rating: 4.4,
    reviewCount: 18
  },
  {
    id: "dell-optiplex-7080",
    name: "Dell OptiPlex 7080 SFF",
    slug: "dell-optiplex-7080",
    category: "desktops",
    brand: "Dell",
    price: 48999,
    originalPrice: 55000,
    description: "The Dell OptiPlex 7080 Small Form Factor delivers powerful desktop performance in a compact design.",
    shortDescription: "Intel Core i7-10700 | 16GB RAM | 512GB SSD | Win 11 Pro",
    specs: [
      { label: "Processor", value: "Intel Core i7-10700" },
      { label: "Memory", value: "16GB DDR4" },
      { label: "Storage", value: "512GB NVMe SSD" }
    ],
    features: ["Compact SFF design", "Supports up to 4 displays"],
    image: "/images/categories/desktops.jpg",
    images: ["/images/categories/desktops.jpg"],
    inStock: true,
    rating: 4.7,
    reviewCount: 23
  },

  // ==========================================
  // ACCESSORIES
  // ==========================================
  {
    id: "logitech-m720-wireless-mouse",
    name: "Logitech M720 Triathlon Wireless Mouse",
    slug: "logitech-m720-wireless-mouse",
    category: "accessories",
    brand: "Logitech",
    price: 4500,
    originalPrice: 5500,
    description: "Multi-device wireless mouse that connects up to 3 computers seamlessly.",
    shortDescription: "Multi-device | Bluetooth & USB | 24-month battery",
    specs: [
      { label: "Connectivity", value: "Bluetooth & Unifying Receiver" },
      { label: "Battery", value: "Up to 24 Months" }
    ],
    features: ["Easy Switch 3 devices", "Hyper fast scroll"],
    image: "/images/categories/accessories.jpg",
    images: ["/images/categories/accessories.jpg"],
    inStock: true,
    rating: 4.8,
    reviewCount: 88,
    badge: "bestseller"
  },
  {
    id: "usb-c-hub-7-in-1",
    name: "USB-C Hub 7-in-1 Multiport Adapter",
    slug: "usb-c-hub-7-in-1",
    category: "accessories",
    brand: "Ugreen",
    price: 3999,
    originalPrice: 5000,
    description: "Expand your laptop's connectivity with HDMI 4K, USB 3.0 ports, SD card reader, and 100W PD charging.",
    shortDescription: "HDMI 4K | 3x USB 3.0 | SD/TF | 100W PD",
    specs: [
      { label: "Ports", value: "HDMI, 3x USB 3.0, SD, MicroSD, USB-C PD" }
    ],
    features: ["4K 30Hz Output", "100W Power Pass-through"],
    image: "/images/categories/accessories.jpg",
    images: ["/images/categories/accessories.jpg"],
    inStock: true,
    rating: 4.6,
    reviewCount: 64
  }
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge === "bestseller");
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.badge === "new");
}

export function getDeals(): Product[] {
  return products.filter((p) => p.badge === "sale");
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString("en-KE")}`;
}
