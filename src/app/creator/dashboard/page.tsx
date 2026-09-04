"use client";

import Link from "next/link";
import { MOCK_CREATORS, MOCK_OPEN_BRIEFS, MOCK_ORDER_ROOM } from "@/lib/mockData";
import { UserCheck, Video, Briefcase, Award, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export default function CreatorDashboardPage() {
  const creator = MOCK_CREATORS[0]; // Alex Kumar

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Creator Account Header */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E8DEC8] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#181314] font-heading">{creator.name}</h1>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
                👑 {creator.tier.toUpperCase()} TIER ({creator.score}/100)
              </span>
            </div>
            <p className="text-xs text-[#6C635B] mt-0.5">@{creator.username} • {creator.category} • {creator.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/creator/briefs"
            className="px-5 py-3 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white text-xs font-bold shadow-md transition flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Audition for Briefs</span>
          </Link>

          <Link
            href="/creator/portfolio"
            className="px-5 py-3 rounded-full bg-[#FAF6EE] hover:bg-[#F2EAE0] border border-[#D8CEBD] text-[#181314] text-xs font-bold transition flex items-center gap-1.5"
          >
            <Award className="w-4 h-4 text-[#7A1C28]" />
            <span>My Auto-Portfolio</span>
          </Link>
        </div>
      </div>

      {/* Creator Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">Active Contract Value</span>
          <span className="text-2xl font-bold font-mono text-[#166534] block mt-1">₹25,000</span>
          <span className="text-[10px] text-[#6C635B] block mt-0.5">1 Active Milestone Room</span>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">Pending In-Chat Offers</span>
          <span className="text-2xl font-bold font-mono text-[#7A1C28] block mt-1">₹35,000</span>
          <Link href="/creator/offers" className="text-[11px] text-[#7A1C28] font-bold hover:underline block mt-0.5">
            Review Offer Card →
          </Link>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">Auto-Portfolio Entries</span>
          <span className="text-2xl font-bold font-mono text-[#181314] block mt-1">{creator.autoPortfolio.length} Case Studies</span>
          <span className="text-[10px] text-[#166534] font-medium block mt-0.5">100% Brand Verified</span>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">On-Time Delivery Rate</span>
          <span className="text-2xl font-bold font-mono text-[#181314] block mt-1">{creator.onTimeDeliveryRate}%</span>
          <span className="text-[10px] text-[#6C635B] block mt-0.5">Avg Turnaround: 3 Days</span>
        </div>
      </div>

      {/* Grid: Open Briefs to Apply vs Active Campaign Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Open Briefs to Audition For (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
            <div>
              <h2 className="text-base font-bold font-heading text-[#181314]">Recommended Open Briefs</h2>
              <p className="text-xs text-[#6C635B]">Record a 30–60s Pitch Reel to audition</p>
            </div>

            <Link href="/creator/briefs" className="text-xs font-bold text-[#7A1C28] hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {MOCK_OPEN_BRIEFS.map((brief) => (
              <div
                key={brief.id}
                className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#181314]">{brief.title}</h3>
                    <span className="text-[10px] font-mono font-bold bg-white text-[#7A1C28] px-2 py-0.5 rounded border border-[#E8DEC8]">
                      ₹{brief.budget.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6C635B]">{brief.brandName} • {brief.deliverablesRequired}</p>
                </div>

                <Link
                  href={`/creator/briefs/${brief.id}/apply`}
                  className="px-4 py-2 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 flex-shrink-0"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Record Pitch Reel</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Active Order Room (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
            <div>
              <h2 className="text-base font-bold font-heading text-[#181314]">Active Order Milestone</h2>
              <p className="text-xs text-[#6C635B]">Deliverables in progress</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#7A1C28] uppercase">Stage 3: Video Draft in Review</span>
              <span className="text-xs font-mono font-bold text-[#166534]">₹{MOCK_ORDER_ROOM.contractTotal.toLocaleString()}</span>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#181314]">{MOCK_ORDER_ROOM.campaignTitle}</h3>
              <p className="text-[11px] text-[#6C635B]">Brand: {MOCK_ORDER_ROOM.brandName}</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E8DEC8] text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#6C635B]">Brand Review Status:</span>
                <span className="font-bold text-[#7A1C28]">2 Timestamp Pins Added</span>
              </div>
            </div>

            <Link
              href={`/brand/orders/${MOCK_ORDER_ROOM.id}`}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F2EAE0] border border-[#D8CEBD] text-[#181314] font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>View Timestamped Pins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
