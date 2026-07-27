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
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Fetch real database counts and statistics
  const [productsCount, orders, totalRevenueResult] = await Promise.all([
    db.product.count(),
    db.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    db.order.aggregate({
      _sum: { total: true },
      where: { paymentStatus: "PAID" },
    }),
  ]);

  const outOfStockCount = await db.product.count({
    where: { inStock: false },
  });

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
      {/* Header Banner */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Real-time snapshot of your Tech Bazaar store performance and inventory.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Revenue
              </p>
              <h3 className="text-2xl font-bold text-gold mt-1">
                {formatPrice(totalRevenue)}
              </h3>
            </div>
            <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">From paid orders</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Orders
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {totalOrdersCount}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">All customer orders</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Live Products
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {productsCount}
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">In PostgreSQL database</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Out of Stock
              </p>
              <h3 className="text-2xl font-bold text-amber-400 mt-1">
                {outOfStockCount}
              </h3>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Requires stock update</p>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-white">Add New Product</h4>
            <p className="text-sm text-slate-400 mt-1">
              Add a new laptop or accessory to your store catalog.
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 bg-gold hover:bg-gold-light text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <span>Add Item</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-white">Manage Orders</h4>
            <p className="text-sm text-slate-400 mt-1">
              View and update status of customer orders.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-all border border-slate-700 flex items-center gap-2 shrink-0"
          >
            <span>View Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent Orders</h3>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-gold hover:underline flex items-center gap-1"
          >
            <span>View All ({totalOrdersCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-600 opacity-40" />
            <p className="text-sm">No customer orders placed yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Order #</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-white">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-slate-400">
                        {order.customerPhone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {order.items.length} item(s)
                    </td>
                    <td className="px-6 py-4 font-bold text-gold">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
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
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
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
