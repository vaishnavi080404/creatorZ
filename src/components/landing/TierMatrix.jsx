"use client";
import { CheckCircle2 } from "lucide-react";
export default function TierMatrix() {
    const tiers = [
        {
            tierName: "Alpha Tier",
            scoreRange: "Score 90–100",
            badge: "Top 5% Elite",
            badgeColor: "bg-[#66101b] text-[#faf3eb]",
            cardBorder: "border-[#66101b] shadow-card-elevated",
            commercialRate: "₹60,000 – ₹1,50,000",
            description: "High-reach authority creators with verified 3-second hook retention and massive organic conversion track records.",
            metrics: [
                { label: "Avg Hook Retention", value: "88.4%" },
                { label: "Avg Engagement", value: "7.8%" },
                { label: "On-Time Delivery", value: "99.2%" }
            ],
            perks: [
                "Priority Pitch Reel audition placement",
                "24-Hour instant direct bank release",
                "Direct corporate brand introductions",
                "Dedicated creative strategist concierge"
            ],
            featuredCreators: [
                { name: "Ananya Sen", niche: "Tech & Workspace", reach: "420K" },
                { name: "Rohan Kulkarni", niche: "D2C Growth", reach: "310K" }
            ]
        },
        {
            tierName: "Beta Tier",
            scoreRange: "Score 75–89",
            badge: "Top 20% High Performers",
            badgeColor: "bg-[#eddcd0] text-[#66101b]",
            cardBorder: "border-[#e4d0c0]",
            commercialRate: "₹25,000 – ₹60,000",
            description: "Consistent, high-velocity creators delivering frame-accurate commercial assets with dependable turnaround times.",
            metrics: [
                { label: "Avg Hook Retention", value: "76.2%" },
                { label: "Avg Engagement", value: "5.4%" },
                { label: "On-Time Delivery", value: "97.5%" }
            ],
            perks: [
                "Open brief instant notification",
                "Full milestone contract coverage",
                "Portfolio-From-Delivery™ automated case studies",
                "In-app video review revision pins"
            ],
            featuredCreators: [
                { name: "Tanya Roy", niche: "Clean Beauty", reach: "185K" },
                { name: "Devansh Mehta", niche: "Fitness & Nutrition", reach: "240K" }
            ]
        },
        {
            tierName: "Gamma Tier",
            scoreRange: "Score 60–74",
            badge: "Emerging UGC Talents",
            badgeColor: "bg-[#f3e8dc] text-[#82575c]",
            cardBorder: "border-[#e4d0c0]",
            commercialRate: "₹10,000 – ₹25,000",
            description: "Rising organic storytellers and UGC specialists offering high-volume authentic product demonstrations at competitive rates.",
            metrics: [
                { label: "Avg Hook Retention", value: "65.0%" },
                { label: "Avg Engagement", value: "4.1%" },
                { label: "On-Time Delivery", value: "95.0%" }
            ],
            perks: [
                "30-Second video pitch audition deck",
                "Standard direct payment protection",
                "Automated GST invoice generation",
                "Tier advancement on every approved order"
            ],
            featuredCreators: [
                { name: "Simran Kaur", niche: "Everyday Lifestyle", reach: "65K" },
                { name: "Aryan Pillai", niche: "Student Tech", reach: "80K" }
            ]
        }
    ];
    return (<section className="bg-[#f3e8dc] border-y border-[#e4d0c0] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#66101b] leading-tight">
            Transparent creator tiers. <br />
            <span className="italic font-normal opacity-90">
              Backed by real performance data.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#82575c] leading-relaxed max-w-xl mx-auto font-normal">
            No vanity follower metrics. Every creator is ranked based on verified hook retention, 
            on-time delivery, and proven commercial case studies.
          </p>
        </div>

        {/* 3 Large Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (<div key={i} className={`bg-white/95 border-2 rounded-3xl p-7 flex flex-col justify-between space-y-6 ${tier.cardBorder} hover:border-[#66101b] transition-all`}>
              <div className="space-y-5">
                
                {/* Tier Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#e4d0c0]">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-[#66101b]">
                      {tier.tierName}
                    </h3>
                    <span className="text-xs font-mono text-[#82575c]">
                      {tier.scoreRange}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                </div>

                {/* Rate Range */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#82575c] block font-semibold">
                    Typical Rate Per Delivery
                  </span>
                  <span className="text-xl font-bold font-mono text-[#66101b] block mt-0.5">
                    {tier.commercialRate}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#82575c] leading-relaxed">
                  {tier.description}
                </p>

                {/* Performance Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 bg-[#faf3eb] p-3 rounded-2xl border border-[#e4d0c0] text-center font-mono">
                  {tier.metrics.map((m, idx) => (<div key={idx}>
                      <span className="text-[9px] text-[#82575c] block uppercase">{m.label}</span>
                      <span className="text-xs font-bold text-[#66101b] block mt-0.5">{m.value}</span>
                    </div>))}
                </div>

                {/* Key Perks List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase text-[#66101b] font-bold block">
                    Tier Capabilities:
                  </span>
                  <div className="space-y-1.5">
                    {tier.perks.map((perk, idx) => (<div key={idx} className="flex items-start gap-2 text-xs text-[#82575c]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#66101b] flex-shrink-0 mt-0.5"/>
                        <span>{perk}</span>
                      </div>))}
                  </div>
                </div>

              </div>

              {/* Sample Creators Strip */}
              <div className="pt-4 border-t border-[#e4d0c0] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#82575c] block font-semibold">
                  Verified Sample Creators:
                </span>
                <div className="flex flex-wrap gap-2">
                  {tier.featuredCreators.map((c, idx) => (<span key={idx} className="text-[11px] font-mono bg-[#faf3eb] px-2.5 py-1 rounded-lg border border-[#e4d0c0] text-[#66101b]">
                      {c.name} • {c.reach}
                    </span>))}
                </div>
              </div>

            </div>))}
        </div>

        {/* Bottom Note */}
        <div className="bg-white/95 border-2 border-[#e4d0c0] rounded-2xl p-6 text-center max-w-4xl mx-auto space-y-2 shadow-xs">
          <h4 className="text-sm font-bold font-heading text-[#66101b]">
            How is your Creator Tier calculated?
          </h4>
          <p className="text-xs text-[#82575c] max-w-2xl mx-auto leading-relaxed font-normal">
            Tiers are updated automatically on the 1st of every month using real verified order completion history, 
            3-second video hook retention from Pitch Reels, and brand feedback ratings.
          </p>
        </div>

      </div>
    </section>);
}
