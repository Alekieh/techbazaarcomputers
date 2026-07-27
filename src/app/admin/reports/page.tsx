"use client";

import { useEffect, useState } from "react";
import { BarChart3, DollarSign, Smartphone, ShoppingBag, TrendingUp, Award, CreditCard } from "lucide-react";

export default function AdminReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reports");
      const json = await res.json();
      if (res.ok) {
        setData(json.reports);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header Bar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Business Intelligence Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Sales Reports & Analytics
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Analyze store revenue trends, best-selling laptop models, and M-Pesa vs Cash payment performance.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
          <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono">Aggregating business performance metrics...</p>
        </div>
      ) : (
        <>
          {/* Top KPI Metric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-xl space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gold" />
                Total Verified Sales Revenue
              </span>
              <p className="text-3xl font-black text-white font-mono">
                {formatPrice(data?.totalRevenue)}
              </p>
              <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Verified Paid Transactions
              </p>
            </div>

            <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-xl space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                M-Pesa STK Transactions
              </span>
              <p className="text-3xl font-black text-emerald-400 font-mono">
                {data?.paymentBreakdown?.mpesa || 0}
              </p>
              <p className="text-xs text-slate-400 font-mono">Direct Safaricom Mobile Money</p>
            </div>

            <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-xl space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-400" />
                Cash On Delivery (COD)
              </span>
              <p className="text-3xl font-black text-blue-400 font-mono">
                {data?.paymentBreakdown?.cod || 0}
              </p>
              <p className="text-xs text-slate-400 font-mono">Doorstep Payment on Delivery</p>
            </div>
          </div>

          {/* Best-Selling Laptop Models */}
          <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold text-white">Top-Selling Laptop Lines</h3>
              </div>
              <span className="text-xs font-mono text-slate-500">By Total Order Units</span>
            </div>

            <div className="space-y-3">
              {data?.bestSellers && data.bestSellers.length > 0 ? (
                data.bestSellers.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-mono font-bold text-sm">
                        #{i + 1}
                      </span>
                      <span className="font-bold text-white text-base">{item.productName}</span>
                    </div>

                    <div className="flex items-center gap-6 font-mono text-sm">
                      <span className="text-slate-400">{item._sum.quantity} Units Sold</span>
                      <span className="font-black text-gold">
                        {formatPrice(item._sum.totalPrice)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 font-mono text-center py-6">
                  Sales breakdown will populate as orders are completed.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
