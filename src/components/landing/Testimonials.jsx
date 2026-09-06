"use client";
import { Star, ShieldCheck } from "lucide-react";
export default function Testimonials() {
    const metrics = [
        { value: "₹4.8 Cr+", label: "Deal Volume Settled", sub: "100% On-Time Payouts" },
        { value: "1,420+", label: "Commercial Reels Delivered", sub: "Average 4K 60fps" },
        { value: "98.6%", label: "On-Time Delivery Rate", sub: "Milestone Contracted" },
        { value: "4.2x", label: "Average Brand ROAS", sub: "Direct UGC & Paid Ads" }
    ];
    const testimonials = [
        {
            type: "brand",
            quote: "We spent two months working with an influencer agency that charged 35% commission and gave us delayed Google Drive links. On CreatorZ, we published a brief on Monday, watched 12 Pitch Reels that evening, and approved two final cuts by Friday.",
            author: "Tanya Sharma",
            role: "Head of Growth & Brand",
            company: "GlowD2C Clean Skincare",
            outcome: "+240% Return On Ad Spend",
            verifiedDeal: "₹1,20,000 Verified Campaign"
        },
        {
            type: "creator",
            quote: "The milestone contract system is a life-changer. In the past, I had to chase brands on WhatsApp for 90 days after delivering videos. Here, milestones and rates are locked before I even pick up my camera. Once they approve the video, the payout is processed smoothly.",
            author: "Vikram Joshi",
            role: "Tech & Workstation Creator",
            company: "Alpha Tier • 450K Followers",
            outcome: "₹1,85,000 Earned in 30 Days",
            verifiedDeal: "4 Verified Case Studies"
        },
        {
            type: "brand",
            quote: "The In-App Video Review Studio alone saves our creative team 10 hours a week. Being able to scrub through a draft, click at timestamp 0:14, and write 'brighten the product label' completely eliminated 4 rounds of confusing WhatsApp voice notes.",
            author: "Aryan Mehta",
            role: "Founder & CEO",
            company: "AuraActive Nutrition",
            outcome: "Turnaround Cut by 65%",
            verifiedDeal: "₹2,40,000 Campaign Settled"
        },
        {
            type: "creator",
            quote: "Portfolio-From-Delivery™ changed how I pitch. I don't build Canva PDF decks anymore. Every brand deliverable automatically becomes a verified case study with confirmed view counts. Brands reach out directly because they can see real proof.",
            author: "Sneha Rao",
            role: "Beauty & Fashion Creator",
            company: "Beta Tier • 190K Followers",
            outcome: "100% Inbound Deal Win Rate",
            verifiedDeal: "3 Brand Deals in 14 Days"
        }
    ];
    return (<section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 space-y-16">
      
      {/* Top Section Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#66101b] leading-tight">
          Over 1,400 deals closed. <br />
          <span className="italic font-normal opacity-90">
            Zero middleman headaches.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[#82575c] leading-relaxed max-w-xl mx-auto font-normal">
          See what happens when brands and creators transact with real milestone protection, 
          frame-accurate feedback, and automated portfolios.
        </p>
      </div>

      {/* Outcome Metrics Bar (Big & Minimal) */}
      <div className="bg-[#f3e8dc] border-2 border-[#e4d0c0] rounded-3xl p-8 shadow-soft-floating">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center font-mono">
          {metrics.map((m, i) => (<div key={i} className="space-y-1 p-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#66101b] block">
                {m.value}
              </span>
              <span className="text-xs font-bold text-[#66101b] block pt-1 uppercase">
                {m.label}
              </span>
              <span className="text-[11px] text-[#82575c] block font-mono">
                {m.sub}
              </span>
            </div>))}
        </div>
      </div>

      {/* Testimonials 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (<div key={i} className="bg-white/95 border-2 border-[#e4d0c0] rounded-3xl p-8 shadow-soft-floating flex flex-col justify-between space-y-6 hover:border-[#66101b] transition-all">
            <div className="space-y-4">
              
              {/* Top Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-600">
                  {[...Array(5)].map((_, idx) => (<Star key={idx} className="w-4 h-4 fill-current text-amber-600"/>))}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#66101b] bg-[#f3e8dc] px-2.5 py-1 rounded-md border border-[#e4d0c0]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#66101b]"/>
                  <span>{t.verifiedDeal}</span>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-[#66101b] leading-relaxed italic">
                “{t.quote}”
              </p>

            </div>

            {/* Bottom Author & Outcome Strip */}
            <div className="pt-6 border-t border-[#e4d0c0] flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#66101b] font-heading">{t.author}</h4>
                <p className="text-xs text-[#82575c] font-mono">{t.role} • {t.company}</p>
              </div>

              <div className="bg-[#f3e8dc] px-3 py-1.5 rounded-xl border border-[#e4d0c0] text-right">
                <span className="text-[10px] font-mono uppercase text-[#82575c] block">Result</span>
                <span className="text-xs font-mono font-bold text-[#66101b]">{t.outcome}</span>
              </div>
            </div>

          </div>))}
      </div>

    </section>);
}
