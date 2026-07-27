"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageSquare, Star, CheckCircle, Trash2, XCircle, ShieldCheck } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string, isApproved: boolean) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved }),
      });
      if (res.ok) {
        setReviews(reviews.map((r) => (r.id === id ? { ...r, isApproved } : r)));
      }
    } catch (err) {
      alert("Error updating review");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
      }
    } catch (err) {
      alert("Error deleting review");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header Bar */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Moderation</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Customer Product Reviews ({reviews.length})
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Approve, reject, or moderate customer ratings & feedback before publishing to product pages.
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {loading ? (
          <div className="p-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-700 opacity-40 animate-pulse" />
            <p className="text-base font-bold text-slate-300">No reviews submitted yet</p>
            <p className="text-xs text-slate-500 mt-1">Customer product reviews will appear here for moderation.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60 p-6 space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white text-base">{review.customerName}</span>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-gold text-gold" : "text-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {new Date(review.createdAt).toLocaleDateString("en-KE")}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm italic">&ldquo;{review.comment}&rdquo;</p>

                  {review.product && (
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span>Product:</span>
                      <span className="text-gold font-bold">{review.product.name}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {review.isApproved ? (
                    <button
                      onClick={() => handleApprove(review.id, false)}
                      className="px-3.5 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Unapprove</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(review.id, true)}
                      className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
