"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    updateQuantity,
    removeFromCart,
    itemCount,
    subtotal,
  } = useCart();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };
    
    if (isCartOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 animate-fade-in-fast"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-slate-200 z-50 animate-slide-in-right flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-slate-900">Shopping Cart</h2>
            <span className="bg-gold text-dark-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {itemCount}
            </span>
          </div>
          <button 
            onClick={closeCart}
            className="text-dark-400 hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center text-dark-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <p className="text-lg font-medium text-white">Your cart is empty</p>
              <p className="text-dark-400 mb-4">Looks like you haven't added anything yet.</p>
              <Link href="/products" onClick={closeCart} className="w-full block">
                <Button className="w-full justify-center">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  {/* Image placeholder */}
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-600 flex items-center justify-center shrink-0">
                    <span className="text-gold font-bold text-xl uppercase">
                      {item.product.name.substring(0, 2)}
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-medium text-white line-clamp-1" title={item.product.name}>
                        {item.product.name}
                      </h3>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-dark-400 hover:text-red-500 transition-colors mt-1 shrink-0"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-gold font-semibold">
                      {formatPrice(item.product.price)}
                    </div>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                      <span className="text-white w-4 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-dark-700 p-6 bg-dark-900 mt-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-dark-200">Subtotal</span>
              <span className="text-xl font-bold text-gold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="space-y-3 flex flex-col gap-3">
              <Link href="/cart" onClick={closeCart} className="w-full block">
                <Button variant="secondary" className="w-full justify-center">
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeCart} className="w-full block">
                <Button className="w-full justify-center">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
