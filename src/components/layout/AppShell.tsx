"use client";

import { CartProvider } from "@/components/cart/CartProvider";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </WishlistProvider>
  );
}
