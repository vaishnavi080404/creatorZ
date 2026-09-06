"use client";
import { useState } from "react";
import { MOCK_ORDER_ROOM } from "@/lib/mockData";
import VideoReviewPlayer from "@/components/review/VideoReviewPlayer";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowLeft, Award } from "lucide-react";
import confetti from "canvas-confetti";
export default function BrandOrderRoomPage() {
    const [order, setOrder] = useState(MOCK_ORDER_ROOM);
    const [showApprovedSuccess, setShowApprovedSuccess] = useState(false);
    const handleFinalApproval = () => {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
            colors: ["#7A1C28", "#166534", "#D4AF37"]
        });
        const updatedMilestones = order.milestones.map((m) => {
            if (m.stage <= 6)
                return Object.assign(Object.assign({}, m), { status: "completed" });
            return m;
        });
        setOrder(Object.assign(Object.assign({}, order), { currentMilestoneStage: 6, milestones: updatedMilestones }));
        setShowApprovedSuccess(true);
    };
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <Link href="/brand/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C635B] hover:text-[#181314]">
        <ArrowLeft className="w-4 h-4"/>
        <span>Back to Brand Dashboard</span>
      </Link>

      {/* Top Header */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7A1C28] uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-[#166534]"/>
            <span>Campaign Order Room • Ref #{order.id}</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-[#181314]">
            {order.campaignTitle}
          </h1>
          <p className="text-xs text-[#6C635B] mt-1">
            Creator: <strong className="text-[#181314]">{order.creatorName}</strong> (@{order.creatorUsername})
          </p>
        </div>

        <div className="bg-[#FAF6EE] border border-[#E8DEC8] rounded-2xl p-5 text-right flex-shrink-0">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] block font-bold">Total Agreed Budget</span>
          <span className="text-2xl font-bold font-mono text-[#7A1C28] block mt-0.5">
            ₹{order.contractTotal.toLocaleString()} INR
          </span>
          <span className="text-[10px] text-[#166534] font-semibold flex items-center justify-end gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3"/>
            Direct Milestone Contract
          </span>
        </div>
      </div>

      {showApprovedSuccess && (<div className="bg-[#EBF7EE] border-2 border-[#16A34A] rounded-2xl p-6 shadow-md text-[#166534] space-y-2">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#16A34A]"/>
            <div>
              <h3 className="text-base font-bold">Final Video Approved & Payout Disbursed!</h3>
              <p className="text-xs text-[#166534]/90">
                ₹{order.contractTotal.toLocaleString()} transferred to {order.creatorName}. Deliverable auto-recorded to creator portfolio.
              </p>
            </div>
          </div>
        </div>)}

      {/* 6-Stage Progress Nodes */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
          <h2 className="text-base font-bold text-[#181314] font-heading">
            Milestone Progress Lifecycle
          </h2>
          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
            Stage {order.currentMilestoneStage} of 6
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {order.milestones.map((m) => (<div key={m.stage} className={`p-3.5 rounded-xl border text-xs space-y-1 ${m.status === "completed"
                ? "bg-[#EBF7EE] border-[#C6E7CE] text-[#166534]"
                : m.status === "active"
                    ? "bg-[#FAF6EE] border-[#7A1C28] text-[#181314] shadow-sm"
                    : "bg-white border-[#E8DEC8] text-[#6C635B] opacity-60"}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold">Stage {m.stage}</span>
                {m.status === "completed" && <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]"/>}
              </div>
              <h4 className="font-bold text-xs leading-tight">{m.name}</h4>
            </div>))}
        </div>
      </div>

      {/* Video Review Studio */}
      <VideoReviewPlayer drafts={order.drafts} campaignTitle={order.campaignTitle} onApproveFinal={handleFinalApproval}/>

    </div>);
}
