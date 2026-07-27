"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toggleCart, itemCount } = useCart();

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

          {/* Right section: Cart & Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-slate-100 hover:text-gold transition-colors"
              aria-label="Toggle cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-slate-950 rounded-full text-xs font-bold flex items-center justify-center animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-slate-100 hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-50 animate-fade-in-fast md:hidden flex flex-col">
          <div className="flex justify-end p-4 sm:px-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-dark-100 hover:text-gold transition-colors"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center pb-20">
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (pathname === "/products" && link.href.startsWith("/products"));
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-medium transition-colors ${
                        isActive
                          ? "text-gold"
                          : "text-dark-200 hover:text-gold"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
