"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { Heart, ShoppingBag, UserCheck, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Laptops", href: "/products?category=laptops" },
    { name: "Desktops", href: "/products?category=desktops" },
    { name: "Accessories", href: "/products?category=accessories" },
    { name: "About", href: "/about" },
  ];

  return (
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

          {/* Right section: Wishlist, My Orders, Cart & Mobile toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Wishlist Link */}
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

            {/* Customer Orders History Link */}
            <Link
              href="/account/orders"
              className="p-2 text-slate-100 hover:text-gold transition-colors hidden sm:block"
              title="My Orders & Shipping History"
            >
              <UserCheck className="w-5 h-5" />
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
            <Link
              href="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
            >
              <Heart className="w-5 h-5 fill-red-400" />
              Saved Wishlist ({wishlistCount})
            </Link>
            <Link
              href="/account/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold text-gold hover:text-amber-300 transition-colors flex items-center gap-2"
            >
              <UserCheck className="w-5 h-5" />
              My Purchases & Orders
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
