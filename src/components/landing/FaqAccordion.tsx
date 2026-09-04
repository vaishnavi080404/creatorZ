"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the Pitch Reels™ video audition system work?",
      a: "Brands publish an Open Brief specifying deliverables, target hook requirements, and budget. Instead of reading through hundreds of generic text DMs and outdated PDF decks, creators submit 30–60 second vertical video pitches demonstrating their on-camera energy and 3-second hook concept. Brands swipe through applicants in an ultra-fast 9:16 mobile review interface."
    },
    {
      q: "What is Portfolio-From-Delivery™ and how does it auto-compound?",
      a: "Every time a brand approves a completed video deliverable and final sign-off is completed, that asset automatically converts into a verified, categorized case study on the creator's profile. It permanently displays confirmed brand logos, real verified engagement metrics, and client reviews. Creators never have to manually update portfolio websites or PDF decks again."
    },
    {
      q: "How do Milestone Agreements protect both brands and creators?",
      a: "Before production begins, both parties lock the agreed campaign milestones and delivery schedule into a binding digital agreement. Creators film with total peace of mind knowing rates and terms are legally confirmed. Brands retain complete control because final payment is released only once the final video cut is approved. If an order is canceled, our structured 4-tier milestone matrix dictates clear terms based on the current production phase."
    },
    {
      q: "How does the In-App Video Review Studio replace WhatsApp & Drive?",
      a: "Creators upload watermarked video drafts directly to the platform's Order Room. Brands scrub the playback timeline and click at exact seconds (e.g. 0:14) to pin specific revision notes like 'tighten the product shot' or 'adjust caption timing'. Both parties see pinned feedback in real time and can mark each pin as resolved, reducing edits from an average of 6 rounds to 2."
    },
    {
      q: "How are GST invoices, payouts, and corporate taxes handled?",
      a: "Every commercial deal generated on CreatorZ automatically calculates 18% GST (Goods and Services Tax) and provides downloadable corporate tax invoices with GSTIN validation for brands. Creator payouts are settled directly into registered bank accounts via NEFT/IMPS with automated TDS statements and receipts."
    },
    {
      q: "What are Creator Tiers (Alpha, Beta, Gamma) and how do I rank up?",
      a: "Creators receive an objective score from 0 to 100 recalculated on the 1st of every month. The algorithm evaluates verified 3-second hook retention from submitted Pitch Reels, on-time delivery percentages, dispute frequency, and brand satisfaction ratings. Higher tiers unlock higher commercial deal minimums and 24-hour instant payout settlement."
    }
  ];

  return (
    <section className="bg-[#f3e8dc] border-t border-[#e4d0c0] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#66101b] leading-tight">
            Frequently Asked <br />
            <span className="italic font-normal opacity-90">
              Questions.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#82575c] max-w-lg mx-auto leading-relaxed font-normal">
            Straightforward answers about our milestone protection, video audition formats, 
            GST compliance, and automated portfolio system.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white/95 border-2 border-[#e4d0c0] rounded-2xl overflow-hidden shadow-xs hover:border-[#66101b] transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#66101b] font-heading cursor-pointer"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform ${
                    isOpen ? "bg-[#66101b] text-[#faf3eb] rotate-180" : "bg-[#faf3eb] text-[#66101b]"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#82575c] leading-relaxed border-t border-[#e4d0c0] mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-[#82575c]">
            Have a custom agency contract or high-volume enterprise inquiry?{" "}
            <Link href="/brand/briefs/new" className="text-[#66101b] font-bold underline hover:text-[#4d0a13]">
              Talk to our Commercial Operations team
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
