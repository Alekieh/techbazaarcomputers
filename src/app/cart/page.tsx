// src/app/cart/page.tsx
"use client";

import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/data/products';
import { ShoppingBag, Minus, Plus, Trash2, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Page Header */}
      <div className="py-12 bg-dark-800/50 border-b border-dark-700 text-center animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-dark-400 mb-4">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-dark-200">Cart</span>
          </div>
          <h1 className="text-4xl font-bold text-dark-50 mb-2">Shopping Cart</h1>
          <p className="text-dark-300">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 animate-slide-up">
            <ShoppingBag className="w-24 h-24 text-dark-600 mb-6" strokeWidth={1} />
            <h2 className="text-2xl font-semibold text-dark-300 mb-2">Your cart is empty</h2>
            <p className="text-dark-400 mb-8 max-w-md">
              Browse our products and find something you love. We have a wide selection of premium laptops.
            </p>
            <Link href="/products">
              <Button variant="primary" size="lg">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 animate-slide-in-right">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-sm text-dark-400 font-medium pb-4 border-b border-dark-700">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-dark-700">
                {items.map((item) => (
                  <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center border-b border-dark-700">
                    {/* Product */}
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <div className="w-20 h-20 bg-dark-700 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.product.images && item.product.images.length > 0 ? (
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl font-bold text-dark-500">TB</span>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <Link href={`/products/${item.product.id}`} className="font-medium text-dark-50 hover:text-gold transition-colors line-clamp-2">
                          {item.product.name}
                        </Link>
                        <span className="text-sm text-dark-400 mt-1 capitalize">{item.product.category.replace('-', ' ')}</span>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-sm text-dark-400 hover:text-error transition-colors text-left flex items-center gap-1 mt-2 w-fit"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Mobile Price & Qty Row */}
                    <div className="col-span-1 flex justify-between items-center md:hidden mt-2">
                       <div className="font-semibold text-dark-50">{formatPrice(item.product.price * item.quantity)}</div>
                       <div className="flex items-center gap-3 bg-dark-800 rounded-lg p-1 border border-dark-700">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-dark-300 hover:text-dark-50 hover:bg-dark-700 rounded-md transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-4 text-center text-sm font-medium text-dark-50">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-dark-300 hover:text-dark-50 hover:bg-dark-700 rounded-md transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                    </div>

                    {/* Desktop Price */}
                    <div className="hidden md:block col-span-2 text-right text-dark-200">
                      {formatPrice(item.product.price)}
                    </div>

                    {/* Desktop Quantity */}
                    <div className="hidden md:flex col-span-2 justify-center">
                      <div className="flex items-center gap-3 bg-dark-800 rounded-lg p-1 border border-dark-700">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-dark-300 hover:text-dark-50 hover:bg-dark-700 rounded-md transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-4 text-center text-sm font-medium text-dark-50">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-dark-300 hover:text-dark-50 hover:bg-dark-700 rounded-md transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Desktop Total */}
                    <div className="hidden md:block col-span-2 text-right font-semibold text-dark-50">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="ghost" onClick={clearCart} className="text-dark-400 hover:text-dark-50">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 animate-slide-up">
              <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6 sticky top-24 card-glow">
                <h2 className="text-lg font-semibold text-dark-50 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-dark-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-dark-300">
                    <span>Delivery</span>
                    <span className="text-dark-400 italic text-sm">Calculated at checkout</span>
                  </div>
                  
                  <div className="pt-4 border-t border-dark-700">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-bold text-dark-50">Total</span>
                      <span className="text-2xl font-bold text-gold">{formatPrice(subtotal)}</span>
                    </div>
                    
                    <Link href="/checkout" className="block w-full">
                      <Button variant="primary" size="lg" fullWidth>Proceed to Checkout</Button>
                    </Link>
                    <Link href="/products" className="block w-full mt-3">
                      <Button variant="secondary" fullWidth>Continue Shopping</Button>
                    </Link>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-dark-700 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-gold" strokeWidth={1.5} />
                    <span className="text-xs text-dark-400">1 Year<br/>Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="w-6 h-6 text-gold" strokeWidth={1.5} />
                    <span className="text-xs text-dark-400">Fast<br/>Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard className="w-6 h-6 text-gold" strokeWidth={1.5} />
                    <span className="text-xs text-dark-400">Secure<br/>Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
