"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Send, MessageCircle, ShieldCheck, Award } from "lucide-react";
// Exact Framer motion easing curve extracted from Hookk production bundle
const HOOKK_EASE = [0, 0.5, 0.5, 1];
export default function Hero() {
    return (<section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24 bg-[#faf3eb]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Modern 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & Rectangular Rounded CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-7 max-w-2xl text-left">

            {/* Editorial Headline with Hookk's lens-unblur reveal */}
            <motion.h1 initial={{ filter: "blur(8px)", opacity: 0.001, y: 40 }} animate={{ filter: "blur(0px)", opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease: HOOKK_EASE }} className="text-5xl sm:text-7xl lg:text-[84px] font-bold tracking-[-0.03em] font-heading leading-[1.02]">
              <span className="text-black">Cast every artist.</span> <br />
              <span className="text-[#66101b] italic font-normal">
                Zero middlemen.
              </span>
            </motion.h1>

            {/* Subtitle with Hookk's soft blur-reveal */}
            <motion.p initial={{ filter: "blur(4px)", opacity: 0.001, y: 40 }} animate={{ filter: "blur(0px)", opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: HOOKK_EASE }} className="text-base sm:text-lg text-[#82575c] leading-relaxed max-w-xl font-normal">
              The direct casting & collaboration platform for brands to book screen actors, stand-up comics, singers, dancers, and creators across YouTube, Instagram, and live events.
            </motion.p>

            {/* Multi-Discipline Talent Spectrum Badges */}
            <motion.div initial={{ opacity: 0.001, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6, ease: HOOKK_EASE }} className="flex flex-wrap items-center gap-2 pt-1">
              {[
            { icon: "🎭", label: "Screen & Stage Actors" },
            { icon: "🎙️", label: "Stand-Up Comedians" },
            { icon: "🎤", label: "Singers & Musicians" },
            { icon: "💃", label: "Dancers & Choreographers" },
            { icon: "📹", label: "YouTube Creators" },
            { icon: "📱", label: "Social Influencers" },
        ].map((discipline) => (<span key={discipline.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#e4d0c0] text-[11px] sm:text-xs font-medium text-[#66101b] shadow-2xs">
                  <span>{discipline.icon}</span>
                  <span>{discipline.label}</span>
                </span>))}
            </motion.div>

            {/* Dual CTAs: Post a Brief for Brands, Join as Talent for Artists */}
            <motion.div initial={{ opacity: 0.001, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6, ease: HOOKK_EASE }} className="flex flex-wrap items-center gap-4 pt-1">
              <Link href="/brand/briefs/new" className="px-8 py-4 rounded-xl bg-[#66101b] hover:bg-[#4d0a13] text-[#faf3eb] text-sm sm:text-base font-semibold transition-all transform active:scale-98 flex items-center gap-2.5 shadow-md group">
                <span>Post a Campaign Brief</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#faf3eb]"/>
              </Link>

              <Link href="/creator/dashboard" className="px-8 py-4 rounded-xl bg-[#f3e8dc] hover:bg-white border-2 border-[#e4d0c0] text-[#66101b] text-sm sm:text-base font-semibold transition shadow-xs flex items-center gap-2">
                <span>Join as Artist / Creator</span>
              </Link>
            </motion.div>

            {/* Trust Microcopy with Hookk's delayed fade-in */}
            <motion.div initial={{ opacity: 0.001, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6, ease: HOOKK_EASE }} className="flex items-center gap-6 text-xs font-mono text-[#82575c] pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#66101b]"/>
                Direct Contract Protection
              </span>
              <span className="text-[#e4d0c0]">•</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#66101b]"/>
                GST Invoicing Built-in
              </span>
            </motion.div>

            {/* Clean Capability Highlights - Honest & High-Value for Brands & Talent */}
            <motion.div initial={{ opacity: 0.001, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6, ease: HOOKK_EASE }} className="pt-6 border-t border-[#e4d0c0] space-y-2">
              <p className="text-xs font-medium text-[#82575c]">
                Engineered for D2C brands, creative agencies, production houses & consumer tech
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-[#66101b]/80">
                <span>• 0% Agency Markup</span>
                <span>• 24h Audition Reels</span>
                <span>• Milestone Approvals</span>
                <span>• Frame-Accurate Reviews</span>
                <span>• GST Corporate Invoicing</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Realistic Hand Holding Smartphone with Hookk's exact entrance */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            
            {/* Hand Holding Phone Mockup Container with Hookk entrance (Ws -> Us) */}
            <motion.div initial={{ opacity: 0.001, rotate: 10, x: 80, y: 120 }} animate={{ opacity: 1, rotate: 0, x: 0, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: HOOKK_EASE }} className="relative w-full max-w-[370px] sm:max-w-[430px] aspect-[2320/3264] mx-auto flex items-center justify-center">
              
              {/* Screen Area: Positioned precisely inside the phone's transparent screen cutout */}
              <div className="absolute overflow-hidden rounded-[24px] sm:rounded-[32px] z-10 bg-black" style={{
            left: "38.32%",
            top: "1.75%",
            width: "48.97%",
            height: "75.74%",
        }}>
                {/* Real Creator Video */}
                <video src="/creator-reel.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover object-center brightness-105 contrast-105"/>

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none"></div>

                {/* Live Audition Tag (Top Right inside screen) */}
                <div className="absolute top-8 right-2.5 sm:top-10 sm:right-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-white/20 text-[9px] sm:text-[10px] font-mono text-white">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span>AUDITION 0:24</span>
                </div>

                {/* Lower-third Artist Overlay */}
                <div className="absolute bottom-4 left-3 right-3 sm:bottom-5 sm:left-4 sm:right-4 text-white z-20 space-y-1 sm:space-y-1.5">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-[11px] sm:text-xs font-bold font-heading">@arjun.acting</span>
                    <span className="text-[8px] sm:text-[9px] bg-[#66101b] text-[#faf3eb] border border-[#faf3eb]/30 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">
                      ACTOR & COMIC
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-white/95 line-clamp-2 leading-tight font-medium">
                    "30s D2C Brand Campaign Audition • Commercial & Digital Rights"
                  </p>
                </div>
              </div>

              {/* Realistic Hand Holding Smartphone - Overlay in front of video */}
              <img src="/phone-in-hand.png" alt="Hand holding smartphone displaying creator audition video" className="relative z-20 w-full h-full object-contain pointer-events-none drop-shadow-2xl"/>

              {/* FLOATING BADGE 1: Top Left - Heart / Likes with Hookk spring pop */}
              <motion.div initial={{ opacity: 0, scale: 0.6, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }} whileHover={{ scale: 1.05 }} className="absolute left-1 sm:left-3 top-[17%] z-30 bg-white/95 backdrop-blur-md rounded-2xl py-3 px-3.5 sm:py-3.5 sm:px-4 shadow-xl border border-[#e4d0c0] flex flex-col items-center gap-1 min-w-[72px] sm:min-w-[80px] cursor-default">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#66101b] fill-current"/>
                <span className="text-xs sm:text-sm font-bold text-[#66101b] font-heading leading-none mt-0.5">
                  42.1K
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#82575c] font-medium leading-none">
                  likes
                </span>
              </motion.div>

              {/* FLOATING BADGE 2: Top Right - Share / Sends with Hookk spring pop */}
              <motion.div initial={{ opacity: 0, scale: 0.6, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }} whileHover={{ scale: 1.05 }} className="absolute -right-2 sm:right-0 top-[23%] z-30 bg-white/95 backdrop-blur-md rounded-2xl py-3 px-3.5 sm:py-3.5 sm:px-4 shadow-xl border border-[#e4d0c0] flex flex-col items-center gap-1 min-w-[72px] sm:min-w-[80px] cursor-default">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-[#66101b]"/>
                <span className="text-xs sm:text-sm font-bold text-[#66101b] font-heading leading-none mt-0.5">
                  7.4K
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#82575c] font-medium leading-none">
                  shares
                </span>
              </motion.div>

              {/* FLOATING BADGE 3: Bottom Right - Comments with Hookk spring pop */}
              <motion.div initial={{ opacity: 0, scale: 0.6, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }} whileHover={{ scale: 1.05 }} className="absolute right-4 sm:right-8 bottom-[20%] z-30 bg-white/95 backdrop-blur-md rounded-2xl py-3 px-3.5 sm:py-3.5 sm:px-4 shadow-xl border border-[#e4d0c0] flex flex-col items-center gap-1 min-w-[72px] sm:min-w-[80px] cursor-default">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#66101b]"/>
                <span className="text-xs sm:text-sm font-bold text-[#66101b] font-heading leading-none mt-0.5">
                  254
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#82575c] font-medium leading-none">
                  comments
                </span>
              </motion.div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>);
}
