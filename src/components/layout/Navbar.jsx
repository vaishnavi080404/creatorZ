"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ArrowRight, 
  ChevronDown, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Sparkles, 
  Briefcase, 
  Layers,
  ArrowLeftRight,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, login } = useAuth();

  // Completely hide consumer navbar on all internal admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [hoveredPath, setHoveredPath] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const publicLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/creators", label: "Creators" },
    { href: "/briefs", label: "Open Briefs" },
    { href: "/pricing", label: "Pricing & Tiers" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const handleSignOut = () => {
    setDropdownOpen(false);
    logout();
    router.push("/");
  };

  const handleRoleToggle = () => {
    const nextRole = user?.role === "brand" ? "creator" : "brand";
    login(nextRole);
    setDropdownOpen(false);
    router.push(nextRole === "brand" ? "/brand/dashboard" : "/creator/dashboard");
  };

  const isAdmin = user?.role === "admin";
  const isBrand = user?.role === "brand";
  const isCreator = !isAdmin && !isBrand;

  const displayName = user?.company || user?.companyName || user?.name || "User";

  const dashboardHref = isAdmin
    ? "/admin/dashboard"
    : isBrand
    ? "/brand/dashboard"
    : "/creator/dashboard";

  const editProfileHref = isAdmin
    ? "/admin/dashboard"
    : isBrand
    ? "/onboarding/brand"
    : "/creator/portfolio";

  return (
    <header className="bg-[#faf3eb]/95 backdrop-blur-md sticky top-0 z-50 transition-all border-b border-[#e4d0c0] w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo / Header Title */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <Link
            href="/"
            className="relative flex items-center gap-2 sm:gap-2.5 px-1.5 sm:px-3 py-1 sm:py-2 rounded-lg overflow-hidden group transition-all duration-300"
          >
            {/* Swish background slide */}
            <span className="absolute inset-0 bg-[#66101b] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-lg -z-10" />

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#66101b] group-hover:bg-[#faf3eb] text-[#faf3eb] group-hover:text-[#66101b] flex items-center justify-center text-xs sm:text-sm font-extrabold shadow-xs transition-colors duration-300">
              C
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#66101b] group-hover:text-[#faf3eb] font-heading transition-colors duration-300">
              CREATOR<span className="text-[#66101b] group-hover:text-[#faf3eb] transition-colors duration-300">Z</span>
            </span>
          </Link>

          {/* Marketing Navigation Links */}
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
                  className="relative px-3.5 py-2 rounded-lg transition-colors duration-200"
                >
                  {isHovered && (
                    <motion.span
                      layoutId="navHoverSwish"
                      className="absolute inset-0 bg-[#66101b] rounded-lg -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}

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

        {/* Dynamic Action Group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated && user ? (
            /* Authenticated User Pill & Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                id="user-pill-btn"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-[#e4d0c0] bg-white/90 hover:bg-white hover:border-[#66101b]/40 shadow-xs transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#66101b]/20"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                {/* Initials / Avatar Circle */}
                {user.avatar || user.avatar_url ? (
                  <img
                    src={user.avatar || user.avatar_url}
                    alt={displayName}
                    className="w-8 h-8 rounded-full object-cover shadow-xs border border-[#e4d0c0]"
                  />
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#faf3eb] shadow-xs ${
                      isAdmin
                        ? "bg-[#7A1C28]"
                        : isBrand
                        ? "bg-[#9E7B35]"
                        : "bg-[#66101b]"
                    }`}
                  >
                    {user.initials || (isAdmin ? "OD" : isBrand ? "BR" : "CR")}
                  </div>
                )}

                {/* Name & Role Badge */}
                <div className="hidden sm:flex flex-col items-start text-left leading-tight">
                  <span className="text-xs font-bold text-[#66101b] truncate max-w-[130px]">
                    {displayName}
                  </span>
                  <span
                    className={`text-[9.5px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded-sm ${
                      isAdmin
                        ? "bg-[#7A1C28] text-white"
                        : isBrand
                        ? "bg-[#9E7B35]/15 text-[#9E7B35]"
                        : "bg-[#66101b]/10 text-[#66101b]"
                    }`}
                  >
                    {isAdmin ? (user.badge || "Super Admin") : isBrand ? "Brand" : "Creator"}
                  </span>
                </div>

                {/* Small role badge on mobile */}
                <span
                  className={`sm:hidden text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                    isAdmin
                      ? "bg-[#7A1C28] text-white"
                      : isBrand
                      ? "bg-[#9E7B35]/15 text-[#9E7B35]"
                      : "bg-[#66101b]/10 text-[#66101b]"
                  }`}
                >
                  {isAdmin ? (user.badge || "Super Admin") : isBrand ? "Brand" : "Creator"}
                </span>

                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#82575c] transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-[#66101b]" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#faf3eb]/98 backdrop-blur-xl border border-[#e4d0c0] shadow-2xl p-2 z-50 text-[#66101b]"
                  >
                    {/* User Profile Card Header */}
                    <div className="px-3 py-2.5 mb-1.5 rounded-xl bg-white/70 border border-[#ebdcd0]">
                      <div className="flex items-center gap-2.5">
                        {user.avatar || user.avatar_url ? (
                          <img
                            src={user.avatar || user.avatar_url}
                            alt={displayName}
                            className="w-9 h-9 rounded-full object-cover shadow-xs border border-[#e4d0c0] shrink-0"
                          />
                        ) : (
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#faf3eb] shrink-0 ${
                              isAdmin
                                ? "bg-[#7A1C28]"
                                : isBrand
                                ? "bg-[#9E7B35]"
                                : "bg-[#66101b]"
                            }`}
                          >
                            {user.initials || (isAdmin ? "OD" : isBrand ? "BR" : "CR")}
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-[#66101b] truncate">
                            {displayName}
                          </p>
                          <p className="text-xs text-[#82575c] truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between pt-2 border-t border-[#ebdcd0]/60">
                        <span className="text-[11px] text-[#82575c]">
                          Active Workspace
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isAdmin
                              ? "bg-[#7A1C28]/15 text-[#7A1C28] border border-[#7A1C28]/30"
                              : isBrand
                              ? "bg-[#9E7B35]/15 text-[#9E7B35] border border-[#9E7B35]/30"
                              : "bg-[#66101b]/10 text-[#66101b] border border-[#66101b]/20"
                          }`}
                        >
                          {isAdmin
                            ? "Super Admin Console"
                            : isBrand
                            ? "Brand Partner"
                            : "Alpha Creator"}
                        </span>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="space-y-0.5">
                      <Link
                        href={dashboardHref}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl hover:bg-white hover:text-[#66101b] text-[#66101b] transition-colors group"
                      >
                        {isAdmin ? (
                          <ShieldCheck className="w-4 h-4 text-[#7A1C28] group-hover:text-[#66101b] transition-colors" />
                        ) : (
                          <LayoutDashboard className="w-4 h-4 text-[#82575c] group-hover:text-[#66101b] transition-colors" />
                        )}
                        <span className="flex-1">
                          {isAdmin ? "Operations Console" : "Dashboard"}
                        </span>
                        <span className="text-[10px] text-[#82575c] group-hover:text-[#66101b]">
                          Overview
                        </span>
                      </Link>

                      <Link
                        href={editProfileHref}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl hover:bg-white hover:text-[#66101b] text-[#66101b] transition-colors group"
                      >
                        <User className="w-4 h-4 text-[#82575c] group-hover:text-[#66101b] transition-colors" />
                        <span className="flex-1">Edit Profile</span>
                        {isBrand && user.onboarding_completed === false && (
                          <span className="text-[9.5px] bg-[#FFF8E6] text-[#B45309] px-1.5 py-0.5 rounded font-bold border border-[#FDE68A]">
                            Complete
                          </span>
                        )}
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin/verification"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl hover:bg-white hover:text-[#66101b] text-[#66101b] transition-colors group"
                        >
                          <Layers className="w-4 h-4 text-[#7A1C28] group-hover:text-[#66101b] transition-colors" />
                          <span className="flex-1">Verification Queue</span>
                          <span className="text-[10px] bg-[#7A1C28]/15 text-[#7A1C28] px-1.5 py-0.5 rounded font-bold">
                            Review
                          </span>
                        </Link>
                      )}

                      {/* Quick Role Switcher for demo creators/brands only */}
                      {!isAdmin && (
                        <button
                          type="button"
                          onClick={handleRoleToggle}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl hover:bg-white text-[#82575c] hover:text-[#66101b] transition-colors group text-left cursor-pointer"
                          title="Quickly preview as the other role"
                        >
                          <ArrowLeftRight className="w-4 h-4 text-[#82575c] group-hover:text-[#66101b] transition-colors" />
                          <span className="flex-1">
                            Switch to {isBrand ? "Creator" : "Brand"}
                          </span>
                          <span className="text-[10px] bg-[#ebdcd0] text-[#66101b] px-1.5 py-0.5 rounded font-mono">
                            DEMO
                          </span>
                        </button>
                      )}
                    </div>

                    <div className="my-1.5 border-t border-[#e4d0c0]" />

                    {/* Sign Out Action */}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl text-[#b91c1c] hover:bg-[#fee2e2]/60 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-[#b91c1c]" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Unauthenticated Action Group - Clean 2-item controls */
            <>
              {/* Ghost Link: Sign In -> routes to /login */}
              <Link
                href="/login"
                className="px-2 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#82575c] hover:text-[#66101b] hover:bg-[#ebdcd0]/40 rounded-lg transition-colors duration-200"
              >
                Sign In
              </Link>

              {/* Primary Button: Get Started -> routes to /signup */}
              <Link
                href="/signup"
                className="relative px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg bg-[#66101b] hover:bg-[#4d0a13] text-[#faf3eb] text-xs sm:text-sm font-semibold overflow-hidden group transition-all duration-300 shadow-xs flex items-center gap-1 sm:gap-1.5 shrink-0"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-1 hidden xs:inline-block" />
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
