"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { ShoppingBag, Trash2, Plus, Minus, Heart, ArrowLeft, ShieldCheck, Truck, Ticket, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { toggleWishlist } = useWishlist();
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [voucherSuccess, setVoucherSuccess] = useState("");
  const [voucherError, setVoucherError] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const FREE_SHIPPING_THRESHOLD = 100000;
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError("");
    setVoucherSuccess("");

    if (voucherCode.toUpperCase().trim() === "TECH10") {
      const discount = subtotal * 0.1;
      setAppliedDiscount(discount);
      setVoucherSuccess("Voucher TECH10 applied! 10% Discount applied to cart.");
    } else if (voucherCode.toUpperCase().trim() === "BAZAAR2000") {
      setAppliedDiscount(2000);
      setVoucherSuccess("Voucher BAZAAR2000 applied! KES 2,000 off.");
    } else {
      setVoucherError("Invalid or expired promo voucher code");
    }
  };

  const deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 300;
  const finalTotal = Math.max(0, subtotal + deliveryFee - appliedDiscount);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 selection:bg-gold selection:text-slate-950 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B0F19] border-b border-slate-800/80 py-10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-gold transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                  Jumia-Style Shopping Cart ({items.reduce((a, b) => a + b.quantity, 0)})
                </h1>
                <p className="text-slate-400 text-xs mt-0.5">
                  Review laptop items, apply vouchers, and proceed to M-Pesa checkout.
                </p>
              </div>
            </div>

            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-mono text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Empty Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-16 text-center text-slate-500 space-y-4">
            <ShoppingBag className="w-16 h-16 mx-auto text-slate-700 opacity-40 animate-pulse" />
            <h3 className="text-xl font-bold text-white">Your Shopping Cart is Empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Explore our laptops and tech gear catalog to add products to your cart.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-gold text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-gold/20 hover:scale-105 transition-transform"
            >
              Start Shopping Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List & Delivery Meter */}
            <div className="lg:col-span-8 space-y-6">
              {/* Jumia Free Delivery Meter Bar */}
              <div className="bg-[#0B0F19] border border-slate-800/90 rounded-3xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-300 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gold" />
                    <span>Nairobi Express Free Delivery Meter</span>
                  </span>
                  <span className="font-mono text-gold font-bold">
                    {subtotal >= FREE_SHIPPING_THRESHOLD
                      ? "🎉 QUALIFIED FOR FREE DELIVERY!"
                      : `Add ${formatPrice(remainingForFreeShipping)} more`}
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-gold h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Cart Items Cards */}
              <div className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="bg-[#0B0F19] border border-slate-800/90 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Laptop Image Thumbnail */}
                      <div className="relative w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                        <Image
                          src={product.image || "/images/products/hp-elitebook-g8.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider">
                          {product.brand} • {product.category}
                        </span>
                        <h3 className="text-base font-bold text-white line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            In Stock — Express Delivery
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                            <ShieldCheck className="w-3 h-3 text-gold" />
                            1-Yr Warranty
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Controls & Price Column */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800/60 pt-3 sm:pt-0">
                      {/* Quantity Modifier */}
                      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <div className="text-right">
                        <span className="text-lg font-black text-gold font-mono block">
                          {formatPrice(product.price * quantity)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {formatPrice(product.price)} each
                        </span>
                      </div>

                      {/* Save to Wishlist & Delete Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors"
                          title="Save to Wishlist"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors"
                          title="Remove from Cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Jumia Order Summary Sidebar */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-[#0B0F19] border border-slate-800/90 rounded-3xl p-6 shadow-2xl space-y-6">
                <h3 className="text-base font-bold text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Jumia Order Summary</span>
                </h3>

                {/* Voucher Input */}
                <form onSubmit={handleApplyVoucher} className="space-y-2">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Apply Promo / Voucher Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="e.g. TECH10"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-gold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-gold border border-gold/30 rounded-xl text-xs font-mono font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {voucherSuccess && (
                    <p className="text-[11px] font-mono text-emerald-400">{voucherSuccess}</p>
                  )}
                  {voucherError && (
                    <p className="text-[11px] font-mono text-red-400">{voucherError}</p>
                  )}
                </form>

                {/* Subtotal Calculations */}
                <div className="space-y-3 text-xs font-mono border-t border-b border-slate-800/80 py-4">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-emerald-400">
                      {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                    </span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-gold">
                      <span>Voucher Discount</span>
                      <span className="font-bold">-{formatPrice(appliedDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>VAT (16% Included)</span>
                    <span>{formatPrice(finalTotal * 0.16)}</span>
                  </div>
                </div>

                {/* Final Total */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono font-bold text-slate-300 uppercase">
                    Total Amount
                  </span>
                  <span className="text-2xl font-black text-gold font-mono">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                {/* Proceed to Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all"
                >
                  <span>PROCEED TO M-PESA CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                  <span>Safaricom M-Pesa STK Push Payment & G4S Courier Tracking Guaranteed.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
