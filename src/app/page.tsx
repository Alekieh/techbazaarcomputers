"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products as staticProducts } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/components/cart/CartProvider';

export default function HomePage() {
  const { addToCart } = useCart();
  const [productsList, setProductsList] = useState<any[]>(staticProducts);

  useEffect(() => {
    async function fetchLiveProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok && data.products && data.products.length > 0) {
          setProductsList(data.products);
        }
      } catch (err) {
        console.error("Error loading homepage live products:", err);
      }
    }

    fetchLiveProducts();
  }, []);

  const featuredProducts = productsList.filter(p => p.featured || p.badge === 'Bestseller').slice(0, 4);
  const newArrivals = productsList.filter(p => p.badge === 'New' || p.badge === 'Hot').slice(0, 4);
  const deals = productsList.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Premium Laptops Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-left">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold tracking-widest uppercase">
              Kenya's #1 Laptop & Tech Marketplace
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              PRO LAPTOPS FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-amber-500">WORK & GAMING</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-light">
              Explore authentic HP EliteBooks, Dell Latitudes, Lenovo ThinkPads, and Apple MacBooks with 1-Year Tech Bazaar Warranty and Same-Day M-Pesa Express Delivery in Nairobi.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-gold/20 font-black">
                  EXPLORE LAPTOPS CATALOG
                </Button>
              </Link>
              <Link href="/account/orders" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto font-mono text-xs border-slate-700 text-slate-300">
                  TRACK MY ORDER
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Laptops Section */}
      <section className="py-20 bg-[#070A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">
                Handpicked Premium Gear
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                Featured Laptops
              </h2>
            </div>
            <Link href="/products" className="text-xs font-mono font-bold text-gold hover:underline">
              View All Laptops →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredProducts.length > 0 ? featuredProducts : productsList.slice(0, 4)).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => addToCart(p, 1)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Special Deals Section */}
      <section className="py-20 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Limited Time Price Cut
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                Hot Laptop Deals
              </h2>
            </div>
            <Link href="/products" className="text-xs font-mono font-bold text-gold hover:underline">
              Browse All Deals →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(deals.length > 0 ? deals : productsList.slice(0, 4)).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => addToCart(p, 1)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
