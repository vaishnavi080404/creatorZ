"use client";

import { motion } from "framer-motion";
import { Film, Clapperboard, Users, ShieldCheck, FileCheck } from "lucide-react";

// Exact Framer motion curves extracted directly from Hookk's production bundle
const HOOKK_EASE = [0, 0.5, 0.5, 1] as const;

export default function ServicesHandled() {
  const services = [
    {
      id: 1,
      icon: Film,
      title: "30s Video Audition Reels™",
      description: "Watch actors, comics, singers, and creators pitch your brief before booking. 24h shortlists.",
      delay: 0.3
    },
    {
      id: 2,
      icon: Clapperboard,
      title: "Frame-Accurate Studio",
      description: "Brand directors scrub video frames and pin feedback at exact seconds. Zero messy Drive links.",
      delay: 0.4
    },
    {
      id: 3,
      icon: Users,
      title: "Multi-Discipline Casting",
      description: "Screen actors, stand-up comics, vocalists, dancers & YouTubers vetted by performance tiers.",
      delay: 0.5
    },
    {
      id: 4,
      icon: ShieldCheck,
      title: "Direct Milestone Sign-offs",
      description: "Clear milestone sign-offs before filming; payout disbursed directly upon final client approval.",
      delay: 0.6
    }
  ];

  const fullWidthService = {
    id: 5,
    icon: FileCheck,
    title: "Commercial Rights, NDAs & GST Invoicing",
    description: "Automated copyright licensing, non-disclosure contracts, and instant GST-compliant tax invoices generated on delivery.",
    delay: 0.7
  };

  const FullIcon = fullWidthService.icon;

  return (
    <section className="relative bg-[#faf3eb] py-24 sm:py-32 border-b border-[#e4d0c0] overflow-hidden">
      
      {/* Subtle warm background accents */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#eddcd0]/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[450px] h-[450px] bg-[#f3e8dc]/80 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header with Hookk's exact blur & translation appear effects */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Section Label: Hookk Xs effect */}
          <motion.div
            initial={{ opacity: 0.001, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6, ease: HOOKK_EASE }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#eddcd0] border border-[#e4d0c0] text-[#66101b] text-xs font-mono font-bold tracking-wider uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#66101b]" />
            <span>FOR BRANDS & TALENT</span>
          </motion.div>

          {/* Section Heading: Hookk Qs blur(16px) unblur effect */}
          <motion.h2
            initial={{ filter: "blur(16px)", opacity: 0.001, y: 80 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6, ease: HOOKK_EASE }}
            className="text-4xl sm:text-6xl lg:text-[68px] font-bold font-heading text-black leading-[1.06] tracking-tight"
          >
            Everything brand deals & casting. <br />
            <span className="text-[#66101b]">Handled.</span>
          </motion.h2>

          {/* Section Description: Hookk $s blur(4px) unblur effect */}
          <motion.p
            initial={{ filter: "blur(4px)", opacity: 0.001, y: 80 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6, ease: HOOKK_EASE }}
            className="text-sm sm:text-base text-[#82575c] leading-relaxed max-w-xl mx-auto font-normal"
          >
            Campaign briefs, video auditions, direct contracts, and frame-accurate review. One platform, brief to final post.
          </motion.p>
        </div>

        {/* Two-Column Grid: Hookk Hand-Held Phone on Left, Hookk Service Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Hand-Held Phone with Hookk's exact Ws -> Us entrance */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0.001, rotate: -12, x: -120, y: 160 }}
              whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.3, duration: 0.6, ease: HOOKK_EASE }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[2320/3264] flex items-center justify-center"
            >
              
              {/* Looping Creator Video playing behind the phone screen cutout */}
              <div 
                className="absolute z-10 overflow-hidden bg-black shadow-inner"
                style={{
                  left: "38.32%",
                  top: "1.75%",
                  width: "48.97%",
                  height: "75.74%",
                  borderRadius: "28px"
                }}
              >
                <video
                  src="/creator-reel.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Video Top Bar Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[#faf3eb] text-[10px] font-mono font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    AUDITION
                  </span>
                  <span className="text-[10px] font-mono text-[#faf3eb]/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    4K 60fps
                  </span>
                </div>

                {/* Video Bottom Gradient Scrim & Tag */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none text-left">
                  <span className="text-[11px] font-bold text-white block">@maya.creatives</span>
                  <span className="text-[9px] font-mono text-emerald-400 block">✓ Alpha Tier Verified</span>
                </div>
              </div>

              {/* Hand Holding Smartphone PNG Overlay */}
              <img
                src="/phone-in-hand.png"
                alt="Hand holding smartphone with creator audition"
                className="w-full h-full object-contain relative z-20 pointer-events-none drop-shadow-2xl"
              />

            </motion.div>
          </div>

          {/* Right Column: 5 Feature Cards with Hookk's exact $ -> Zo staggered appear */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top 2x2 Grid (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: item.delay, duration: 0.6, ease: HOOKK_EASE }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2, ease: HOOKK_EASE }
                    }}
                    className="bg-white/95 border-2 border-[#e4d0c0] rounded-3xl p-6 sm:p-7 shadow-xs hover:border-[#66101b] hover:shadow-card-elevated transition-colors duration-200 space-y-3 group cursor-default"
                  >
                    {/* Dark Burgundy Icon Box */}
                    <div className="w-11 h-11 rounded-2xl bg-[#66101b] text-[#faf3eb] flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold font-heading text-black pt-1 group-hover:text-[#66101b] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#82575c] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom 5th Card (Full Width Span) */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: fullWidthService.delay, duration: 0.6, ease: HOOKK_EASE }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2, ease: HOOKK_EASE }
              }}
              className="bg-white/95 border-2 border-[#e4d0c0] rounded-3xl p-6 sm:p-7 shadow-xs hover:border-[#66101b] hover:shadow-card-elevated transition-colors duration-200 space-y-3 group cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#66101b] text-[#faf3eb] flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105">
                <FullIcon className="w-5 h-5" />
              </div>

              <h3 className="text-base sm:text-lg font-bold font-heading text-black pt-1 group-hover:text-[#66101b] transition-colors">
                {fullWidthService.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#82575c] leading-relaxed font-normal">
                {fullWidthService.description}
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
