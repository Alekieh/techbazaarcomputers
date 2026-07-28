"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
  Filter,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  Pencil,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Gallery Modal state
  const [activeGallery, setActiveGallery] = useState<{
    images: string[];
    title: string;
    currentIndex: number;
  } | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("Error deleting product");
    } finally {
      setDeletingId(null);
    }
  };

  const openGallery = (product: any) => {
    const photoList =
      product.images && product.images.length > 0
        ? product.images
        : [product.image || "/images/products/hp-elitebook-g8.jpg"];

    setActiveGallery({
      images: photoList,
      title: product.name,
      currentIndex: 0,
    });
  };

  const nextPhoto = () => {
    if (!activeGallery) return;
    setActiveGallery({
      ...activeGallery,
      currentIndex: (activeGallery.currentIndex + 1) % activeGallery.images.length,
    });
  };

  const prevPhoto = () => {
    if (!activeGallery) return;
    setActiveGallery({
      ...activeGallery,
      currentIndex:
        (activeGallery.currentIndex - 1 + activeGallery.images.length) %
        activeGallery.images.length,
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Inventory Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Products Catalog ({filteredProducts.length})
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage live store items, multi-photo galleries, pricing, and specs.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-3 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-bold rounded-2xl text-sm transition-all shadow-[0_0_20px_rgba(218,160,23,0.25)] hover:shadow-[0_0_30px_rgba(218,160,23,0.4)] flex items-center gap-2 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-4 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-xl">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search laptops by name, model, or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gold shrink-0" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-950/80 border border-slate-800/80 text-slate-200 text-sm rounded-2xl px-4 py-3 focus:outline-none focus:border-gold font-medium"
          >
            <option value="all">All Categories ({products.length})</option>
            <option value="laptops">Laptops ({products.filter((p) => p.category === "laptops").length})</option>
            <option value="desktops">Desktops ({products.filter((p) => p.category === "desktops").length})</option>
            <option value="accessories">Accessories ({products.filter((p) => p.category === "accessories").length})</option>
          </select>
        </div>
      </div>

      {/* Products Digital Table */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {loading ? (
          <div className="p-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono">Fetching catalog from PostgreSQL...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <Package className="w-12 h-12 mx-auto mb-3 text-slate-700 opacity-40 animate-pulse" />
            <p className="text-base font-bold text-slate-300">No products found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or filter settings.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                <tr>
                  <th className="px-6 py-4">Laptop Photos</th>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Selling Price</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4">Badge Tag</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredProducts.map((product) => {
                  const photoCount =
                    product.images && product.images.length > 0
                      ? product.images.length
                      : 1;

                  return (
                    <tr key={product.id} className="hover:bg-slate-900/60 transition-colors group">
                      {/* Multi-Photo Stack Column */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openGallery(product)}
                          className="relative w-20 h-16 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 shadow-inner group-hover:border-gold/60 transition-all duration-300 block group/img text-left"
                          title="Click to view all photo angles"
                        >
                          <Image
                            src={product.image || "/images/products/hp-elitebook-g8.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover/img:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-1 right-1 bg-slate-950/80 border border-slate-700 text-gold text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                            <Images className="w-2.5 h-2.5" />
                            <span>{photoCount}</span>
                          </div>
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Maximize2 className="w-4 h-4 text-gold" />
                          </div>
                        </button>
                      </td>

                      {/* Title & Category Column */}
                      <td className="px-6 py-4">
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="font-bold text-white hover:text-gold transition-colors flex items-center gap-1.5 text-base"
                        >
                          <span>{product.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                        </Link>
                        <p className="text-xs font-mono text-slate-400 capitalize mt-0.5">
                          Category: {product.category}
                        </p>
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-200">{product.brand}</td>

                      <td className="px-6 py-4">
                        <div className="font-black text-gold font-mono text-base">{formatPrice(product.price)}</div>
                        {product.originalPrice && (
                          <div className="text-xs font-mono text-slate-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {product.inStock ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>In Stock</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Out of Stock</span>
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {product.badge ? (
                          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/30">
                            {product.badge}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-xs font-mono">—</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-2.5 text-slate-400 hover:text-gold hover:bg-gold/10 rounded-xl transition-all border border-transparent hover:border-gold/20"
                            title="Edit Product & Photos"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            disabled={deletingId === product.id}
                            className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                            title="Delete Product"
                          >
                            {deletingId === product.id ? (
                              <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Multi-Photo Lightbox Gallery Modal with Next/Prev Carousel Controls */}
      {activeGallery && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveGallery(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0B0F19] border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">{activeGallery.title}</h3>
                <p className="text-xs font-mono text-gold">
                  Photo {activeGallery.currentIndex + 1} of {activeGallery.images.length}
                </p>
              </div>
              <button
                onClick={() => setActiveGallery(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Carousel Display with Navigation Arrows */}
            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
              <Image
                src={activeGallery.images[activeGallery.currentIndex]}
                alt={`${activeGallery.title} - Photo ${activeGallery.currentIndex + 1}`}
                fill
                className="object-contain"
              />

              {activeGallery.images.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 border border-slate-800 text-white hover:text-gold hover:border-gold/50 transition-all shadow-xl"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 border border-slate-800 text-white hover:text-gold hover:border-gold/50 transition-all shadow-xl"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Multi-Photo Thumbnail Bar */}
            {activeGallery.images.length > 1 && (
              <div className="flex justify-center gap-3 overflow-x-auto py-2">
                {activeGallery.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGallery({ ...activeGallery, currentIndex: idx })}
                    className={`relative w-16 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeGallery.currentIndex === idx
                        ? "border-gold scale-105 shadow-lg shadow-gold/20"
                        : "border-slate-800 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
