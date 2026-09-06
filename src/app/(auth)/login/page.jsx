"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Zap,
  ArrowRight,
  Sparkles,
  Briefcase,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CreatorShintaShowcase from "@/components/auth/CreatorShintaShowcase";
import BrandReeloShowcase from "@/components/auth/BrandReeloShowcase";

export default function UnifiedLoginPage() {
  const router = useRouter();
  const { autoLogin, findUserByEmail, detectRole } = useAuth();

  const [email, setEmail] = useState("alex@creatorz.io");
  const [password, setPassword] = useState("creator123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Live auto-detection preview based on current email input
  const detectedPreview = useMemo(() => {
    if (!email || !email.includes("@")) return null;
    const match = findUserByEmail(email);
    if (match) {
      return {
        role: match.role,
        name: match.name,
        company: match.company,
        isRegistered: true,
      };
    }
    const detected = detectRole(email);
    return {
      role: detected,
      name: null,
      company: null,
      isRegistered: false,
    };
  }, [email, findUserByEmail, detectRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      try {
        const result = autoLogin(email, password);
        if (result.role === "brand") {
          router.push("/brand/dashboard");
        } else {
          router.push("/creator/dashboard");
        }
      } catch (err) {
        setError(err.message || "Failed to sign in. Please try again.");
        setIsLoading(false);
      }
    }, 450);
  };

  const handleDemoLogin = (role) => {
    setError("");
    setIsLoading(true);
    const demoEmail = role === "brand" ? "priya@beastlife.com" : "alex@creatorz.io";
    setEmail(demoEmail);
    setPassword(role === "brand" ? "brand123" : "creator123");

    setTimeout(() => {
      try {
        const result = autoLogin(demoEmail, role === "brand" ? "brand123" : "creator123");
        if (result.role === "brand") {
          router.push("/brand/dashboard");
        } else {
          router.push("/creator/dashboard");
        }
      } catch (err) {
        setError(err.message || "Failed to sign in with demo account.");
        setIsLoading(false);
      }
    }, 350);
  };

  const handleGoogleSignIn = () => {
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      try {
        const result = autoLogin("maya.roy.creates@gmail.com", "googlepass123", {
          name: "Maya Roy (Google)",
        });
        if (result.role === "brand") {
          router.push("/brand/dashboard");
        } else {
          router.push("/creator/dashboard");
        }
      } catch (err) {
        setError(err.message || "Google Sign In failed. Please try again.");
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] w-full max-w-[100vw] overflow-x-hidden flex flex-col bg-[#FAF3EB] selection:bg-[#66101B]/20 selection:text-[#520B15]">

      {/* Subtle Ambient Luxury Lighting Accents (Contained within viewport bounds) */}
      <div className="absolute top-0 left-0 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-[radial-gradient(ellipse_at_top_left,rgba(102,16,27,0.06),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-[radial-gradient(ellipse_at_top_right,rgba(158,123,53,0.07),transparent_70%)] pointer-events-none z-0" />

      {/* Tri-Panel Container for Desktop; Centered on mobile */}
      <div className="w-full max-w-full overflow-x-hidden min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center justify-between lg:justify-center relative z-10 px-3 sm:px-6 lg:px-4 py-2 sm:py-4 lg:py-2 gap-3 xl:gap-5 2xl:gap-8">

        {/* Left Side: Creator Showcase with opacity, unclipped width, tilted towards center form (right) */}
        <div className="hidden lg:flex flex-1 max-w-[340px] xl:max-w-[380px] 2xl:max-w-[420px] h-full items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 pointer-events-auto shrink-0 z-10 overflow-visible">
          <div className="scale-[0.74] xl:scale-[0.78] 2xl:scale-[0.84] origin-center w-full flex flex-col items-center rotate-[3.5deg] [transform:perspective(1000px)_rotate(3.5deg)_rotateY(4deg)] transition-transform duration-300 overflow-visible">
            <div className="mb-1.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/80 border border-[#DECDBE] text-[10.5px] font-bold text-[#66101B] shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#9E7B35]" />
              <span>Creator Talent Studio</span>
            </div>
            <CreatorShintaShowcase />
          </div>
        </div>

        {/* Center: Unified Login Form (Shifted a bit above, compact & 100% visible) */}
        <div className="w-full max-w-[460px] lg:max-w-[485px] shrink-0 relative z-20 mx-auto my-auto lg:-translate-y-5 xl:-translate-y-7 py-1 sm:py-2">
          <div className="mt-5 bg-[#FFFDF9]/95 backdrop-blur-2xl border border-[#DECDBE] rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-5 shadow-[0_12px_28px_rgba(77,10,19,0.06),0_0_0_1px_rgba(255,255,255,0.7)_inset]">

            {/* Header */}
            <div className=" sm:mb-1">
              <div className="flex items-baseline justify-between gap-2 mb-0.5">
                <h1 className="text-xl sm:text-[23px] font-bold font-heading text-[#4A0711] tracking-tight leading-tight">
                  Welcome to CreatorZ
                </h1>
                <Link
                  href="/signup"
                  className="text-xs font-semibold text-[#66101B] hover:text-[#4A0711] hover:underline transition-colors shrink-0"
                >
                  New here?
                </Link>
              </div>
              <p className="text-[11.5px] text-[#7D5358] font-serif">
                Sign in with your email. We auto-detect whether to open your Creator Studio or Brand Workspace.
              </p>
            </div>

            {/* Quick Actions Row: Continue with Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-2 sm:py-2.5 px-3 mb-2 rounded-xl border border-[#DECDBE] bg-white hover:bg-[#FAF6F0] text-[#4A0711] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-2xs hover:border-[#66101B]/30 hover:shadow-xs disabled:opacity-60 group"
            >
              <svg className="w-4 h-4 shrink-0 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* 1-Click Fast Demo Buttons (Creator vs Brand) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              {/* Demo Creator Button */}
              <button
                type="button"
                onClick={() => handleDemoLogin("creator")}
                disabled={isLoading}
                className="w-full py-1.5 px-2.5 rounded-xl border border-dashed border-[#66101B]/35 hover:border-[#66101B] bg-[#FAF3EB]/80 hover:bg-[#66101B]/5 text-[#520B15] font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs group"
                title="1-click sign in as Alex Kumar (Creator)"
              >
                <Zap className="w-3 h-3 text-[#9E7B35] group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">Demo Creator (Alex)</span>
              </button>

              {/* Demo Brand Button */}
              <button
                type="button"
                onClick={() => handleDemoLogin("brand")}
                disabled={isLoading}
                className="w-full py-1.5 px-2.5 rounded-xl border border-dashed border-[#9E7B35]/50 hover:border-[#9E7B35] bg-[#FAF3EB]/80 hover:bg-[#9E7B35]/10 text-[#520B15] font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs group"
                title="1-click sign in as Priya Sharma / BeastLife (Brand)"
              >
                <Briefcase className="w-3 h-3 text-[#9E7B35] group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">Demo Brand (BeastLife)</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#DECDBE]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#FFFDF9] px-2.5 text-[#8C5D64] font-medium text-[10px] uppercase tracking-wider">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-2 p-2 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Live Detected Role Indicator Pill */}
            {detectedPreview && (
              <div className="mb-2 px-2.5 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#DECDBE] flex items-center justify-between text-xs animate-fadeIn">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${detectedPreview.role === "brand" ? "bg-[#9E7B35]" : "bg-[#66101B]"
                      }`}
                  />
                  <span className="text-[#520B15] text-[11px] truncate">
                    Detected:{" "}
                    <strong
                      className={
                        detectedPreview.role === "brand"
                          ? "text-[#9E7B35] font-bold"
                          : "text-[#66101B] font-bold"
                      }
                    >
                      {detectedPreview.role === "brand" ? "Brand Partner" : "Creator Talent"}
                    </strong>
                    {detectedPreview.name && (
                      <span className="text-[#7D5358] ml-1 font-normal">
                        ({detectedPreview.name})
                      </span>
                    )}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-sm shrink-0 ${detectedPreview.role === "brand"
                    ? "bg-[#9E7B35]/15 text-[#9E7B35]"
                    : "bg-[#66101B]/10 text-[#66101B]"
                    }`}
                >
                  {detectedPreview.role === "brand" ? "Brand" : "Creator"}
                </span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div>
                <label className="block text-[10px] font-bold text-[#520B15] uppercase tracking-wider mb-0.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#8C5D64] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@creatorz.io or work@company.com"
                    className="w-full pl-9 pr-3 py-1.5 sm:py-2 rounded-xl border border-[#DECDBE] bg-[#FAF6F0]/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#66101B]/15 focus:border-[#66101B] text-xs sm:text-sm text-[#4A0711] placeholder:text-[#A88A8F] transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label className="block text-[10px] font-bold text-[#520B15] uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions will be sent to your registered email.");
                    }}
                    className="text-[10.5px] font-semibold text-[#66101B] hover:text-[#4A0711] hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-[#8C5D64] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-9 pr-9 py-1.5 sm:py-2 rounded-xl border border-[#DECDBE] bg-[#FAF6F0]/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#66101B]/15 focus:border-[#66101B] text-xs sm:text-sm text-[#4A0711] placeholder:text-[#A88A8F] transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C5D64] hover:text-[#4A0711] p-1 cursor-pointer transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-sm border-[#DECDBE] text-[#66101B] focus:ring-[#66101B]/20 accent-[#66101B]"
                  />
                  <span className="text-[11px] text-[#7D5358]">Remember me on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 sm:py-2.5 px-4 rounded-xl bg-[#66101B] hover:bg-[#4A0711] text-[#FAF3EB] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Routing to Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {detectedPreview
                        ? `Sign In to ${detectedPreview.role === "brand" ? "Brand Workspace" : "Creator Studio"}`
                        : "Sign In to Workspace"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Cross-links & Workspace Selection */}
            <div className="mt-2.5 pt-2 border-t border-[#DECDBE]/80 text-center space-y-1">
              <p className="text-[11px] text-[#7D5358]">
                Don&apos;t have an account yet?{" "}
                <Link href="/signup" className="text-[#66101B] font-bold hover:underline transition-colors">
                  Choose Your Workspace →
                </Link>
              </p>
              <div className="flex items-center justify-center gap-2.5 text-[10.5px] text-[#A88A8F]">
                <Link href="/creator/signup" className="hover:text-[#66101B] hover:underline transition-colors">
                  Join as Creator
                </Link>
                <span>•</span>
                <Link href="/brand/signup" className="hover:text-[#66101B] hover:underline transition-colors">
                  Register as Brand
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Brand Showcase with opacity, unclipped width, straight / upright (no tilt) */}
        <div className="hidden lg:flex flex-1 max-w-[340px] xl:max-w-[380px] 2xl:max-w-[420px] h-full items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 pointer-events-auto shrink-0 z-10 overflow-visible">
          <div className="scale-[0.76] xl:scale-[0.80] 2xl:scale-[0.88] origin-center w-full flex flex-col items-center transition-transform duration-300 overflow-visible">
            <div className="mb-1.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/80 border border-[#DECDBE] text-[10.5px] font-bold text-[#9E7B35] shadow-2xs">
              <Briefcase className="w-3 h-3 text-[#9E7B35]" />
              <span>Brand Campaign Hub</span>
            </div>
            <BrandReeloShowcase showCta={false} />
          </div>
        </div>

      </div>

      {/* Mobile / Tablet Accordion Showcases (Stacked cleanly below form, strictly bounded within 100% width) */}
      <div className="lg:hidden w-full max-w-full px-2.5 sm:px-4 pb-12 pt-4 flex flex-col items-center gap-6 relative z-10 border-t border-[#DECDBE]/60 mt-4 bg-[#FAF3EB]/50 overflow-hidden">
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5D64]">
            Explore CreatorZ Ecosystem
          </span>
        </div>

        <div className="w-full max-w-[390px] flex flex-col gap-6 overflow-hidden">
          <div className="w-full p-2.5 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#DECDBE] shadow-2xs overflow-hidden flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2 w-full">
              <Sparkles className="w-4 h-4 text-[#66101B]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#520B15]">
                Creator Talent Experience
              </h3>
            </div>
            <div className="w-full max-w-full overflow-hidden flex justify-center">
              <CreatorShintaShowcase />
            </div>
          </div>

          <div className="w-full p-2.5 sm:p-4 rounded-2xl bg-white/70  shadow-2xs overflow-hidden flex flex-col items-center">
            <div className="flex items-center gap-2 mb-5 w-full">
              <Briefcase className="w-4 h-4 text-[#9E7B35]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#520B15]">
                Brand Collaboration Hub
              </h3>
            </div>
            <div className="w-full max-w-full overflow-hidden flex justify-center">
              <BrandReeloShowcase showCta={false} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
