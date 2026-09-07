"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  CheckCircle2, 
  Film, 
  Zap,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

export default function AuthShowcase({
  role = "creator", // "creator" | "brand"
  mode = "login",   // "login" | "signup"
  headline,
  tagline,
  buttonText,
  badgeText,
  bgImage,
  videoUrl,
  previewTitle,
  previewCreator,
  matchScore = "94%",
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Default images if not passed
  const defaultImage = role === "brand"
    ? "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85"
    : "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1200&q=85";

  const defaultHeadline = role === "brand"
    ? (mode === "login" ? "Your Next Winning Campaign Is Just One Pitch Away" : "Commission Creative Concepts With Direct Precision")
    : (mode === "login" ? "Your Next Big Breakthrough Is Just One Pitch Away" : "Where Creative Concepts Outshine Follower Counts");

  const defaultTagline = role === "brand"
    ? "Review video audition reels from vetted Indian creators with zero agency markups."
    : "Pitch creative concept hooks directly to open briefs and build your verified delivery ledger.";

  const defaultButton = role === "brand"
    ? "Preview Sample Pitch Reel"
    : "Explore Open Briefs";

  const defaultBadge = role === "brand"
    ? "✦ Enterprise Brand Hub"
    : "✦ Verified Creator Commerce";

  const resolvedHeadline = headline || defaultHeadline;
  const resolvedTagline = tagline || defaultTagline;
  const resolvedButton = buttonText || defaultButton;
  const resolvedBadge = badgeText || defaultBadge;
  const resolvedImage = bgImage || defaultImage;

  // Track mouse coordinates for ReactBits Spotlight effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="lg:w-[50%] relative min-h-[520px] lg:min-h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden select-none"
    >
      {/* 1. Cinematic Background Layer (Image with subtle ambient scale / Video) */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
          />
        ) : (
          <img
            src={resolvedImage}
            alt="CreatorZ Showcase"
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out brightness-90"
          />
        )}
      </div>

      {/* 2. Vertical Blur & Gradient Overlay (Inspired by User Attachment) */}
      {/* Seamless transition from subtle top/mid transparency to deep rich burgundy bottom with soft blur */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#200306] via-[#2f0409]/85 via-50% to-[#150204]/40 backdrop-blur-[1.5px]" />
      
      {/* Side subtle vignette */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />

      {/* ReactBits Dynamic Spotlight Beam (Follows cursor over the entire panel) */}
      {isHovered && (
        <div
          className="absolute inset-0 z-15 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* 3. Top Header Content */}
      <div className="relative z-20 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#faf3eb] backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#9E7B35]" />
          <span>{resolvedBadge}</span>
        </div>

        {/* Live Audio / Video Controls */}
        {videoUrl && (
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#9E7B35]" />}
          </button>
        )}
      </div>

      {/* 4. Center Interactive Glassmorphic Element (ReactBits Style) */}
      <div className="relative z-20 my-auto py-8">
        <div 
          className="max-w-md mx-auto rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl transition-all duration-300 hover:border-white/35 group"
          style={{
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                {role === "brand" ? "Verified Audition Pitch" : "Live Creative Audition"}
              </span>
            </div>
            <span className="text-[10px] font-mono bg-black/40 px-2.5 py-0.5 rounded-full text-white/90 border border-white/15">
              ⚡ {matchScore} Fit Score
            </span>
          </div>

          {/* Interactive Audition Teaser */}
          <div 
            onClick={togglePlay}
            className="relative h-32 rounded-2xl bg-gradient-to-tr from-black/80 via-[#3d0910]/70 to-black/70 border border-white/15 overflow-hidden flex items-center justify-center cursor-pointer group/player transition-all"
          >
            {/* Play/Pause Button Overlay */}
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg group-hover/player:scale-110 group-hover/player:bg-white/30 transition-all">
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white translate-x-0.5" />
              )}
            </div>

            {/* Interactive Soundwave Equalizer Bars */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-white/90">
              <span className="font-medium truncate max-w-[200px]">
                {previewTitle || (role === "brand" ? "Summer Protein — Satirical Skit Hook" : "Boat Audio — Workplace Skit Reel")}
              </span>
              
              {/* Equalizer bars */}
              <div className="flex items-center gap-1">
                {[40, 75, 50, 90, 60, 85].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-[#9E7B35] transition-all duration-300 ${
                      isPlaying ? "animate-pulse" : "h-1.5 opacity-50"
                    }`}
                    style={{ height: isPlaying ? `${h * 0.22}px` : "6px" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3.5 flex items-center justify-between text-xs text-white/90 pt-1">
            <span className="text-[#faf3eb]/80">
              {previewCreator || (role === "brand" ? "Pitch by Alex Kumar (Alpha Rank)" : "Client: BeastLife Nutrition")}
            </span>
            <span className="text-emerald-300 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Concept Verified
            </span>
          </div>
        </div>
      </div>

      {/* 5. Bottom Editorial Copy & Sleek Action Pill (Mirroring the User Attachment!) */}
      <div className="relative z-20 text-center sm:text-left max-w-lg">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight leading-tight mb-3 drop-shadow-md">
          {resolvedHeadline}
        </h2>
        <p className="text-sm text-[#faf3eb]/80 font-serif mb-6 leading-relaxed">
          {resolvedTagline}
        </p>

        {/* Sleek Pill Button (Directly inspired by the user attachment's 'Book free consultation' pill) */}
        <div className="flex items-center justify-center sm:justify-start">
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#faf3eb] hover:bg-white text-[#66101b] font-semibold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <span>{resolvedButton}</span>
            <ArrowRight className="w-4 h-4 text-[#66101b]" />
          </div>
        </div>
      </div>

    </div>
  );
}
