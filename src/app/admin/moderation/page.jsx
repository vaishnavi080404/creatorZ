"use client";

import { useState } from "react";
import { 
  Building2, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink,
  Search,
  DollarSign
} from "lucide-react";

export default function BrandModerationPage() {
  const [briefs, setBriefs] = useState([
    {
      id: "br-mod-1",
      brand: "BeastLife Nutrition",
      companyType: "D2C FMCG Enterprise",
      gstin: "27AAACB2212P1ZA (Verified)",
      briefTitle: "Iso-Whey Hydration Short-Form Blitz",
      budget: "₹1,80,000",
      escrowLocked: true,
      category: "Fitness & Beverages",
      deliverables: "3 Concept Reels + Whitelisting",
      status: "pending",
    },
    {
      id: "br-mod-2",
      brand: "Kalyan Organics",
      companyType: "Organic Retail & Wellness",
      gstin: "29BBBCB4412Q2ZB (Verified)",
      briefTitle: "Raw Honey Festive Unboxing Campaign",
      budget: "₹95,000",
      escrowLocked: true,
      category: "Food & Organic",
      deliverables: "2 Unboxing Demos",
      status: "pending",
    },
    {
      id: "br-mod-3",
      brand: "Apex Athletic Wear",
      companyType: "Apparel Private Ltd",
      gstin: "07CCCCB3312R3ZC (Under Review)",
      briefTitle: "Seamless Gym Leggings UGC Challenge",
      budget: "₹3,50,000",
      escrowLocked: false,
      category: "Fashion & Activewear",
      deliverables: "10 Micro-Creator Pitches",
      status: "escrow_unfunded",
    },
  ]);

  const [toast, setToast] = useState("");

  const handleAction = (id, newStatus, msg) => {
    setBriefs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    setToast(msg);
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
              Brand & Brief Moderation
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
              3 Under Review
            </span>
          </div>
          <p className="text-xs text-[#6C635B] mt-0.5">
            Enforce anti-scam guidelines, milestone escrow lock verification, and open brief editorial compliance.
          </p>
        </div>
      </div>

      {/* Briefs Table */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAF6EE] border-b border-[#E8DEC8] text-[11px] font-mono text-[#6C635B] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Brand Entity</th>
                <th className="px-6 py-4 font-bold">Brief Title & Scope</th>
                <th className="px-6 py-4 font-bold">Committed Budget</th>
                <th className="px-6 py-4 font-bold">Escrow Vault</th>
                <th className="px-6 py-4 font-bold">Moderation Status</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E8D8] font-mono">
              {briefs.map((b) => (
                <tr key={b.id} className="hover:bg-[#FAF6EE]/50 transition-colors">
                  
                  {/* Brand Entity */}
                  <td className="px-6 py-4 font-sans">
                    <div>
                      <span className="font-bold text-[#181314] block text-xs">{b.brand}</span>
                      <span className="text-[11px] text-[#6C635B] font-mono">{b.companyType}</span>
                      <span className="text-[10px] text-[#8C5D64] font-mono block mt-0.5">{b.gstin}</span>
                    </div>
                  </td>

                  {/* Brief Title & Scope */}
                  <td className="px-6 py-4 font-sans">
                    <span className="font-bold text-[#181314] block text-xs">{b.briefTitle}</span>
                    <span className="text-[11px] text-[#6C635B] font-mono">{b.deliverables}</span>
                  </td>

                  {/* Budget */}
                  <td className="px-6 py-4 font-bold text-[#181314] text-xs">
                    {b.budget}
                  </td>

                  {/* Escrow Status */}
                  <td className="px-6 py-4">
                    {b.escrowLocked ? (
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] text-[#166534] font-bold px-2.5 py-0.5 rounded-full bg-[#EBF7EE] border border-[#C6E7CE]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        100% Locked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] text-[#7A1C28] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#E8DEC8]">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Pending Deposit
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {b.status === "approved" ? (
                      <span className="text-[10px] uppercase font-bold text-[#166534] px-2.5 py-0.5 rounded-full bg-[#EBF7EE] border border-[#C6E7CE]">
                        Published ✓
                      </span>
                    ) : b.status === "escrow_unfunded" ? (
                      <span className="text-[10px] uppercase font-bold text-[#9E7B35] px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#DECDBE]">
                        Awaiting Escrow
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-[#7A1C28] px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#E8DEC8]">
                        Under Review
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    {b.status === "approved" ? (
                      <span className="text-[11px] text-[#6C635B] font-sans">Live on Feed</span>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleAction(b.id, "approved", `✓ Published Brief: "${b.briefTitle}"`)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAction(b.id, "flagged", `⚠ Flagged terms for ${b.brand}`)}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF6EE] border border-[#D8CEBD] text-[#7A1C28] text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Flag
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
