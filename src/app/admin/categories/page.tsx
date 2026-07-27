"use client";

import { useEffect, useState } from "react";
import { Layers, Plus, Tag, Check, Sparkles } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCatName, setNewCatName] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [savingCat, setSavingCat] = useState(false);
  const [savingBrand, setSavingBrand] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, brandRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/brands"),
      ]);
      const catData = await catRes.json();
      const brandData = await brandRes.json();
      setCategories(catData.categories || []);
      setBrands(brandData.brands || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setSavingCat(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName }),
      });
      if (res.ok) {
        setNewCatName("");
        fetchData();
      }
    } catch (err) {
      alert("Error adding category");
    } finally {
      setSavingCat(false);
    }
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    setSavingBrand(true);
    try {
      const res = await fetch("/api/admin/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBrandName }),
      });
      if (res.ok) {
        setNewBrandName("");
        fetchData();
      }
    } catch (err) {
      alert("Error adding brand");
    } finally {
      setSavingBrand(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header Bar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Store Taxonomy Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Categories & Brand Consistency
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage store categories (e.g. Business Laptops, Gaming) and standardized manufacturer brand names.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Box: Store Categories */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold text-sm">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">Store Categories</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">{categories.length} Registered</span>
          </div>

          {/* Add Category Form */}
          <form onSubmit={handleAddCategory} className="flex gap-3">
            <input
              type="text"
              required
              placeholder="e.g. Touchscreen 2-in-1 Laptops"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              disabled={savingCat}
              className="px-5 py-3 bg-gold hover:bg-gold-light text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-1.5 shrink-0 shadow-md shadow-gold/20 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </form>

          {/* Categories List */}
          <div className="space-y-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-sm"
              >
                <span className="font-bold text-white">{cat.name}</span>
                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  slug: {cat.slug}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Box: Standardized Brands */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
                <Tag className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">Laptop Brands</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">{brands.length} Brands</span>
          </div>

          {/* Add Brand Form */}
          <form onSubmit={handleAddBrand} className="flex gap-3">
            <input
              type="text"
              required
              placeholder="e.g. Microsoft Surface"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              disabled={savingBrand}
              className="px-5 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 shrink-0 shadow-md shadow-blue-500/20 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Add Brand</span>
            </button>
          </form>

          {/* Brands List */}
          <div className="space-y-2">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="flex items-center justify-between p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-sm"
              >
                <span className="font-bold text-white">{brand.name}</span>
                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  slug: {brand.slug}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
