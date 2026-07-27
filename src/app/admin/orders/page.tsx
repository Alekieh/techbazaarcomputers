"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Filter,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (
    orderId: string,
    field: "orderStatus" | "paymentStatus",
    value: string
  ) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (res.ok) {
        setOrders(
          orders.map((o) => (o.id === orderId ? { ...o, [field]: value } : o))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Error updating order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const copyTxCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search) ||
      (o.mpesaTxCode && o.mpesaTxCode.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header Bar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fulfillment Operations</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Customer Orders ({filteredOrders.length})
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review checkout submissions, verify M-Pesa payment codes, and update order statuses.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-4 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-xl">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search Order #, Customer Name, Phone, M-Pesa Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold transition-colors font-mono text-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gold shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950/80 border border-slate-800/80 text-slate-200 text-sm rounded-2xl px-4 py-3 focus:outline-none focus:border-gold font-medium"
          >
            <option value="all">All Order Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
          <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono">Loading orders from PostgreSQL...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-16 text-center text-slate-500">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-700 opacity-40 animate-pulse" />
          <p className="text-base font-bold text-slate-300">No orders found</p>
          <p className="text-xs text-slate-500 mt-1">There are currently no orders matching your search.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6 hover:border-slate-700 transition-colors"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl font-black text-white">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {new Date(order.createdAt).toLocaleString("en-KE")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold font-mono text-white">
                      <Smartphone className="w-4 h-4 text-gold" />
                      <span>{order.customerPhone}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>{order.customerEmail}</span>
                    </span>
                  </div>
                </div>

                {/* Status Dropdowns */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">Payment:</span>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        handleStatusChange(order.id, "paymentStatus", e.target.value)
                      }
                      className={`text-xs font-mono font-bold rounded-xl px-3.5 py-2 border focus:outline-none ${
                        order.paymentStatus === "PAID"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                      <option value="FAILED">FAILED</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">Fulfillment:</span>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order.id, "orderStatus", e.target.value)
                      }
                      className="text-xs font-mono font-bold rounded-xl px-3.5 py-2 bg-slate-950 text-gold border border-gold/40 focus:outline-none"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Delivery & Payment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>Delivery Address</span>
                  </h4>
                  <p className="font-bold text-white text-base">
                    {order.customerName}
                  </p>
                  <p className="text-slate-300 mt-0.5">
                    {order.deliveryAddress}, {order.deliveryCity}
                  </p>
                  <p className="text-xs font-mono text-slate-500 mt-1">
                    Region: {order.deliveryRegion}
                  </p>
                  {order.deliveryNotes && (
                    <p className="text-xs text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 mt-2">
                      Notes: {order.deliveryNotes}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-gold" />
                    <span>Payment Verification</span>
                  </h4>
                  <p className="text-slate-300">
                    Method: <span className="font-bold text-white">{order.paymentMethod}</span>
                  </p>

                  {order.mpesaTxCode ? (
                    <div className="mt-2 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-mono font-bold">
                      <span>Ref: {order.mpesaTxCode}</span>
                      <button
                        onClick={() => copyTxCode(order.mpesaTxCode)}
                        className="hover:text-white transition-colors"
                        title="Copy Code"
                      >
                        {copiedCode === order.mpesaTxCode ? (
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <span className="inline-block mt-2 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                      Pending Ref Verification
                    </span>
                  )}
                </div>

                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between shadow-inner">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Total Order Value
                  </span>
                  <span className="text-2xl font-black text-gold font-mono mt-1">
                    {formatPrice(order.total)}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 font-mono">
                    {order.items.length} product item(s)
                  </span>
                </div>
              </div>

              {/* Items Breakdown Table */}
              <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider font-bold border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Ordered Item</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3">Unit Price</th>
                      <th className="px-4 py-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {order.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 font-bold text-white flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 shadow-inner">
                            <img
                              src={item.product?.image || "/images/products/hp-elitebook-g8.jpg"}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span>{item.productName}</span>
                        </td>
                        <td className="px-4 py-3 font-mono">{item.quantity}</td>
                        <td className="px-4 py-3 font-mono">
                          {formatPrice(item.unitPrice)}
                        </td>
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
  );
}
