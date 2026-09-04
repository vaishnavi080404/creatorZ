"use client";

import Link from "next/link";
import { MOCK_OPEN_BRIEFS } from "@/lib/mockData";
import { ArrowLeft, Video, Briefcase, Clock, Users } from "lucide-react";

export default function CreatorBriefsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      <div className="flex items-center justify-between">
        <Link
          href="/creator/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C635B] hover:text-[#181314]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Creator Dashboard</span>
        </Link>
      </div>

      <div className="pb-6 border-b border-[#E8DEC8]">
        <div className="flex items-center gap-2 text-xs font-mono mb-1 text-[#7A1C28] uppercase font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Live Brand Opportunities</span>
        </div>
        <h1 className="text-3xl font-bold text-[#181314] font-heading">
          Open Campaign Briefs
        </h1>
        <p className="text-xs text-[#6C635B] mt-1">
          Apply with your 30–60s Pitch Reel video audition. No generic text proposals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_OPEN_BRIEFS.map((brief) => (
          <div
            key={brief.id}
            className="bg-white border border-[#E8DEC8] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
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
                  ₹{brief.budget.toLocaleString()}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#181314] font-heading">{brief.title}</h4>
              <p className="text-xs text-[#6C635B] line-clamp-3">{brief.description}</p>
            </div>

            <div className="pt-4 border-t border-[#F0E8D8] flex items-center justify-between">
              <span className="text-xs font-mono text-[#6C635B]">Deadline: {brief.deadline}</span>
              
              <Link
                href={`/creator/briefs/${brief.id}/apply`}
                className="px-4 py-2 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Audition</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
