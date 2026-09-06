"use client";

import { useState } from "react";
import { 
  UserCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ExternalLink,
  Shield,
  Clock,
  Sparkles
} from "lucide-react";

export default function CreatorVerificationQueuePage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [creators, setCreators] = useState([
    {
      id: "cr-01",
      name: "Aanya Verma",
      handle: "@aanya_visuals",
      category: "Beauty & Cosmetics",
      tier: "Alpha",
      onTimeRate: 99,
      pitchesCount: 42,
      sampleReel: "https://creatorz.io/reels/aanya-demo",
      gstStatus: "Verified GSTIN",
      status: "pending",
      submittedDate: "Today, 11:20 AM",
    },
    {
      id: "cr-02",
      name: "Rohit Deshmukh",
      handle: "@rohit_edits",
      category: "Tech & Consumer Tech",
      tier: "Rising",
      onTimeRate: 96,
      pitchesCount: 19,
      sampleReel: "https://creatorz.io/reels/rohit-demo",
      gstStatus: "PAN Verified",
      status: "pending",
      submittedDate: "Today, 09:45 AM",
    },
    {
      id: "cr-03",
      name: "Sneha Kapoor",
      handle: "@sneha_fit",
      category: "Fitness & Nutrition",
      tier: "Alpha",
      onTimeRate: 98,
      pitchesCount: 64,
      sampleReel: "https://creatorz.io/reels/sneha-fit",
      gstStatus: "Verified GSTIN",
      status: "pending",
      submittedDate: "Yesterday",
    },
    {
      id: "cr-04",
      name: "Vikram Malhotra",
      handle: "@vikram_lens",
      category: "Travel & Hospitality",
      tier: "Rising",
      onTimeRate: 94,
      pitchesCount: 15,
      sampleReel: "https://creatorz.io/reels/vikram-lens",
      gstStatus: "PAN Verified",
      status: "approved",
      submittedDate: "04 Sep 2026",
    },
    {
      id: "cr-05",
      name: "Zoya Akhtar",
      handle: "@zoya_style",
      category: "Fashion & Luxury",
      tier: "Master",
      onTimeRate: 100,
      pitchesCount: 112,
      sampleReel: "https://creatorz.io/reels/zoya-style",
      gstStatus: "Verified GSTIN",
      status: "approved",
      submittedDate: "03 Sep 2026",
    },
  ]);

  const [toast, setToast] = useState("");

  const updateStatus = (id, newStatus, message) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    setToast(message);
    setTimeout(() => setToast(""), 4000);
  };

  const filtered = creators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.handle.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-white border border-[#E8DEC8] text-[#181314] text-xs font-mono shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-bold">{toast}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#181314] font-heading">
              Creator Verification Queue
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
              14 Pending
            </span>
          </div>
          <p className="text-xs text-[#6C635B] mt-0.5">
            Review identity proofs, tier elevation requests, and concept reel authenticity audits.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C5D64]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search creator, handle..."
              className="pl-9 pr-3 py-2 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-mono text-[#181314] placeholder:text-[#8C5D64]/60 focus:outline-none focus:border-[#7A1C28]"
            />
          </div>

          <div className="flex rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] p-0.5 text-xs font-mono">
            {["all", "pending", "approved"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer font-bold ${
                  filterStatus === st
                    ? "bg-[#7A1C28] text-white shadow-2xs"
                    : "text-[#6C635B] hover:text-[#181314]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Table */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAF6EE] border-b border-[#E8DEC8] text-[11px] font-mono text-[#6C635B] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Creator & Profile</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Track Record</th>
                <th className="px-6 py-4 font-bold">Requested Tier</th>
                <th className="px-6 py-4 font-bold">KYC / Tax ID</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Ops Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E8D8] font-mono">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF6EE]/50 transition-colors">
                  
                  {/* Creator info */}
                  <td className="px-6 py-4 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-[#7A1C28] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <span className="font-bold text-[#181314] block text-xs">{c.name}</span>
                        <span className="text-[11px] text-[#6C635B] font-mono">{c.handle}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-[#181314] font-sans text-xs">
                    {c.category}
                  </td>

                  {/* Track record */}
                  <td className="px-6 py-4">
                    <div className="text-[11px]">
                      <span className="text-[#166534] font-bold">{c.onTimeRate}% on-time</span>
                      <span className="text-[#6C635B] block text-[10px]">{c.pitchesCount} pitches verified</span>
                    </div>
                  </td>

                  {/* Tier requested */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7A1C28] px-2.5 py-0.5 rounded bg-[#FAF6EE] border border-[#E8DEC8]">
                      <Sparkles className="w-3 h-3 text-[#9E7B35]" />
                      {c.tier} Tier
                    </span>
                  </td>

                  {/* KYC status */}
                  <td className="px-6 py-4">
                    <span className="text-[11px] text-[#166534] font-semibold flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#166534]" />
                      {c.gstStatus}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    {c.status === "approved" ? (
                      <span className="text-[10px] font-mono font-bold text-[#166534] px-2.5 py-0.5 rounded-full bg-[#EBF7EE] border border-[#C6E7CE]">
                        Verified ✓
                      </span>
                    ) : c.status === "flagged" ? (
                      <span className="text-[10px] font-mono font-bold text-[#7A1C28] px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#E8DEC8]">
                        Flagged
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-[#9E7B35] px-2.5 py-0.5 rounded-full bg-[#FFFDF9] border border-[#DECDBE]">
                        Pending Review
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    {c.status === "approved" ? (
                      <span className="text-[11px] text-[#6C635B] font-sans">Active in catalog</span>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => updateStatus(c.id, "approved", `✓ Verified & elevated ${c.name}`)}
                          className="px-3 py-1.5 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white text-[11px] font-bold transition-colors cursor-pointer shadow-2xs"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStatus(c.id, "flagged", `⚠ Flagged KYC for ${c.name}`)}
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
