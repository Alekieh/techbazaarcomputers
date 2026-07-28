// src/app/checkout/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/data/products';
import { Check, CheckCircle2, Package, ArrowLeft, Smartphone, CreditCard, Banknote, Copy, ShieldCheck } from 'lucide-react';
import { MpesaStkModal } from '@/components/checkout/MpesaStkModal';

const steps = ['Contact', 'Delivery', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form state
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '', email: '' });
  const [deliveryInfo, setDeliveryInfo] = useState({ region: 'nairobi', city: '', address: '', notes: '' });
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'stk_push' | 'till_number' | 'cod'>('stk_push');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [tillTxCode, setTillTxCode] = useState('');
  const [isStkModalOpen, setIsStkModalOpen] = useState(false);
  const [isMpesaPaid, setIsMpesaPaid] = useState(false);
  const [confirmedTxCode, setConfirmedTxCode] = useState('');
  const [copiedTill, setCopiedTill] = useState(false);

  // Sync M-Pesa phone with contact phone when contact info is entered
  useEffect(() => {
    if (contactInfo.phone && !mpesaPhone) {
      setMpesaPhone(contactInfo.phone);
    }
  }, [contactInfo.phone, mpesaPhone]);

  const handleCopyTill = () => {
    navigator.clipboard.writeText("892341");
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  const handleStkSuccess = (code: string) => {
    setConfirmedTxCode(code);
    setIsMpesaPaid(true);
    setIsStkModalOpen(false);
    setCurrentStep(3); // Auto-advance to Review
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: contactInfo.name,
          customerPhone: contactInfo.phone,
          customerEmail: contactInfo.email,
          deliveryRegion: deliveryInfo.region,
          deliveryCity: deliveryInfo.city,
          deliveryAddress: deliveryInfo.address,
          deliveryNotes: deliveryInfo.notes,
          paymentMethod: paymentMethod.toUpperCase(),
          mpesaTxCode: confirmedTxCode || tillTxCode || null,
          items: items.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
          subtotal,
          deliveryFee: 0,
          total: subtotal,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrderNumber(data.orderNumber);
        setOrderSuccess(true);
        clearCart();
      } else {
        alert(data.error || "Failed to place order. Please try again.");
      }
    } catch (err) {
      alert("Error placing order. Please check your connection.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (orderSuccess) {
    return (
      <main className="min-h-screen bg-slate-50 pb-24 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#4CAF50]">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-xl font-bold text-gold mb-4">Order #{orderNumber}</p>
          
          {paymentMethod === 'stk_push' && isMpesaPaid && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 text-left space-y-1 text-xs text-green-950">
              <p className="font-bold flex items-center gap-1.5 text-sm text-[#4CAF50]">
                <ShieldCheck className="w-4 h-4" /> M-Pesa Payment Confirmed
              </p>
              <p><span className="font-medium text-slate-600">Transaction Code:</span> <span className="font-mono font-bold">{confirmedTxCode}</span></p>
              <p><span className="font-medium text-slate-600">Amount Paid:</span> KSh {subtotal.toLocaleString()}</p>
            </div>
          )}

          {paymentMethod === 'till_number' && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-left space-y-1 text-xs text-amber-950">
              <p className="font-bold text-amber-800">Payment Pending Verification</p>
              <p><span className="font-medium text-slate-600">Till Number:</span> 892341 (Tech Bazaar)</p>
              {tillTxCode && <p><span className="font-medium text-slate-600">Ref Code:</span> <span className="font-mono font-bold">{tillTxCode}</span></p>}
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 mb-6 text-left text-xs text-slate-700">
              <p className="font-bold text-slate-900">Cash / M-Pesa on Delivery</p>
              <p className="mt-0.5">Please have KSh {subtotal.toLocaleString()} ready via M-Pesa or Cash upon delivery.</p>
            </div>
          )}

          <p className="text-sm text-slate-600 mb-2">Thank you for shopping with Tech Bazaar.</p>
          <p className="text-xs text-slate-500 mb-8">We will contact you on <span className="font-semibold text-slate-900">{contactInfo.phone}</span> to confirm delivery.</p>
          <div className="space-y-3">
            <Link href={`/account/orders?search=${orderNumber}`}>
              <Button variant="primary" size="lg" fullWidth>Track Order Progress Live</Button>
            </Link>
            <Link href="/products" className="block text-center text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors pt-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Page Header */}
      <div className="py-8 bg-slate-950 text-white border-b border-slate-800 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      isActive ? 'bg-gold text-slate-950 shadow-[0_0_15px_rgba(218,160,23,0.4)]' :
                      isCompleted ? 'bg-gold/20 text-gold' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                    </div>
                    <span className={`text-xs mt-2 hidden sm:block ${
                      isActive ? 'text-gold font-semibold' : 
                      isCompleted ? 'text-slate-300' : 'text-slate-500'
                    }`}>{step}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-px mx-2 sm:mx-4 -mt-6 sm:-mt-5 ${
                      isCompleted ? 'bg-gold/50' : 'bg-slate-800'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left: Form Steps */}
          <div className="lg:col-span-3">
            
            {/* STEP 1: CONTACT */}
            {currentStep === 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-slide-up">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all"
                      placeholder="John Doe"
                      value={contactInfo.name}
                      onChange={e => setContactInfo({...contactInfo, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number <span className="text-gold font-semibold">(M-Pesa Number)</span></label>
                    <input 
                      type="tel" 
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all font-mono"
                      placeholder="07XX XXX XXX or 01XX XXX XXX"
                      value={contactInfo.phone}
                      onChange={e => setContactInfo({...contactInfo, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input 
                      type="email" 
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all"
                      placeholder="john@example.com"
                      value={contactInfo.email}
                      onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="pt-6">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      fullWidth 
                      onClick={() => setCurrentStep(1)}
                      disabled={!contactInfo.name || !contactInfo.phone}
                    >
                      Continue to Delivery
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: DELIVERY */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-slide-up">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Delivery Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Region/County</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all appearance-none"
                      value={deliveryInfo.region}
                      onChange={e => setDeliveryInfo({...deliveryInfo, region: e.target.value})}
                    >
                      <option value="nairobi">Nairobi County</option>
                      <option value="kiambu">Kiambu County</option>
                      <option value="mombasa">Mombasa County</option>
                      <option value="nakuru">Nakuru County</option>
                      <option value="other">Other Kenya Counties</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">City/Town</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all"
                      placeholder="e.g. Westlands, CBD, Ruiru, Nyali"
                      value={deliveryInfo.city}
                      onChange={e => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Street Address & Building</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all resize-none h-24"
                      placeholder="Building name, street, floor, apartment..."
                      value={deliveryInfo.address}
                      onChange={e => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                    />
                  </div>

                  <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4 flex gap-4 items-start mt-2">
                    <Package className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5">Delivery Timeframe</h4>
                      <p className="text-xs text-slate-600">Nairobi: Same day dispatch | Countrywide: 1-3 business days</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button variant="secondary" onClick={() => setCurrentStep(0)} className="w-1/3 flex items-center justify-center gap-2">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button 
                      variant="primary" 
                      className="flex-1"
                      onClick={() => setCurrentStep(2)}
                      disabled={!deliveryInfo.city || !deliveryInfo.address}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT SELECTION */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-slide-up space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Select Payment Method</h2>

                {/* Option 1: M-Pesa Express (STK Push) */}
                <div 
                  onClick={() => setPaymentMethod('stk_push')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'stk_push' 
                      ? 'border-[#4CAF50] bg-green-50/40 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#4CAF50] text-white flex items-center justify-center font-black text-lg shadow-sm">
                        M
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-base">M-PESA Express (STK Push)</h3>
                          <span className="bg-[#4CAF50] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Instant</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Receive prompt directly on your phone screen</p>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="payment_method"
                      checked={paymentMethod === 'stk_push'}
                      onChange={() => setPaymentMethod('stk_push')}
                      className="w-5 h-5 text-[#4CAF50] focus:ring-[#4CAF50]"
                    />
                  </div>

                  {paymentMethod === 'stk_push' && (
                    <div className="mt-4 pt-4 border-t border-green-200/60 space-y-3 animate-fade-in">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm M-Pesa Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-mono font-bold focus:border-[#4CAF50] focus:outline-none"
                          value={mpesaPhone}
                          onChange={(e) => setMpesaPhone(e.target.value)}
                          placeholder="07XX XXX XXX"
                        />
                      </div>
                      
                      <Button
                        variant="primary"
                        fullWidth
                        className="bg-[#4CAF50] hover:bg-[#43A047] border-none text-white font-bold py-3 shadow-md"
                        onClick={() => setIsStkModalOpen(true)}
                        disabled={!mpesaPhone}
                      >
                        <Smartphone className="w-4 h-4 mr-2" /> Pay KSh {subtotal.toLocaleString()} via M-Pesa
                      </Button>
                    </div>
                  )}
                </div>

                {/* Option 2: M-Pesa Buy Goods / Till Number */}
                <div 
                  onClick={() => setPaymentMethod('till_number')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'till_number' 
                      ? 'border-gold bg-gold/5 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">M-PESA Buy Goods (Till Number)</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Pay manually via Lipa Na M-Pesa</p>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="payment_method"
                      checked={paymentMethod === 'till_number'}
                      onChange={() => setPaymentMethod('till_number')}
                      className="w-5 h-5 text-gold focus:ring-gold"
                    />
                  </div>

                  {paymentMethod === 'till_number' && (
                    <div className="mt-4 pt-4 border-t border-gold/20 space-y-4 animate-fade-in">
                      <div className="bg-white border border-gold/30 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">M-Pesa Till Number</p>
                          <p className="text-2xl font-black text-slate-900 tracking-wider font-mono">892341</p>
                          <p className="text-xs text-slate-600 mt-0.5">Store Name: <span className="font-bold text-slate-900">Tech Bazaar Ltd</span></p>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyTill}
                          className="flex items-center gap-1.5 bg-gold/15 hover:bg-gold/25 text-slate-900 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedTill ? "Copied!" : "Copy Till"}
                        </button>
                      </div>

                      <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <p className="font-semibold text-slate-800">Instructions:</p>
                        <ol className="list-decimal pl-4 space-y-1">
                          <li>Open M-Pesa menu on your phone</li>
                          <li>Select <strong>Lipa na M-PESA</strong> → <strong>Buy Goods and Services</strong></li>
                          <li>Enter Till Number: <strong>892341</strong></li>
                          <li>Enter Amount: <strong>KSh {subtotal.toLocaleString()}</strong></li>
                        </ol>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">M-Pesa Confirmation Transaction Code <span className="text-slate-400 font-normal">(Optional)</span></label>
                        <input 
                          type="text"
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 uppercase font-mono tracking-wider focus:border-gold focus:outline-none"
                          placeholder="e.g. SAB79X2K01"
                          value={tillTxCode}
                          onChange={(e) => setTillTxCode(e.target.value.toUpperCase())}
                        />
                      </div>

                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => setCurrentStep(3)}
                      >
                        Continue to Order Review
                      </Button>
                    </div>
                  )}
                </div>

                {/* Option 3: Cash on Delivery */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'cod' 
                      ? 'border-slate-800 bg-slate-50 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Pay on Delivery</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Pay with M-Pesa or Cash when item is delivered</p>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="payment_method"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-5 h-5 text-slate-900 focus:ring-slate-900"
                    />
                  </div>

                  {paymentMethod === 'cod' && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 animate-fade-in">
                      <p className="text-xs text-slate-600 bg-slate-100 p-3 rounded-xl">
                        Our delivery team will carry an M-Pesa Till QR card or accept cash upon handing over your device.
                      </p>
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => setCurrentStep(3)}
                      >
                        Continue to Order Review
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="secondary" onClick={() => setCurrentStep(1)} className="w-1/3 flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: FINAL REVIEW */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-slide-up space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Review Your Order</h2>
                  </div>
                  
                  {/* Order Items Summary */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-6">
                    <h3 className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">Purchased Laptops & Tech</h3>
                    <div className="space-y-4 divide-y divide-slate-200">
                      {items.map(item => (
                        <div key={item.product.id} className="pt-4 first:pt-0 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-bold">{item.quantity}x</span>
                            <span className="text-slate-900 font-medium line-clamp-1">{item.product.name}</span>
                          </div>
                          <span className="text-slate-900 font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Contact Summary */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</h3>
                        <button onClick={() => setCurrentStep(0)} className="text-xs text-gold font-semibold hover:underline">Edit</button>
                      </div>
                      <div className="space-y-0.5 text-xs text-slate-700">
                        <p className="text-slate-900 font-bold">{contactInfo.name}</p>
                        <p>{contactInfo.phone}</p>
                        {contactInfo.email && <p>{contactInfo.email}</p>}
                      </div>
                    </div>

                    {/* Delivery Summary */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Delivery</h3>
                        <button onClick={() => setCurrentStep(1)} className="text-xs text-gold font-semibold hover:underline">Edit</button>
                      </div>
                      <div className="space-y-0.5 text-xs text-slate-700">
                        <p className="text-slate-900 font-bold capitalize">{deliveryInfo.region}</p>
                        <p>{deliveryInfo.city}</p>
                        <p className="line-clamp-1">{deliveryInfo.address}</p>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment</h3>
                        <button onClick={() => setCurrentStep(2)} className="text-xs text-gold font-semibold hover:underline">Edit</button>
                      </div>
                      <div className="space-y-0.5 text-xs">
                        {paymentMethod === 'stk_push' && isMpesaPaid ? (
                          <>
                            <p className="text-[#4CAF50] font-bold">M-PESA Express Paid</p>
                            <p className="font-mono text-slate-600 font-semibold">{confirmedTxCode}</p>
                          </>
                        ) : paymentMethod === 'till_number' ? (
                          <>
                            <p className="text-slate-900 font-bold">M-PESA Till 892341</p>
                            {tillTxCode && <p className="font-mono text-slate-600">Code: {tillTxCode}</p>}
                          </>
                        ) : (
                          <p className="text-slate-900 font-bold">Pay on Delivery</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-200">
                  <Button variant="secondary" onClick={() => setCurrentStep(2)} className="w-1/3 flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button 
                    variant="primary" 
                    size="lg"
                    className={`flex-1 ${isPlacingOrder ? 'opacity-90 cursor-wait' : 'animate-pulse-gold'}`}
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder || items.length === 0}
                  >
                    {isPlacingOrder ? 'Confirming Order...' : 'Complete & Place Order'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sticky top-24 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-slate-400 font-bold">TB</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-sm font-semibold text-slate-900 line-clamp-1">{item.product.name}</p>
                      <div className="flex justify-between mt-1 text-xs">
                        <span className="text-slate-500">Qty: {item.quantity}</span>
                        <span className="text-slate-900 font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold">FREE (Nairobi)</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-base text-slate-900 font-bold">Total</span>
                  <span className="text-2xl font-black text-gold">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* M-Pesa STK Push Interactive Modal */}
      <MpesaStkModal
        isOpen={isStkModalOpen}
        onClose={() => setIsStkModalOpen(false)}
        onSuccess={handleStkSuccess}
        phone={mpesaPhone || contactInfo.phone}
        amount={subtotal}
      />
    </main>
  );
}
