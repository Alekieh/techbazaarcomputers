"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlistProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok) {
          const allProducts = data.products || [];
          setProducts(allProducts.filter((p: any) => wishlist.includes(p.id)));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlistProducts();
  }, [wishlist]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 selection:bg-gold selection:text-slate-950 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B0F19] border-b border-slate-800/80 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                My Saved Wishlist ({products.length})
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">
                Your saved favorite laptops, desktops, and accessories.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono">Loading saved wishlist items...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-16 text-center text-slate-500 space-y-4">
            <Heart className="w-12 h-12 mx-auto text-slate-700 opacity-40 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Explore our laptops catalog and click the heart icon on any laptop to save it for later.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3.5 bg-gold text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-gold/20 hover:scale-105 transition-transform"
            >
              Explore Laptops Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#0B0F19] border border-slate-800/90 rounded-3xl p-5 space-y-4 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-colors group"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative w-full h-48 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden mb-4">
                    <Image
                      src={product.image || "/images/products/hp-elitebook-g8.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-red-400 hover:bg-slate-900 transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider">
                    {product.brand} • {product.category}
                  </span>

                  <h3 className="text-base font-bold text-white line-clamp-1 mt-0.5">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {product.shortDescription || product.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-gold font-mono">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through block font-mono">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {product.inStock ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-3 h-3" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/30 px-2.5 py-1 rounded-lg">
                        <XCircle className="w-3 h-3" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  disabled={!product.inStock}
                  className="w-full py-3.5 bg-gold hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md shadow-gold/20 transition-all disabled:opacity-40"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Cart</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
