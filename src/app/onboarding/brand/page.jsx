"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import confetti from "canvas-confetti";
import {
  Building2,
  Globe,
  MapPin,
  Camera,
  Upload,
  Sparkles,
  Megaphone,
  Percent,
  Store,
  HelpCircle,
  Video,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Users,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function BrandOnboardingPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated, updateUserProfile } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Step 1: Brand Fundamentals
  const [representativeName, setRepresentativeName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("Mumbai, Maharashtra");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const fileInputRef = useRef(null);

  // Step 2: Main Objective & Dynamic Sub-questions
  const [objective, setObjective] = useState("UGC");
  // UGC follow-ups
  const [ugcPlatforms, setUgcPlatforms] = useState(["Meta / Instagram", "YouTube Shorts"]);
  const [ugcContentTypes, setUgcContentTypes] = useState(["Video Reels (30-60s)", "Raw B-Roll & Hooks"]);
  // Sponsored Posts follow-ups
  const [sponsoredNiches, setSponsoredNiches] = useState(["Fitness & Nutrition", "Tech & Gadgets"]);
  // Affiliate / Commission follow-ups (explicitly requested)
  const [affiliateModel, setAffiliateModel] = useState("Percentage of Sale (10-25%)");
  const [affiliatePayoutRange, setAffiliatePayoutRange] = useState("15% per converted order");
  const [affiliateTracking, setAffiliateTracking] = useState("Shopify Collabs / Promo Codes");
  // Local & Events follow-ups
  const [localEventType, setLocalEventType] = useState("Store Opening / Flagship Launch");
  const [localCities, setLocalCities] = useState(["Mumbai", "Bengaluru"]);
  // Something Else follow-up
  const [customObjectiveDesc, setCustomObjectiveDesc] = useState("");

  // Step 3: Company Specs
  const [businessType, setBusinessType] = useState("D2C Brand");
  const [roleInCompany, setRoleInCompany] = useState("Growth Marketer");
  const [teamSize, setTeamSize] = useState("11-50");
  const [monthlyBudget, setMonthlyBudget] = useState("₹50,000 - ₹2,00,000");

  // Auth protection & prefill
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login?redirect=/onboarding/brand");
        return;
      }
      if (user) {
        // Pre-fill fields from user state
        if (user.name && !representativeName) setRepresentativeName(user.name);
        if ((user.company || user.companyName) && !companyName) {
          setCompanyName(user.company || user.companyName);
        }
        if (user.website && !website) setWebsite(user.website);
        if (user.location && !location) setLocation(user.location);
        if ((user.bio || user.description) && !bio) setBio(user.bio || user.description);
        if (user.instagram && !instagram) setInstagram(user.instagram);
        if ((user.youtube || user.tiktok) && !youtube) setYoutube(user.youtube || user.tiktok);
        if (user.linkedin && !linkedin) setLinkedin(user.linkedin);
        if ((user.avatar || user.avatar_url) && !avatar) setAvatar(user.avatar || user.avatar_url);
        if (user.objective) setObjective(user.objective);
        if (user.businessType) setBusinessType(user.businessType);
        if (user.roleInCompany) setRoleInCompany(user.roleInCompany);
        if (user.teamSize) setTeamSize(user.teamSize);
        if (user.monthlyBudget) setMonthlyBudget(user.monthlyBudget);
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  // Handle Logo Upload (Supabase storage + base64 fallback)
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    setValidationError("");

    // 1. Immediate base64 preview
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Url = event.target?.result;
      setAvatar(base64Url);

      // 2. Try Supabase storage upload if available
      try {
        if (supabase?.storage && user?.id) {
          const fileExt = file.name.split(".").pop();
          const fileName = `brand-logos/${user.id}-${Date.now()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(fileName, file, { upsert: true });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from("avatars")
              .getPublicUrl(fileName);
            if (publicUrlData?.publicUrl) {
              setAvatar(publicUrlData.publicUrl);
            }
          }
        }
      } catch (err) {
        console.warn("Supabase logo storage upload fallback to base64", err);
      } finally {
        setIsUploadingLogo(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Toggle helper for multi-select arrays
  const toggleArrayItem = (setter, currentArr, item) => {
    if (currentArr.includes(item)) {
      if (currentArr.length > 1) {
        setter(currentArr.filter((i) => i !== item));
      }
    } else {
      setter([...currentArr, item]);
    }
  };

  // Validation per step
  const handleNextStep = (e) => {
    e.preventDefault();
    setValidationError("");

    if (currentStep === 1) {
      if (!representativeName.trim()) {
        setValidationError("Please enter the representative full name.");
        return;
      }
      if (!companyName.trim()) {
        setValidationError("Please enter your company or brand name.");
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2) {
      if (objective === "Something Else" && !customObjectiveDesc.trim()) {
        setValidationError("Please briefly describe what you are looking to achieve.");
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setValidationError("");
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Final submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationError("");

    try {
      const profileUpdates = {
        representativeName: representativeName.trim(),
        name: representativeName.trim(),
        company: companyName.trim(),
        companyName: companyName.trim(),
        website: website.trim(),
        location: location.trim(),
        bio: bio.trim(),
        instagram: instagram.trim(),
        youtube: youtube.trim(),
        linkedin: linkedin.trim(),
        avatar: avatar || null,
        avatar_url: avatar || null,
        objective,
        ugcPlatforms,
        ugcContentTypes,
        sponsoredNiches,
        affiliateModel,
        affiliatePayoutRange,
        affiliateTracking,
        localEventType,
        localCities,
        customObjectiveDesc: customObjectiveDesc.trim(),
        businessType,
        roleInCompany,
        teamSize,
        monthlyBudget,
        onboarding_completed: true,
      };

      if (updateUserProfile) {
        await updateUserProfile(profileUpdates);
      }

      // Celebratory Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#7A1C28", "#9E7B35", "#166534", "#E8DEC8"],
        });
      } catch (err) {
        // ignore confetti error
      }

      setSubmitted(true);
      setTimeout(() => {
        router.push("/brand/dashboard");
      }, 1600);
    } catch (error) {
      console.error("Failed to complete brand onboarding", error);
      setValidationError("Failed to save profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#7A1C28]" />
          <p className="text-xs font-mono text-[#82575c]">Loading onboarding session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3EB] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#166534] border border-[#C6E7CE] text-[11px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collabstr-Style Brand Onboarding</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-[#181314] tracking-tight">
            Complete Your Brand Profile
          </h1>
          <p className="text-xs sm:text-sm text-[#6C635B] max-w-lg mx-auto">
            Set up your brand specs to match with top video creators and receive custom 30–60s pitch reels.
          </p>
        </div>

        {/* Progress Tracker Bar */}
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {/* Step 1 */}
            <div
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition font-medium ${
                currentStep === 1
                  ? "bg-[#7A1C28] text-white font-bold shadow-sm"
                  : currentStep > 1
                  ? "bg-[#FAF6EE] text-[#166534] border border-[#C6E7CE]"
                  : "text-[#82575c]"
              }`}
            >
              {currentStep > 1 ? (
                <Check className="w-4 h-4 text-[#166534]" />
              ) : (
                <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center font-mono">
                  1
                </span>
              )}
              <span className="hidden sm:inline">1. Fundamentals</span>
              <span className="sm:hidden">1. Brand</span>
            </div>

            {/* Step 2 */}
            <div
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition font-medium ${
                currentStep === 2
                  ? "bg-[#7A1C28] text-white font-bold shadow-sm"
                  : currentStep > 2
                  ? "bg-[#FAF6EE] text-[#166534] border border-[#C6E7CE]"
                  : "text-[#82575c]"
              }`}
            >
              {currentStep > 2 ? (
                <Check className="w-4 h-4 text-[#166534]" />
              ) : (
                <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center font-mono">
                  2
                </span>
              )}
              <span className="hidden sm:inline">2. Objectives</span>
              <span className="sm:hidden">2. Goals</span>
            </div>

            {/* Step 3 */}
            <div
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition font-medium ${
                currentStep === 3
                  ? "bg-[#7A1C28] text-white font-bold shadow-sm"
                  : "text-[#82575c]"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center font-mono">
                3
              </span>
              <span className="hidden sm:inline">3. Company Specs</span>
              <span className="sm:hidden">3. Specs</span>
            </div>
          </div>

          {/* Progress fill bar */}
          <div className="w-full bg-[#FAF3EB] h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-[#7A1C28] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep - 1) / 2) * 100 || 15}%` }}
            />
          </div>
        </div>

        {/* Error Notification */}
        {validationError && (
          <div className="bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] p-4 rounded-2xl flex items-center gap-3 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form Container Card */}
        <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#166534] flex items-center justify-center mx-auto shadow-sm animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#181314] font-heading">
                Brand Profile Completed!
              </h2>
              <p className="text-xs text-[#6C635B] max-w-sm mx-auto">
                Welcome to CreatorZ. Redirecting to your dedicated brand dashboard...
              </p>
              <div className="pt-2">
                <Loader2 className="w-5 h-5 animate-spin text-[#7A1C28] mx-auto" />
              </div>
            </div>
          ) : (
            <form onSubmit={currentStep === 3 ? handleSubmit : handleNextStep} className="space-y-8">
              
              {/* ======================================================== */}
              {/* STEP 1: BRAND FUNDAMENTALS */}
              {/* ======================================================== */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-[#F0E8D8]">
                    <h2 className="text-xl font-bold font-heading text-[#181314]">
                      Step 1: Brand Fundamentals
                    </h2>
                    <p className="text-xs text-[#6C635B] mt-0.5">
                      Tell creators who you are and where your brand operates.
                    </p>
                  </div>

                  {/* Logo / Profile Picture Upload */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-2xl bg-[#7A1C28] text-white flex items-center justify-center font-bold text-2xl shadow-sm overflow-hidden border-2 border-white">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt="Brand Logo"
                            className="w-full h-full object-cover"
                          />
                        ) : companyName ? (
                          companyName.slice(0, 2).toUpperCase()
                        ) : (
                          <Building2 className="w-8 h-8 opacity-70" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        title="Upload Logo"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1 space-y-1.5 text-center sm:text-left">
                      <h3 className="text-xs font-bold text-[#181314]">Company Logo / Brand Badge</h3>
                      <p className="text-[11px] text-[#6C635B]">
                        Square PNG, JPG, or SVG. Displayed on brief cards and order rooms.
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploadingLogo}
                          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#D8CEBD] hover:bg-[#FAF3EB] text-xs font-bold text-[#181314] flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                        >
                          {isUploadingLogo ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>{avatar ? "Change Logo" : "Upload Logo"}</span>
                        </button>
                        {avatar && (
                          <button
                            type="button"
                            onClick={() => setAvatar("")}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#991B1B] hover:bg-[#FEE2E2] transition cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Representative Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#181314] flex items-center gap-1">
                        <span>Representative Full Name</span>
                        <span className="text-[#991B1B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={representativeName}
                        onChange={(e) => setRepresentativeName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF3EB] text-[#181314] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7A1C28]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#181314] flex items-center gap-1">
                        <span>Company / Brand Name</span>
                        <span className="text-[#991B1B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. BeastLife Nutrition"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF3EB] text-[#181314] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7A1C28]"
                      />
                    </div>
                  </div>

                  {/* Website & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#181314] flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-[#6C635B]" />
                        <span>Brand Website URL</span>
                      </label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://beastlife.in"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF3EB] text-[#181314] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7A1C28]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#181314] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#6C635B]" />
                        <span>Headquarters / City</span>
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Mumbai, Maharashtra"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF3EB] text-[#181314] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7A1C28]"
                      />
                    </div>
                  </div>

                  {/* Short Bio / Company Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#181314]">
                      Brand Bio & Product Focus
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Briefly describe what your brand sells, your mission, and the core consumer value proposition..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF3EB] text-[#181314] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7A1C28] resize-none"
                    />
                  </div>

                  {/* Social Handles */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold text-[#181314] font-mono uppercase tracking-wider">
                      Brand Social Presence
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="flex items-center bg-[#FAF3EB] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs">
                        <InstagramIcon className="w-4 h-4 text-[#82575c] mr-2 flex-shrink-0" />
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="@yourbrand"
                          className="bg-transparent border-none focus:outline-none w-full text-xs text-[#181314]"
                        />
                      </div>

                      <div className="flex items-center bg-[#FAF3EB] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs">
                        <YoutubeIcon className="w-4 h-4 text-[#82575c] mr-2 flex-shrink-0" />
                        <input
                          type="text"
                          value={youtube}
                          onChange={(e) => setYoutube(e.target.value)}
                          placeholder="youtube.com/@brand"
                          className="bg-transparent border-none focus:outline-none w-full text-xs text-[#181314]"
                        />
                      </div>

                      <div className="flex items-center bg-[#FAF3EB] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs">
                        <LinkedinIcon className="w-4 h-4 text-[#82575c] mr-2 flex-shrink-0" />
                        <input
                          type="text"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="linkedin.com/company/brand"
                          className="bg-transparent border-none focus:outline-none w-full text-xs text-[#181314]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* STEP 2: MAIN OBJECTIVES & DYNAMIC SUB-QUESTIONS (Collabstr) */}
              {/* ======================================================== */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="pb-4 border-b border-[#F0E8D8]">
                    <h2 className="text-xl font-bold font-heading text-[#181314]">
                      Step 2: What are you trying to do?
                    </h2>
                    <p className="text-xs text-[#6C635B] mt-0.5">
                      Select your primary campaign objective. We'll tailor creator pitches to this goal.
                    </p>
                  </div>

                  {/* Focus Selection Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* UGC */}
                    <button
                      type="button"
                      onClick={() => setObjective("UGC")}
                      className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 cursor-pointer ${
                        objective === "UGC"
                          ? "bg-[#FAF3EB] border-[#7A1C28] ring-2 ring-[#7A1C28]/20"
                          : "bg-white border-[#E8DEC8] hover:border-[#7A1C28]/40"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-[#181314]">UGC Ads</h3>
                          {objective === "UGC" && (
                            <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#6C635B] mt-1 leading-snug">
                          User Generated Content for Meta, TikTok & YouTube ad campaigns.
                        </p>
                      </div>
                    </button>

                    {/* Sponsored Posts */}
                    <button
                      type="button"
                      onClick={() => setObjective("Sponsored Posts")}
                      className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 cursor-pointer ${
                        objective === "Sponsored Posts"
                          ? "bg-[#FAF3EB] border-[#7A1C28] ring-2 ring-[#7A1C28]/20"
                          : "bg-white border-[#E8DEC8] hover:border-[#7A1C28]/40"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#9E7B35]/15 text-[#9E7B35] flex items-center justify-center">
                        <Megaphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-[#181314]">Sponsored Posts</h3>
                          {objective === "Sponsored Posts" && (
                            <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#6C635B] mt-1 leading-snug">
                          Dedicated shoutouts, product reviews, and creator feed placements.
                        </p>
                      </div>
                    </button>

                    {/* Affiliate / Commission */}
                    <button
                      type="button"
                      onClick={() => setObjective("Affiliate / Commission")}
                      className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 cursor-pointer ${
                        objective === "Affiliate / Commission"
                          ? "bg-[#FAF3EB] border-[#7A1C28] ring-2 ring-[#7A1C28]/20"
                          : "bg-white border-[#E8DEC8] hover:border-[#7A1C28]/40"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#166534]/15 text-[#166534] flex items-center justify-center">
                        <Percent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-[#181314]">Affiliate & Rev-Share</h3>
                          {objective === "Affiliate / Commission" && (
                            <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#6C635B] mt-1 leading-snug">
                          Performance-linked creator deals, tracked codes & commission payouts.
                        </p>
                      </div>
                    </button>

                    {/* Local & Events */}
                    <button
                      type="button"
                      onClick={() => setObjective("Local & Events")}
                      className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 cursor-pointer ${
                        objective === "Local & Events"
                          ? "bg-[#FAF3EB] border-[#7A1C28] ring-2 ring-[#7A1C28]/20"
                          : "bg-white border-[#E8DEC8] hover:border-[#7A1C28]/40"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-[#181314]">Local & Events</h3>
                          {objective === "Local & Events" && (
                            <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#6C635B] mt-1 leading-snug">
                          Store openings, pop-up events, and in-person creator appearances.
                        </p>
                      </div>
                    </button>

                    {/* Something Else */}
                    <button
                      type="button"
                      onClick={() => setObjective("Something Else")}
                      className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 cursor-pointer ${
                        objective === "Something Else"
                          ? "bg-[#FAF3EB] border-[#7A1C28] ring-2 ring-[#7A1C28]/20"
                          : "bg-white border-[#E8DEC8] hover:border-[#7A1C28]/40"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-[#181314]">Something Else</h3>
                          {objective === "Something Else" && (
                            <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#6C635B] mt-1 leading-snug">
                          Custom partnership structures, brand ambassadors, or hybrid models.
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* ======================================================== */}
                  {/* DYNAMIC FOLLOW-UPS BASED ON SELECTED OBJECTIVE */}
                  {/* ======================================================== */}

                  {/* 1. If UGC */}
                  {objective === "UGC" && (
                    <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-5 animate-in fade-in duration-200">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#181314] block">
                          Which platforms are the ads for? (Select all that apply)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Meta / Instagram",
                            "YouTube Shorts",
                            "TikTok",
                            "Google Display",
                            "LinkedIn Ads",
                            "Amazon DSP",
                          ].map((plat) => (
                            <button
                              key={plat}
                              type="button"
                              onClick={() => toggleArrayItem(setUgcPlatforms, ugcPlatforms, plat)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                                ugcPlatforms.includes(plat)
                                  ? "bg-[#7A1C28] text-white border-[#7A1C28] shadow-xs"
                                  : "bg-white text-[#181314] border-[#D8CEBD] hover:bg-[#FAF3EB]"
                              }`}
                            >
                              {plat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#181314] block">
                          What kind of content do you need?
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Video Reels (30-60s)",
                            "Product Showcase Photos",
                            "Raw B-Roll & Hooks",
                            "Customer Style Testimonials",
                            "Unboxing & ASMR",
                          ].map((kind) => (
                            <button
                              key={kind}
                              type="button"
                              onClick={() =>
                                toggleArrayItem(setUgcContentTypes, ugcContentTypes, kind)
                              }
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                                ugcContentTypes.includes(kind)
                                  ? "bg-[#7A1C28] text-white border-[#7A1C28] shadow-xs"
                                  : "bg-white text-[#181314] border-[#D8CEBD] hover:bg-[#FAF3EB]"
                              }`}
                            >
                              {kind}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. If Sponsored Posts */}
                  {objective === "Sponsored Posts" && (
                    <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-4 animate-in fade-in duration-200">
                      <label className="text-xs font-bold text-[#181314] block">
                        Preferred creator niche & industry tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Fitness & Nutrition",
                          "Tech & Gadgets",
                          "Beauty & Skincare",
                          "Fashion & Apparel",
                          "Food & Beverage",
                          "Travel & Lifestyle",
                          "Gaming & Esports",
                          "Business & Finance",
                        ].map((niche) => (
                          <button
                            key={niche}
                            type="button"
                            onClick={() =>
                              toggleArrayItem(setSponsoredNiches, sponsoredNiches, niche)
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                              sponsoredNiches.includes(niche)
                                ? "bg-[#7A1C28] text-white border-[#7A1C28] shadow-xs"
                                : "bg-white text-[#181314] border-[#D8CEBD] hover:bg-[#FAF3EB]"
                            }`}
                          >
                            {niche}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. If Affiliate / Commission (Explicitly requested by user) */}
                  {objective === "Affiliate / Commission" && (
                    <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-5 animate-in fade-in duration-200">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#181314] block">
                          Commission Structure & Model
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            "Percentage of Sale (10-25%)",
                            "Fixed Payout per Converted Order",
                            "Hybrid (Base Retainer + Rev-Share)",
                            "Free Gifting + 20% Net Commission",
                          ].map((model) => (
                            <button
                              key={model}
                              type="button"
                              onClick={() => setAffiliateModel(model)}
                              className={`p-3 rounded-xl text-xs font-medium border text-left transition cursor-pointer ${
                                affiliateModel === model
                                  ? "bg-[#7A1C28] text-white border-[#7A1C28]"
                                  : "bg-white text-[#181314] border-[#D8CEBD] hover:bg-[#FAF3EB]"
                              }`}
                            >
                              {model}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#181314] block">
                            Expected Payout / Commission Details
                          </label>
                          <input
                            type="text"
                            value={affiliatePayoutRange}
                            onChange={(e) => setAffiliatePayoutRange(e.target.value)}
                            placeholder="e.g. 15% on first order or ₹500 per lead"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-white text-[#181314] text-xs focus:outline-none focus:ring-2 focus:ring-[#7A1C28]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#181314] block">
                            Tracking Tool / Attribution Platform
                          </label>
                          <select
                            value={affiliateTracking}
                            onChange={(e) => setAffiliateTracking(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-white text-[#181314] text-xs focus:outline-none focus:ring-2 focus:ring-[#7A1C28]"
                          >
                            <option value="Shopify Collabs / Promo Codes">Shopify Collabs / Custom Promo Codes</option>
                            <option value="GoAffPro">GoAffPro</option>
                            <option value="Impact.com">Impact.com</option>
                            <option value="Refersion">Refersion</option>
                            <option value="Manual Creator Coupon Codes">Manual Creator Coupon Codes</option>
                            <option value="Other Attribution Engine">Other Attribution Engine</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. If Local & Events */}
                  {objective === "Local & Events" && (
                    <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-4 animate-in fade-in duration-200">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#181314] block">
                          Event Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Store Opening / Flagship Launch",
                            "Product Launch Party",
                            "Pop-up Booth / Exhibition",
                            "Creator VIP Dinner",
                          ].map((evt) => (
                            <button
                              key={evt}
                              type="button"
                              onClick={() => setLocalEventType(evt)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                                localEventType === evt
                                  ? "bg-[#7A1C28] text-white border-[#7A1C28]"
                                  : "bg-white text-[#181314] border-[#D8CEBD] hover:bg-[#FAF3EB]"
                              }`}
                            >
                              {evt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#181314] block">
                          Target Cities
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Mumbai",
                            "Bengaluru",
                            "Delhi NCR",
                            "Hyderabad",
                            "Pune",
                            "Chennai",
                            "Kolkata",
                            "Pan-India",
                          ].map((city) => (
                            <button
                              key={city}
                              type="button"
                              onClick={() => toggleArrayItem(setLocalCities, localCities, city)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                                localCities.includes(city)
                                  ? "bg-[#7A1C28] text-white border-[#7A1C28]"
                                  : "bg-white text-[#181314] border-[#D8CEBD] hover:bg-[#FAF3EB]"
                              }`}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. If Something Else */}
                  {objective === "Something Else" && (
                    <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2 animate-in fade-in duration-200">
                      <label className="text-xs font-bold text-[#181314] block">
                        Describe your collaboration vision or requirement
                      </label>
                      <textarea
                        rows={3}
                        value={customObjectiveDesc}
                        onChange={(e) => setCustomObjectiveDesc(e.target.value)}
                        placeholder="Tell us what you are aiming to achieve (e.g., long-term ambassador contracts, podcast sponsorships, talent casting)..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-white text-[#181314] text-xs focus:outline-none focus:ring-2 focus:ring-[#7A1C28] resize-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================== */}
              {/* STEP 3: COMPANY SPECS & VERIFICATION */}
              {/* ======================================================== */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-[#F0E8D8]">
                    <h2 className="text-xl font-bold font-heading text-[#181314]">
                      Step 3: Company Specs
                    </h2>
                    <p className="text-xs text-[#6C635B] mt-0.5">
                      Verify your brand organization details to qualify for CreatorZ Verified status.
                    </p>
                  </div>

                  {/* Business Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#181314] block">
                      Business Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        "D2C Brand",
                        "E-commerce Store",
                        "SaaS / Software",
                        "Marketing Agency",
                        "Physical Retail Chain",
                        "Consumer Services",
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setBusinessType(type)}
                          className={`p-3 rounded-xl text-xs font-medium border text-center transition cursor-pointer ${
                            businessType === type
                              ? "bg-[#7A1C28] text-white border-[#7A1C28] shadow-xs"
                              : "bg-[#FAF3EB] text-[#181314] border-[#E8DEC8] hover:bg-white"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Role in Company */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#181314] block">
                      Your Role in the Company
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "Founder / CEO",
                        "Growth Marketer",
                        "Influencer Lead",
                        "Creative Director",
                      ].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setRoleInCompany(role)}
                          className={`p-3 rounded-xl text-xs font-medium border text-center transition cursor-pointer ${
                            roleInCompany === role
                              ? "bg-[#7A1C28] text-white border-[#7A1C28] shadow-xs"
                              : "bg-[#FAF3EB] text-[#181314] border-[#E8DEC8] hover:bg-white"
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team Size */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#181314] block">
                      Team Size
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["1 - 10", "11 - 50", "51 - 200", "200+ Enterprise"].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setTeamSize(size)}
                          className={`p-3 rounded-xl text-xs font-medium border text-center transition cursor-pointer ${
                            teamSize === size
                              ? "bg-[#7A1C28] text-white border-[#7A1C28] shadow-xs"
                              : "bg-[#FAF3EB] text-[#181314] border-[#E8DEC8] hover:bg-white"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Creator Budget */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#181314] block">
                      Estimated Monthly Creator Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "Under ₹50,000",
                        "₹50k - ₹2,00,000",
                        "₹2L - ₹10,00,000",
                        "₹10,00,000+",
                      ].map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setMonthlyBudget(budget)}
                          className={`p-3 rounded-xl text-xs font-medium border text-center transition cursor-pointer ${
                            monthlyBudget === budget
                              ? "bg-[#166534] text-white border-[#166534] shadow-xs"
                              : "bg-[#FAF3EB] text-[#181314] border-[#E8DEC8] hover:bg-white"
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trust & Safe Collaboration Notice */}
                  <div className="p-4 rounded-2xl bg-[#EBF7EE] border border-[#C6E7CE] flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#166534] flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-[#166534] space-y-0.5">
                      <p className="font-bold">CreatorZ Milestone & Brief-First Guarantee</p>
                      <p className="text-[11px] text-[#166534]/80">
                        You will only be billed when you accept a creator’s video audition and fund a milestone. Submitting your brand profile grants you access to post open briefs immediately.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-6 border-t border-[#F0E8D8] flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white hover:bg-[#FAF3EB] text-[#181314] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: {currentStep === 1 ? "Objectives" : "Company Specs"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Profile...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Profile & Open Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
