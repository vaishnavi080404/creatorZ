import TierMatrix from "@/components/landing/TierMatrix";
import FaqAccordion from "@/components/landing/FaqAccordion";
import Link from "next/link";
import { ShieldCheck, Check, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="space-y-12 pb-16">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 text-center space-y-4">
        <span className="text-xs font-bold font-mono text-[#7A1C28] uppercase tracking-wider">
          Transparent Creator Economy Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-[#181314]">
          Zero Agency Markups. <br />
          <span className="font-serif-editorial italic font-normal text-[#7A1C28]">
            Simple, honest platform fees.
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-[#6C635B] max-w-xl mx-auto">
          Unlike traditional influencer agencies that take 30–50% hidden cuts, CreatorZ operates on transparent flat platform processing fees.
        </p>
      </section>

      {/* Fee Breakdown Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white border border-[#E8DEC8] rounded-3xl p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-[#181314]">For Brands</h3>
              <span className="text-xs font-mono font-bold text-[#166534] bg-[#EBF7EE] px-2.5 py-1 rounded-full border border-[#C6E7CE]">
                Zero Subscription Fee
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#7A1C28]">
              5% <span className="text-xs font-normal text-[#6C635B]">Platform Processing Fee</span>
            </div>
            <p className="text-xs text-[#6C635B] leading-relaxed">
              Post unlimited briefs, receive 30–60s Pitch Reels, use the In-Platform Video Review Studio, and get GST tax invoices automatically.
            </p>
            <ul className="space-y-2 text-xs text-[#6C635B] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#166534]" />
                <span>Unlimited open brief postings</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#166534]" />
                <span>Vertical 9:16 Pitch Reel swipe review deck</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#166534]" />
                <span>100% Contractual Protection with milestone refunds</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[#E8DEC8] rounded-3xl p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-[#181314]">For Creators</h3>
              <span className="text-xs font-mono font-bold text-[#166534] bg-[#EBF7EE] px-2.5 py-1 rounded-full border border-[#C6E7CE]">
                100% Free Forever
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#166534]">
              0% <span className="text-xs font-normal text-[#6C635B]">Creator Deduction</span>
            </div>
            <p className="text-xs text-[#6C635B] leading-relaxed">
              Creators keep 100% of their quoted commercial rates. Zero commissions taken from your payout.
            </p>
            <ul className="space-y-2 text-xs text-[#6C635B] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#166534]" />
                <span>Free Pitch Reel video auditions</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#166534]" />
                <span>Auto-compounding Portfolio-From-Delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#166534]" />
                <span>Guaranteed milestone agreements with direct bank payouts</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Tier Matrix */}
      <TierMatrix />

      {/* FAQ */}
      <FaqAccordion />

    </div>
  );
}
