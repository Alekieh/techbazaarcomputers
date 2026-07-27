import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Tech Bazaar Kenya",
  description: "Terms and conditions governing purchases and usage of Tech Bazaar online store.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            Effective Date: January 2026 | Tech Bazaar Kenya
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 text-slate-300 text-sm leading-relaxed shadow-xl">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Introduction</h2>
            <p>
              Welcome to Tech Bazaar. By accessing or purchasing laptops, computers, and accessories from our store, you agree to be bound by these Terms and Conditions. Please read them carefully before completing any transaction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Product Descriptions & Pricing</h2>
            <p>
              All prices listed on Tech Bazaar are in Kenyan Shillings (KES). We strive to ensure accurate pricing and specifications for all refurbished and new laptops. In the event of an error in pricing, we reserve the right to correct the error prior to order fulfillment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Payment Methods</h2>
            <p>
              We accept payments via Safaricom M-Pesa (STK Push & Buy Goods Till Number 892341) and Cash/M-Pesa on Delivery within Nairobi. Orders will not be dispatched until payment is verified or delivery terms are confirmed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Warranty & Guarantee</h2>
            <p>
              All laptops sold by Tech Bazaar come with a standard 6-month hardware warranty covering motherboard, screen, and keyboard defects. Batteries are guaranteed for a minimum of 2+ hours of active backup. Warranty does not cover liquid damage or physical drops.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes shall be subject to the exclusive jurisdiction of Kenyan courts.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
