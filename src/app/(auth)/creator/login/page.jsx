"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Zap, 
  ArrowRight,
  Sparkles 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CreatorShintaShowcase from "@/components/auth/CreatorShintaShowcase";
import PinkWaveRibbon from "@/components/auth/PinkWaveRibbon";

export default function CreatorLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("alex@creatorz.io");
  const [password, setPassword] = useState("creator123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      login("creator", {
        email,
        name: email === "alex@creatorz.io" ? "Alex Kumar" : email.split("@")[0].replace(/[._]/g, " "),
      });
      router.push("/creator/dashboard");
    }, 450);
  };

  const handleDemoSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      login("creator");
      router.push("/creator/dashboard");
    }, 300);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      login("creator", {
        name: "Alex Kumar (Google)",
        email: "alex.kumar.creator@gmail.com",
      });
      router.push("/creator/dashboard");
    }, 400);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] flex flex-col lg:flex-row bg-[#FAF3EB] lg:overflow-hidden selection:bg-[#66101B]/20 selection:text-[#520B15]">
      
      {/* Pink Wave Ribbon with Platform Text (Desktop only: sweeps across left showcase & behind login form) */}
      <div className="hidden lg:block">
        <PinkWaveRibbon />
      </div>

      {/* Subtle Ambient Luxury Lighting Accent (Top Right corner only, never in middle seam) */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_top_right,rgba(158,123,53,0.07),transparent_70%)] pointer-events-none z-[1]" />

      {/* Left Half: Shinta 3D Card Stack Showcase (Desktop: Left 50%, Mobile/Tablet: Below form) */}
      <div className="order-2 lg:order-1 w-full lg:w-1/2 h-auto lg:h-full relative flex flex-col border-0 border-none border-r-0 shadow-none ring-0 z-[10]">
        <CreatorShintaShowcase />
      </div>

      {/* Right Half: Form (Mobile/Tablet: At top, Desktop: Right 50%) */}
      <div className="order-1 lg:order-2 w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-5 lg:p-7 py-6 sm:py-8 lg:py-0 overflow-y-auto relative z-[20] border-0 border-none border-l-0 shadow-none ring-0">
        <div className="w-full max-w-[490px] lg:max-w-[510px] bg-[#FFFDF9]/95 backdrop-blur-2xl border border-[#DECDBE] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-[0_12px_28px_rgba(77,10,19,0.06),0_0_0_1px_rgba(255,255,255,0.7)_inset] my-auto relative z-[20]">
          
          {/* Header */}
          <div className="mb-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#66101B]/8 text-[#520B15] border border-[#66101B]/20 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#9E7B35]" />
                <span>Creator Studio</span>
              </span>
              <Link href="/creator/signup" className="text-xs font-semibold text-[#66101B] hover:text-[#4A0711] hover:underline transition-colors">
                New Creator?
              </Link>
            </div>
            <h2 className="text-2xl sm:text-[27px] font-bold font-heading text-[#4A0711] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-[#7D5358] font-serif mt-0.5">
              Sign in to manage your active video pitch auditions and explore briefs.
            </p>
          </div>

          {/* Clean 2-Column Quick Actions Row (Saves space, matches Signup form) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {/* Continue with Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-3 rounded-xl border border-[#DECDBE] bg-white hover:bg-[#FAF6F0] text-[#4A0711] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:border-[#66101B]/30 hover:shadow-xs"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
              <span>Google Sign In</span>
            </button>

            {/* 1-Click Fast Demo */}
            <button
              type="button"
              onClick={handleDemoSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#66101B]/35 hover:border-[#66101B] bg-[#FAF3EB]/80 hover:bg-[#66101B]/5 text-[#520B15] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs group"
            >
              <Zap className="w-3.5 h-3.5 text-[#9E7B35] group-hover:scale-110 transition-transform" />
              <span>1-Click Demo Fill</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DECDBE]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#FFFDF9] px-3.5 text-[#8C5D64] font-medium text-[10.5px] uppercase tracking-wider">
                Or continue with creator email
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[10.5px] font-bold text-[#520B15] uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C5D64] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@creatorz.io"
                  className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-[#DECDBE] bg-[#FAF6F0]/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#66101B]/15 focus:border-[#66101B] text-xs sm:text-sm text-[#4A0711] placeholder:text-[#A88A8F] transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10.5px] font-bold text-[#520B15] uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-medium text-[#66101B] hover:text-[#4A0711] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C5D64] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-2 sm:py-2.5 rounded-xl border border-[#DECDBE] bg-[#FAF6F0]/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#66101B]/15 focus:border-[#66101B] text-xs sm:text-sm text-[#4A0711] placeholder:text-[#A88A8F] transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C5D64] hover:text-[#4A0711] hover:bg-[#66101B]/5 rounded-lg transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#DECDBE] text-[#66101B] focus:ring-[#66101B]/20 accent-[#66101B] cursor-pointer"
                />
                <span className="text-[11px] text-[#7D5358]">Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#5A0A14] via-[#66101B] to-[#4D070F] hover:from-[#6B0D18] hover:via-[#781422] hover:to-[#570912] text-[#FAF3EB] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(102,16,27,0.38),0_0_0_1px_rgba(255,255,255,0.15)_inset] hover:shadow-[0_14px_30px_-5px_rgba(102,16,27,0.48)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#FAF3EB] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Creator Studio</span>
                  <ArrowRight className="w-4 h-4 text-[#FAF3EB]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-[#DECDBE] text-center space-y-1">
            <p className="text-xs text-[#7D5358]">
              Don&apos;t have an account yet?{" "}
              <Link href="/creator/signup" className="text-[#66101B] font-bold hover:text-[#4A0711] hover:underline transition-colors">
                Join as Creator
              </Link>
            </p>
            <p className="text-[11px] text-[#7D5358]">
              Are you a brand commissioner?{" "}
              <Link href="/brand/login" className="text-[#9E7B35] font-bold hover:text-[#7D6122] hover:underline transition-colors">
                Sign In to Brand Workspace
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
