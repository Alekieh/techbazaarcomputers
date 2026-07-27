"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Globe,
  Database,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Skip auth check for login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.user || data.user.role !== "ADMIN") {
          router.push("/admin/login");
        } else {
          setUser(data.user);
        }
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A0F] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(218,160,23,0.3)]" />
          <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest">
            <Zap className="w-4 h-4 animate-bounce text-gold" />
            <span>Authenticating Command Portal...</span>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      label: "Command Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      badge: "Live",
    },
    {
      label: "Products Catalog",
      href: "/admin/products",
      icon: Package,
      badge: "Inventory",
    },
    {
      label: "Customer Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
      badge: "M-Pesa",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col selection:bg-gold selection:text-slate-950 font-sans">
      {/* Background Ambient Mesh */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/50 via-[#070A0F] to-[#070A0F]" />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Futuristic Top Command Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#090D16]/80 border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center group">
              <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-white/20 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Tech Bazaar"
                  width={130}
                  height={38}
                  className="h-7 w-auto object-contain"
                />
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <span className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>POSTGRES LIVE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>View Storefront</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800/90 px-3.5 py-1.5 rounded-xl shadow-inner">
              <div className="w-7 h-7 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold text-xs">
                {user?.name?.charAt(0) || "A"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-white leading-tight">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-gold font-mono">Super Admin</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
              title="Sign Out of Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Modern Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <div className="bg-[#0B0F19]/90 border border-slate-800/80 rounded-3xl p-4 shadow-2xl backdrop-blur-xl sticky top-24 space-y-6">
            <div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase px-3 mb-2">
                Main Console
              </p>
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium text-sm transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-bold shadow-[0_0_25px_rgba(218,160,23,0.25)]"
                          : "text-slate-400 hover:bg-slate-900/80 hover:text-white border border-transparent hover:border-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 relative z-10">
                        <Icon
                          className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                            isActive ? "text-slate-950" : "text-slate-400 group-hover:text-gold"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full transition-colors ${
                          isActive
                            ? "bg-slate-950/20 text-slate-950"
                            : "bg-slate-900 text-slate-500 group-hover:bg-slate-800 group-hover:text-slate-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Sub System Information Card */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">DB Provider</span>
                <span className="text-slate-300 font-semibold flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-gold" />
                  Railway
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">ORM Engine</span>
                <span className="text-emerald-400 font-semibold font-mono">Prisma v6</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Region</span>
                <span className="text-slate-300 font-semibold">Kenya (KES)</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Page Content */}
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
