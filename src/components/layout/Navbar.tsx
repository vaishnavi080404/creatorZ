"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const publicLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/creators", label: "Creators" },
    { href: "/briefs", label: "Open Briefs" },
    { href: "/pricing", label: "Pricing & Tiers" },
  ];

  return (
    <header className="bg-[#faf3eb]/95 backdrop-blur-md sticky top-0 z-50 transition-all border-b border-[#e4d0c0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo / Header Title - with smooth upward swish hover */}
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="relative flex items-center gap-2.5 px-3 py-2 rounded-lg overflow-hidden group transition-all duration-300"
          >
            {/* Swish background slide */}
            <span className="absolute inset-0 bg-[#66101b] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-lg -z-10"></span>

            <div className="w-8 h-8 rounded-md bg-[#66101b] group-hover:bg-[#faf3eb] text-[#faf3eb] group-hover:text-[#66101b] flex items-center justify-center text-sm font-extrabold shadow-xs transition-colors duration-300">
              C
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#66101b] group-hover:text-[#faf3eb] font-heading transition-colors duration-300">
              CREATOR<span className="text-[#66101b] group-hover:text-[#faf3eb] transition-colors duration-300">Z</span>
            </span>
          </Link>

          {/* Marketing Navigation Links - with sliding Framer Motion swish */}
          <nav 
            onMouseLeave={() => setHoveredPath(null)}
            className="hidden md:flex items-center gap-1 text-sm font-medium"
          >
            {publicLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredPath === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className="relative px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  {/* Sliding swish indicator moving between tabs */}
                  {isHovered && (
                    <motion.span
                      layoutId="navHoverSwish"
                      className="absolute inset-0 bg-[#66101b] rounded-lg -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}

                  {/* Active highlight when not hovering other tabs */}
                  {isActive && !isHovered && !hoveredPath && (
                    <span className="absolute inset-0 bg-[#66101b] rounded-lg -z-10 shadow-xs" />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isHovered || (isActive && !hoveredPath)
                        ? "text-[#faf3eb] font-semibold"
                        : "text-[#82575c] hover:text-[#66101b]"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-3">
          
          {/* Creator Login with smooth upward swish */}
          <Link
            href="/creator/dashboard"
            className="relative hidden sm:inline-block text-xs font-semibold text-[#82575c] hover:text-[#faf3eb] px-4 py-2 rounded-lg overflow-hidden group transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-[#66101b] translate-y-full group-hover:translate-y-0 transition-transform duration-250 ease-out -z-10 rounded-lg"></span>
            <span className="relative z-10">Creator Login</span>
          </Link>

          {/* Outlined CTA Button with lateral swish fill */}
          <Link
            href="/brand/briefs/new"
            className="relative px-5 py-2.5 rounded-lg border-2 border-[#66101b] text-[#66101b] hover:text-[#faf3eb] text-xs sm:text-sm font-semibold overflow-hidden group transition-colors duration-300 flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-[#66101b] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10"></span>
            <span className="relative z-10">Post a Brief</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

        </div>

      </div>
    </header>
  );
}
