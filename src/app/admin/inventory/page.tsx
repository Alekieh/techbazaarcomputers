"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Boxes, AlertTriangle, CheckCircle, Search, RefreshCw, Sparkles, Plus, Minus } from "lucide-react";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInventory = async () => {
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
    fetchInventory();
  }, []);

  const handleStockUpdate = async (id: string, newStock: number) => {
    if (newStock < 0) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stockQuantity: newStock,
          inStock: newStock > 0,
        }),
      });

      if (res.ok) {
        setProducts(
          products.map((p) =>
            p.id === id ? { ...p, stockQuantity: newStock, inStock: newStock > 0 } : p
          )
        );
      }
    } catch (err) {
      alert("Error updating stock quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockItems = products.filter(
    (p) => p.stockQuantity <= (p.lowStockThreshold || 3) || !p.inStock
  );

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header Bar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-1">
            <Boxes className="w-3.5 h-3.5" />
            <span>Real-Time Inventory Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Inventory & Stock Control
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Track real-time stock levels, adjust quantities, and monitor low-stock threshold alerts.
          </p>
        </div>

        <button
          onClick={fetchInventory}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl text-xs flex items-center gap-2 border border-slate-800 shrink-0"
        >
          <RefreshCw className="w-4 h-4 text-gold" />
          <span>Refresh Stock</span>
        </button>
      </div>

      {/* Alert Banner for Low Stock */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-5 text-amber-400 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 shrink-0 text-amber-400" />
            <div>
              <p className="font-bold text-sm text-amber-300">
                Low Stock Threshold Alert ({lowStockItems.length} items)
              </p>
              <p className="text-xs text-amber-400/80">
                Some laptops are below 3 units or marked out of stock. Restock to prevent lost orders.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-4 rounded-3xl backdrop-blur-xl flex items-center shadow-xl">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search stock by laptop name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {loading ? (
          <div className="p-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono">Loading inventory data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                <tr>
                  <th className="px-6 py-4">Laptop Item</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Current Stock Level</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4 text-right">Quick Stock Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredProducts.map((product) => {
                  const isLow = (product.stockQuantity ?? 5) <= (product.lowStockThreshold || 3);

                  return (
                    <tr key={product.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                            <Image
                              src={product.image || "/images/products/hp-elitebook-g8.jpg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{product.name}</p>
                            <p className="text-xs text-slate-500 font-mono capitalize">{product.category}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-300">{product.brand}</td>

                      <td className="px-6 py-4 font-mono font-bold text-base text-white">
                        {product.stockQuantity ?? 5} units
                      </td>

                      <td className="px-6 py-4">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Low Stock Alert</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Optimal Level</span>
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStockUpdate(product.id, (product.stockQuantity ?? 5) - 1)}
                            disabled={updatingId === product.id || (product.stockQuantity ?? 5) <= 0}
                            className="p-2 bg-slate-950 border border-slate-800 hover:border-gold/50 rounded-xl text-slate-300 hover:text-white transition-colors disabled:opacity-40"
                            title="Decrease Stock"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-mono text-sm font-bold text-gold w-8 text-center">
                            {product.stockQuantity ?? 5}
                          </span>
                          <button
                            onClick={() => handleStockUpdate(product.id, (product.stockQuantity ?? 5) + 1)}
                            disabled={updatingId === product.id}
                            className="p-2 bg-slate-950 border border-slate-800 hover:border-gold/50 rounded-xl text-slate-300 hover:text-white transition-colors"
                            title="Increase Stock"
                          >
                            <Plus className="w-4 h-4" />
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
    </div>
  );
}
