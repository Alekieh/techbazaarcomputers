"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { Heart, ShoppingBag, User, LogOut, Menu, X, ChevronDown, UserCheck, ShieldCheck } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { toggleCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function checkUserSession() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.ok && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        setCurrentUser(null);
      }
    }

    checkUserSession();
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
    setUserDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Laptops", href: "/products?category=laptops" },
    { name: "Desktops", href: "/products?category=desktops" },
    { name: "Accessories", href: "/products?category=accessories" },
    { name: "Track Order", href: "/account/orders" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 glass-header transition-all duration-300 ${
          isScrolled ? "shadow-xl shadow-black/40" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Left section: Logo */}
            <Link href="/" className="flex items-center group py-1">
              <img
                src="/images/logo.png"
                alt="Tech Bazaar Logo"
                className="h-10 md:h-12 w-auto object-contain bg-white px-2 py-1 rounded-md shadow-md transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Center section: Nav links */}
            <nav className="hidden lg:flex">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (pathname === "/products" && link.href.startsWith("/products"));
                  
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`text-sm font-semibold transition-colors ${
                          isActive
                            ? "text-gold"
                            : "text-slate-200 hover:text-gold"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right section: Auth User, Wishlist, Cart & Mobile toggle */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* User Account / Kilimall Style Auth Trigger */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white hover:border-gold transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold text-xs">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline-block max-w-[100px] truncate">
                      Hi, {currentUser.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#0B0F19] border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in text-xs">
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="font-bold text-white line-clamp-1">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono line-clamp-1">{currentUser.email}</p>
                      </div>

                      <Link
                        href="/account/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-900 hover:text-white"
                      >
                        <UserCheck className="w-4 h-4 text-gold" />
                        <span>My Order History</span>
                      </Link>

                      <Link
                        href="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-900 hover:text-white"
                      >
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>Saved Wishlist ({wishlistCount})</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 border-t border-slate-800 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-gold border border-gold/40 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </button>
              )}

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 text-slate-100 hover:text-gold transition-colors"
                title="My Saved Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-slate-100 hover:text-gold transition-colors"
                aria-label="Toggle cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-gold text-slate-950 rounded-full text-[10px] font-black flex items-center justify-center animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                className="lg:hidden p-2 text-slate-100 hover:text-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-xl z-50 animate-fade-in-fast lg:hidden flex flex-col">
            <div className="flex justify-end p-4 sm:px-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-100 hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center items-center gap-6 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-slate-100 hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {!currentUser ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="px-6 py-3 bg-gold text-slate-950 font-black rounded-2xl text-base shadow-lg shadow-gold/20"
                >
                  Sign In / Create Account
                </button>
              ) : (
                <Link
                  href="/account/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-gold hover:text-amber-300 transition-colors flex items-center gap-2"
                >
                  <UserCheck className="w-5 h-5" />
                  My Purchases & Orders
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Kilimall Style Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
