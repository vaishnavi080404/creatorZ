"use client";

import Link from "next/link";
import { MOCK_PITCH_REELS } from "@/lib/mockData";
import AuditionDeck from "@/components/pitch-reels/AuditionDeck";
import { ArrowLeft, Building2 } from "lucide-react";

export default function BrandAuditionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/brand/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C635B] hover:text-[#181314]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Brand Dashboard</span>
        </Link>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#E8DEC8] text-[#7A1C28]">
          Audition Swipe Deck Active
        </span>
      </div>

      {/* Audition Swipe Deck */}
      <AuditionDeck
        pitchReels={MOCK_PITCH_REELS}
        campaignTitle="Summer 100% Whey Isolate Launch"
      />

    </div>
  );
}
