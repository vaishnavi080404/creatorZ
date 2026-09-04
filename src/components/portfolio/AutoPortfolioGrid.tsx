"use client";

import { useState } from "react";
import { VerifiedPortfolioItem } from "@/lib/types";
import { CheckCircle, Eye, MessageCircle, Star, Play, Award } from "lucide-react";
import Image from "next/image";

interface AutoPortfolioGridProps {
  items: VerifiedPortfolioItem[];
  creatorName: string;
}

export default function AutoPortfolioGrid({ items, creatorName }: AutoPortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalItem, setActiveModalItem] = useState<VerifiedPortfolioItem | null>(null);

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((i) => i.category === selectedCategory);

  return (
    <div className="space-y-6">
      
      {/* Header & Feature Explainer Banner */}
      <div className="bg-white border border-[#E8DEC8] rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-[#7A1C28]">
              Portfolio-From-Delivery™
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#EBF7EE] text-[#166534] font-semibold">
              Auto-Compiled from Verified Brand Approvals
            </span>
          </div>
          <p className="text-xs text-[#6C635B] mt-1">
            Zero manual uploads. Every entry below is a verified commercial deliverable automatically recorded upon brand payment release.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#7A1C28] text-white shadow-sm"
                  : "bg-[#FAF6EE] text-[#6C635B] hover:text-[#181314] hover:bg-[#F2EAE0]"
              }`}
            >
              {cat} {cat === "All" ? `(${items.length})` : `(${items.filter(i => i.category === cat).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Verified Deliverables */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border border-[#E8DEC8] rounded-xl p-12 text-center">
          <Award className="w-10 h-10 text-[#7A1C28] mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-bold text-[#181314]">No Completed Deliverables in this Category</h3>
          <p className="text-xs text-[#6C635B] mt-1">
            Once a campaign is approved in the Order Room, it will automatically populate here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E8DEC8] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail / Video Preview Area */}
                <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => setActiveModalItem(item)}>
                  <img
                    src={item.thumbnailUrl}
                    alt={item.brandName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/90 text-[#7A1C28] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Badges on Video Thumbnail */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm border border-white/20">
                      {item.format}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7A1C28] text-white">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {item.outcomeMetrics.views.toLocaleString()} Views
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {item.outcomeMetrics.comments.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0E8D8]">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.brandLogo}
                        alt={item.brandName}
                        className="w-7 h-7 rounded-full object-cover border border-[#E8DEC8]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#181314]">{item.brandName}</h4>
                        <span className="text-[10px] text-[#6C635B]">{item.approvedDate}</span>
                      </div>
                    </div>
                    
                    <span className="text-xs font-bold font-mono text-[#7A1C28]">
                      ₹{item.contractValue.toLocaleString()}
                    </span>
                  </div>

                  {/* Client Review Quote if exists */}
                  {item.clientReview && (
                    <div className="mt-3.5 p-3 rounded-lg bg-[#FAF6EE] border border-[#E8DEC8]">
                      <div className="flex items-center gap-1 text-amber-500 mb-1">
                        {[...Array(item.clientReview.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-[11px] text-[#181314] italic line-clamp-2">
                        &quot;{item.clientReview.comment}&quot;
                      </p>
                      <span className="text-[10px] text-[#6C635B] block mt-1 font-semibold">
                        — {item.clientReview.brandContact}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Milestone Verified Stamp */}
              <div className="px-5 py-3 bg-[#FAF6EE] border-t border-[#E8DEC8] flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-[#166534] font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Brand Payout
                </span>
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="font-bold text-[#7A1C28] hover:underline"
                >
                  View Case Study →
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Video Modal Player */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8DEC8]">
            <div className="p-4 border-b border-[#E8DEC8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={activeModalItem.brandLogo}
                  alt={activeModalItem.brandName}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <h3 className="text-sm font-bold text-[#181314]">
                  {activeModalItem.brandName} — {activeModalItem.format}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-[#FAF6EE] text-[#181314] font-bold flex items-center justify-center hover:bg-[#F2EAE0]"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-black">
              <video
                src={activeModalItem.deliverableUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 bg-[#FAF6EE] border-t border-[#E8DEC8]">
              <div className="grid grid-cols-4 gap-2 text-center text-xs mb-3">
                <div className="p-2 bg-white rounded-lg border border-[#E8DEC8]">
                  <span className="text-[10px] text-[#6C635B] block">Views</span>
                  <span className="font-bold font-mono">{activeModalItem.outcomeMetrics.views.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#E8DEC8]">
                  <span className="text-[10px] text-[#6C635B] block">Engagement</span>
                  <span className="font-bold font-mono text-[#166534]">{activeModalItem.outcomeMetrics.engagementRate}%</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#E8DEC8]">
                  <span className="text-[10px] text-[#6C635B] block">Likes</span>
                  <span className="font-bold font-mono">{activeModalItem.outcomeMetrics.likes.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#E8DEC8]">
                  <span className="text-[10px] text-[#6C635B] block">Contract Value</span>
                  <span className="font-bold font-mono text-[#7A1C28]">₹{activeModalItem.contractValue.toLocaleString()}</span>
                </div>
              </div>
              
              {activeModalItem.clientReview && (
                <p className="text-xs text-[#181314] italic">
                  &quot;{activeModalItem.clientReview.comment}&quot; — <span className="font-semibold text-[#6C635B]">{activeModalItem.clientReview.brandContact}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
