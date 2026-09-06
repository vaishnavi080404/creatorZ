"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp } from "lucide-react";
export default function ProblemSolution() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const SLIDE_DURATION = 5000; // 5 seconds per slide
    const slides = [
        {
            id: 0,
            eyebrow: "THE DISCOVERY GAP",
            title1: "Traditional agencies.",
            title2: "Silo discovery.",
            subtitle: "Brands find themselves locked in siloed categorization models, missing out on actors who sing, dancers who host, or stand-up comics who create brand content. Top talent stays hidden behind agency gatekeepers and basic search filters.",
            statNumber: "0%",
            statLabel: "Agency Markup On Deals",
            image: "/theme-actor-portrait.jpg"
        },
        {
            id: 1,
            eyebrow: "THE 3-WEEK WAITING TRAP",
            title1: "Brands overpay.",
            title2: "Talent restricted.",
            subtitle: "Traditional talent managers charge 20–40% agency commissions while brand marketing teams wait weeks for pitch decks and quotes. Collaboration stays slow, expensive, and dry.",
            statNumber: "24h",
            statLabel: "Audition Reel Turnaround",
            image: "/theme-brand-casting.jpg"
        },
        {
            id: 2,
            eyebrow: "DIRECT CASTING & AUDITIONS",
            title1: "Every artist browsable.",
            title2: "Direct deals.",
            subtitle: "Brands post campaign briefs and receive 30-second audition reels from screen actors, comedians, singers, and digital creators within 24 hours. Structured milestone approvals ensure 100% deal certainty.",
            statNumber: "100%",
            statLabel: "Direct Contract Protection",
            image: "/theme-stage-performer.jpg"
        }
    ];
    // Strictly sequential auto-rotation: 1 -> 2 -> 3 -> 1 -> 2 -> 3
    useEffect(() => {
        setProgress(0);
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
            setProgress(currentProgress);
            if (elapsed >= SLIDE_DURATION) {
                clearInterval(interval);
                setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }
        }, 25);
        return () => clearInterval(interval);
    }, [activeIndex, slides.length]);
    const handleSelectSlide = (index) => {
        setActiveIndex(index);
        setProgress(0);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3500);
            setEmail("");
        }
    };
    const currentSlide = slides[activeIndex];
    return (<section className="relative bg-[#faf3eb] border-y border-[#e4d0c0] py-20 sm:py-28 overflow-hidden">
      
      {/* Subtle warm ambient glow accents */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#eddcd0]/60 rounded-full blur-[100px] pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f3e8dc]/80 rounded-full blur-[100px] pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Typography & Inline Email Input */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="space-y-3">
                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#eddcd0] border border-[#e4d0c0] text-[#66101b] text-xs font-mono font-bold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66101b]"/>
                  <span>{currentSlide.eyebrow}</span>
                </div>

                {/* Line 1 - Bold Black Heading */}
                <h2 className="text-4xl sm:text-6xl lg:text-[66px] font-bold tracking-tight text-black leading-[1.06] font-heading">
                  {currentSlide.title1}
                </h2>

                {/* Line 2 - Muted Burgundy / Accent Heading */}
                <h3 className="text-4xl sm:text-6xl lg:text-[66px] font-normal tracking-tight text-[#82575c] leading-[1.06] font-heading">
                  {currentSlide.title2}
                </h3>

                {/* Narrative Body Copy from Reference */}
                <p className="text-sm sm:text-base text-[#82575c] pt-2 max-w-lg leading-relaxed font-normal">
                  {currentSlide.subtitle}
                </p>

                {/* Quick Highlight Metric Chip */}
                <div className="pt-2 flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#f3e8dc] border border-[#e4d0c0] text-xs font-mono text-black font-bold">
                    <TrendingUp className="w-3.5 h-3.5 text-[#66101b]"/>
                    <span className="text-[#66101b] font-bold">{currentSlide.statNumber}</span>
                    <span className="text-[#82575c] font-normal">• {currentSlide.statLabel}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Inline Email Pill Input (Hero 6 Design Pattern in Light Mode) */}
            <form onSubmit={handleSubmit} className="pt-2">
              <div className="flex items-center bg-white rounded-full p-1.5 pl-5 max-w-md shadow-md border-2 border-[#e4d0c0] transition focus-within:border-[#66101b]">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={submitted ? "Thanks for subscribing!" : "Enter your email address"} disabled={submitted} required className="bg-transparent text-black placeholder:text-[#82575c]/60 text-sm outline-none flex-1 pr-2 font-sans"/>
                <button type="submit" className="bg-[#66101b] text-[#faf3eb] px-6 py-3 rounded-full text-xs font-bold hover:bg-[#4d0a13] active:scale-95 transition cursor-pointer tracking-wider shrink-0 shadow-sm">
                  {submitted ? "Joined" : "Get Started"}
                </button>
              </div>
            </form>

          </div>

          {/* Center Column: Vertical Segmented Progress Rail (1 -> 2 -> 3 Sequential) */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="flex flex-col gap-3 items-center py-4">
              {slides.map((slide, idx) => {
            const isActive = activeIndex === idx;
            const isPast = idx < activeIndex;
            return (<button key={slide.id} type="button" onClick={() => handleSelectSlide(idx)} aria-label={`Go to slide ${idx + 1}`} className="relative w-1.5 h-16 rounded-full bg-[#e4d0c0] overflow-hidden cursor-pointer hover:bg-[#eddcd0] transition">
                    {isActive ? (<div className="w-full bg-[#66101b] rounded-full origin-top" style={{ height: `${progress}%` }}/>) : isPast ? (<div className="w-full h-full bg-[#66101b]/60 rounded-full"/>) : (<div className="w-full h-full bg-transparent"/>)}
                  </button>);
        })}
            </div>
          </div>

          {/* Right Column: Large Rounded Image Card (Matching Reference) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden shadow-soft-floating border-2 border-[#e4d0c0] bg-[#f3e8dc]">
              
              <AnimatePresence mode="wait">
                <motion.div key={currentSlide.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: "easeInOut" }} className="w-full h-full">
                  <img src={currentSlide.image} alt={`${currentSlide.title1} ${currentSlide.title2}`} className="w-full h-full object-cover"/>
                </motion.div>
              </AnimatePresence>

              {/* Subtle warm luxury vignette overlay matching website theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#66101b]/15 via-transparent to-transparent pointer-events-none"/>

              {/* Subtle inner border glow overlay */}
              <div className="absolute inset-0 rounded-3xl border border-black/5 pointer-events-none"/>

            </div>
          </div>

          {/* Mobile Step Indicators (Horizontal on small screens) */}
          <div className="flex lg:hidden col-span-1 justify-center gap-2 pt-2">
            {slides.map((_, idx) => (<button key={idx} type="button" onClick={() => handleSelectSlide(idx)} className={`h-1.5 rounded-full transition-all cursor-pointer ${activeIndex === idx ? "w-8 bg-[#66101b]" : "w-2 bg-[#e4d0c0]"}`} aria-label={`Slide ${idx + 1}`}/>))}
          </div>

        </div>
      </div>

    </section>);
}
