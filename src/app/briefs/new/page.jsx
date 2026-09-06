"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, ShieldCheck, Check, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
export default function CreateBriefPage() {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [title, setTitle] = useState("");
    const [budget, setBudget] = useState(25000);
    const [deliverable, setDeliverable] = useState("1x Dedicated Instagram Reel (30-45s)");
    const [description, setDescription] = useState("");
    const [guidelines, setGuidelines] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#7A1C28", "#9E7B35", "#166534"]
        });
        setSubmitted(true);
        setTimeout(() => {
            router.push("/briefs");
        }, 2000);
    };
    return (<div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      
      <Link href="/briefs" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C635B] hover:text-[#181314]">
        <ArrowLeft className="w-4 h-4"/>
        <span>Back to Open Briefs</span>
      </Link>

      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-10 shadow-sm">
        
        {submitted ? (<div className="text-center py-12 space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#166534] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-bold text-[#181314] font-heading">Open Brief Published!</h2>
            <p className="text-xs text-[#6C635B] max-w-sm mx-auto">
              Creators in our verified network can now submit 30–60s video Pitch Reels directly into your Audition Deck.
            </p>
          </div>) : (<form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="pb-5 border-b border-[#F0E8D8]">
              <div className="flex items-center gap-2 text-xs font-mono mb-1 text-[#7A1C28] uppercase font-bold">
                <Briefcase className="w-3.5 h-3.5"/>
                <span>Campaign Brief Creator</span>
              </div>
              <h1 className="text-2xl font-bold text-[#181314] font-heading">
                Publish an Open Brief for Pitch Reels™
              </h1>
              <p className="text-xs text-[#6C635B] mt-1">
                Receive 30–60s video auditions from verified creators instead of reading text pitches.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-[#181314] mb-1">Campaign Title</label>
                <input type="text" placeholder="e.g. Summer D2C Whey Isolate Launch" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none focus:border-[#7A1C28]" required/>
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
                  <label className="block font-bold text-[#181314] mb-1">Deliverable Format</label>
                  <input type="text" value={deliverable} onChange={(e) => setDeliverable(e.target.value)} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none" required/>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#181314] mb-1">Campaign Description & Creative Goal</label>
                <textarea placeholder="Describe your product, core benefits, and what kind of creative energy you are looking for..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none" required/>
              </div>

              <div>
                <label className="block font-bold text-[#181314] mb-1">Target Audience Profile</label>
                <input type="text" placeholder="e.g. Gymgoers & college students aged 18-32 in Tier 1 & 2 cities" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none" required/>
              </div>

              <div>
                <label className="block font-bold text-[#181314] mb-1">Creative Guidelines & Do&apos;s / Don&apos;ts</label>
                <textarea placeholder="e.g. No fake beauty filters; demonstrate product solubility in cold water..." value={guidelines} onChange={(e) => setGuidelines(e.target.value)} rows={2} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none"/>
              </div>

            </div>

            <div className="pt-4 border-t border-[#F0E8D8] flex items-center justify-between">
              <span className="text-[11px] text-[#6C635B] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#166534]"/>
                Zero commitment until you shortlist and approve an offer.
              </span>

              <button type="submit" className="px-6 py-3 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-md transition transform active:scale-95">
                Publish Brief & Open Auditions →
              </button>
            </div>

          </form>)}

      </div>

    </div>);
}
