export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  icon: string; // SVG path data for icons
  image: string;
}

export const categories: Category[] = [
  {
    id: "laptops",
    name: "Laptops",
    slug: "laptops",
    description:
      "Premium business and personal laptops from top brands. Quality-checked and ready for work.",
    productCount: 67,
    icon: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm6 10h4m-8 2h12",
    image: "/images/categories/laptops.jpg",
  },
  {
    id: "desktops",
    name: "Desktops",
    slug: "desktops",
    description:
      "Powerful desktop computers for offices and business environments. Built for performance.",
    productCount: 3,
    icon: "M9 17V7h6v10M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2zm7-14v2",
    image: "/images/categories/desktops.jpg",
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    description:
      "Essential peripherals and accessories to complete your setup. Mice, bags, hubs, and more.",
    productCount: 5,
    icon: "M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z",
    image: "/images/categories/accessories.jpg",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
