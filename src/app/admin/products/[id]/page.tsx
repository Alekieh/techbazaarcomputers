"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Plus, Trash2, AlertCircle, Sparkles, Eye, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { CloudinaryImageUploader } from "@/components/ui/CloudinaryImageUploader";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "laptops",
    brand: "HP",
    price: "",
    originalPrice: "",
    shortDescription: "",
    description: "",
    inStock: true,
    stockQuantity: "5",
    badge: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        const data = await res.json();

        if (res.ok && data.product) {
          const p = data.product;
          setForm({
            name: p.name || "",
            slug: p.slug || "",
            category: p.category || "laptops",
            brand: p.brand || "HP",
            price: p.price ? String(p.price) : "",
            originalPrice: p.originalPrice ? String(p.originalPrice) : "",
            shortDescription: p.shortDescription || "",
            description: p.description || "",
            inStock: p.inStock ?? true,
            stockQuantity: p.stockQuantity ? String(p.stockQuantity) : "5",
            badge: p.badge || "",
          });

          const photoList =
            p.images && p.images.length > 0
              ? p.images
              : [p.image || "/images/products/hp-elitebook-g8.jpg"];
          setImages(photoList);

          if (p.specs && p.specs.length > 0) {
            setSpecs(p.specs.map((s: any) => ({ label: s.label, value: s.value })));
          } else {
            setSpecs([
              { label: "Processor", value: "Intel Core i7" },
              { label: "RAM", value: "16GB DDR4" },
              { label: "Storage", value: "512GB SSD" },
            ]);
          }
        } else {
          setError("Failed to load product details");
        }
      } catch (err) {
        setError("Error fetching product from database");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddImage = () => {
    setImages([...images, "/images/products/hp-elitebook-g8.jpg"]);
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) return;
    setImages(images.filter((_, i) => i !== index));
    if (activeImageIndex >= index && activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  const handleImageChange = (index: number, val: string) => {
    const updated = [...images];
    updated[index] = val;
    setImages(updated);
  };

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
    setSaving(true);
    setSuccess(false);

    try {
      const validImages = images.filter((img) => img.trim().length > 0);
      const payload = {
        ...form,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        stockQuantity: parseInt(form.stockQuantity) || 5,
        image: validImages[0] || "/images/products/hp-elitebook-g8.jpg",
        images: validImages.length > 0 ? validImages : ["/images/products/hp-elitebook-g8.jpg"],
        specs: specs.filter((s) => s.label.trim() && s.value.trim()),
      };

      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-mono">Fetching product details from PostgreSQL...</p>
      </div>
    );
  }

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
            <span>Return to Products Catalog</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1">
            Edit Product: {form.name}
          </h1>
          <p className="text-slate-400 text-sm">
            Modify product details, pricing, technical specifications, and multi-photo angles in PostgreSQL.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Product updated successfully! Redirecting to products list...</span>
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
              <span>1. Basic Details & Inventory Controls</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
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
                  Stock Units Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={form.stockQuantity}
                  onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm font-mono focus:outline-none focus:border-gold"
                />
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

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  In Stock Status
                </label>
                <select
                  value={form.inStock ? "true" : "false"}
                  onChange={(e) => setForm({ ...form, inStock: e.target.value === "true" })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold font-medium"
                >
                  <option value="true">In Stock & Ready to Ship</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Short Highlight Summary
              </label>
              <input
                type="text"
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
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Section 2: Direct Computer Upload & Multi-Photo Management */}
          <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-6 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gold" />
                <h3 className="text-base font-bold text-white">
                  2. Multiple Laptop Photo Gallery ({images.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAddImage}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-gold font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-gold/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add Extra Photo Slot</span>
              </button>
            </div>

            {/* Direct Computer Drag & Drop Uploader */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Upload Photo File from Your Computer to Cloudinary:
              </label>
              <CloudinaryImageUploader
                onImageUploaded={(url) => handleImageChange(activeImageIndex, url)}
                currentImage={images[activeImageIndex]}
              />
            </div>

            {/* Photo URLs List */}
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Manage Uploaded Photo Angles ({images.length}):
              </label>
              {images.map((imgUrl, i) => (
                <div key={i} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(i)}
                    className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border transition-colors ${
                      activeImageIndex === i
                        ? "bg-gold text-slate-950 border-gold"
                        : "bg-slate-950 text-slate-400 border-slate-800"
                    }`}
                  >
                    Photo {i + 1}
                  </button>
                  <input
                    type="text"
                    placeholder={`Photo URL #${i + 1}`}
                    value={imgUrl}
                    onChange={(e) => handleImageChange(i, e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm font-mono focus:outline-none focus:border-gold"
                  />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="p-3 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-2xl transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Technical Specifications */}
          <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-6 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-bold text-white">
                3. Technical Specifications ({specs.length})
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
              disabled={saving}
              className="px-8 py-3.5 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-extrabold rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(218,160,23,0.25)] hover:shadow-[0_0_35px_rgba(218,160,23,0.4)] flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update & Save Product</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Right Column: Live Multi-Photo Storefront Preview Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
            <Eye className="w-4 h-4 text-gold" />
            <span>Live Multi-Photo Card Preview</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl relative overflow-hidden group">
            {form.badge && (
              <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-gold text-slate-950 text-[10px] font-black uppercase rounded-full shadow-md">
                {form.badge}
              </span>
            )}

            {/* Main Preview Image */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200">
              <Image
                src={images[activeImageIndex] || images[0] || "/images/products/hp-elitebook-g8.jpg"}
                alt={form.name || "Product Preview"}
                fill
                className="object-cover transition-transform duration-500"
              />
            </div>

            {/* Multi-Photo Thumbnail Bar */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? "border-gold scale-105 shadow-md" : "border-slate-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Angle ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-gold font-mono">
              {form.brand} • {form.category} • {images.length} Photos
            </span>

            <h4 className="text-base font-bold text-slate-900 line-clamp-1 mt-0.5">
              {form.name || "Product Title Preview"}
            </h4>

            <p className="text-xs text-slate-500 line-clamp-2 mt-1">
              {form.shortDescription || "Short product description preview..."}
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
              <span
                className={`px-3 py-1.5 text-xs font-bold rounded-xl shadow-sm ${
                  form.inStock ? "bg-slate-900 text-gold" : "bg-red-500/10 text-red-500"
                }`}
              >
                {form.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
