"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Search, ShieldCheck, Check, ArrowRight } from "lucide-react";

// Framer motion easing curve
const FRAMER_EASE = [0, 0.5, 0.5, 1] as const;

export default function CreatorOperatingSystem() {
  // Interactive toggle states for Creator Settings widget
  const [settings, setSettings] = useState({
    mediaKit: true,
    collaboration: true,
    payoutLedger: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 6 Creator videos from impactfloww gallery ticker
  const tickerVideos = [
    { id: 1, src: "/impact-1.mp4" },
    { id: 2, src: "/impact-2.mp4" },
    { id: 3, src: "/impact-3.mp4" },
    { id: 4, src: "/impact-4.mp4" },
    { id: 5, src: "/impact-5.mp4" },
    { id: 6, src: "/impact-6.mp4" }
  ];

  return (
    <section className="relative bg-[#faf3eb] pt-24 pb-28 sm:pt-32 sm:pb-36 border-b border-[#e4d0c0] overflow-hidden">
      
      {/* Warm ambient radial glows */}
      <div className="absolute top-1/6 -left-40 w-[600px] h-[600px] bg-[#eddcd0]/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] bg-[#f3e8dc]/80 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. Header Block (Two-Sided Brand & Multi-Discipline Talent System)        */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0.001, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6, ease: FRAMER_EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f3e8dc] border border-[#e4d0c0] text-[#66101b] text-xs font-mono font-bold tracking-wider uppercase shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#66101b]" />
            <span>TALENT & BRAND OPERATING SYSTEM</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ filter: "blur(8px)", opacity: 0.001, y: 30 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.65, ease: FRAMER_EASE }}
            className="text-4xl sm:text-6xl lg:text-[70px] font-bold font-heading text-black leading-[1.08] tracking-tight"
          >
            One place for proof, <br />
            reach, context, and collaboration.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ filter: "blur(4px)", opacity: 0.001, y: 20 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6, ease: FRAMER_EASE }}
            className="text-base sm:text-lg text-[#82575c] leading-relaxed max-w-2xl mx-auto font-normal"
          >
            A bento-style workspace where brands discover and audition actors, comedians, singers, dancers, and creators—with 0% agency markup and structured milestone contracts.
          </motion.p>

          {/* Dual Pill Action Buttons: Brand Casting vs Artist Discovery */}
          <motion.div
            initial={{ opacity: 0.001, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.6, ease: FRAMER_EASE }}
            className="flex flex-wrap items-center justify-center gap-4 pt-1"
          >
            <Link
              href="/brand/briefs/new"
              className="px-8 py-3.5 rounded-full bg-[#66101b] hover:bg-[#4d0a13] text-[#faf3eb] text-sm font-semibold transition shadow-md flex items-center gap-2 group"
            >
              <span>Post a Campaign Brief</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/creators"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-[#faf3eb] border-2 border-[#e4d0c0] text-black text-sm font-semibold transition shadow-xs hover:border-[#66101b]"
            >
              Explore All Artists & Talent
            </Link>
          </motion.div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. Impactfloww Centerpiece Showcase: Real iPhone + Silky Smooth Ticker    */}
      {/* ========================================================================= */}
      <div className="relative w-full my-12 sm:my-16 h-[580px] sm:h-[630px] overflow-hidden flex items-center justify-center">
        
        {/* Background Ticker: Mathematical Gapless 100% Seamless Infinite Scroll */}
        <div className="absolute inset-0 flex items-center overflow-hidden w-full select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] pointer-events-none">
          
          {/* Marquee Block 1 */}
          <div className="flex shrink-0 items-center gap-5 animate-marquee will-change-transform">
            {tickerVideos.map((video, idx) => (
              <div
                key={`block1-${video.id}-${idx}`}
                className="w-[260px] sm:w-[290px] h-[320px] sm:h-[355px] rounded-[28px] overflow-hidden shrink-0 bg-neutral-900 shadow-md border-2 border-[#e4d0c0]/80 relative"
              >
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover brightness-100 contrast-105"
                />
              </div>
            ))}
          </div>

          {/* Marquee Block 2 (Seamless loop twin) */}
          <div className="flex shrink-0 items-center gap-5 animate-marquee pl-5 will-change-transform" aria-hidden="true">
            {tickerVideos.map((video, idx) => (
              <div
                key={`block2-${video.id}-${idx}`}
                className="w-[260px] sm:w-[290px] h-[320px] sm:h-[355px] rounded-[28px] overflow-hidden shrink-0 bg-neutral-900 shadow-md border-2 border-[#e4d0c0]/80 relative"
              >
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover brightness-100 contrast-105"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Foreground Center iPhone Device (No shadow above or below, clean crisp frame) */}
        <div className="relative z-20 flex items-center justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0.001, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: FRAMER_EASE }}
            className="relative w-[280px] sm:w-[302px] h-[570px] sm:h-[614px]"
          >
            {/* Real Full-Color Creator Video Playing Inside Phone */}
            <div 
              className="absolute inset-[10px] overflow-hidden bg-black"
              style={{ borderRadius: "44px" }}
            >
              <video
                src="/impact-d6.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* iPhone Lock Screen UI Overlay (Dynamic Island, Clock 9:41, Camera & Flashlight icons) */}
            <img
              src="/iphone-ui-overlay.png"
              alt=""
              className="absolute inset-[8px] z-10 w-[calc(100%-16px)] h-[calc(100%-16px)] object-contain pointer-events-none"
            />

            {/* Real Transparent iPhone Titanium Hardware Frame (Crisp with zero dark shadow bleeds) */}
            <img
              src="/iphone-frame-transparent.png"
              alt="iPhone Device Frame"
              className="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none"
            />
          </motion.div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. Bento Workspace Widgets & 3-Card Grid (Multi-Discipline & Brand Value) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 space-y-16 relative z-10">
        
        {/* Multi-Discipline Industry & Talent Filter Strip */}
        <div className="space-y-4 text-center max-w-4xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest text-[#66101b] uppercase block">
            EXPLORE EVERY INDUSTRY & DISCIPLINE
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-black">
            Not just social influencers. Every creative artist.
          </h3>
          <p className="text-sm sm:text-base text-[#82575c] max-w-2xl mx-auto">
            From screen actors and playback vocalists to viral YouTube creators, stand-up comics, and stage choreographers across D2C, Tech, FMCG & Entertainment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
            {[
              { id: "all", label: "All Disciplines", icon: "✨" },
              { id: "actors", label: "Actors & Screen", icon: "🎭" },
              { id: "comedy", label: "Stand-Up Comedians", icon: "🎙️" },
              { id: "music", label: "Singers & Musicians", icon: "🎤" },
              { id: "dance", label: "Dancers & Choreographers", icon: "💃" },
              { id: "youtube", label: "YouTube Creators", icon: "📹" },
              { id: "social", label: "Social UGC", icon: "📱" },
            ].map((cat) => (
              <span
                key={cat.id}
                className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-default bg-white border border-[#e4d0c0] text-[#66101b] shadow-2xs hover:border-[#66101b] transition-colors"
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Floating Profile & Settings Widgets Header Area */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-4 pt-6 border-t border-[#e4d0c0]">
          <div className="space-y-2 max-w-md">
            <span className="text-xs font-mono font-bold tracking-widest text-[#66101b] uppercase block">
              TALENT & BRAND WORKSPACE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-black">
              Verified artist credentials & instant commercial booking.
            </h3>
          </div>

          {/* Overlapping Interactive Widgets */}
          <div className="relative w-full max-w-[390px] h-[190px] sm:h-[210px] self-center lg:self-auto">
            
            {/* Back Card: Isabella Chen Profile */}
            <motion.div
              initial={{ opacity: 0.001, x: 25, y: 15 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: FRAMER_EASE }}
              className="absolute right-0 top-3 sm:top-1 z-10 w-[260px] sm:w-[280px] bg-white rounded-3xl p-5 shadow-card-elevated border-2 border-[#e4d0c0] space-y-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold font-heading text-black">Isabella Chen</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#66101b] text-white flex items-center justify-center text-[9px]">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                </div>
                <p className="text-[11px] text-[#82575c]">Actor & Stand-Up Comic</p>
              </div>

              <div className="flex items-center gap-5 pt-1 border-t border-[#f3e8dc]">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#82575c] block">REACH</span>
                  <span className="text-xs font-bold font-mono text-[#66101b]">420K</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#82575c] block">ENGAGEMENT</span>
                  <span className="text-xs font-bold font-mono text-[#66101b]">5.8%</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#82575c] block">DEALS</span>
                  <span className="text-xs font-bold font-mono text-[#66101b]">32+</span>
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-[#f3e8dc]">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#82575c] block">VERIFIED TALENT</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#faf3eb] border border-[#e4d0c0] text-[#66101b] text-[10px] font-medium">
                    Screen acting
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#faf3eb] border border-[#e4d0c0] text-[#66101b] text-[10px] font-medium">
                    Stand-up comedy
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#faf3eb] border border-[#e4d0c0] text-[#66101b] text-[10px] font-medium">
                    Brand direction
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Front Card: Creator & Casting Settings Interactive Toggles */}
            <motion.div
              initial={{ opacity: 0.001, x: -20, y: -10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6, ease: FRAMER_EASE }}
              className="absolute left-0 top-0 z-20 w-[200px] sm:w-[220px] bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-[#e4d0c0] space-y-3"
            >
              <div className="flex items-center justify-between pb-1 border-b border-[#f3e8dc]">
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#66101b] uppercase">
                  CASTING SETTINGS
                </span>
                <span className="text-[#66101b] text-xs">♦</span>
              </div>

              <div className="space-y-2">
                <div 
                  onClick={() => toggleSetting("mediaKit")}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <span className="text-xs font-medium text-black group-hover:text-[#66101b] transition-colors">
                    Direct Casting
                  </span>
                  <div className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${settings.mediaKit ? "bg-[#66101b] justify-end" : "bg-[#e4d0c0] justify-start"}`}>
                    <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                  </div>
                </div>

                <div 
                  onClick={() => toggleSetting("collaboration")}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <span className="text-xs font-medium text-black group-hover:text-[#66101b] transition-colors">
                    30s Audition Reels
                  </span>
                  <div className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${settings.collaboration ? "bg-[#66101b] justify-end" : "bg-[#e4d0c0] justify-start"}`}>
                    <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                  </div>
                </div>

                <div 
                  onClick={() => toggleSetting("payoutLedger")}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <span className="text-xs font-medium text-black group-hover:text-[#66101b] transition-colors">
                    Milestone Approvals
                  </span>
                  <div className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${settings.payoutLedger ? "bg-[#66101b] justify-end" : "bg-[#e4d0c0] justify-start"}`}>
                    <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 3 Bento Cards: Multi-Discipline Roster, Brand Casting Engine, and Trust Security */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: DISCOVERY (Multi-Discipline Artists) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.15, duration: 0.6, ease: FRAMER_EASE }}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
            className="relative rounded-3xl overflow-hidden min-h-[340px] sm:min-h-[380px] p-7 sm:p-8 flex flex-col justify-between shadow-xs border-2 border-[#e4d0c0] hover:border-[#66101b] hover:shadow-card-elevated transition-all duration-300 group cursor-default"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/theme-comedy-artist.jpg"
                alt="Multi-Discipline Artists"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0508]/95 via-[#3d0d14]/40 to-black/20" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-white/90 uppercase">
                ALL DISCIPLINES
              </span>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Multi-Discipline Roster
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                Screen actors, stand-up comics, singers, dancers, and YouTube creators with verified portfolio proof and hook metrics.
              </p>
            </div>
          </motion.div>

          {/* Card 2: AI ENGINE (Brand Casting & Auditions) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3, duration: 0.6, ease: FRAMER_EASE }}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
            className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] shadow-xs border-2 border-[#e4d0c0] hover:border-[#66101b] hover:shadow-card-elevated transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-[#66101b] uppercase">
                BRAND ENGINE
              </span>
              <div className="w-10 h-10 rounded-full bg-[#f3e8dc] text-[#66101b] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Search className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2 pt-12">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-black group-hover:text-[#66101b] transition-colors">
                Smart Casting & Auditions
              </h3>
              <p className="text-xs sm:text-sm text-[#82575c] leading-relaxed font-normal">
                Post your brief, receive 30s custom pitch reels within 24 hours, and cast talent across YouTube, Instagram, and live campaigns.
              </p>
            </div>
          </motion.div>

          {/* Card 3: TRUST (0% Markup & Direct Contracts) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.45, duration: 0.6, ease: FRAMER_EASE }}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
            className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] shadow-xs border-2 border-[#e4d0c0] hover:border-[#66101b] hover:shadow-card-elevated transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-[#66101b] uppercase">
                CONTRACTS & TRUST
              </span>
              <div className="w-10 h-10 rounded-full bg-[#f3e8dc] text-[#66101b] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2 pt-12">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-black group-hover:text-[#66101b] transition-colors">
                0% Markup & Direct Contracts
              </h3>
              <p className="text-xs sm:text-sm text-[#82575c] leading-relaxed font-normal">
                No 30% agency cuts. Legally binding milestone contracts guarantee direct transparency for brands and protected terms for artists.
              </p>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
