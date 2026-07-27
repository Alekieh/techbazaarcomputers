"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowLeft, Clock, Truck, CheckCircle2, MapPin, DollarSign, Smartphone, ExternalLink } from "lucide-react";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserOrders() {
      setLoading(true);
      try {
        const res = await fetch("/api/user/orders");
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserOrders();
  }, []);

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
            <span>Return to Storefront</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                My Purchase History ({orders.length})
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">
                Track your order status, M-Pesa payments, and G4S courier tracking numbers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono">Loading purchase history from PostgreSQL...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-16 text-center text-slate-500 space-y-4">
            <ShoppingBag className="w-12 h-12 mx-auto text-slate-700 opacity-40 animate-pulse" />
            <h3 className="text-lg font-bold text-white">No Past Orders Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven&apos;t placed any orders yet. When you buy a laptop, your purchase history and G4S tracking info will appear here.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3.5 bg-gold text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-gold/20 hover:scale-105 transition-transform"
            >
              Browse Catalog & Buy Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#0B0F19] border border-slate-800/90 rounded-3xl p-6 shadow-2xl space-y-6"
              >
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl font-black text-white">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString("en-KE")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold rounded-xl px-3.5 py-1.5 border ${
                        order.paymentStatus === "PAID"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      Payment: {order.paymentStatus}
                    </span>

                    <span className="text-xs font-mono font-bold rounded-xl px-3.5 py-1.5 bg-gold/10 text-gold border border-gold/30">
                      Status: {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Delivery & Logistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span>Delivery Address</span>
                    </h4>
                    <p className="font-bold text-white">{order.customerName}</p>
                    <p className="text-slate-300 mt-0.5 text-xs">
                      {order.deliveryAddress}, {order.deliveryCity} ({order.deliveryRegion})
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-gold" />
                      <span>G4S Courier Tracking</span>
                    </h4>
                    {order.trackingNumber ? (
                      <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs px-3 py-1 rounded-xl">
                        Tracking Ref: {order.trackingNumber}
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-500">
                        Dispatching via G4S Courier...
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      Total Purchase Price
                    </span>
                    <span className="text-2xl font-black text-gold font-mono">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider font-bold border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Purchased Laptop Item</th>
                        <th className="px-4 py-3">Qty</th>
                        <th className="px-4 py-3 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                      {order.items.map((item: any) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 font-bold text-white flex items-center gap-3">
                            <div className="relative w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                              <Image
                                src={item.product?.image || "/images/products/hp-elitebook-g8.jpg"}
                                alt={item.productName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span>{item.productName}</span>
                          </td>
                          <td className="px-4 py-3 font-mono">{item.quantity}</td>
                          <td className="px-4 py-3 text-right font-black text-gold font-mono">
                            {formatPrice(item.totalPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
