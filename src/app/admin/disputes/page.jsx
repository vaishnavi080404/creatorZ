"use client";

import { useState } from "react";
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  DollarSign, 
  FileText, 
  ExternalLink,
  Scale
} from "lucide-react";

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState([
    {
      id: "DSP-4091",
      brand: "BeastLife Nutrition",
      creator: "Karan Johar (Creator)",
      campaign: "Pre-Workout 30s Reel",
      escrowAmount: "₹45,000",
      reason: "Brand requested 4th revision beyond agreed 2-revision SLA limit.",
      creatorClaim: "Delivered strictly adhering to approved creative brief outline.",
      openedDate: "05 Sep 2026",
      status: "active",
    },
    {
      id: "DSP-4092",
      brand: "GlowAura Skincare",
      creator: "Simran Kaur",
      campaign: "Anti-Aging Serum Night Routine",
      escrowAmount: "₹32,000",
      reason: "Brand alleges sound sync issue in second hook deliverable.",
      creatorClaim: "Offered re-export with synced audio track within 2 hours.",
      openedDate: "04 Sep 2026",
      status: "active",
    },
  ]);

  const [toast, setToast] = useState("");

  const handleResolve = (id, resolution) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "resolved", resolution } : d))
    );
    setToast(`Arbitration applied: ${resolution} for case ${id}`);
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-white border border-[#E8DEC8] text-[#181314] text-xs font-mono shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-bold">{toast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#181314] font-heading">
              Milestone Disputes & Escrow Arbitration
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
              2 Active Cases
            </span>
          </div>
          <p className="text-xs text-[#6C635B] mt-0.5">
            Impartial ops arbitration for contested milestone revisions, deliverable rejections, and escrow payouts.
          </p>
        </div>
      </div>

      {/* Disputes Cards List */}
      <div className="space-y-5">
        {disputes.map((d) => (
          <div
            key={d.id}
            className="p-6 rounded-3xl bg-white border border-[#E8DEC8] space-y-4 shadow-sm"
          >
            {/* Case Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0E8D8]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#7A1C28] bg-[#FAF6EE] px-2.5 py-1 rounded-md border border-[#E8DEC8]">
                  {d.id}
                </span>
                <span className="text-sm font-bold text-[#181314] font-heading">{d.campaign}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#6C635B]">Escrow Locked:</span>
                <span className="text-base font-bold font-mono text-[#166534]">{d.escrowAmount}</span>
              </div>
            </div>

            {/* Parties & Claims */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
                <span className="text-[10px] font-mono text-[#7A1C28] uppercase tracking-wider font-bold block mb-1">
                  Brand: {d.brand}
                </span>
                <p className="text-[#181314] leading-relaxed">{d.reason}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
                <span className="text-[10px] font-mono text-[#9E7B35] uppercase tracking-wider font-bold block mb-1">
                  Creator: {d.creator}
                </span>
                <p className="text-[#181314] leading-relaxed">{d.creatorClaim}</p>
              </div>
            </div>

            {/* Arbitration Action Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-[11px] font-mono text-[#6C635B]">
                Opened on {d.openedDate} • Case assigned to Ops Director
              </span>

              {d.status === "resolved" ? (
                <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7EE] border border-[#C6E7CE] text-[#166534] text-xs font-mono font-bold">
                  ✓ Resolved: {d.resolution}
                </span>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleResolve(d.id, "100% Released to Creator")}
                    className="px-4 py-2 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  >
                    Release to Creator (100%)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolve(d.id, "50/50 Split Release")}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF6EE] border border-[#D8CEBD] text-[#181314] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Split 50 / 50
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolve(d.id, "Full Refund to Brand")}
                    className="px-3 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EAE0] border border-[#E8DEC8] text-[#7A1C28] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Refund Brand
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
