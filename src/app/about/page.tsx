// src/app/about/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { Shield, Award, Gem, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us | Tech Bazaar',
  description: 'Learn about Tech Bazaar - Kenya\'s trusted source for quality laptops and tech accessories.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-0">
      {/* Hero Section */}
      <section className="py-20 bg-dark-800/50 text-center px-4">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <span className="text-gold text-sm font-bold tracking-[0.3em] uppercase block mb-6">About Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 leading-tight">
            Trusted by Hundreds of Customers Across <span className="text-gradient-gold">Kenya</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto mt-6">
            We are dedicated to providing the highest quality premium laptops and tech accessories with unmatched customer service.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-right">
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-50 mt-2 mb-6">Redefining the Tech Retail Experience</h2>
              <div className="text-dark-300 leading-relaxed space-y-4">
                <p>
                  Tech Bazaar was founded with a clear mission: to provide reliable, high-performance tech devices to professionals, creatives, and students at honest prices.
                </p>
                <p>
                  Based in the heart of Nairobi, we proudly serve customers across the entire country of Kenya. We understand that a laptop is more than just a device—it is your gateway to productivity, creativity, and connection.
                </p>
                <p>
                  That is why every single device that passes through our hands is rigorously quality-checked and tested. Your satisfaction and peace of mind are our highest priorities.
                </p>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8 card-glow animate-slide-up">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-4">
                  <div className="text-3xl md:text-4xl font-bold text-gold mb-2">500+</div>
                  <div className="text-sm text-dark-300 font-medium">Happy Customers</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl md:text-4xl font-bold text-gold mb-2">1000+</div>
                  <div className="text-sm text-dark-300 font-medium">Devices Sold</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl md:text-4xl font-bold text-gold mb-2">4.8★</div>
                  <div className="text-sm text-dark-300 font-medium">Average Rating</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl md:text-4xl font-bold text-gold mb-2">2+</div>
                  <div className="text-sm text-dark-300 font-medium">Years Serving Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-dark-50">What We Stand For</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-dark-900 rounded-2xl p-8 text-center border border-dark-700 hover:border-gold/30 transition-colors animate-slide-up" style={{ animationDelay: '0ms' }}>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">Trust</h3>
              <p className="text-sm text-dark-300">We are dependable, transparent, and always keep our promises to our customers.</p>
            </div>
            
            <div className="bg-dark-900 rounded-2xl p-8 text-center border border-dark-700 hover:border-gold/30 transition-colors animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">Quality</h3>
              <p className="text-sm text-dark-300">Every product we deliver is rigorously tested to ensure reliable performance.</p>
            </div>
            
            <div className="bg-dark-900 rounded-2xl p-8 text-center border border-dark-700 hover:border-gold/30 transition-colors animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                <Gem className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">Value</h3>
              <p className="text-sm text-dark-300">We offer top-tier tech performance at the most competitive and honest prices.</p>
            </div>
            
            <div className="bg-dark-900 rounded-2xl p-8 text-center border border-dark-700 hover:border-gold/30 transition-colors animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-dark-50 mb-3">Service</h3>
              <p className="text-sm text-dark-300">We deeply care about your experience and are always here to help you succeed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-50">Get in Touch</h2>
            <p className="text-dark-300 mt-4">Have questions? Our team is ready to assist you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8 text-center card-glow">
              <div className="w-12 h-12 mx-auto rounded-full bg-dark-700 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-dark-50 mb-2">Call Us</h4>
              <p className="text-dark-300 text-sm">0795 945 941</p>
              <p className="text-dark-300 text-sm">0718 595 695</p>
            </div>
            
            <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8 text-center card-glow">
              <div className="w-12 h-12 mx-auto rounded-full bg-dark-700 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-dark-50 mb-2">Email Us</h4>
              <a href="mailto:hello@techbazaar.co.ke" className="text-gold text-sm hover:underline">hello@techbazaar.co.ke</a>
            </div>
            
            <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8 text-center card-glow">
              <div className="w-12 h-12 mx-auto rounded-full bg-dark-700 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-dark-50 mb-2">Visit Us</h4>
              <p className="text-dark-300 text-sm">Nairobi, Kenya</p>
              <p className="text-dark-400 text-xs mt-1">Delivery Countrywide</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-800/50 text-center px-4 border-t border-dark-700">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-50 mb-8">Ready to Find Your Perfect Device?</h2>
        <Link href="/products">
          <Button variant="primary" size="lg" className="animate-pulse-gold">
            Browse Our Products
          </Button>
        </Link>
      </section>
    </main>
  );
}
