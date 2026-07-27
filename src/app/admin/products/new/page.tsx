"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Plus, Trash2, AlertCircle, Sparkles, Check, Eye } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "laptops",
    brand: "HP",
    price: "",
    originalPrice: "",
    shortDescription: "",
    description: "",
    image: "/images/products/hp-elitebook-g8.jpg",
    inStock: true,
    badge: "",
  });

  const [specs, setSpecs] = useState([
    { label: "Processor", value: "Intel Core i7 11th Gen" },
    { label: "RAM", value: "16GB DDR4" },
    { label: "Storage", value: "512GB NVMe SSD" },
    { label: "Display", value: '14.0" Full HD Touchscreen' },
    { label: "Operating System", value: "Windows 11 Pro" },
  ]);

  const presetImages = [
    { label: "HP EliteBook Silver", url: "/images/products/hp-elitebook-g8.jpg" },
    { label: "HP x360 Touchscreen", url: "/images/products/hp-x360-tent.jpg" },
    { label: "Dell Latitude Dark", url: "/images/products/dell-latitude-7000.jpg" },
    { label: "ThinkPad Matte Black", url: "/images/products/thinkpad-t490s.jpg" },
    { label: "ThinkPad Yoga 2-in-1", url: "/images/products/thinkpad-x1-yoga.jpg" },
  ];

  const handleAddSpec = () => {
    setSpecs([...specs, { label: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "label" | "value", val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        specs: specs.filter((s) => s.label.trim() && s.value.trim()),
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Products List</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1">
            Create Store Product
          </h1>
          <p className="text-slate-400 text-sm">
            Publish a new tech item live into your Railway PostgreSQL database.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
          {/* Section 1: Basic Information */}
          <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-6 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-base font-bold text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>1. Item Identity & Pricing</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HP EliteBook 840 G8 i7"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Brand Manufacturer *
                </label>
                <select
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold font-medium"
                >
                  <option value="HP">HP</option>
                  <option value="Dell">Dell</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Apple">Apple</option>
                  <option value="Asus">Asus</option>
                  <option value="Acer">Acer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Selling Price (KES) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="49000"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm font-mono focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Original Was Price (KES)
                </label>
                <input
                  type="number"
                  placeholder="55000"
                  value={form.originalPrice}
                  onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm font-mono focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Store Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold font-medium"
                >
                  <option value="laptops">Laptops</option>
                  <option value="desktops">Desktops</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Promo Tag Badge
                </label>
                <select
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold font-medium"
                >
                  <option value="">None</option>
                  <option value="bestseller">Best Seller</option>
                  <option value="sale">Special Sale</option>
                  <option value="new">New Arrival</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Short Highlight Summary
              </label>
              <input
                type="text"
                placeholder="e.g. Ultra-slim business laptop with Touchscreen & Backlit keyboard"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Detailed Product Description
              </label>
              <textarea
                rows={3}
                placeholder="Detailed description of hardware condition, warranty, and features..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold"
              />
            </div>

            {/* Presets Image Selector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Product Image (Select Preset or Paste Custom URL)
              </label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm font-mono focus:outline-none focus:border-gold mb-3"
              />
              <div className="flex flex-wrap gap-2">
                {presetImages.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm({ ...form, image: preset.url })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      form.image === preset.url
                        ? "bg-gold text-slate-950 font-bold shadow-md shadow-gold/20"
                        : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specifications */}
          <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-6 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-bold text-white">
                2. Technical Specifications ({specs.length})
              </h3>
              <button
                type="button"
                onClick={handleAddSpec}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-gold font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-gold/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add Spec Row</span>
              </button>
            </div>

            <div className="space-y-3">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Label (e.g. RAM)"
                    value={spec.label}
                    onChange={(e) => handleSpecChange(i, "label", e.target.value)}
                    className="w-1/3 px-3.5 py-2.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 16GB DDR4)"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(i, "value", e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(i)}
                    className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-2xl transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Action */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/products"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl text-sm transition-colors border border-slate-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-extrabold rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(218,160,23,0.25)] hover:shadow-[0_0_35px_rgba(218,160,23,0.4)] flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save & Publish Product</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Right Column: Live Storefront Card Preview */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
            <Eye className="w-4 h-4 text-gold" />
            <span>Storefront Preview Card</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl relative overflow-hidden group">
            {form.badge && (
              <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-gold text-slate-950 text-[10px] font-black uppercase rounded-full shadow-md">
                {form.badge}
              </span>
            )}
            
            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 mb-4">
              <Image
                src={form.image || "/images/products/hp-elitebook-g8.jpg"}
                alt={form.name || "Product Preview"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-gold font-mono">
              {form.brand} • {form.category}
            </span>

            <h4 className="text-base font-bold text-slate-900 line-clamp-1 mt-0.5">
              {form.name || "Product Title Preview"}
            </h4>

            <p className="text-xs text-slate-500 line-clamp-2 mt-1">
              {form.shortDescription || "Short product description will appear here on storefront product cards."}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-slate-900">
                  {formatPrice(parseFloat(form.price))}
                </span>
                {form.originalPrice && (
                  <span className="text-xs text-slate-400 line-through block">
                    {formatPrice(parseFloat(form.originalPrice))}
                  </span>
                )}
              </div>
              <span className="px-3 py-1.5 bg-slate-900 text-gold text-xs font-bold rounded-xl shadow-sm">
                In Stock
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
