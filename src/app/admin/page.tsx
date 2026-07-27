import { db } from "@/lib/db";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  Zap,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Fetch real database counts and statistics
  const [productsCount, orders, totalRevenueResult, outOfStockCount, laptopsCount, desktopsCount, accessoriesCount] =
    await Promise.all([
      db.product.count(),
      db.order.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
      db.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: "PAID" },
      }),
      db.product.count({ where: { inStock: false } }),
      db.product.count({ where: { category: "laptops" } }),
      db.product.count({ where: { category: "desktops" } }),
      db.product.count({ where: { category: "accessories" } }),
    ]);

  const totalOrdersCount = await db.order.count();
  const totalRevenue = totalRevenueResult._sum.total || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* High-Tech Dashboard Header */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Command Console</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Store Performance & Analytics
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Live analytics synced directly from your Railway PostgreSQL database.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <Link
            href="/admin/products/new"
            className="px-5 py-3 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-bold rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(218,160,23,0.25)] hover:shadow-[0_0_35px_rgba(218,160,23,0.4)] flex items-center gap-2 group"
          >
            <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>Add New Item</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Futuristic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Revenue */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-gold/50 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Verified Sales Revenue
              </span>
              <h3 className="text-2xl font-black text-gold mt-2 tracking-tight">
                {formatPrice(totalRevenue)}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center shrink-0 shadow-lg shadow-gold/10">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              M-Pesa Verified
            </span>
            <span className="font-mono text-slate-500">Live</span>
          </div>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Total Orders Placed
              </span>
              <h3 className="text-2xl font-black text-white mt-2 tracking-tight">
                {totalOrdersCount}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span className="text-slate-300 font-medium">Customer Checkout Orders</span>
            <span className="font-mono text-slate-500">PostgreSQL</span>
          </div>
        </div>

        {/* Metric 3: Live Products */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Active Catalog Items
              </span>
              <h3 className="text-2xl font-black text-white mt-2 tracking-tight">
                {productsCount}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">{laptopsCount} Laptops</span>
            <span className="font-mono text-slate-500">{desktopsCount} Desktops</span>
          </div>
        </div>

        {/* Metric 4: Stock Alerts */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-amber-500/50 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Stock Replenish Alert
              </span>
              <h3 className="text-2xl font-black text-amber-400 mt-2 tracking-tight">
                {outOfStockCount}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span className="text-amber-400 font-medium">Out of Stock Items</span>
            <span className="font-mono text-slate-500">Action Needed</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-2 bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">Catalog Inventory Share</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">71 Items Total</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                  Laptops & Touchscreen 2-in-1s
                </span>
                <span className="font-mono text-gold">{laptopsCount} items ({Math.round((laptopsCount / (productsCount || 1)) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${(laptopsCount / (productsCount || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  Business Desktops & All-in-Ones
                </span>
                <span className="font-mono text-blue-400">{desktopsCount} items ({Math.round((desktopsCount / (productsCount || 1)) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${(desktopsCount / (productsCount || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Computer Accessories & Peripherals
                </span>
                <span className="font-mono text-emerald-400">{accessoriesCount} items ({Math.round((accessoriesCount / (productsCount || 1)) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${(accessoriesCount / (productsCount || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Command Shortcuts */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Quick Actions</h3>
            <p className="text-xs text-slate-400">Direct shortcuts to manage store data.</p>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-3.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-gold/40 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Add New Product</p>
                  <p className="text-[10px] text-slate-500">Publish item to store</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-gold transition-colors" />
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Manage Orders</p>
                  <p className="text-[10px] text-slate-500">Fulfill customer orders</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Customer Orders</h3>
            <p className="text-xs text-slate-400">Latest checkout submissions saved to PostgreSQL</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-gold hover:text-amber-300 transition-colors flex items-center gap-1 bg-gold/10 border border-gold/30 px-3 py-1.5 rounded-xl"
          >
            <span>View All ({totalOrdersCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-700 opacity-40 animate-pulse" />
            <p className="text-sm font-semibold text-slate-300">No customer orders recorded yet.</p>
            <p className="text-xs text-slate-500 mt-1">Orders placed on storefront will automatically show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Total Price</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-900/60 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-white">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">{order.customerName}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                        <Smartphone className="w-3 h-3 text-gold" />
                        {order.customerPhone}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-300">
                      {order.items.length} product(s)
                    </td>
                    <td className="px-6 py-4 font-black text-gold font-mono">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                          order.paymentStatus === "PAID"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {order.paymentStatus === "PAID" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>{order.paymentStatus}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-slate-950 text-slate-200 border border-slate-800">
                        <Truck className="w-3.5 h-3.5 text-gold" />
                        <span>{order.orderStatus}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
