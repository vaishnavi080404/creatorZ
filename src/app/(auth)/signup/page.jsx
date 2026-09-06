"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Award,
  Video
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [loadingRole, setLoadingRole] = useState(null);

  const handleQuickDemo = (role) => {
    setLoadingRole(role);
    setTimeout(() => {
      if (role === "creator") {
        signup("creator", {
          name: "Maya Roy",
          handle: "@maya_creates",
          category: "Fashion & Lifestyle",
        });
        router.push("/creator/dashboard");
      } else {
        signup("brand", {
          name: "Karan Mehra",
          company: "Kalyan Organics",
          category: "FMCG & Beverages",
        });
        router.push("/brand/dashboard");
      }
    }, 350);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#faf3eb] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#66101b]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#66101b]/10 border border-[#66101b]/20 text-[#66101b] text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#66101b]" />
            <span>Brief-First Discovery & Delivery Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#66101b] tracking-tight">
            Choose Your Workspace
          </h1>
          <p className="mt-2.5 text-[#82575c] text-sm sm:text-base font-serif">
            Select your account type to begin onboarding — whether pitching creative concepts or commissioning open briefs.
          </p>
        </div>

        {/* 2-Column Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Creator Card */}
          <div className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-[#e4d0c0] p-8 shadow-card-elevated hover:shadow-soft-floating hover:border-[#66101b]/40 transition-all duration-300 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#66101b]/5 rounded-bl-[100px] pointer-events-none rounded-tr-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#66101b] text-[#faf3eb] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#66101b]/10 text-[#66101b] border border-[#66101b]/20">
                  Creator Profile
                </span>
              </div>

              <h2 className="text-2xl font-bold font-heading text-[#66101b] mb-2">
                I am a Creator
              </h2>
              <p className="text-sm text-[#82575c] mb-6 font-serif">
                Pitch concepts for open briefs, collaborate directly with innovative brands, and build your verified reputation ledger.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-xs text-[#66101b]">
                  <CheckCircle2 className="w-4 h-4 text-[#66101b] shrink-0 mt-0.5" />
                  <span><strong>Concept-First Auditions:</strong> Win brand briefs on narrative hooks and video craft.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#66101b]">
                  <CheckCircle2 className="w-4 h-4 text-[#66101b] shrink-0 mt-0.5" />
                  <span><strong>Verified Delivery Record:</strong> Build an outcome-linked reputation with each approved video.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#66101b]">
                  <CheckCircle2 className="w-4 h-4 text-[#66101b] shrink-0 mt-0.5" />
                  <span><strong>Zero Agency Bureaucracy:</strong> Communicate directly with decision-making brand leads.</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-3 pt-4 border-t border-[#ebdcd0]">
              <Link
                href="/creator/signup"
                className="w-full py-3 px-4 rounded-xl bg-[#66101b] hover:bg-[#4d0a13] text-[#faf3eb] font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors duration-200"
              >
                <span>Join as Creator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => handleQuickDemo("creator")}
                disabled={loadingRole !== null}
                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#66101b]/40 bg-[#faf3eb]/80 hover:bg-[#faf3eb] text-[#66101b] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#9E7B35]" />
                <span>
                  {loadingRole === "creator" ? "Registering Demo Creator..." : "1-Click Demo: Register as Maya Roy"}
                </span>
              </button>
            </div>
          </div>

          {/* Brand Card */}
          <div className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-[#e4d0c0] p-8 shadow-card-elevated hover:shadow-soft-floating hover:border-[#9E7B35]/50 transition-all duration-300 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9E7B35]/5 rounded-bl-[100px] pointer-events-none rounded-tr-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#9E7B35] text-[#faf3eb] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#9E7B35]/15 text-[#9E7B35] border border-[#9E7B35]/30">
                  Brand Profile
                </span>
              </div>

              <h2 className="text-2xl font-bold font-heading text-[#66101b] mb-2">
                I am a Brand
              </h2>
              <p className="text-sm text-[#82575c] mb-6 font-serif">
                Post open briefs, receive creative audition reels, and discover vetted creators with transparent track records.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-xs text-[#66101b]">
                  <CheckCircle2 className="w-4 h-4 text-[#9E7B35] shrink-0 mt-0.5" />
                  <span><strong>Direct Concept Comparison:</strong> Review multiple creative angles before commissioning.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#66101b]">
                  <CheckCircle2 className="w-4 h-4 text-[#9E7B35] shrink-0 mt-0.5" />
                  <span><strong>Timestamped Review Pins:</strong> Fast, frictionless video revision cycles.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#66101b]">
                  <CheckCircle2 className="w-4 h-4 text-[#9E7B35] shrink-0 mt-0.5" />
                  <span><strong>Vetted Creator Roster:</strong> Work with creators with verified delivery histories.</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-3 pt-4 border-t border-[#ebdcd0]">
              <Link
                href="/brand/signup"
                className="w-full py-3 px-4 rounded-xl bg-[#66101b] hover:bg-[#4d0a13] text-[#faf3eb] font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors duration-200"
              >
                <span>Register Brand Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => handleQuickDemo("brand")}
                disabled={loadingRole !== null}
                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#9E7B35]/50 bg-[#faf3eb]/80 hover:bg-[#faf3eb] text-[#66101b] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#9E7B35]" />
                <span>
                  {loadingRole === "brand" ? "Registering Demo Brand..." : "1-Click Demo: Register as Kalyan Organics"}
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Global Footer Cross-link */}
        <div className="text-center mt-10">
          <p className="text-xs sm:text-sm text-[#82575c]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#66101b] font-bold hover:underline">
              Sign In to Your Workspace →
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
