"use client";

import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts, getNewArrivals, getDeals } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/components/cart/CartProvider';

export default function HomePage() {
  const { addToCart } = useCart();
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const deals = getDeals();

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Premium Laptops Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-950/50"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="max-w-2xl animate-slide-up">
            <div className="border-l-2 border-gold pl-4 mb-6">
              <span className="text-gold text-sm font-semibold tracking-[0.3em] uppercase">
                SMART TECH. GREAT VALUE.
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Premium Laptops at <br className="hidden md:block" />
              <span className="text-gradient-gold">Unbeatable Prices</span>
            </h1>
            
            <p className="text-lg text-slate-200 mt-6 max-w-lg animate-slide-up stagger-1">
              Quality-checked devices from top brands like HP, Dell, Lenovo, and Apple. Discover your next perfect machine at Tech Bazaar.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8 animate-slide-up stagger-2">
              <Link href="/products">
                <Button variant="primary" size="lg">Browse Products</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block animate-float">
             <div className="w-80 h-80 rounded-full border border-gold/30 flex items-center justify-center relative">
                <div className="w-64 h-64 rounded-full border border-gold/50 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute w-72 h-72 rounded-full border-t border-gold animate-[spin_8s_linear_infinite_reverse]"></div>
             </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-dark-800 py-8 border-y border-dark-700 w-full relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 animate-slide-up stagger-1">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 text-gold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-dark-50">Quality Checked</h3>
                <p className="text-xs text-dark-300 mt-0.5">Every device tested for performance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 animate-slide-up stagger-2">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 text-gold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-dark-50">Warranty Assured</h3>
                <p className="text-xs text-dark-300 mt-0.5">Peace of mind with every purchase</p>
              </div>
            </div>

            <div className="flex items-center gap-4 animate-slide-up stagger-3">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 text-gold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-dark-50">Fast Delivery</h3>
                <p className="text-xs text-dark-300 mt-0.5">Quick delivery across Kenya</p>
              </div>
            </div>

            <div className="flex items-center gap-4 animate-slide-up stagger-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 text-gold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-dark-50">Customer Support</h3>
                <p className="text-xs text-dark-300 mt-0.5">Always ready to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 w-full relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <h2 className="text-3xl font-bold text-dark-50">
              Browse by <span className="text-gradient-gold">Category</span>
            </h2>
            <div className="w-20 h-1 bg-gold rounded-full mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {categories.slice(0, 3).map((category, index) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.slug}`}
                className={`group relative overflow-hidden rounded-2xl aspect-[4/3] card-glow animate-slide-up stagger-${(index % 6) + 1}`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  <p className="text-sm text-slate-200 mt-1 line-clamp-2">{category.description}</p>
                  <p className="text-gold text-sm font-semibold mt-3 group-hover:translate-x-2 transition-transform inline-flex items-center">
                    Shop Now <span className="ml-1">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-slate-900 text-white w-full relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <h2 className="text-3xl font-bold text-white">
              <span className="text-gradient-gold">Best</span> Sellers
            </h2>
            <p className="text-slate-300 text-center mt-2">Our most popular products loved by customers</p>
            <div className="w-20 h-1 bg-gold rounded-full mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <div key={product.id} className={`animate-slide-up stagger-${(index % 6) + 1}`}>
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-white w-full relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <h2 className="text-3xl font-bold text-slate-900">
              New <span className="text-gradient-gold">Arrivals</span>
            </h2>
            <div className="w-20 h-1 bg-gold rounded-full mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {newArrivals.slice(0, 4).map((product, index) => (
              <div key={product.id} className={`animate-slide-up stagger-${(index % 6) + 1}`}>
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals / Hot Offers Section */}
      <section className="py-20 bg-slate-950 text-white w-full relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <span className="text-gradient-gold">Hot</span> Deals <span className="text-xl">🔥</span>
            </h2>
            <div className="w-20 h-1 bg-gold rounded-full mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {deals.slice(0, 4).map((product, index) => (
              <div key={product.id} className={`animate-slide-up stagger-${(index % 6) + 1}`}>
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Tech Bazaar Section */}
      <section className="py-20 bg-slate-100/90 border-t border-slate-200 w-full relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose <span className="text-gradient-gold">Tech Bazaar?</span>
            </h2>
            <div className="w-20 h-1 bg-gold rounded-full mx-auto mt-4 mb-12"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Tested & Verified",
                desc: "Every laptop passes our quality check",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              },
              {
                title: "Best Prices in Kenya",
                desc: "Competitive pricing you won't find elsewhere",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              },
              {
                title: "Genuine Products",
                desc: "Authentic devices from top manufacturers",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              },
              {
                title: "Expert Support",
                desc: "Tech team ready to help you choose",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              },
              {
                title: "Fast Delivery",
                desc: "Same-day delivery in Nairobi, countrywide shipping",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              },
              {
                title: "Warranty Included",
                desc: "Peace of mind with every purchase",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-gold/50 shadow-sm hover:shadow-md transition duration-300 animate-slide-up stagger-1">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-slate-950 text-white w-full relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl font-bold text-white">
            Stay Updated with the <span className="text-gradient-gold">Latest Deals</span>
          </h2>
          <p className="text-slate-300 mt-3">Subscribe and never miss out on exclusive offers</p>
          
          <form className="flex flex-col sm:flex-row gap-3 mt-8" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-white placeholder-slate-400 focus:border-gold focus:outline-none transition-colors"
              required
            />
            <Button variant="primary" size="lg" className="sm:w-auto w-full py-4">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
