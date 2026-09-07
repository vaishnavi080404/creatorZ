"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function BrandReeloShowcase({ showCta = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: muted video
      });
    }
  }, []);

  const handleScrollToForm = () => {
    const firstInput = document.querySelector('input[type="email"]') || document.querySelector('input[type="text"]');
    if (firstInput) {
      firstInput.focus();
      firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="relative w-full h-auto lg:h-full flex flex-col items-center select-none bg-transparent border-0 border-none shadow-none border-r-0 ring-0 overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute -top-12 -left-12 w-80 h-80 bg-[radial-gradient(circle,rgba(158,123,53,0.14),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[radial-gradient(circle,rgba(102,16,27,0.06),transparent_70%)] pointer-events-none" />

      {/* Center Interactive Reelo Showcase Card (Full visibility across mobile and desktop) */}
      <div className="mt-2 sm:mt-4 lg:mt-3 lg:mb-auto px-1 sm:px-4 w-full max-w-full lg:max-w-[540px] relative z-10 animate-subtle-float overflow-hidden">
        <div className="rounded-[22px] sm:rounded-[36px] p-2.5 sm:p-5 lg:p-6 bg-[#EBE7DF]/90 backdrop-blur-xl border border-white/90 shadow-[0_20px_50px_-15px_rgba(77,10,19,0.07),0_0_0_1px_rgba(255,255,255,0.7)_inset]">
          
          <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
            
            {/* Left Column (6 cols mobile, 7 cols desktop): Complete Video Call */}
            <div className="col-span-6 sm:col-span-7 flex flex-col min-w-0">
              
              {/* Complete Main Video Tile: Gesturing on video call */}
              <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF3EB] border sm:border-2 border-white shadow-sm group">
                <video
                  ref={videoRef}
                  src="/brands/reelo-smitha.mp4"
                  poster="/brands/reelo-smitha-poster.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  className="w-full h-full object-cover"
                />
                
                {/* Top Right Live Recording / Camera Indicator Badge */}
                <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#4A4A4A]" />
                </div>
              </div>

            </div>

            {/* Right Column (6 cols mobile, 5 cols desktop): Two-Participant Chat Thread */}
            <div className="col-span-6 sm:col-span-5 flex flex-col gap-1.5 sm:gap-2.5 min-w-0">
              
              {/* Message 1 Group (Left participant) */}
              <div className="flex items-center gap-1 sm:gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/reelo-avatar-1.jpg"
                  alt="Creator Avatar"
                  className="w-5.5 h-5.5 xs:w-6.5 xs:h-6.5 sm:w-10 sm:h-10 rounded-full object-cover border sm:border-2 border-white shadow-xs shrink-0"
                />
                <div className="flex flex-col gap-1 sm:gap-2 items-start min-w-0">
                  <div className="bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                    <p className="text-[8.5px] xs:text-[9.5px] sm:text-[13px] md:text-[13.5px] font-medium text-[#111827] leading-tight">
                      Hey, I am interested
                    </p>
                  </div>
                  <div className="bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                    <p className="text-[8.5px] xs:text-[9.5px] sm:text-[13px] md:text-[13.5px] font-medium text-[#111827] leading-tight">
                      Let&apos;s meet?
                    </p>
                  </div>
                </div>
              </div>

              {/* Message 2 Group (Right participant on desktop, clean left-flow on mobile) */}
              <div className="flex items-center sm:items-end justify-start sm:justify-end gap-1 sm:gap-2.5 pt-0.5 sm:pt-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/reelo-avatar-2.jpg"
                  alt="Brand Manager Avatar"
                  className="order-1 sm:order-2 w-5.5 h-5.5 xs:w-6.5 xs:h-6.5 sm:w-10 sm:h-10 rounded-full object-cover border sm:border-2 border-white shadow-xs shrink-0 mb-0.5"
                />
                <div className="order-2 sm:order-1 flex flex-col gap-1 sm:gap-2 items-start sm:items-end min-w-0">
                  <div className="bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                    <p className="text-[8.5px] xs:text-[9.5px] sm:text-[13px] md:text-[13.5px] font-medium text-[#111827] leading-tight">
                      Let&apos;s hop on a call!
                    </p>
                  </div>
                  <div className="bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                    <p className="text-[8.5px] xs:text-[9.5px] sm:text-[13px] md:text-[13.5px] font-medium text-[#111827] leading-tight">
                      at 7:30 PM
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Prominent Beige Shadow & Blurry Gradient Overlay at Bottom of Brand Showcase (Lowered strictly to bottom edge) */}
      {/* Layer 1: Ambient Beige Gradient Wash */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[65px] sm:h-[75px] lg:h-[80px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, #FAF3EB 40%, rgba(250, 243, 235, 0.94) 65%, rgba(250, 243, 235, 0.5) 85%, transparent 100%)",
        }}
      />

      {/* Layer 2: Frosted Glass Backdrop Blur */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[50px] sm:h-[60px] lg:h-[65px] pointer-events-none z-20 backdrop-blur-sm"
        style={{
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Layer 3: Warm Upward Shadow & Gradient Wash */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[20px] sm:h-[25px] lg:h-[30px] pointer-events-none z-20 shadow-[0_-10px_20px_rgba(77,10,19,0.04)]"
        style={{
          background: "linear-gradient(to top, #FAF3EB 50%, rgba(250, 243, 235, 0.6) 80%, transparent 100%)",
        }}
      />

      {/* Bottom Content Layer: Earlier Brand Pitch Headline (Desktop: pinned at bottom, Mobile: flows beneath card with blur transition) */}
      <div className="relative lg:absolute lg:bottom-1 inset-x-0 px-3 sm:px-5 z-25 flex flex-col items-center text-center mt-[-8px] xs:mt-[-12px] sm:mt-1 lg:mt-0 pb-2 sm:pb-3 lg:pb-0 pointer-events-auto border-none shadow-none">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold font-heading text-[#4A0711] tracking-tight mb-0.5">
          Your Next Winning Campaign Is Just One Pitch Away
        </h3>
        <p className="text-[10px] sm:text-xs text-[#7D5358] font-serif max-w-sm">
          Review concept reels from vetted creators, leave timestamped feedback pins, and commission with verified peace of mind.
        </p>

        {/* Optional Action Pill Button */}
        {showCta && (
          <button
            type="button"
            onClick={handleScrollToForm}
            className="inline-flex items-center gap-2 mt-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#5A0A14] via-[#66101B] to-[#4D070F] hover:from-[#6B0D18] hover:via-[#781422] hover:to-[#570912] text-[#FAF3EB] text-xs font-semibold shadow-[0_10px_25px_-5px_rgba(102,16,27,0.35)] hover:shadow-[0_14px_30px_-5px_rgba(102,16,27,0.45)] hover:scale-105 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <span>Sign In as Brand</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FAF3EB]" />
          </button>
        )}
      </div>

    </div>
  );
}
