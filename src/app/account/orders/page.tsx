"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { ShoppingBag, ArrowLeft, Clock, Truck, CheckCircle2, MapPin, DollarSign, Smartphone, ExternalLink, Printer, RotateCcw, PackageCheck } from "lucide-react";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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

  const getStepNumber = (status: string) => {
    switch (status) {
      case "PENDING":
        return 1;
      case "CONFIRMED":
        return 2;
      case "SHIPPED":
        return 3;
      case "DELIVERED":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 selection:bg-gold selection:text-slate-950 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B0F19] border-b border-slate-800/80 py-10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-gold transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Order Tracking & Purchase History ({orders.length})
              </h1>
              <p className="text-slate-400 text-xs mt-0.5">
                Live delivery progress timeline, Safaricom M-Pesa receipts, and G4S courier tracking IDs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono">Loading purchase tracking records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-16 text-center text-slate-500 space-y-4">
            <ShoppingBag className="w-16 h-16 mx-auto text-slate-700 opacity-40 animate-pulse" />
            <h3 className="text-xl font-bold text-white">No Purchase History Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              When you buy a laptop, your live order timeline and G4S courier tracking info will appear here.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-gold text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-gold/20 hover:scale-105 transition-transform"
            >
              Browse Laptop Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const currentStep = getStepNumber(order.orderStatus);

              return (
                <div
                  key={order.id}
                  className="bg-[#0B0F19] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8"
                >
                  {/* Order Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xl font-black text-gold">
                          {order.orderNumber}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString("en-KE", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
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
                        M-Pesa: {order.paymentStatus}
                      </span>

                      <button
                        onClick={() => window.print()}
                        className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-gold" />
                        <span>Print Receipt</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Stepper Tracker Bar */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Live Delivery Progress Stepper:
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                      {/* Step 1: Order Placed */}
                      <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-xs border ${
                            currentStep >= 1
                              ? "bg-gold text-slate-950 border-gold shadow-lg shadow-gold/20"
                              : "bg-slate-900 text-slate-600 border-slate-800"
                          }`}
                        >
                          1
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Order Placed</p>
                          <p className="text-[10px] text-slate-500 font-mono">System logged</p>
                        </div>
                      </div>

                      {/* Step 2: Payment Confirmed */}
                      <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-xs border ${
                            currentStep >= 2
                              ? "bg-gold text-slate-950 border-gold shadow-lg shadow-gold/20"
                              : "bg-slate-900 text-slate-600 border-slate-800"
                          }`}
                        >
                          2
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">M-Pesa Verified</p>
                          <p className="text-[10px] text-slate-500 font-mono">STK Callback</p>
                        </div>
                      </div>

                      {/* Step 3: Dispatched via G4S */}
                      <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-xs border ${
                            currentStep >= 3
                              ? "bg-gold text-slate-950 border-gold shadow-lg shadow-gold/20"
                              : "bg-slate-900 text-slate-600 border-slate-800"
                          }`}
                        >
                          3
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">G4S Dispatched</p>
                          <p className="text-[10px] text-slate-500 font-mono">Tracking Active</p>
                        </div>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-xs border ${
                            currentStep >= 4
                              ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20"
                              : "bg-slate-900 text-slate-600 border-slate-800"
                          }`}
                        >
                          4
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Delivered</p>
                          <p className="text-[10px] text-slate-500 font-mono">Handed over</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logistics & Price Summary Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
                      <span className="font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        <span>Delivery Address</span>
                      </span>
                      <p className="font-bold text-white text-sm">{order.customerName}</p>
                      <p className="text-slate-400">{order.customerPhone}</p>
                      <p className="text-slate-300">
                        {order.deliveryAddress}, {order.deliveryCity} ({order.deliveryRegion})
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
                      <span className="font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-gold" />
                        <span>G4S Courier Tracking</span>
                      </span>
                      {order.trackingNumber ? (
                        <div className="space-y-1">
                          <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs px-3 py-1 rounded-xl">
                            Ref: {order.trackingNumber}
                          </span>
                          <p className="text-[10px] text-slate-400 font-mono">
                            Courier: G4S Kenya Express
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-500 font-mono">
                          Generating G4S Courier reference ID...
                        </span>
                      )}
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                      <span className="font-mono font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                        Total Amount Paid
                      </span>
                      <span className="text-2xl font-black text-gold font-mono">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items List Table */}
                  <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider font-bold border-b border-slate-800">
                        <tr>
                          <th className="px-4 py-3">Purchased Laptop Item</th>
                          <th className="px-4 py-3">Qty</th>
                          <th className="px-4 py-3 text-right">Price</th>
                          <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50 text-slate-300">
                        {order.items.map((item: any) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 font-bold text-white flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
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
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => {
                                  if (item.product) addToCart(item.product, 1);
                                }}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-gold border border-gold/30 rounded-xl text-[11px] font-mono font-bold transition-colors inline-flex items-center gap-1"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Buy Again</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
