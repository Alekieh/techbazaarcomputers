import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Returns & Warranty Policy | Tech Bazaar Kenya",
  description: "Learn about Tech Bazaar 6-month hardware warranty and 7-day return policy.",
};

export default function ReturnsPage() {
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
              <RefreshCw className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Returns & Warranty Policy
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            6-Month Warranty & 7-Day Replacement Guarantee
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 text-slate-300 text-sm leading-relaxed shadow-xl">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. 7-Day Exchange Guarantee</h2>
            <p>
              If your laptop develops a hardware fault within 7 days of purchase, Tech Bazaar will replace it with an identical or higher model immediately, free of charge.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. 6-Month Hardware Warranty</h2>
            <p>
              Every laptop purchased includes a 6-month warranty covering internal hardware defects (motherboard, RAM, SSD, screen, and charger). Repair or replacement is covered at zero labor cost.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
