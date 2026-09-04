"use client";

import { useState } from "react";
import { StructuredOffer } from "@/lib/types";
import { ShieldCheck, Check, X, RefreshCw, Clock, FileText } from "lucide-react";
import confetti from "canvas-confetti";

interface StructuredOfferCardProps {
  offer: StructuredOffer;
  onAccept?: () => void;
  onCounter?: (newAmount: number) => void;
  onDecline?: () => void;
}

export default function StructuredOfferCard({
  offer,
  onAccept,
  onCounter,
  onDecline
}: StructuredOfferCardProps) {
  const [currentOffer, setCurrentOffer] = useState<StructuredOffer>(offer);
  const [showCounterModal, setShowCounterModal] = useState<boolean>(false);
  const [counterRate, setCounterRate] = useState<number>(offer.baseAmount + 5000);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleAccept = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#7A1C28", "#9E7B35", "#166534"]
    });
    setCurrentOffer({ ...currentOffer, status: "accepted" });
    setStatusMessage("Offer Accepted! Milestone Agreement Locked.");
    if (onAccept) onAccept();
  };

  const handleCounterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGst = Math.round(counterRate * 0.18);
    setCurrentOffer({
      ...currentOffer,
      baseAmount: counterRate,
      gstAmount: newGst,
      totalAmount: counterRate + newGst,
      status: "countered"
    });
    setShowCounterModal(false);
    setStatusMessage(`Counter Proposal of ₹${counterRate.toLocaleString()} submitted to brand.`);
    if (onCounter) onCounter(counterRate);
  };

  const handleDecline = () => {
    setCurrentOffer({ ...currentOffer, status: "declined" });
    setStatusMessage("Offer safely declined.");
    if (onDecline) onDecline();
  };

  return (
    <div className="bg-white border border-[#E8DEC8] rounded-2xl p-6 shadow-sm max-w-xl mx-auto">
      
      {/* Top Header & Status */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8] mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#7A1C28]"></div>
          <span className="text-xs font-bold uppercase tracking-wider font-mono text-[#181314]">
            Official Commercial Offer
          </span>
        </div>

        <span
          className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${
            currentOffer.status === "accepted"
              ? "bg-[#EBF7EE] text-[#166534] border-[#C6E7CE]"
              : currentOffer.status === "declined"
              ? "bg-rose-50 text-rose-700 border-rose-200"
              : currentOffer.status === "countered"
              ? "bg-amber-50 text-amber-800 border-amber-200"
              : "bg-[#FAF6EE] text-[#7A1C28] border-[#E8DEC8]"
          }`}
        >
          {currentOffer.status.toUpperCase()}
        </span>
      </div>

      {statusMessage && (
        <div className="mb-4 p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-semibold text-[#7A1C28] text-center">
          {statusMessage}
        </div>
      )}

      {/* Brand & Campaign Details */}
      <div className="space-y-4 text-xs mb-6">
        <div className="flex items-center gap-3">
          <img
            src={currentOffer.brandLogo}
            alt={currentOffer.brandName}
            className="w-10 h-10 rounded-lg object-cover border border-[#E8DEC8]"
          />
          <div>
            <h4 className="font-bold text-[#181314] text-sm">{currentOffer.campaignTitle}</h4>
            <p className="text-[11px] text-[#6C635B]">{currentOffer.brandName}</p>
          </div>
        </div>

        {/* Deliverables & Rate Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
            <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-semibold">
              Deliverables
            </span>
            <span className="font-bold text-[#181314] block mt-0.5">
              {currentOffer.deliverables}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
            <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-semibold">
              Total Deal Value (Incl. GST)
            </span>
            <span className="font-bold font-mono text-base text-[#7A1C28] block mt-0.5">
              ₹{currentOffer.totalAmount.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#6C635B]">
              (Base: ₹{currentOffer.baseAmount.toLocaleString()} + GST: ₹{currentOffer.gstAmount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Metadata Specs */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6C635B] px-1 font-mono">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#7A1C28]" />
            Deadline: {currentOffer.deadline}
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-[#7A1C28]" />
            {currentOffer.revisionsIncluded} Revision Included
          </span>
        </div>

        {/* Contractual Terms */}
        <div className="p-3.5 rounded-xl bg-[#FAF6EE]/70 border border-[#E8DEC8] space-y-1.5">
          <span className="text-[10px] font-mono uppercase font-bold text-[#181314] block">
            Binding Terms:
          </span>
          <ul className="space-y-1 text-[11px] text-[#6C635B]">
            {currentOffer.contractTerms.map((term, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#7A1C28] font-bold">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      {currentOffer.status === "pending" && (
        <div className="grid grid-cols-3 gap-3 pt-2">
          
          {/* ACCEPT & CONFIRM DEAL */}
          <button
            onClick={handleAccept}
            className="py-3 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition transform active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Accept Offer</span>
          </button>

          {/* COUNTER RATE */}
          <button
            onClick={() => setShowCounterModal(true)}
            className="py-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EAE0] border border-[#D8CEBD] text-[#181314] font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#7A1C28]" />
            <span>Counter Rate</span>
          </button>

          {/* DECLINE */}
          <button
            onClick={handleDecline}
            className="py-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <X className="w-3.5 h-3.5" />
            <span>Decline</span>
          </button>

        </div>
      )}

      {/* Counter Offer Modal */}
      {showCounterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E8DEC8]">
            <h3 className="text-sm font-bold text-[#181314] mb-3 font-heading">
              Propose Counter Commercial Rate
            </h3>
            
            <form onSubmit={handleCounterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6C635B] mb-1">
                  Proposed Base Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-mono font-bold text-[#6C635B]">₹</span>
                  <input
                    type="number"
                    value={counterRate}
                    onChange={(e) => setCounterRate(Number(e.target.value))}
                    min={1000}
                    step={1000}
                    className="w-full text-sm pl-7 pr-3 py-2 border border-[#E8DEC8] rounded-lg font-mono font-bold text-[#181314] focus:outline-none"
                    required
                  />
                </div>
                <span className="text-[11px] text-[#6C635B] mt-1 block">
                  Plus 18% GST: ₹{Math.round(counterRate * 0.18).toLocaleString()} (Total: ₹{Math.round(counterRate * 1.18).toLocaleString()})
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCounterModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#D8CEBD] text-xs font-semibold text-[#6C635B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#7A1C28] text-white text-xs font-bold hover:bg-[#63141E]"
                >
                  Submit Counter Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
