import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Tech Bazaar Kenya",
  description: "How Tech Bazaar collects, protects, and handles customer data.",
};

export default function PrivacyPage() {
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
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            Compliant with the Kenya Data Protection Act 2019
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 text-slate-300 text-sm leading-relaxed shadow-xl">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
            <p>
              When you place an order with Tech Bazaar, we collect your name, phone number, delivery address, email address, and transaction details required for order delivery and M-Pesa verification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. How We Use Your Data</h2>
            <p>
              Your personal information is strictly used to fulfill your orders, process payments via Safaricom M-Pesa, provide order updates via SMS/Email, and handle warranty claims. We do not sell or rent your data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Data Security</h2>
            <p>
              We implement industry-standard encryption protocols (HTTPS/TLS) and secure database access controls to safeguard your personal details from unauthorized access or disclosure.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
