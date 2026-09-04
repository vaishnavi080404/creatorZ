"use client";

import { Video, ShieldCheck, CheckSquare, Layers, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      stepNumber: "01",
      icon: Video,
      title: "Post Brief & Receive Pitch Reels™",
      tagline: "Audition hooks, not text DMs",
      description:
        "Brands publish open briefs with target deliverables and clear budgets. Creators apply with high-energy 30–60s video audition hooks. Review applicant creativity in a fast 9:16 swipe interface.",
      highlight: "Average 14 Video Pitches in 24 Hours",
      statusBadge: "30s Video Auditions"
    },
    {
      stepNumber: "02",
      icon: ShieldCheck,
      title: "Lock Milestone Agreement",
      tagline: "Zero ghosting, direct contract certainty",
      description:
        "Before production starts, both parties lock the milestone terms. Creators start filming knowing deliverables and rates are legally confirmed, and brands maintain full approval control.",
      highlight: "Direct Contracts • 18% GST Compliant",
      statusBadge: "Milestone Protected"
    },
    {
      stepNumber: "03",
      icon: CheckSquare,
      title: "Frame-Accurate Video Review Studio",
      tagline: "Pin revisions at exact timestamps",
      description:
        "No more messy Google Drive links or confusing WhatsApp voice notes. Scrub through creator drafts and click directly on the timeline at exact seconds (e.g. 0:14) to leave actionable revision pins.",
      highlight: "2.1 Revisions Avg vs 6 on WhatsApp",
      statusBadge: "Timestamp Precision"
    },
    {
      stepNumber: "04",
      icon: Layers,
      title: "Instant Payout & Auto-Portfolios",
      tagline: "Every delivery compounds your career",
      description:
        "Upon final approval, payout is disbursed directly to the creator. The approved reel automatically converts into a verified case study on the creator's profile with confirmed brand attribution and metrics.",
      highlight: "Zero Manual Portfolio Upkeep",
      statusBadge: "Portfolio-From-Delivery™"
    }
  ];

  return (
    <section className="bg-[#f3e8dc] border-y border-[#e4d0c0] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#66101b] leading-tight">
            Four steps from brief to <br />
            <span className="italic font-normal opacity-90">
              verified viral delivery.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#82575c] leading-relaxed max-w-xl mx-auto font-normal">
            A fully integrated workflow eliminating agency delays, unpaid drafts, and lost files.
          </p>
        </div>

        {/* 4 Large Numbered Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-white/95 border-2 border-[#e4d0c0] rounded-3xl p-7 shadow-soft-floating flex flex-col justify-between hover:border-[#66101b] hover:shadow-card-elevated transition-all group"
              >
                <div className="space-y-4">
                  {/* Step Numeral & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-bold font-mono text-[#66101b]/80 group-hover:text-[#66101b] transition">
                      {s.stepNumber}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#faf3eb] border border-[#e4d0c0] flex items-center justify-center text-[#66101b] group-hover:bg-[#66101b] group-hover:text-[#faf3eb] transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="inline-block">
                    <span className="text-[10px] font-mono font-bold text-[#66101b] bg-[#eddcd0] px-2.5 py-0.5 rounded-md border border-[#e4d0c0]">
                      {s.statusBadge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-bold font-heading text-[#66101b] leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-xs font-mono text-[#66101b]/80 mt-0.5 font-semibold">
                      {s.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#82575c] leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Highlight Metric Box */}
                <div className="pt-6 mt-6 border-t border-[#e4d0c0]">
                  <div className="bg-[#faf3eb] rounded-xl p-2.5 text-center border border-[#e4d0c0]">
                    <span className="text-[11px] font-mono font-bold text-[#66101b]">
                      {s.highlight}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="text-center pt-4">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#66101b] hover:text-[#4d0a13] font-mono uppercase tracking-wider transition group"
          >
            <span>Read Complete Workflow & Milestone Terms</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
