"use client";
import Link from "next/link";
import { MOCK_OPEN_BRIEFS, MOCK_ORDER_ROOM } from "@/lib/mockData";
import { Video, Plus, ArrowRight } from "lucide-react";
export default function BrandDashboardPage() {
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Brand Account Header */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#7A1C28] text-white flex items-center justify-center font-bold text-xl shadow-md">
            BL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#181314] font-heading">BeastLife Brand Portal</h1>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EBF7EE] text-[#166534] border border-[#C6E7CE]">
                ✓ Verified Enterprise
              </span>
            </div>
            <p className="text-xs text-[#6C635B] mt-0.5">Manage open briefs, audition pitch reels, milestone order rooms, and tax invoices.</p>
          </div>
        </div>

        <Link href="/brand/briefs/new" className="px-5 py-3 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white text-xs font-bold shadow-md transition flex items-center gap-2 self-start md:self-auto">
          <Plus className="w-4 h-4"/>
          <span>Create Open Brief</span>
        </Link>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">Active Briefs</span>
          <span className="text-2xl font-bold font-mono text-[#181314] block mt-1">3 Briefs</span>
          <span className="text-[11px] text-[#7A1C28] font-semibold mt-0.5 block">67 Total Auditions</span>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">Pending Pitch Reels</span>
          <span className="text-2xl font-bold font-mono text-[#7A1C28] block mt-1">14 Videos</span>
          <Link href="/brand/auditions" className="text-[11px] text-[#7A1C28] font-bold hover:underline block mt-0.5">
            Launch Swipe Deck →
          </Link>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">Committed Budget</span>
          <span className="text-2xl font-bold font-mono text-[#166534] block mt-1">₹60,000</span>
          <span className="text-[10px] text-[#6C635B] block mt-0.5">2 Orders in Production</span>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">Avg Audition Time</span>
          <span className="text-2xl font-bold font-mono text-[#181314] block mt-1">42 Sec</span>
          <span className="text-[10px] text-[#166534] font-medium block mt-0.5">100% Video Auditions</span>
        </div>
      </div>

      {/* Main Grid: Active Auditions & Active Order Rooms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Active Briefs & Audition Decks (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
            <div>
              <h2 className="text-base font-bold font-heading text-[#181314]">Your Active Open Briefs</h2>
              <p className="text-xs text-[#6C635B]">Review candidate pitch reels and shortlist creators</p>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_OPEN_BRIEFS.map((brief) => (<div key={brief.id} className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#181314]">{brief.title}</h3>
                    <span className="text-[10px] font-mono font-bold bg-white text-[#7A1C28] px-2 py-0.5 rounded border border-[#E8DEC8]">
                      ₹{brief.budget.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6C635B] mt-1">{brief.deliverablesRequired} • Deadline: {brief.deadline}</p>
                </div>

                <Link href="/brand/auditions" className="px-4 py-2 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 flex-shrink-0">
                  <Video className="w-3.5 h-3.5"/>
                  <span>Review Auditions ({brief.applicantsCount})</span>
                </Link>
              </div>))}
          </div>
        </div>

        {/* Right: Active Order Rooms (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
            <div>
              <h2 className="text-base font-bold font-heading text-[#181314]">Active Order Rooms</h2>
              <p className="text-xs text-[#6C635B]">Milestone progress & video revision review</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-[#7A1C28]">Stage 3 Active</span>
              <span className="text-xs font-mono font-bold text-[#166534]">₹{MOCK_ORDER_ROOM.contractTotal.toLocaleString()} Committed</span>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#181314]">{MOCK_ORDER_ROOM.campaignTitle}</h3>
              <p className="text-[11px] text-[#6C635B]">Creator: {MOCK_ORDER_ROOM.creatorName} (@{MOCK_ORDER_ROOM.creatorUsername})</p>
            </div>

            <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#E8DEC8]">
              <div className="bg-[#7A1C28] h-full w-1/2"></div>
            </div>

            <Link href={`/brand/orders/${MOCK_ORDER_ROOM.id}`} className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F2EAE0] border border-[#D8CEBD] text-[#181314] font-bold text-xs flex items-center justify-center gap-1.5 transition">
              <span>Open Video Review Studio</span>
              <ArrowRight className="w-3.5 h-3.5"/>
            </Link>
          </div>
        </div>

      </div>

    </div>);
}
