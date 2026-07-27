"use client";

import { useEffect, useState } from "react";
import { Users, Search, Phone, Mail, Calendar, ShoppingBag, DollarSign } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customers");
      const data = await res.json();
      if (res.ok) {
        setCustomers(data.customers || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search))
  );

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
            <Users className="w-3.5 h-3.5" />
            <span>Customer Directory & CRM</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Registered Customers ({filteredCustomers.length})
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            View customer order histories, contact information, and spending metrics.
          </p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 p-4 rounded-3xl backdrop-blur-xl flex items-center shadow-xl">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by customer name, phone number, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {loading ? (
          <div className="p-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono">Loading customer records...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-slate-700 opacity-40 animate-pulse" />
            <p className="text-base font-bold text-slate-300">No customers found</p>
            <p className="text-xs text-slate-500 mt-1">Try searching with a different name or phone number.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                <tr>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Total Orders</th>
                  <th className="px-6 py-4 font-mono text-right">Lifetime Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredCustomers.map((customer) => {
                  const totalSpent = (customer.orders || []).reduce(
                    (sum: number, o: any) => sum + o.total,
                    0
                  );

                  return (
                    <tr key={customer.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold flex items-center justify-center font-bold text-sm">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-white text-base">{customer.name}</p>
                            <span className="text-[10px] font-mono text-slate-500 uppercase">Customer ID: {customer.id.slice(-6)}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-slate-300 flex items-center gap-1.5 text-xs font-mono">
                          <Phone className="w-3.5 h-3.5 text-gold" />
                          {customer.phone || "N/A"}
                        </p>
                        <p className="text-slate-400 flex items-center gap-1.5 text-xs mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          {customer.email}
                        </p>
                      </td>

                      <td className="px-6 py-4 font-mono text-xs text-slate-400">
                        {new Date(customer.createdAt).toLocaleDateString("en-KE")}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-slate-950 text-white border border-slate-800">
                          {customer.orders ? customer.orders.length : 0} order(s)
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right font-black text-gold font-mono text-base">
                        {formatPrice(totalSpent)}
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
