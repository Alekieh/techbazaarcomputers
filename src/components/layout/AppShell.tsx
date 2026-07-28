"use client";

import { CartProvider } from "@/components/cart/CartProvider";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";
import { StorefrontAuthGate } from "@/components/auth/StorefrontAuthGate";
import { CartDrawer } from "@/components/cart/CartDrawer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
        <StorefrontAuthGate>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </StorefrontAuthGate>
      </CartProvider>
    </WishlistProvider>
  );
}
