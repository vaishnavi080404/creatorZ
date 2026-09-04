"use client";

import { CreatorProfile } from "@/lib/types";
import Link from "next/link";
import { Eye, ShieldCheck, Star, ArrowRight } from "lucide-react";

interface CreatorCardProps {
  creator: CreatorProfile;
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <div className="bg-white border border-[#E8DEC8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
      
      <div>
        {/* Top Portrait Image & Video Preview Container */}
        <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-white/95 text-[#7A1C28] backdrop-blur-md shadow-sm">
              {creator.tier.toUpperCase()} TIER ({creator.score})
            </span>

            {creator.openToBrands && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-emerald-400 text-[10px] font-semibold backdrop-blur-md border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Open
              </span>
            )}
          </div>

          {/* Bottom Video Thumbnail Overlay Data */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-bold text-base leading-snug">{creator.name}</h3>
            <p className="text-xs text-white/80 font-medium">@{creator.username} • {creator.category}</p>
            
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/20 text-xs font-mono">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-white/70" />
                {creator.avgViews.toLocaleString()} 30D Avg
              </span>
              <span className="text-emerald-400 font-bold">
                {creator.engagementRate}% Eng
              </span>
            </div>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-[#6C635B] line-clamp-2 leading-relaxed">
            {creator.bio}
          </p>

          {/* Proven Content Formats Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {creator.provenFormats.slice(0, 2).map((fmt, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#FAF6EE] text-[#6C635B] border border-[#E8DEC8]">
                {fmt}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Pricing & Action Footer */}
      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-[#F0E8D8] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#6C635B] uppercase block">Starting from</span>
            <span className="text-base font-bold font-mono text-[#7A1C28]">
              ₹{creator.startingRate.toLocaleString()}
            </span>
          </div>

          <Link
            href={`/creators/${creator.username}`}
            className="text-xs font-bold px-4 py-2 rounded-lg bg-[#FAF6EE] hover:bg-[#7A1C28] text-[#7A1C28] hover:text-white border border-[#E8DEC8] hover:border-[#7A1C28] transition-all flex items-center gap-1"
          >
            <span>Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
