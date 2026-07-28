"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductBySlug, formatPrice, Product } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { useCart } from '@/components/cart/CartProvider';
import { useWishlist } from '@/components/wishlist/WishlistProvider';
import { ShoppingBag, Heart, ShieldCheck, Truck, ArrowLeft, Star, CheckCircle2, RotateCcw } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchLiveProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (res.ok && data.product) {
          setProduct(data.product);

          // Fetch related category products
          const catRes = await fetch(`/api/products?category=${data.product.category}`);
          const catData = await catRes.json();
          if (catRes.ok && catData.products) {
            setRelatedProducts(
              catData.products.filter((p: any) => p.id !== data.product.id).slice(0, 4)
            );
          }
        } else {
          // Fallback to static data
          const fallback = getProductBySlug(slug);
          if (fallback) setProduct(fallback);
        }
      } catch (err) {
        const fallback = getProductBySlug(slug);
        if (fallback) setProduct(fallback);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-gold font-mono gap-3">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-xs">Loading Live Laptop Details from Database...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-bold text-slate-700 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-6">Product Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md text-xs">
          The product you are looking for doesn't exist or has been removed from PostgreSQL database.
        </p>
        <Link href="/products">
          <button className="px-6 py-3 bg-gold text-slate-950 font-bold text-xs rounded-2xl shadow-lg">
            Back to Products Catalog
          </button>
        </Link>
      </div>
    );
  }

  const galleryImages = (product as any).images && (product as any).images.length > 0
    ? (product as any).images.filter((img: string) => img && img.trim().length > 0)
    : [product.image];

  const currentMainImage = galleryImages[activeImageIndex] || product.image;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 selection:bg-gold selection:text-slate-950 font-sans">
      {/* Header Breadcrumb */}
      <div className="bg-[#0B0F19] border-b border-slate-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <span className="text-xs font-mono text-gold uppercase tracking-wider font-bold">
            {product.brand} • {product.category}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Multi-Photo Gallery Lightbox */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full h-[400px] sm:h-[480px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl group">
              {product.badge && (
                <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-gold text-slate-950 text-[10px] font-black uppercase rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
              <Image
                src={currentMainImage || "/images/products/hp-elitebook-g8.jpg"}
                alt={product.name}
                fill
                className="object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnail Multi-Angle Selector */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-gold scale-105 shadow-lg shadow-gold/20"
                        : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img || "/images/products/hp-elitebook-g8.jpg"}
                      alt={`${product.name} Angle ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Add to Cart */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-gold uppercase tracking-widest">
                Official {product.brand} Laptop
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-white">{product.rating || "4.9"}</span>
                  <span className="text-slate-400">({(product as any).reviewsCount || product.reviewCount || 24} Reviews)</span>
                </div>
                <span className="text-slate-700">•</span>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  In Stock — Available in Nairobi Store
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#0B0F19] border border-slate-800 rounded-3xl p-6 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-gold font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-500 line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Price includes 16% VAT and 1-Year Tech Bazaar Kenya Warranty.
              </p>
            </div>

            {/* Product Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Overview & Features
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications Table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="bg-[#0B0F19] border border-slate-800 rounded-3xl p-6 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gold">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">
                        {key}
                      </span>
                      <span className="font-bold text-white mt-0.5 block">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => addToCart(product, quantity)}
                className="w-full sm:flex-1 py-4 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART NOW</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-2xl border transition-all ${
                  isWishlisted(product.id)
                    ? "bg-red-500/10 text-red-400 border-red-500/30"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
                title="Save to Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
