"use client";

export default function BrandPinkWaveRibbon() {
  const platformText = 
    "CREATORZ • BRIEF-FIRST DISCOVERY • OUTCOME-LINKED REPUTATION • PITCH OVER FOLLOWERS • VERIFIED CREATOR AUDITIONS • TOP INDIAN BRANDS & CREATORS • HIGH ROAS CAMPAIGNS • PERFORMANCE UGC • VERIFIED DELIVERY • "
      .repeat(8);

  return (
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[44%] w-[1850px] lg:w-[2000px] h-[440px] pointer-events-none select-none z-[4]"
      style={{
        maskImage: "linear-gradient(90deg, transparent 2%, black 10%, black 90%, transparent 98%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 2%, black 10%, black 90%, transparent 98%)"
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="-7.1991 -28.74635 1564.4991 405.47935"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full block overflow-visible drop-shadow-[0_4px_14px_rgba(255,168,242,0.45)]"
      >
        <defs>
          <path
            id="creatorzWavePath"
            d="M12.8009 194.615C12.8009 194.615 111.532 356.733 371.301 334.115C705.301 305.035 906.801 -8.74635 1201.3 16.4344C1405.06 33.8564 1537.3 189.615 1537.3 189.615"
          />
        </defs>

        {/* Pink Wave Ribbon Stroke */}
        <path
          d="M12.8009 194.615C12.8009 194.615 111.532 356.733 371.301 334.115C705.301 305.035 906.801 -8.74635 1201.3 16.4344C1405.06 33.8564 1537.3 189.615 1537.3 189.615"
          fill="none"
          stroke="#FFA8F2"
          strokeWidth="35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Continuous Marquee Text along the Wave Path */}
        <text
          fill="#1C1917"
          style={{
            fontFamily: "var(--font-sans, system-ui), sans-serif",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#creatorzWavePath" startOffset="0%" dominantBaseline="central">
            <animate
              attributeName="startOffset"
              from="0%"
              to="-50%"
              dur="32s"
              repeatCount="indefinite"
            />
            {platformText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
