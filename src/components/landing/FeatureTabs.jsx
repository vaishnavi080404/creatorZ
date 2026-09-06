"use client";
import { useState } from "react";
import Link from "next/link";
import { Building2, UserCheck, Check, ArrowUpRight } from "lucide-react";
export default function FeatureTabs() {
    const [activeTab, setActiveTab] = useState("brand");
    const brandFeatures = [
        {
            title: "9:16 Video Audition Deck",
            desc: "Watch 30–60s video pitches from actors, comedians, vocalists, and digital creators on a vertical player. Swipe right to shortlist and send offers in minutes."
        },
        {
            title: "Frame-Accurate Video Revision Studio",
            desc: "Leave feedback at exact seconds on video drafts. Stop managing messy Google Drive links and confusing WhatsApp timestamps."
        },
        {
            title: "Direct Milestone Sign-offs & GST Invoices",
            desc: "Clear milestone sign-offs protect your budget until you approve the final cut. Automatic GST-compliant corporate tax invoices generated instantly."
        },
        {
            title: "Cross-Platform Commercial Rights & NDAs",
            desc: "Built-in intellectual property licensing, commercial broadcast usage rights, and automated milestone contracts with dispute mediation."
        }
    ];
    const creatorFeatures = [
        {
            title: "Portfolio-From-Delivery™ Automation",
            desc: "Every approved campaign deliverable automatically converts into a verified case study with confirmed brand logos and verified retention metrics."
        },
        {
            title: "Guaranteed Milestone Payouts",
            desc: "No more chasing brands for 90 days. Contractual terms and milestones are locked before you start rehearsals or filming, with direct payout upon final client approval."
        },
        {
            title: "Video Auditions That Win Deals",
            desc: "Pitch briefs with your actual acting chops, comedic timing, or musical hooks instead of competing with 500 copy-pasted text DMs."
        },
        {
            title: "Alpha, Beta & Gamma Tier Recognition",
            desc: "Fair algorithmic 0–100 tier scoring across YouTube, Instagram, and live performance that commands higher rates without agency cuts."
        }
    ];
    return (<section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-12">
      
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#66101b] leading-tight">
          Built for forward-thinking brands & <br />
          <span className="italic font-normal opacity-90">
            serious creative artists.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[#82575c] max-w-xl mx-auto leading-relaxed font-normal">
          Whether you are casting actors, comedians, singers, or digital creators for high-impact campaigns—or you are talent looking for direct, guaranteed deals.
        </p>
      </div>

      {/* Tab Selector Switch */}
      <div className="flex justify-center">
        <div className="bg-[#f3e8dc] p-1.5 rounded-2xl border-2 border-[#e4d0c0] flex items-center gap-1.5 shadow-xs">
          <button onClick={() => setActiveTab("brand")} className={`px-7 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${activeTab === "brand"
            ? "bg-[#66101b] text-[#faf3eb] shadow-md"
            : "text-[#82575c] hover:text-[#66101b] hover:bg-white/60"}`}>
            <Building2 className="w-4 h-4"/>
            <span>For Brands & Agencies</span>
          </button>

          <button onClick={() => setActiveTab("creator")} className={`px-7 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${activeTab === "creator"
            ? "bg-[#66101b] text-[#faf3eb] shadow-md"
            : "text-[#82575c] hover:text-[#66101b] hover:bg-white/60"}`}>
            <UserCheck className="w-4 h-4"/>
            <span>For Professional Creators</span>
          </button>
        </div>
      </div>

      {/* Tab Content Box */}
      <div className="bg-white/95 border-2 border-[#e4d0c0] rounded-3xl p-6 sm:p-12 shadow-soft-floating">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Feature Bullets */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#66101b] leading-snug">
              {activeTab === "brand"
            ? "Scale high-converting video campaigns with zero agency markups."
            : "Monetize predictably with direct milestone deals and automated portfolios."}
            </h3>

            <div className="space-y-4">
              {(activeTab === "brand" ? brandFeatures : creatorFeatures).map((feat, i) => (<div key={i} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#eddcd0] text-[#66101b] border border-[#e4d0c0] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]"/>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#66101b] font-heading">{feat.title}</h4>
                    <p className="text-xs text-[#82575c] mt-0.5 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>))}
            </div>

            <div className="pt-3">
              <Link href={activeTab === "brand" ? "/brand/dashboard" : "/creator/dashboard"} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#66101b] hover:bg-[#4d0a13] text-[#faf3eb] text-xs sm:text-sm font-bold shadow-md transition transform active:scale-98">
                <span>{activeTab === "brand" ? "Open Brand Portal" : "Open Creator Portal"}</span>
                <ArrowUpRight className="w-4 h-4 text-[#faf3eb]"/>
              </Link>
            </div>
          </div>

          {/* Feature Highlights Graphic Box */}
          <div className="bg-[#f3e8dc] border-2 border-[#e4d0c0] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4d0c0]">
              <span className="text-[11px] font-mono font-bold uppercase text-[#66101b] tracking-wider">
                {activeTab === "brand" ? "Brand Performance Snapshot" : "Creator Performance Snapshot"}
              </span>
              <span className="text-[10px] font-mono text-[#82575c]">
                Platform Standards
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center font-mono">
              <div className="bg-white p-4 rounded-xl border border-[#e4d0c0] shadow-xs">
                <span className="text-[10px] text-[#82575c] block uppercase">Review Speed</span>
                <span className="text-xl font-bold text-[#66101b] block mt-1">&lt; 30 Sec</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e4d0c0] shadow-xs">
                <span className="text-[10px] text-[#82575c] block uppercase">Contract Safety</span>
                <span className="text-xl font-bold text-[#66101b] block mt-1">100% Guaranteed</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e4d0c0] shadow-xs">
                <span className="text-[10px] text-[#82575c] block uppercase">Dispute Rate</span>
                <span className="text-xl font-bold text-[#66101b] block mt-1">&lt; 0.4%</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e4d0c0] shadow-xs">
                <span className="text-[10px] text-[#82575c] block uppercase">Portfolio Compounding</span>
                <span className="text-xl font-bold text-[#66101b] block mt-1">Instant</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#e4d0c0] text-xs text-[#82575c] leading-relaxed italic text-center">
              {activeTab === "brand"
            ? "“We shortlisted 3 video concepts in 10 minutes instead of waiting 2 weeks for agency proposals.” — Tanya S., Growth Lead"
            : "“Every delivery builds my case studies automatically. Brands hire me on proof, not empty follower numbers.” — Kabir M., Creator"}
            </div>
          </div>

        </div>
      </div>

    </section>);
}
