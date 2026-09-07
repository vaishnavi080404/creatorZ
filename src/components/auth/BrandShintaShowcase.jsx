"use client";

import { useEffect, useRef } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function BrandShintaShowcase() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);

  useEffect(() => {
    // Ensure videos autoplay smoothly on mount
    [video1Ref, video2Ref, video3Ref].forEach((ref) => {
      if (ref.current) {
        ref.current.play().catch(() => {
          // Autoplay policy fallback: already muted
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden select-none bg-[#FAF3EB]">
      {/* Ambient background glow accents */}
      <div className="absolute -top-12 -left-12 w-80 h-80 bg-[radial-gradient(circle,rgba(255,168,242,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[radial-gradient(circle,rgba(102,16,27,0.06),transparent_70%)] pointer-events-none" />

      {/* Top Subtle Pill */}
      <div className="absolute top-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#DECDBE] shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[#66101B] animate-ping" />
        <span className="w-2 h-2 rounded-full bg-[#66101B] -ml-4" />
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#520B15]">
          Top Creator Auditions • Indian Brands
        </span>
      </div>

      {/* 3D Tilted Card Stack (Shinta Style) */}
      <div 
        className="relative w-[300px] sm:w-[330px] md:w-[350px] aspect-[9/16] max-h-[580px] my-auto flex items-center justify-center animate-subtle-float"
        style={{ perspective: 1100 }}
      >
        {/* CARD 3 (Back Layer: Dark Plum/Burgundy, offset -72px, rotate -7deg) */}
        <div
          className="absolute inset-0 rounded-[28px] overflow-hidden bg-[#351E28] border border-white/20 shadow-lg pointer-events-none"
          style={{
            zIndex: 1,
            transform: "translateX(-68px) translateY(-18px) translateZ(-80px) scale(0.92) rotate(-6.5deg)",
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

        {/* CARD 2 (Middle Layer: Rose/Mauve Tone, offset -34px, rotate -3.5deg) */}
        <div
          className="absolute inset-0 rounded-[28px] overflow-hidden bg-[#E2A7B8] border border-white/30 shadow-xl pointer-events-none"
          style={{
            zIndex: 2,
            transform: "translateX(-34px) translateY(-9px) translateZ(-40px) scale(0.96) rotate(-3.2deg)",
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

        {/* CARD 1 (Front Star Layer: Creator Taking Selfie with Pink Phone, Infinite Loop, No Controls) */}
        <div
          className="relative w-full h-full rounded-[28px] overflow-hidden bg-black/5 border-2 border-white/90 shadow-[0_25px_60px_-15px_rgba(74,7,17,0.35),0_0_0_1px_rgba(255,255,255,0.4)]"
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
            className="w-full h-full object-cover block"
          />

          {/* Minimalist floating creator tag inside front card */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-white/60 shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-[11.5px] font-bold text-[#4A0711] leading-tight">Short-Form Pitch</p>
                <p className="text-[9.5px] text-[#7D5358] font-medium leading-tight">ROAS-Focused Creator Audition</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#66101B] text-white tracking-wide">
              VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Beige Overlay with Headline (Clean luxury blur, zero clipping) */}
      <div className="absolute bottom-0 inset-x-0 pt-16 pb-6 px-6 z-25 bg-gradient-to-t from-[#FAF3EB] via-[#FAF3EB]/90 to-transparent flex flex-col items-center text-center pointer-events-none">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#4A0711] tracking-tight mb-1">
          Your first step is just one click away
        </h3>
        <p className="text-xs sm:text-sm text-[#7D5358] font-serif max-w-sm">
          Join leading brands hiring India&apos;s top pitch-first creators with verified delivery records.
        </p>
      </div>
    </div>
  );
}
