"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { MOCK_OPEN_BRIEFS, MOCK_PITCH_REELS } from "@/lib/mockData";
import AuditionDeck from "@/components/pitch-reels/AuditionDeck";
import Link from "next/link";
import { ArrowLeft, Video, Filter } from "lucide-react";

interface ApplicantsPageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignApplicantsPage({ params }: ApplicantsPageProps) {
  const resolvedParams = use(params);
  const brief = MOCK_OPEN_BRIEFS.find((b) => b.id === resolvedParams.id) || MOCK_OPEN_BRIEFS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/briefs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C635B] hover:text-[#181314]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Open Briefs</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/campaigns/ord-8492/room`}
            className="text-xs font-bold px-4 py-2 rounded-full border border-[#D8CEBD] bg-white text-[#181314] hover:bg-[#FAF6EE] transition"
          >
            Go to Active Order Room →
          </Link>
        </div>
      </div>

      {/* The Breakthrough Pitch Reels Audition Deck Component */}
      <AuditionDeck
        pitchReels={MOCK_PITCH_REELS}
        campaignTitle={brief.title}
      />

    </div>
  );
}
