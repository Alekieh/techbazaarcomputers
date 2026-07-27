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
  FileText,
  DollarSign,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Customer Orders ({filteredOrders.length})
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Review placed orders, verify M-Pesa payments, and update delivery fulfillment status.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by Order #, Customer Name, Phone, or M-Pesa Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-gold"
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading orders from database...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-600 opacity-40" />
          <p className="text-base font-semibold text-slate-300">
            No orders found
          </p>
          <p className="text-sm text-slate-500 mt-1">
            There are currently no customer orders matching your filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl font-extrabold text-white">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleString("en-KE")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Phone className="w-4 h-4 text-gold" />
                      <span>{order.customerPhone}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span>{order.customerEmail}</span>
                    </span>
                  </div>
                </div>

                {/* Status Selectors */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Payment Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Payment:</span>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        handleStatusChange(order.id, "paymentStatus", e.target.value)
                      }
                      className={`text-xs font-bold rounded-xl px-3 py-1.5 border focus:outline-none ${
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

                  {/* Order Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Fulfillment:</span>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order.id, "orderStatus", e.target.value)
                      }
                      className="text-xs font-bold rounded-xl px-3 py-1.5 bg-slate-950 text-gold border border-gold/30 focus:outline-none"
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

              {/* Order Info & Delivery Address Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>Delivery Details</span>
                  </h4>
                  <p className="font-semibold text-white">
                    {order.customerName}
                  </p>
                  <p className="text-slate-300">
                    {order.deliveryAddress}, {order.deliveryCity}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Region: {order.deliveryRegion}
                  </p>
                  {order.deliveryNotes && (
                    <p className="text-xs text-amber-400/90 mt-2 bg-amber-500/5 p-2 rounded-lg border border-amber-500/20">
                      Notes: {order.deliveryNotes}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-gold" />
                    <span>Payment Information</span>
                  </h4>
                  <p className="text-slate-300">
                    Method: <span className="font-semibold text-white">{order.paymentMethod}</span>
                  </p>
                  {order.mpesaTxCode && (
                    <p className="text-xs text-emerald-400 font-mono mt-1 font-bold">
                      M-Pesa Ref: {order.mpesaTxCode}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">
                    Delivery Fee: {formatPrice(order.deliveryFee)}
                  </p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    Total Order Value
                  </div>
                  <div className="text-2xl font-extrabold text-gold mt-1">
                    {formatPrice(order.total)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {order.items.length} product(s) ordered
                  </div>
                </div>
              </div>

              {/* Items Breakdown Table */}
              <div className="bg-slate-950/60 rounded-xl border border-slate-800/80 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-2.5">Item Name</th>
                      <th className="px-4 py-2.5">Qty</th>
                      <th className="px-4 py-2.5">Unit Price</th>
                      <th className="px-4 py-2.5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {order.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2.5 font-medium text-white">
                          {item.productName}
                        </td>
                        <td className="px-4 py-2.5">{item.quantity}</td>
                        <td className="px-4 py-2.5">
                          {formatPrice(item.unitPrice)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-bold text-gold">
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
