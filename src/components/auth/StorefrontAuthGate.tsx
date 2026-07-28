"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, User, Phone, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Laptop, ChevronRight } from "lucide-react";

export function StorefrontAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) {
      setUnlocked(true);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        const savedGuestUnlock = localStorage.getItem("tb_guest_unlocked");

        if ((res.ok && data.user) || savedGuestUnlock === "true") {
          setUnlocked(true);
        } else {
          setUnlocked(false);
        }
      } catch (err) {
        setUnlocked(false);
      }
    }

    checkAuth();
  }, [pathname, isAdminRoute]);

  const unlockStore = () => {
    localStorage.setItem("tb_guest_unlocked", "true");
    setUnlocked(true);
  };

  const handleGoogleAuth = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const sampleEmail = `user.${Date.now().toString().slice(-4)}@gmail.com`;
      const sampleName = "Google Customer";

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: sampleEmail,
          name: sampleName,
          googleId: `goog_${Date.now()}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Google sign in failed");
      }

      unlockStore();
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
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
        throw new Error(data.error || "Failed to sign in");
      }

      unlockStore();
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          phone: regPhone,
          password: regPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      unlockStore();
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (unlocked === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-gold font-mono gap-3">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-xs">Loading Tech Bazaar Kenya Access Gate...</p>
      </div>
    );
  }

  if (unlocked || isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-[#0B0F19] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative z-10">
        {/* Left Column: Brand Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-[#0B0F19] to-slate-950 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          <div className="space-y-6">
            <div className="bg-white/95 px-4 py-2 rounded-2xl shadow-lg inline-block border border-white/20">
              <Image
                src="/images/logo.png"
                alt="Tech Bazaar Kenya"
                width={160}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gated Customer Portal</span>
              </span>
              <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight">
                Sign In to Access Laptop Deals & Catalog
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Welcome to Tech Bazaar Kenya. Please sign in or register your account to view laptop prices, specs, and order online with M-Pesa.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-xl bg-gold/10 text-gold flex items-center justify-center border border-gold/30 shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <span>HP, Dell, Lenovo, ThinkPad & Apple Laptops</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                  </div>
                <span>1-Year Tech Bazaar Warranty & Free Delivery</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <button
              onClick={unlockStore}
              className="text-xs font-mono text-slate-400 hover:text-gold transition-colors flex items-center gap-1 group"
            >
              <span>Explore Catalog as Guest Preview</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Sign In & Registration Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={googleLoading}
            className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-3 border border-slate-200"
          >
            {googleLoading ? (
              <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-[#0B0F19] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest absolute">
              Or with Email
            </span>
          </div>

          {/* Dual Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setError("");
              }}
              className={`py-2.5 rounded-xl transition-all ${
                activeTab === "login"
                  ? "bg-gold text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setError("");
              }}
              className={`py-2.5 rounded-xl transition-all ${
                activeTab === "register"
                  ? "bg-gold text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Register Account
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="john@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-black rounded-2xl shadow-lg shadow-gold/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In & Enter Website</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="John Kamau"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="john@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Phone Number (for M-Pesa & Delivery)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="0712345678"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Create Password (min 6 chars) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-black rounded-2xl shadow-lg shadow-gold/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Register Account & Enter Website</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
