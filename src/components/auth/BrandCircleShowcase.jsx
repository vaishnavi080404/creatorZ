"use client";

import { Sparkles, ArrowRight } from "lucide-react";

// Top Row (Skincare, Makeup & Beauty) scrolling items
const ROW_1_ITEMS = [
  {
    id: "r1-1",
    name: "Skincare",
    type: "image",
    src: "/brands/skincare.jpg",
    zoomClass: "animate-zoom-in-out-1",
  },
  {
    id: "r1-2",
    name: "Makeup",
    type: "image",
    src: "/brands/makeup.jpg",
    zoomClass: "animate-zoom-in-out-2",
  },
  {
    id: "r1-3",
    name: "Skincare Reel",
    type: "video",
    src: "/creators/skincare-routine.mp4",
    zoomClass: "animate-zoom-in-out-3",
  },
  {
    id: "r1-4",
    name: "Cosmetics",
    type: "video",
    src: "/creators/grwm-makeup.mp4",
    zoomClass: "animate-zoom-in-out-1",
  },
  {
    id: "r1-5",
    name: "D2C Care",
    type: "image",
    src: "/brands/packaging.jpg",
    zoomClass: "animate-zoom-in-out-2",
  },
];

// Bottom Row (Clothes, Watch, Shoes, Photography, Electronics) scrolling items
const ROW_3_ITEMS = [
  {
    id: "r3-1",
    name: "Clothes",
    type: "image",
    src: "/brands/clothes.jpg",
    zoomClass: "animate-zoom-in-out-2",
  },
  {
    id: "r3-2",
    name: "Watch",
    type: "image",
    src: "/brands/watch.jpg",
    zoomClass: "animate-zoom-in-out-1",
  },
  {
    id: "r3-3",
    name: "Shoes",
    type: "image",
    src: "/brands/shoes.jpg",
    zoomClass: "animate-zoom-in-out-3",
  },
  {
    id: "r3-4",
    name: "Fashion Reel",
    type: "video",
    src: "/creators/grwm-girl.mp4",
    zoomClass: "animate-zoom-in-out-1",
  },
  {
    id: "r3-5",
    name: "Electronics",
    type: "video",
    src: "/creators/creator-tech.mp4",
    zoomClass: "animate-zoom-in-out-2",
  },
  {
    id: "r3-6",
    name: "Photography",
    type: "image",
    src: "/brands/photography.jpg",
    zoomClass: "animate-zoom-in-out-3",
  },
];

export default function BrandCircleShowcase() {
  const handleScrollToForm = () => {
    const firstInput = document.querySelector('input[name="company"]') || document.querySelector('input[type="text"]');
    if (firstInput) {
      firstInput.focus();
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between select-none bg-[#FAF3EB] border-none shadow-none">
      
      {/* Top Floating Badge Header - Clean, No Toggle Buttons */}
      <div className="absolute top-3.5 left-4 sm:left-6 z-30">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DECDBE] text-xs font-semibold text-[#520B15] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#9E7B35]" />
          <span>Brand Discovery Portal</span>
        </div>
      </div>

      {/* Center Circular Aperture with Concentric Glowing Halo Rings */}
      <div className="relative w-full h-full flex items-center justify-center pt-8 pb-28 px-4">
        
        {/* Outer Halo Rings (Concentric radiating ripples from Agenius reference) */}
        <div className="relative flex items-center justify-center animate-portal-gentle">
          
          {/* Ripple Ring 3 - Outermost Ambient Diffuse Glow */}
          <div className="absolute w-[300px] h-[300px] xs:w-[350px] xs:h-[350px] sm:w-[420px] sm:h-[420px] lg:w-[440px] lg:h-[440px] rounded-full bg-gradient-to-tr from-[#66101B]/8 via-[#9E7B35]/12 to-[#FAF3EB] blur-2xl pointer-events-none animate-pulse" />

          {/* Ripple Ring 2 - Outer Hairline Ring */}
          <div className="absolute w-[285px] h-[285px] xs:w-[335px] xs:h-[335px] sm:w-[400px] sm:h-[400px] lg:w-[420px] lg:h-[420px] rounded-full border border-[#DECDBE]/40 pointer-events-none" />

          {/* Ripple Ring 1 - Mid Soft Ring */}
          <div className="absolute w-[265px] h-[265px] xs:w-[310px] xs:h-[310px] sm:w-[370px] sm:h-[370px] lg:w-[390px] lg:h-[390px] rounded-full border border-[#DECDBE]/70 pointer-events-none" />

          {/* Master Circular Frame (Inner Bezel with Soft Luxury Finish) */}
          <div className="relative w-[245px] h-[245px] xs:w-[285px] xs:h-[285px] sm:w-[345px] sm:h-[345px] lg:w-[375px] lg:h-[375px] rounded-full p-2 sm:p-2.5 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#DECDBE] border border-[#DECDBE]">
            
            {/* The Lens / Circular Viewport */}
            <div className="w-full h-full rounded-full overflow-hidden relative bg-black shadow-inner flex flex-col">
              
              {/* =========================================================================
                  ROW 1 (TOP ROW): Horizontally Scrolling Stream + Active Zooming In & Out
                 ========================================================================= */}
              <div className="h-[34%] w-full overflow-hidden relative border-b-2 border-black bg-stone-950">
                <div className="flex h-full w-max animate-marquee-left">
                  {ROW_1_ITEMS.concat(ROW_1_ITEMS).concat(ROW_1_ITEMS).map((item, idx) => (
                    <div
                      key={`r1-${idx}`}
                      className="w-[110px] sm:w-[130px] h-full shrink-0 relative overflow-hidden border-r border-black/80 group"
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className={`w-full h-full object-cover ${item.zoomClass}`}
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.name}
                          className={`w-full h-full object-cover ${item.zoomClass}`}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-1 left-1.5 pointer-events-none">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#FAF3EB] bg-black/60 px-1 py-0.2 rounded">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* =========================================================================
                  ROW 2 (MIDDLE ROW): Live Hero Brand Video Scrolling & Zooming
                 ========================================================================= */}
              <div className="h-[33%] w-full overflow-hidden relative border-b-2 border-black bg-black">
                <video
                  src="/brands/agenius-brand-hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover animate-brand-kb-3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-1 left-2 flex items-center gap-1.5 pointer-events-none">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-[#FAF3EB] bg-[#66101B]/90 border border-white/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    Brand Reel
                  </span>
                </div>
              </div>

              {/* =========================================================================
                  ROW 3 (BOTTOM ROW): Horizontally Scrolling Stream in Reverse + Active Zooming In & Out
                 ========================================================================= */}
              <div className="h-[33%] w-full overflow-hidden relative bg-stone-950">
                <div className="flex h-full w-max animate-marquee-right">
                  {ROW_3_ITEMS.concat(ROW_3_ITEMS).concat(ROW_3_ITEMS).map((item, idx) => (
                    <div
                      key={`r3-${idx}`}
                      className="w-[110px] sm:w-[130px] h-full shrink-0 relative overflow-hidden border-r border-black/80 group"
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className={`w-full h-full object-cover ${item.zoomClass}`}
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.name}
                          className={`w-full h-full object-cover ${item.zoomClass}`}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-1 left-1.5 pointer-events-none">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#FAF3EB] bg-black/60 px-1 py-0.2 rounded">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Floating Category Indicator Badges Under Circle */}
      <div className="absolute bottom-28 inset-x-0 z-20 flex justify-center px-4 pointer-events-none">
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-md opacity-90">
          {["Makeup", "Skincare", "Clothes", "Photography", "Electronics", "Shoes", "Watch"].map((cat) => (
            <span
              key={cat}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FFFDF9]/90 border border-[#DECDBE] text-[#520B15] shadow-2xs backdrop-blur-xs"
            >
              ✦ {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Prominent Beige Blurry Gradient at Bottom ONLY (No horizontal spread, strictly vertical) */}
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

      {/* Layer 3: Warm Upward Gradient Wash (Zero horizontal spread) */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[80px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, #FAF3EB 50%, rgba(250, 243, 235, 0.7) 80%, transparent 100%)",
        }}
      />

      {/* Bottom Content Layer: "Your first step is just one click away" */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 lg:p-7 pb-4 sm:pb-5 z-30 flex flex-col items-center sm:items-start text-center sm:text-left">
        <h2 className="font-heading text-xl sm:text-2xl lg:text-[26px] font-bold text-[#4A0711] leading-tight tracking-tight drop-shadow-xs">
          Your first step is just one click away
        </h2>
        <p className="text-xs text-[#7D5358] font-serif mt-1 mb-3 max-w-sm">
          Post campaign briefs, evaluate authentic creator auditions, and hire on merit and verified fit.
        </p>

        {/* Sleek Action Pill Button */}
        <button
          type="button"
          onClick={handleScrollToForm}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5A0A14] via-[#66101B] to-[#4D070F] hover:from-[#6B0D18] hover:via-[#781422] hover:to-[#570912] text-[#FAF3EB] text-xs font-semibold shadow-[0_10px_25px_-5px_rgba(102,16,27,0.35)] hover:shadow-[0_14px_30px_-5px_rgba(102,16,27,0.45)] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <span>Join as Brand</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FAF3EB]" />
        </button>
      </div>

    </div>
  );
}
