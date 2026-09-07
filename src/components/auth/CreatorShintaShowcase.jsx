"use client";

import { useEffect, useRef } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function CreatorShintaShowcase() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);

  useEffect(() => {
    // Ensure videos autoplay smoothly on mount without controls
    [video1Ref, video2Ref, video3Ref].forEach((ref) => {
      if (ref.current) {
        ref.current.play().catch(() => {
          // Autoplay policy fallback: already muted
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-auto lg:h-full flex flex-col items-center justify-start lg:justify-center select-none bg-transparent border-0 border-none shadow-none border-r-0 ring-0 overflow-visible">
      {/* Ambient background glow accents */}
      <div className="absolute -top-12 -left-12 w-80 h-80 bg-[radial-gradient(circle,rgba(255,168,242,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[radial-gradient(circle,rgba(102,16,27,0.06),transparent_70%)] pointer-events-none" />

      {/* Top Subtle Pill */}
      <div className="relative lg:absolute lg:top-4 mt-3 mb-2 lg:my-0 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#DECDBE] shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[#66101B] animate-ping" />
        <span className="w-2 h-2 rounded-full bg-[#66101B] -ml-4" />
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#520B15]">
          Creator Studio • Brief-First Discovery
        </span>
      </div>

      {/* 3D Tilted Card Stack (Shinta Framer Style with full right-side visibility) */}
      <div 
        className="relative w-[210px] xs:w-[230px] sm:w-[250px] md:w-[265px] lg:w-[270px] max-w-[275px] aspect-[9/16] max-h-[430px] sm:max-h-[480px] mt-1 lg:my-auto flex items-center justify-center overflow-visible"
        style={{ perspective: 1100 }}
      >
        {/* CARD 3 (Back Layer: Dark Plum/Burgundy, offset -48px desktop, clamp for mobile) */}
        <div
          className="absolute inset-0 rounded-[28px] overflow-hidden bg-[#351E28] border border-white/20 pointer-events-none"
          style={{
            zIndex: 1,
            transform: "translateX(clamp(-48px, -7vw, -25px)) translateY(-14px) translateZ(-80px) scale(0.93) rotate(-5.5deg)",
            transformOrigin: "bottom left",
            transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <video
            ref={video3Ref}
            src="/brands/shinta-hero-3.mp4"
            poster="/brands/shinta-poster-3.jpg"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover opacity-75 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#27101C]/80 via-transparent to-black/20" />
        </div>

        {/* CARD 2 (Middle Layer: Rose/Mauve Tone, offset -24px desktop, clamp for mobile) */}
        <div
          className="absolute inset-0 rounded-[28px] overflow-hidden bg-[#E2A7B8] border border-white/30 pointer-events-none"
          style={{
            zIndex: 2,
            transform: "translateX(clamp(-24px, -3.5vw, -12px)) translateY(-7px) translateZ(-40px) scale(0.96) rotate(-2.8deg)",
            transformOrigin: "bottom left",
            transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <video
            ref={video2Ref}
            src="/brands/shinta-hero-2.mp4"
            poster="/brands/shinta-poster-2.jpg"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#66101B]/40 via-transparent to-white/10" />
        </div>

        {/* CARD 1 (Front Star Layer: Creator Taking Selfie with Pink Phone, Infinite Loop, Complete Framing) */}
        <div
          className="relative w-full h-full rounded-[28px] overflow-hidden bg-black/5 border-2 border-white/90 shadow-xl"
          style={{
            zIndex: 10,
            transform: "translateZ(0px)",
            transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <video
            ref={video1Ref}
            src="/brands/shinta-hero-1.mp4"
            poster="/brands/shinta-poster-1.jpg"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover object-[68%_center] block"
          />

          {/* Minimalist floating creator tag inside front card */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between p-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/70 shadow-md">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#4A0711] leading-tight truncate">Short-Form Pitch</p>
                <p className="text-[9px] text-[#7D5358] font-medium leading-tight truncate">ROAS-Focused Creator Audition</p>
              </div>
            </div>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-md bg-[#66101B] text-white tracking-wide shrink-0">
              VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Prominent Beige Shadow & Blurry Gradient Overlay at Bottom of Left Showcase (Lowered strictly to bottom edge) */}
      {/* Layer 1: Ambient Beige Gradient Wash (Desktop only: luxury bottom fade moved further down) */}
      <div 
        className="hidden lg:block absolute bottom-0 inset-x-0 h-[65px] sm:h-[75px] lg:h-[80px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, #FAF3EB 40%, rgba(250, 243, 235, 0.94) 65%, rgba(250, 243, 235, 0.5) 85%, transparent 100%)",
        }}
      />

      {/* Layer 2: Frosted Glass Backdrop Blur (Desktop only: lowered) */}
      <div 
        className="hidden lg:block absolute bottom-0 inset-x-0 h-[50px] sm:h-[60px] lg:h-[65px] pointer-events-none z-20 backdrop-blur-sm"
        style={{
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Layer 3: Warm Upward Shadow & Gradient Wash (Desktop only: lowered) */}
      <div 
        className="hidden lg:block absolute bottom-0 inset-x-0 h-[20px] sm:h-[25px] lg:h-[30px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, #FAF3EB 50%, rgba(250, 243, 235, 0.6) 80%, transparent 100%)",
        }}
      />

      {/* Bottom Text Layer: "Your Next Breakthrough Is Just One Pitch Away" (Positioned at base of showcase) */}
      <div className="relative lg:absolute lg:bottom-1 inset-x-0 px-3 sm:px-5 z-25 flex flex-col items-center text-center mt-3 sm:mt-4 lg:mt-0 pb-2 sm:pb-3 lg:pb-0 pointer-events-none border-none shadow-none">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold font-heading text-[#4A0711] tracking-tight mb-0.5">
          Your Next Breakthrough Is Just One Pitch Away
        </h3>
        <p className="text-[10px] sm:text-[11.5px] text-[#7D5358] font-serif max-w-sm">
          Pitch creative concepts directly to verified open briefs. Build a permanent delivery ledger on your own terms.
        </p>
      </div>
    </div>
  );
}
