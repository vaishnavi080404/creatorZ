"use client";
import { use, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MOCK_OPEN_BRIEFS } from "@/lib/mockData";
import Link from "next/link";
import { Video, Upload, Check, ArrowLeft, Play, Pause } from "lucide-react";
import confetti from "canvas-confetti";
export default function CreatorApplyBriefPage({ params }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const brief = MOCK_OPEN_BRIEFS.find((b) => b.id === resolvedParams.id) || MOCK_OPEN_BRIEFS[0];
    const [proposedRate, setProposedRate] = useState(22000);
    const [deliveryDays, setDeliveryDays] = useState(3);
    const [hookText, setHookText] = useState("Stop drinking protein shakes that taste like chalk powder...");
    const [pitchSummary, setPitchSummary] = useState("I will shoot a fast-paced workplace vs. gym sketch comparing terrible clumpy protein vs. BeastLife instant dissolution in cold water.");
    const [submitted, setSubmitted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const togglePlay = () => {
        if (!videoRef.current)
            return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        }
        else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };
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
            router.push("/creator/dashboard");
        }, 2000);
    };
    return (<div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      
      <Link href="/creator/briefs" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C635B] hover:text-[#181314]">
        <ArrowLeft className="w-4 h-4"/>
        <span>Back to Open Briefs</span>
      </Link>

      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-10 shadow-sm">
        
        {submitted ? (<div className="text-center py-12 space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#166534] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-bold text-[#181314] font-heading">Pitch Reel Audition Submitted!</h2>
            <p className="text-xs text-[#6C635B] max-w-sm mx-auto">
              Your 42s video audition is now submitted to {brief.brandName}&apos;s Audition Deck. You will be notified when an offer is sent.
            </p>
          </div>) : (<form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0E8D8]">
              <div className="flex items-center gap-3.5">
                <img src={brief.brandLogo} alt={brief.brandName} className="w-12 h-12 rounded-xl object-cover border border-[#E8DEC8]"/>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#7A1C28]">
                    Auditioning for
                  </span>
                  <h1 className="text-lg sm:text-xl font-bold font-heading text-[#181314]">
                    {brief.title}
                  </h1>
                  <p className="text-xs text-[#6C635B]">{brief.brandName} • Budget: ₹{brief.budget.toLocaleString()}</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8] self-start sm:self-auto">
                Pitch Reels™ Audition
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Video Pitch Reel Box (5 Cols) */}
              <div className="lg:col-span-5 space-y-3">
                <label className="block text-xs font-bold text-[#181314] font-mono uppercase">
                  Your 30–60s Video Pitch (Pitch Reel)
                </label>
                
                <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden border-2 border-[#E8DEC8] shadow-md group">
                  <video ref={videoRef} src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41541-large.mp4" loop className="w-full h-full object-cover" onClick={togglePlay}/>

                  {/* Play/Pause indicator */}
                  <div onClick={togglePlay} className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#7A1C28] flex items-center justify-center shadow-lg">
                      {isPlaying ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5 fill-current ml-0.5"/>}
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-mono backdrop-blur-sm">
                    ✓ Pitch Video Attached (0:42s)
                  </div>
                </div>

                <div className="flex gap-2">
                  <button type="button" className="flex-1 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EAE0] border border-[#D8CEBD] text-[#181314] text-xs font-semibold flex items-center justify-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#7A1C28]"/>
                    <span>Upload File</span>
                  </button>
                  <button type="button" className="flex-1 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EAE0] border border-[#D8CEBD] text-[#181314] text-xs font-semibold flex items-center justify-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#7A1C28]"/>
                    <span>Record Video</span>
                  </button>
                </div>
              </div>

              {/* Rate & Proposal (7 Cols) */}
              <div className="lg:col-span-7 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#181314] mb-1">Proposed Commercial Rate (INR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-mono font-bold text-[#6C635B]">₹</span>
                      <input type="number" value={proposedRate} onChange={(e) => setProposedRate(Number(e.target.value))} min={1000} step={1000} className="w-full text-xs pl-7 pr-3 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] font-mono font-bold text-[#181314] focus:outline-none" required/>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#181314] mb-1">Turnaround Days</label>
                    <input type="number" value={deliveryDays} onChange={(e) => setDeliveryDays(Number(e.target.value))} min={1} max={14} className="w-full text-xs p-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] font-mono font-bold text-[#181314] focus:outline-none" required/>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#181314] mb-1">Your 3-Second Hook Angle</label>
                  <input type="text" value={hookText} onChange={(e) => setHookText(e.target.value)} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none" required/>
                </div>

                <div>
                  <label className="block font-bold text-[#181314] mb-1">Creative Execution Concept</label>
                  <textarea value={pitchSummary} onChange={(e) => setPitchSummary(e.target.value)} rows={4} className="w-full text-xs p-3 rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#181314] focus:outline-none" required/>
                </div>

                <div className="pt-4 border-t border-[#F0E8D8] flex justify-end">
                  <button type="submit" className="px-6 py-3 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-md transition transform active:scale-95">
                    Submit 42s Pitch Reel Audition →
                  </button>
                </div>
              </div>

            </div>

          </form>)}

      </div>

    </div>);
}
