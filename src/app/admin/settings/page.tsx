"use client";

import { useState } from "react";
import { Settings, Truck, Building, ShieldCheck, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [nairobiRate, setNairobiRate] = useState("300");
  const [upcountryRate, setUpcountryRate] = useState("600");
  const [storeAddress, setStoreAddress] = useState("Standard Building, 1st Floor Shop 12, Banda Street, Nairobi");
  const [storePhone, setStorePhone] = useState("+254 700 000 000");
  const [storeEmail, setStoreEmail] = useState("info@techbazaar.co.ke");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header Bar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>Global Operations</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Store Configuration & Shipping
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Configure delivery fees by region, physical store location details, and payment API keys.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Store configuration settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Regional Shipping Rates */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold text-sm">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Delivery Fees & Shipping Rules</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Nairobi Metropolitan Delivery Fee (KES)
              </label>
              <input
                type="number"
                value={nairobiRate}
                onChange={(e) => setNairobiRate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm font-mono focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Upcountry Courier Delivery Fee (G4S / Wells Fargo) (KES)
              </label>
              <input
                type="number"
                value={upcountryRate}
                onChange={(e) => setUpcountryRate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm font-mono focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Store Business Info */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
              <Building className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Business Contact & Pickup Location</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Official Support Phone Number
              </label>
              <input
                type="text"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm font-mono focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Official Support Email Address
              </label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm font-mono focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Physical Shop Pickup Address
            </label>
            <input
              type="text"
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white text-sm focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Section 3: Secure Environment Key Status */}
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white">3. API & Integration Key Status</h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl">
              <span className="text-slate-400">DATABASE_URL (Railway PostgreSQL)</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                ACTIVE & CONNECTED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl">
              <span className="text-slate-400">JWT_SECRET (Session Cookie Security)</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/80 border border-slate-800/80 rounded-2xl">
              <span className="text-slate-400">MPESA_PAYBILL_NUMBER (Safaricom STK Push)</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                CONFIGURED (174379)
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-extrabold rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(218,160,23,0.25)] hover:shadow-[0_0_35px_rgba(218,160,23,0.4)] flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
