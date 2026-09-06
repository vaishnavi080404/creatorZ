"use client";
import { useState, useEffect, useRef } from "react";
import { Check, X, Play, Pause, Volume2, VolumeX, ShieldCheck, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";
export default function AuditionDeck({ pitchReels, campaignTitle }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [shortlisted, setShortlisted] = useState([]);
    const [passed, setPassed] = useState([]);
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [selectedForOffer, setSelectedForOffer] = useState(null);
    const [offerSuccess, setOfferSuccess] = useState(false);
    const videoRef = useRef(null);
    const currentPitch = pitchReels[currentIndex];
    const isFinished = currentIndex >= pitchReels.length;
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showOfferModal || isFinished)
                return;
            if (e.key === "ArrowLeft")
                handlePass();
            if (e.key === "ArrowRight")
                handleShortlist();
            if (e.key === " ") {
                e.preventDefault();
                togglePlay();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, isPlaying, showOfferModal, isFinished]);
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
    const toggleMute = () => {
        if (!videoRef.current)
            return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };
    const handlePass = () => {
        if (!currentPitch)
            return;
        setPassed([...passed, currentPitch]);
        setCurrentIndex((prev) => prev + 1);
    };
    const handleShortlist = () => {
        if (!currentPitch)
            return;
        setShortlisted([...shortlisted, currentPitch]);
        setSelectedForOffer(currentPitch);
        setShowOfferModal(true);
    };
    const handleSendOffer = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#7A1C28", "#9E7B35", "#166534"]
        });
        setOfferSuccess(true);
        setTimeout(() => {
            setOfferSuccess(false);
            setShowOfferModal(false);
            setCurrentIndex((prev) => prev + 1);
        }, 1800);
    };
    if (isFinished) {
        return (<div className="bg-white border border-[#E8DEC8] rounded-2xl p-12 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#166534] flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8"/>
        </div>
        <h2 className="text-xl font-bold text-[#181314] font-heading">All Video Auditions Reviewed!</h2>
        <p className="text-xs text-[#6C635B] mt-2 max-w-md mx-auto">
          You have reviewed all {pitchReels.length} Pitch Reels for &quot;{campaignTitle}&quot;.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto my-6 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
            <span className="text-gray-500 block text-[10px]">Shortlisted</span>
            <span className="text-lg font-bold text-[#166534]">{shortlisted.length}</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
            <span className="text-gray-500 block text-[10px]">Passed</span>
            <span className="text-lg font-bold text-[#6C635B]">{passed.length}</span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button onClick={() => {
                setCurrentIndex(0);
                setShortlisted([]);
                setPassed([]);
            }} className="text-xs font-semibold px-5 py-2.5 rounded-full border border-[#D8CEBD] text-[#181314] hover:bg-[#F2EAE0]">
            Review Again
          </button>
          <Link href="/messages" className="text-xs font-bold px-5 py-2.5 rounded-full bg-[#7A1C28] text-white hover:bg-[#63141E] shadow-sm">
            Go to In-Chat Offers →
          </Link>
        </div>
      </div>);
    }
    return (<div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Deck Header */}
      <div className="flex items-center justify-between bg-white border border-[#E8DEC8] rounded-xl px-5 py-3.5 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono uppercase text-[#7A1C28]">
              Pitch Reels™ Audition Deck
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAF6EE] text-[#6C635B] font-mono border border-[#E8DEC8]">
              Candidate {currentIndex + 1} of {pitchReels.length}
            </span>
          </div>
          <p className="text-xs text-[#6C635B] mt-0.5 font-medium">
            Reviewing video pitches for: <span className="text-[#181314] font-bold">{campaignTitle}</span>
          </p>
        </div>

        {/* Keyboard shortcut hints */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-[#6C635B]">
          <span className="px-2 py-1 rounded bg-[#FAF6EE] border border-[#E8DEC8]">← Pass</span>
          <span className="px-2 py-1 rounded bg-[#FAF6EE] border border-[#E8DEC8]">Space (Play)</span>
          <span className="px-2 py-1 rounded bg-[#7A1C28] text-white font-bold">→ Shortlist</span>
        </div>
      </div>

      {/* Main 2-Column Audition Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: 9:16 VERTICAL VIDEO PITCH PLAYER (5 Cols) */}
        <div className="lg:col-span-5 bg-black rounded-2xl overflow-hidden relative aspect-[9/16] shadow-2xl border border-[#E8DEC8] group">
          <video ref={videoRef} src={currentPitch.videoUrl} autoPlay loop muted={isMuted} className="w-full h-full object-cover"/>

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-4 pointer-events-none">
            
            {/* Top Video Header */}
            <div className="flex items-center justify-between pointer-events-auto">
              <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-mono backdrop-blur-md border border-white/20">
                0:{currentPitch.videoDurationSec}s Video Pitch
              </span>

              <button onClick={toggleMute} className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-black/80 transition">
                {isMuted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
              </button>
            </div>

            {/* Bottom Hook Callout on Video */}
            <div className="space-y-2 pointer-events-auto">
              <div className="p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
                  Proposed 3s Hook Angle:
                </span>
                <p className="text-xs font-semibold leading-snug mt-0.5">
                  &quot;{currentPitch.hookText}&quot;
                </p>
              </div>

              {/* Central Play/Pause button trigger */}
              <div className="flex items-center justify-between pt-1">
                <button onClick={togglePlay} className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-mono backdrop-blur-md flex items-center gap-1.5 transition">
                  {isPlaying ? <Pause className="w-3.5 h-3.5"/> : <Play className="w-3.5 h-3.5 fill-current"/>}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>
                <span className="text-[11px] font-mono text-white/70">
                  {currentPitch.submittedAt}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: CREATOR COMMERCIAL DOSSIER & ACTIONS (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E8DEC8] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full space-y-6">
          
          <div className="space-y-6">
            
            {/* Creator Identity & Tier */}
            <div className="flex items-start justify-between pb-5 border-b border-[#F0E8D8]">
              <div className="flex items-center gap-4">
                <img src={currentPitch.creatorAvatar} alt={currentPitch.creatorName} className="w-14 h-14 rounded-xl object-cover border border-[#E8DEC8]"/>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#181314] font-heading">{currentPitch.creatorName}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
                      {currentPitch.creatorTier.toUpperCase()} TIER ({currentPitch.creatorScore})
                    </span>
                  </div>
                  <p className="text-xs text-[#6C635B] mt-0.5">@{currentPitch.creatorUsername} • {currentPitch.creatorCategory}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-semibold">Proposed Rate</span>
                <span className="text-xl font-bold font-mono text-[#7A1C28]">
                  ₹{currentPitch.proposedRate.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#6C635B] block">Turnaround: {currentPitch.deliveryDays} Days</span>
              </div>
            </div>

            {/* Performance Stats Matrix */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
                <span className="text-[10px] font-mono uppercase text-[#6C635B] block">Total Reach</span>
                <span className="text-sm font-bold font-mono text-[#181314]">
                  {currentPitch.creatorReach.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
                <span className="text-[10px] font-mono uppercase text-[#6C635B] block">Avg. 30D Views</span>
                <span className="text-sm font-bold font-mono text-[#181314]">
                  {currentPitch.creatorAvgViews.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
                <span className="text-[10px] font-mono uppercase text-[#6C635B] block">Engagement</span>
                <span className="text-sm font-bold font-mono text-[#166534]">
                  {currentPitch.creatorEngagement}%
                </span>
              </div>
            </div>

            {/* Written Pitch Concept Summary */}
            <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#181314] mb-1.5">
                <Sparkles className="w-4 h-4 text-[#7A1C28]"/>
                <span>Concept Execution Plan</span>
              </div>
              <p className="text-xs text-[#6C635B] leading-relaxed">
                {currentPitch.pitchSummary}
              </p>
            </div>

          </div>

          {/* SWIPE DECISION BUTTONS */}
          <div className="pt-6 border-t border-[#F0E8D8] grid grid-cols-2 gap-4">
            
            {/* PASS BUTTON (Swipe Left) */}
            <button onClick={handlePass} className="py-3.5 rounded-xl border border-[#D8CEBD] bg-[#FAF6EE] hover:bg-[#F2EAE0] text-[#181314] font-bold text-xs flex items-center justify-center gap-2 transition transform active:scale-95 shadow-sm">
              <X className="w-4 h-4 text-rose-600"/>
              <span>Pass (Swipe Left)</span>
            </button>

            {/* SHORTLIST & SEND OFFER (Swipe Right) */}
            <button onClick={handleShortlist} className="py-3.5 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs flex items-center justify-center gap-2 transition transform active:scale-95 shadow-md">
              <Check className="w-4 h-4 text-emerald-400"/>
              <span>Shortlist & Send Offer (Right)</span>
            </button>

          </div>

        </div>

      </div>

      {/* STRUCTURED OFFER POPUP MODAL */}
      {showOfferModal && selectedForOffer && (<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E8DEC8]">
            
            {offerSuccess ? (<div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#166534] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8"/>
                </div>
                <h3 className="text-lg font-bold text-[#181314]">Offer Dispatched to {selectedForOffer.creatorName}!</h3>
                <p className="text-xs text-[#6C635B]">
                  Milestone agreement terms will be locked once {selectedForOffer.creatorName} accepts.
                </p>
              </div>) : (<div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8DEC8] mb-4">
                  <h3 className="text-sm font-bold text-[#181314] font-heading">
                    Send Official Structured Offer
                  </h3>
                  <button onClick={() => setShowOfferModal(false)} className="w-7 h-7 rounded-full bg-[#FAF6EE] text-[#181314] font-bold text-xs flex items-center justify-center hover:bg-[#F2EAE0]">
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
                    <img src={selectedForOffer.creatorAvatar} alt={selectedForOffer.creatorName} className="w-10 h-10 rounded-lg object-cover"/>
                    <div>
                      <p className="font-bold text-[#181314]">{selectedForOffer.creatorName}</p>
                      <p className="text-[11px] text-[#6C635B]">Proposed Turnaround: {selectedForOffer.deliveryDays} Days</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-[#E8DEC8]">
                      <span className="text-[10px] font-mono text-[#6C635B] block">Deliverable</span>
                      <span className="font-bold text-[#181314]">1x Dedicated Reel</span>
                    </div>
                    <div className="p-3 rounded-xl border border-[#E8DEC8]">
                      <span className="text-[10px] font-mono text-[#6C635B] block">Total with 18% GST</span>
                      <span className="font-bold font-mono text-[#7A1C28]">
                        ₹{Math.round(selectedForOffer.proposedRate * 1.18).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EBF7EE] border border-[#C6E7CE] text-[#166534] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0"/>
                    <span>Contractual milestone guarantees ensure full refund if draft is rejected before production.</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setShowOfferModal(false)} className="py-2.5 rounded-lg border border-[#D8CEBD] text-[#181314] font-semibold text-xs hover:bg-[#FAF6EE]">
                    Cancel
                  </button>
                  <button onClick={handleSendOffer} className="py-2.5 rounded-lg bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                    <Send className="w-3.5 h-3.5"/>
                    <span>Confirm & Send Offer</span>
                  </button>
                </div>
              </div>)}

          </div>
        </div>)}

    </div>);
}
