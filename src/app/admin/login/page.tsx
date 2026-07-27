"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to log in");
      }

      if (data.user.role !== "ADMIN") {
        throw new Error("Access denied: Admin privileges required.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-gold selection:text-slate-950 font-sans">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-block group mb-6">
          <div className="bg-white/95 px-4 py-2 rounded-2xl shadow-xl inline-block transition-transform duration-300 group-hover:scale-105 border border-white/20">
            <Image
              src="/images/logo.png"
              alt="Tech Bazaar"
              width={160}
              height={44}
              className="h-10 w-auto object-contain"
            />
          </div>
        </Link>
        <div className="flex items-center justify-center gap-2 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-2">
          <ShieldCheck className="w-4 h-4 text-gold" />
          <span>Management Command Portal</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">
          Admin Sign In
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter administrative credentials to access live PostgreSQL controls.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#0B0F19]/90 border border-slate-800/90 backdrop-blur-2xl py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2"
              >
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@techbazaar.co.ke"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2"
              >
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 bg-gradient-to-r from-gold via-amber-400 to-gold hover:from-amber-400 hover:to-gold text-slate-950 font-black rounded-2xl shadow-[0_0_25px_rgba(218,160,23,0.25)] hover:shadow-[0_0_35px_rgba(218,160,23,0.4)] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Authenticate & Access Console</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
