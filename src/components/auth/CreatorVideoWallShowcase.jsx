"use client";

import { Sparkles, ArrowRight } from "lucide-react";

// 9 Authentic UGC Creator Videos across 3 Columns
const COLUMN_1 = [
  {
    id: "c1-1",
    video: "/creators/skincare-girl.mp4",
  },
  {
    id: "c1-2",
    video: "/creators/gym-boy.mp4",
  },
  {
    id: "c1-3",
    video: "/creators/grwm-girl.mp4",
  },
];

const COLUMN_2 = [
  {
    id: "c2-1",
    video: "/creators/creator-boy.mp4",
  },
  {
    id: "c2-2",
    video: "/creators/skincare-routine.mp4",
  },
  {
    id: "c2-3",
    video: "/creators/creator-lifestyle.mp4",
  },
];

const COLUMN_3 = [
  {
    id: "c3-1",
    video: "/creators/grwm-makeup.mp4",
  },
  {
    id: "c3-2",
    video: "/creators/fitness-training.mp4",
  },
  {
    id: "c3-3",
    video: "/creators/creator-tech.mp4",
  },
];

function VideoCard({ item }) {
  return (
    <div className="relative w-full aspect-[3/4] min-h-[175px] sm:min-h-[205px] lg:min-h-[225px] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 border border-[#DECDBE]/90 shadow-xs hover:shadow-sm transition-all duration-300 group/card shrink-0">
      <video
        src={item.video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none group-hover/card:opacity-60 transition-opacity duration-300" />
    </div>
  );
}

export default function CreatorVideoWallShowcase() {
  const handleScrollToForm = () => {
    const firstInput = document.querySelector('input[type="text"]');
    if (firstInput) {
      firstInput.focus();
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between select-none bg-[#FAF3EB]">
      
      {/* Top Floating Badge Header - Clean, No Top Blur */}
      <div className="absolute top-3.5 left-4 sm:left-6 z-30">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DECDBE] text-xs font-semibold text-[#520B15] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#9E7B35]" />
          <span>Vetted Creator Auditions</span>
        </div>
      </div>

      {/* 3 Columns Automatically Scrolling in Vertical Marquee (No top blur, tall portrait cards) */}
      <div className="relative w-full h-full overflow-hidden px-3 sm:px-4 pt-14 pb-28">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 h-full">
          
          {/* Column 1 - Auto Scrolls Up */}
          <div className="flex flex-col gap-2.5 sm:gap-3.5 animate-marquee-v-up">
            {COLUMN_1.concat(COLUMN_1).map((item, idx) => (
              <VideoCard key={`c1-${item.id}-${idx}`} item={item} />
            ))}
          </div>

          {/* Column 2 - Staggered Offset & Auto Scrolls Down */}
          <div className="flex flex-col gap-2.5 sm:gap-3.5 animate-marquee-v-down">
            {COLUMN_2.concat(COLUMN_2).map((item, idx) => (
              <VideoCard key={`c2-${item.id}-${idx}`} item={item} />
            ))}
          </div>

          {/* Column 3 - Auto Scrolls Up */}
          <div className="flex flex-col gap-2.5 sm:gap-3.5 animate-marquee-v-up">
            {COLUMN_3.concat(COLUMN_3).map((item, idx) => (
              <VideoCard key={`c3-${item.id}-${idx}`} item={item} />
            ))}
          </div>

        </div>
      </div>

      {/* Prominent Beige Shadow & Blurry Gradient Overlay at Bottom ONLY */}
      {/* Layer 1: Ambient Beige Gradient Wash */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[210px] sm:h-[240px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, #FAF3EB 46%, rgba(250, 243, 235, 0.96) 72%, rgba(250, 243, 235, 0.6) 88%, transparent 100%)",
        }}
      />

      {/* Layer 2: Frosted Glass Backdrop Blur */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[180px] sm:h-[210px] pointer-events-none z-20 backdrop-blur-md"
        style={{
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Layer 3: Warm Upward Shadow & Gradient Wash */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[80px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, #FAF3EB 50%, rgba(250, 243, 235, 0.7) 80%, transparent 100%)",
        }}
      />

      {/* Bottom Content Layer: "Your Next Breakthrough Is Just One Pitch Away" */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 lg:p-7 pb-4 sm:pb-5 z-30 flex flex-col items-center sm:items-start text-center sm:text-left">
        <h2 className="font-heading text-xl sm:text-2xl lg:text-[26px] font-bold text-[#4A0711] leading-tight tracking-tight">
          Your Next Breakthrough Is Just One Pitch Away
        </h2>
        <p className="text-xs text-[#7D5358] font-serif mt-1 mb-3 max-w-sm">
          Pitch creative concepts directly to verified open briefs. Build a permanent delivery ledger on your own terms.
        </p>

        {/* Sleek Action Pill Button */}
        <button
          type="button"
          onClick={handleScrollToForm}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5A0A14] via-[#66101B] to-[#4D070F] hover:from-[#6B0D18] hover:via-[#781422] hover:to-[#570912] text-[#FAF3EB] text-xs font-semibold shadow-[0_10px_25px_-5px_rgba(102,16,27,0.35)] hover:shadow-[0_14px_30px_-5px_rgba(102,16,27,0.45)] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <span>Join as Creator</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FAF3EB]" />
        </button>
      </div>

    </div>
  );
}
