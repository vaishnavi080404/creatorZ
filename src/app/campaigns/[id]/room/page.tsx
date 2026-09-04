"use client";

import { useState } from "react";
import { MOCK_ORDER_ROOM } from "@/lib/mockData";
import VideoReviewPlayer from "@/components/review/VideoReviewPlayer";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, AlertCircle, FileCheck, ArrowRight, Clock, Award } from "lucide-react";
import confetti from "canvas-confetti";

export default function OrderRoomPage() {
  const [order, setOrder] = useState(MOCK_ORDER_ROOM);
  const [showApprovedSuccess, setShowApprovedSuccess] = useState<boolean>(false);

  const handleFinalApproval = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#7A1C28", "#166534", "#D4AF37"]
    });

    const updatedMilestones = order.milestones.map((m) => {
      if (m.stage <= 6) return { ...m, status: "completed" as const };
      return m;
    });

    setOrder({
      ...order,
      currentMilestoneStage: 6,
      milestones: updatedMilestones
    });

    setShowApprovedSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Order Room Header */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7A1C28] uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-[#166534]" />
            <span>Milestone Campaign Order Room • Ref #{order.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#181314]">
            {order.campaignTitle}
          </h1>
          <div className="flex items-center gap-3 text-xs text-[#6C635B] mt-1">
            <span>Brand: <strong className="text-[#181314]">{order.brandName}</strong></span>
            <span>•</span>
            <span>Creator: <Link href={`/creators/${order.creatorUsername}`} className="text-[#7A1C28] font-bold hover:underline">@{order.creatorUsername}</Link></span>
          </div>
        </div>

        {/* Agreed Budget Badge */}
        <div className="bg-[#FAF6EE] border border-[#E8DEC8] rounded-2xl p-5 text-right flex-shrink-0">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-bold">Total Agreed Budget</span>
          <span className="text-2xl font-bold font-mono text-[#7A1C28] block mt-0.5">
            ₹{order.contractTotal.toLocaleString()} INR
          </span>
          <span className="text-[10px] text-[#166534] font-semibold flex items-center justify-end gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3" />
            100% Direct Milestone Contract
          </span>
        </div>
      </div>

      {showApprovedSuccess && (
        <div className="bg-[#EBF7EE] border-2 border-[#16A34A] rounded-2xl p-6 shadow-md text-[#166534] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Campaign Successfully Approved & Finalized!</h3>
              <p className="text-xs text-[#166534]/90">
                ₹{order.contractTotal.toLocaleString()} disbursed to {order.creatorName}. The deliverable has automatically been written to Alex&apos;s verified Portfolio-From-Delivery page.
              </p>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Link
              href={`/creators/${order.creatorUsername}`}
              className="text-xs font-bold px-4 py-2 rounded-lg bg-[#166534] text-white hover:bg-[#14532D]"
            >
              View Updated Creator Portfolio →
            </Link>
          </div>
        </div>
      )}

      {/* 6-STAGE MILESTONE TRACKER BAR */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
          <div>
            <h2 className="text-base font-bold text-[#181314] font-heading">
              6-Stage Milestone Progress Lifecycle
            </h2>
            <p className="text-xs text-[#6C635B] mt-0.5">
              Milestones are reviewed and signed off sequentially upon verifiable approvals.
            </p>
          </div>

          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
            Stage {order.currentMilestoneStage} of 6 Active
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="relative">
          <div className="w-full bg-[#FAF6EE] h-2 rounded-full overflow-hidden border border-[#E8DEC8]">
            <div
              className="bg-[#7A1C28] h-full rounded-full transition-all duration-700"
              style={{ width: `${(order.currentMilestoneStage / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 6 Milestone Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {order.milestones.map((m) => (
            <div
              key={m.stage}
              className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                m.status === "completed"
                  ? "bg-[#EBF7EE] border-[#C6E7CE] text-[#166534]"
                  : m.status === "active"
                  ? "bg-[#FAF6EE] border-[#7A1C28] text-[#181314] shadow-sm"
                  : "bg-white border-[#E8DEC8] text-[#6C635B] opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold">Stage {m.stage}</span>
                {m.status === "completed" && <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]" />}
                {m.status === "active" && <span className="w-2 h-2 rounded-full bg-[#7A1C28] animate-pulse"></span>}
              </div>

              <h4 className="font-bold text-xs leading-tight">{m.name}</h4>
              <p className="text-[10px] line-clamp-2 leading-relaxed opacity-90">{m.description}</p>
            </div>
          ))}
        </div>

      </div>

      {/* IN-PLATFORM VIDEO REVIEW STUDIO COMPONENT */}
      <VideoReviewPlayer
        drafts={order.drafts}
        campaignTitle={order.campaignTitle}
        onApproveFinal={handleFinalApproval}
      />

      {/* FAIR TIERED CANCELLATION MATRIX POLICY */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#7A1C28]" />
          <h3 className="text-sm font-bold font-heading text-[#181314]">
            Fair Tiered Cancellation & Refund Policy
          </h3>
        </div>
        <p className="text-xs text-[#6C635B]">
          CreatorZ contractual milestones protect both parties against ghosting and unauthorized scope abandonment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
          <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
            <span className="text-[10px] text-[#6C635B] block">Before Work Starts</span>
            <span className="font-bold text-[#166534] block mt-1">100% Brand Refund</span>
            <span className="text-[10px] text-[#6C635B]">0% Creator Payout</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
            <span className="text-[10px] text-[#6C635B] block">Script/Concept Approved</span>
            <span className="font-bold text-[#181314] block mt-1">75% Brand Refund</span>
            <span className="text-[10px] text-[#7A1C28]">25% Creator Payout</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
            <span className="text-[10px] text-[#6C635B] block">Active Video Production</span>
            <span className="font-bold text-[#181314] block mt-1">50% Brand Refund</span>
            <span className="text-[10px] text-[#7A1C28]">50% Creator Payout</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]">
            <span className="text-[10px] text-[#6C635B] block">Final Video Approved</span>
            <span className="font-bold text-[#6C635B] block mt-1">0% Brand Refund</span>
            <span className="text-[10px] text-[#166534] font-bold">100% Creator Payout</span>
          </div>
        </div>
      </div>

    </div>
  );
}
