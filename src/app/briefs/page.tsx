"use client";

import { MOCK_OPEN_BRIEFS } from "@/lib/mockData";
import Link from "next/link";
import { Briefcase, Video, Users, Clock, Plus, ArrowRight } from "lucide-react";

export default function OpenBriefsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8DEC8]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-1 text-[#7A1C28] uppercase font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Active Open Briefs</span>
          </div>
          <h1 className="text-3xl font-bold text-[#181314] font-heading">
            Live Campaign Briefs
          </h1>
          <p className="text-xs text-[#6C635B] mt-1">
            Apply with a 30–60s Pitch Reel video audition. No spreadsheets, no generic text DMs.
          </p>
        </div>

        <Link
          href="/briefs/new"
          className="px-5 py-2.5 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white text-xs font-bold shadow-sm transition flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post an Open Brief</span>
        </Link>
      </div>

      {/* Briefs List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_OPEN_BRIEFS.map((brief) => (
          <div
            key={brief.id}
            className="bg-white border border-[#E8DEC8] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              
              {/* Brand Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={brief.brandLogo}
                    alt={brief.brandName}
                    className="w-10 h-10 rounded-xl object-cover border border-[#E8DEC8]"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#181314]">{brief.brandName}</h3>
                    <span className="text-[11px] text-[#6C635B]">{brief.brandIndustry}</span>
                  </div>
                </div>

                <span className="text-xs font-bold font-mono text-[#7A1C28] bg-[#FAF6EE] px-2.5 py-1 rounded-md border border-[#E8DEC8]">
                  ₹{brief.budget.toLocaleString()} Budget
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-[#181314] font-heading leading-snug">
                  {brief.title}
                </h4>
                <p className="text-xs text-[#6C635B] line-clamp-3 leading-relaxed">
                  {brief.description}
                </p>
              </div>

              {/* Requirements & Target Audience */}
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-1.5 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-semibold">Deliverable:</span>
                  <span className="font-semibold text-[#181314]">{brief.deliverablesRequired}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-semibold">Target Audience:</span>
                  <span className="text-[11px] text-[#6C635B]">{brief.targetAudience}</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions & Applicants Count */}
            <div className="pt-4 border-t border-[#F0E8D8] flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-mono text-[#6C635B]">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#7A1C28]" />
                  {brief.applicantsCount} Auditions
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {brief.deadline}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/campaigns/${brief.id}/applicants`}
                  className="text-xs font-semibold text-[#6C635B] hover:text-[#181314] hover:underline"
                >
                  Review Deck
                </Link>
                <Link
                  href={`/briefs/${brief.id}/apply`}
                  className="px-3.5 py-2 rounded-lg bg-[#7A1C28] hover:bg-[#63141E] text-white text-xs font-bold shadow-sm transition flex items-center gap-1"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Audition →</span>
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
