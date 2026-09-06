"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import { MOCK_CREATORS } from "@/lib/mockData";
import AutoPortfolioGrid from "@/components/portfolio/AutoPortfolioGrid";
import Link from "next/link";
import { Clock, Globe, Send } from "lucide-react";
export default function CreatorDossierPage({ params }) {
    const resolvedParams = use(params);
    const creator = MOCK_CREATORS.find((c) => c.username === resolvedParams.username);
    if (!creator) {
        notFound();
    }
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* 1. TOP CREATOR COMMERCIAL DOSSIER HEADER */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#F0E8D8]">
          
          {/* Creator Profile Image & Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img src={creator.avatar} alt={creator.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#E8DEC8] shadow-sm flex-shrink-0"/>
            
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#181314]">
                  {creator.name}
                </h1>
                
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
                  👑 {creator.tier.toUpperCase()} TIER ({creator.score}/100)
                </span>

                {creator.openToBrands && (<span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF7EE] text-[#166534] text-xs font-semibold border border-[#C6E7CE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse"></span>
                    Open to Brands
                  </span>)}
              </div>

              <p className="text-xs text-[#6C635B] font-medium">
                @{creator.username} • {creator.category} • <span className="text-[#181314] font-semibold">{creator.location}</span>
              </p>

              <p className="text-xs text-[#181314] max-w-2xl leading-relaxed pt-1">
                {creator.bio}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-[#6C635B]">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#7A1C28]"/>
                  Languages: {creator.languages.join(", ")}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#7A1C28]"/>
                  Avg Response: {creator.responseTime}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Box & Direct Offer Trigger */}
          <div className="bg-[#FAF6EE] border border-[#E8DEC8] rounded-2xl p-5 text-right min-w-[240px] space-y-3 self-stretch sm:self-auto flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-bold">Standard Starting Rate</span>
              <span className="text-2xl font-bold font-mono text-[#7A1C28] block mt-0.5">
                ₹{creator.startingRate.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#6C635B] block">Per dedicated Reel deliverable</span>
            </div>

            <Link href="/messages" className="w-full py-2.5 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition transform active:scale-95">
              <Send className="w-3.5 h-3.5"/>
              <span>Send Structured Offer</span>
            </Link>
          </div>

        </div>

        {/* Multi-Factor Metric Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-center">
            <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-bold">Total Reach</span>
            <span className="text-lg font-bold font-mono text-[#181314] block mt-1">
              {creator.reach.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#6C635B]">Across Platforms</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-center">
            <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-bold">Average 30D Views</span>
            <span className="text-lg font-bold font-mono text-[#181314] block mt-1">
              {creator.avgViews.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#6C635B]">Per Dedicated Video</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-center">
            <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-bold">Engagement Rate</span>
            <span className="text-lg font-bold font-mono text-[#166534] block mt-1">
              {creator.engagementRate}%
            </span>
            <span className="text-[10px] text-[#166534] font-medium">Category Benchmark +2.1%</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-center">
            <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-bold">On-Time Delivery</span>
            <span className="text-lg font-bold font-mono text-[#181314] block mt-1">
              {creator.onTimeDeliveryRate}%
            </span>
            <span className="text-[10px] text-[#6C635B]">Milestone Contract Score</span>
          </div>
        </div>

        {/* Proven Content Formats */}
        <div className="pt-2">
          <span className="text-xs font-bold text-[#181314] block mb-2 font-mono uppercase">
            Signature Formats:
          </span>
          <div className="flex flex-wrap gap-2">
            {creator.provenFormats.map((fmt, i) => (<span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#FAF6EE] text-[#181314] border border-[#E8DEC8]">
                {fmt}
              </span>))}
          </div>
        </div>

      </div>

      {/* 2. PORTFOLIO-FROM-DELIVERY (AUTO-COMPILED CASE STUDIES) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#181314]">
            Verified Deliverable Portfolio
          </h2>
          <p className="text-xs text-[#6C635B] mt-0.5">
            Every entry below is auto-generated upon verified brand approval and completion sign-off.
          </p>
        </div>

        <AutoPortfolioGrid items={creator.autoPortfolio} creatorName={creator.name}/>
      </section>

    </div>);
}
