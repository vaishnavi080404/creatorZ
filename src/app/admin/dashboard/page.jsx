"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  UserCheck,
  Building2,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  ExternalLink
} from "lucide-react";

export default function AdminDashboardPage() {
  const [pendingVerificationsCount, setPendingVerificationsCount] = useState(0);

  useEffect(() => {
    fetch("/api/admin/verifications")
      .then((res) => res.json())
      .then((data) => {
        const pendingBrands = (data.brands || []).filter((b) => b.status === "pending").length;
        const pendingCr = (data.creators || []).filter((c) => c.status === "pending").length;
        setPendingVerificationsCount(pendingBrands + pendingCr);
      })
      .catch(() => {});
  }, []);

  const [creators, setCreators] = useState([
    {
      id: "cr-101",
      name: "Aanya Verma",
      handle: "@aanya_visuals",
      category: "D2C Cosmetics & Beauty",
      tierRequested: "Alpha Tier",
      submittedAt: "12m ago",
      onTimeRate: "100%",
      status: "pending",
    },
    {
      id: "cr-102",
      name: "Rohit Deshmukh",
      handle: "@rohit_edits",
      category: "Tech & Audio Gear",
      tierRequested: "Rising Tier",
      submittedAt: "45m ago",
      onTimeRate: "96%",
      status: "pending",
    },
    {
      id: "cr-103",
      name: "Sneha Kapoor",
      handle: "@sneha_fit",
      category: "Wellness & Nutrition",
      tierRequested: "Alpha Tier",
      submittedAt: "2h ago",
      onTimeRate: "98%",
      status: "pending",
    },
  ]);

  const [briefs, setBriefs] = useState([
    {
      id: "brf-201",
      brand: "BeastLife Nutrition",
      title: "Iso-Whey Hydration Short-Form Blitz",
      budget: "₹1,80,000",
      escrowFunded: true,
      status: "review",
    },
    {
      id: "brf-202",
      brand: "Kalyan Organics",
      title: "Raw Honey Festive Unboxing Campaign",
      budget: "₹95,000",
      escrowFunded: true,
      status: "review",
    },
  ]);

  const [actionNotice, setActionNotice] = useState("");

  const handleApproveCreator = (id, name) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c))
    );
    setActionNotice(`✓ Approved ${name} to requested Tier.`);
    setTimeout(() => setActionNotice(""), 4000);
  };

  const handleRejectCreator = (id, name) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "rejected" } : c))
    );
    setActionNotice(`⚠ Requested KYC re-audit for ${name}.`);
    setTimeout(() => setActionNotice(""), 4000);
  };

  const handleApproveBrief = (id, title) => {
    setBriefs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "published" } : b))
    );
    setActionNotice(`✓ Published Brief: "${title}" to marketplace.`);
    setTimeout(() => setActionNotice(""), 4000);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-white border border-[#E8DEC8] text-[#181314] text-xs font-mono shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-bold">{actionNotice}</span>
        </div>
      )}

      {/* Top Operations Header Banner */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#181314] font-heading">
              Operations & Trust Overview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EBF7EE] text-[#166534] border border-[#C6E7CE]">
              ● LIVE CONSOLE
            </span>
          </div>
          <p className="text-xs text-[#6C635B] mt-0.5">
            Real-time platform health, escrow arbitration, brand brief moderation, and creator credential verification.
          </p>
        </div>

        <Link
          href="/admin/verification"
          className="px-5 py-3 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white text-xs font-bold shadow-md transition flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <UserCheck className="w-4 h-4" />
          <span>Open Verification Queue ({pendingVerificationsCount})</span>
        </Link>
      </div>

      {/* Core KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Escrow Volume */}
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">
            Gross Locked Escrow
          </span>
          <span className="text-2xl font-bold font-mono text-[#181314] block mt-1">
            ₹48,20,000
          </span>
          <span className="text-[11px] text-[#166534] font-semibold mt-0.5 block">
            +18.4% from last week
          </span>
        </div>

        {/* Metric 2: Pending Creator KYC */}
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">
            Pending Compliance
          </span>
          <span className="text-2xl font-bold font-mono text-[#7A1C28] block mt-1">
            {pendingVerificationsCount} Requests
          </span>
          <Link href="/admin/verification" className="text-[11px] text-[#7A1C28] font-bold hover:underline block mt-0.5">
            Launch Review Deck →
          </Link>
        </div>

        {/* Metric 3: Brand Moderation */}
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">
            Open Briefs in Review
          </span>
          <span className="text-2xl font-bold font-mono text-[#9E7B35] block mt-1">
            8 Briefs
          </span>
          <span className="text-[10px] text-[#6C635B] block mt-0.5">
            100% Escrow pre-funded
          </span>
        </div>

        {/* Metric 4: Active Disputes */}
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">
            Active Disputes
          </span>
          <span className="text-2xl font-bold font-mono text-[#7A1C28] block mt-1">
            2 Active
          </span>
          <Link href="/admin/disputes" className="text-[11px] text-[#7A1C28] font-bold hover:underline block mt-0.5">
            Arbitrate Dispute →
          </Link>
        </div>

      </div>

      {/* Main Operations Grid: Verification Queue + Moderation Snapshots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Creator Verification Priority Queue */}
        <div className="lg:col-span-7 bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
            <div>
              <h2 className="text-base font-bold font-heading text-[#181314]">
                Creator Tier & KYC Queue (Top Priority)
              </h2>
              <p className="text-xs text-[#6C635B]">Review candidate pitch reels, verify identity, and elevate tiers</p>
            </div>
            <Link
              href="/admin/verification"
              className="text-xs font-bold text-[#7A1C28] hover:underline flex items-center gap-1 font-mono"
            >
              <span>View all 14</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {creators.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#7A1C28] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#181314]">{c.name}</span>
                      <span className="text-[10px] font-mono text-[#6C635B]">{c.handle}</span>
                    </div>
                    <p className="text-[11px] text-[#6C635B] mt-0.5">{c.category}</p>
                    <div className="flex items-center gap-2 mt-1 font-mono text-[10px]">
                      <span className="text-[#7A1C28] font-bold">{c.tierRequested}</span>
                      <span className="text-[#D8CEBD]">•</span>
                      <span className="text-[#166534] font-semibold">On-Time: {c.onTimeRate}</span>
                      <span className="text-[#D8CEBD]">•</span>
                      <span className="text-[#6C635B]">{c.submittedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {c.status === "approved" ? (
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold bg-[#EBF7EE] text-[#166534] border border-[#C6E7CE]">
                      ✓ Tier Elevated
                    </span>
                  ) : c.status === "rejected" ? (
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
                      Re-audit Sent
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleApproveCreator(c.id, c.name)}
                        className="px-4 py-2 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-xs transition flex items-center justify-center cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRejectCreator(c.id, c.name)}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-[#F2EAE0] border border-[#D8CEBD] text-[#181314] text-xs font-bold transition flex items-center justify-center cursor-pointer"
                      >
                        Re-audit
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Brand Brief Moderation & Live Escrow Monitor */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Brand Open Briefs Card */}
          <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
              <div>
                <h2 className="text-base font-bold font-heading text-[#181314]">
                  Open Briefs Moderation
                </h2>
                <p className="text-xs text-[#6C635B]">Verify budget escrow & content compliance</p>
              </div>
              <Link
                href="/admin/moderation"
                className="text-xs font-bold text-[#7A1C28] hover:underline flex items-center gap-1 font-mono"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {briefs.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#6C635B] font-bold">{b.brand}</span>
                    <span className="text-xs font-mono font-bold bg-white text-[#7A1C28] px-2 py-0.5 rounded border border-[#E8DEC8]">
                      {b.budget}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#181314] line-clamp-1">{b.title}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E8DEC8]/60">
                    <span className="text-[10px] font-mono font-bold text-[#166534] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Escrow Locked
                    </span>
                    {b.status === "published" ? (
                      <span className="text-[10px] font-mono font-bold bg-[#EBF7EE] text-[#166534] px-2.5 py-0.5 rounded border border-[#C6E7CE]">
                        Published ✓
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApproveBrief(b.id, b.title)}
                        className="px-3 py-1.5 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-[11px] shadow-2xs transition cursor-pointer"
                      >
                        Publish Brief
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Security Audit Feed */}
          <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E8D8]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7A1C28]" />
                <span className="text-sm font-bold text-[#181314] font-heading">Live Audit Log</span>
              </div>
              <Link href="/admin/audit-logs" className="text-[#7A1C28] text-xs font-bold hover:underline">
                Audit Trail →
              </Link>
            </div>
            <div className="space-y-2.5 text-[11px] text-[#6C635B]">
              <div className="flex justify-between items-center py-1.5 border-b border-[#F0E8D8]">
                <span className="text-[#181314] font-bold">ADMIN_SESSION_AUTH</span>
                <span className="text-[#8C5D64]">Just now</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#F0E8D8]">
                <span className="text-[#166534] font-bold">ESCROW_LOCKED [₹1,80,000]</span>
                <span className="text-[#8C5D64]">14m ago</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-[#7A1C28] font-bold">KYC_DOCUMENT_UPLOADED</span>
                <span className="text-[#8C5D64]">32m ago</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
