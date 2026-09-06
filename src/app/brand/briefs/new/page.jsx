"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, ShieldCheck, Check, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti";

export default function BrandCreateBriefPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [title, setTitle] = useState("");
    const [budget, setBudget] = useState(30000);
    const [deliverable, setDeliverable] = useState("1x Dedicated Reel (30-45s) + 2x Stories");
    const [description, setDescription] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Save to creatorz_custom_briefs
        try {
            const currentBriefs = JSON.parse(localStorage.getItem("creatorz_custom_briefs") || "[]");
            const newBrief = {
                id: `brief-${Date.now()}`,
                title: title.trim(),
                budget: Number(budget),
                deliverablesRequired: deliverable.trim(),
                description: description.trim(),
                targetAudience: targetAudience.trim(),
                brandName: user?.company || user?.companyName || user?.name || "My Brand",
                brandEmail: user?.email || "",
                brandLogo: user?.avatar || user?.avatar_url || "",
                deadline: "Nov 30, 2026",
                applicantsCount: 0,
                category: user?.category || "D2C Brand",
                createdAt: new Date().toISOString(),
            };
            localStorage.setItem("creatorz_custom_briefs", JSON.stringify([newBrief, ...currentBriefs]));
        } catch (err) {
            console.error("Failed to save brief to localStorage", err);
        }

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#7A1C28", "#9E7B35", "#166534"]
        });
        setSubmitted(true);
        setTimeout(() => {
            router.push("/brand/dashboard");
        }, 1800);
    };
    return (<div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      
      <Link href="/brand/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C635B] hover:text-[#181314]">
        <ArrowLeft className="w-4 h-4"/>
        <span>Back to Brand Dashboard</span>
      </Link>

      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-10 shadow-sm">
        
        {submitted ? (<div className="text-center py-12 space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#166534] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-bold text-[#181314] font-heading">Open Brief Published!</h2>
            <p className="text-xs text-[#6C635B] max-w-sm mx-auto">
              Verified creators can now record and submit 30–60s video Pitch Reels into your Audition Deck.
            </p>
          </div>) : (<form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="pb-5 border-b border-[#F0E8D8]">
              <div className="flex items-center gap-2 text-xs font-mono mb-1 text-[#7A1C28] uppercase font-bold">
                <Briefcase className="w-3.5 h-3.5"/>
                <span>Brand Campaign Builder</span>
              </div>
              <h1 className="text-2xl font-bold text-[#181314] font-heading">
                Publish a Video Audition Brief
              </h1>
              <p className="text-xs text-[#6C635B] mt-1">
                Creators audition with video hooks and concepts. You only pay when you approve and hire.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#181314] mb-1">Campaign Title</label>
                <input type="text" placeholder="e.g. Rice Water & Niacinamide Serum Launch" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none focus:border-[#7A1C28]" required/>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#181314] mb-1">Allocated Budget (INR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 font-mono font-bold text-[#6C635B]">₹</span>
                    <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} min={5000} step={1000} className="w-full text-xs pl-7 pr-3 py-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] font-mono font-bold text-[#181314] focus:outline-none" required/>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#181314] mb-1">Deliverables Required</label>
                  <input type="text" value={deliverable} onChange={(e) => setDeliverable(e.target.value)} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none" required/>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#181314] mb-1">Creative Goals & Key Benefits</label>
                <textarea placeholder="Describe what makes your product unique and the key messaging to highlight in the video..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none" required/>
              </div>

              <div>
                <label className="block font-bold text-[#181314] mb-1">Target Audience</label>
                <input type="text" placeholder="e.g. Skincare enthusiasts & working professionals aged 20-35" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none" required/>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0E8D8] flex items-center justify-between">
              <span className="text-[11px] text-[#6C635B] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#166534]"/>
                Zero fees to publish. Payments are only confirmed when you hire.
              </span>

              <button type="submit" className="px-6 py-3 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-md transition transform active:scale-95">
                Publish & Open Auditions →
              </button>
            </div>

          </form>)}

      </div>

    </div>);
}
