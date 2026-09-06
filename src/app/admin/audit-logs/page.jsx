"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Database,
  ArrowUpRight,
  ShieldAlert,
  Key,
  Layers
} from "lucide-react";

export default function AdminAuditLogsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const logs = [
    {
      id: "LOG-9921",
      timestamp: "2026-09-06 14:28:10 IST",
      actor: "admin@creatorz.internal (Ops Director)",
      action: "ADMIN_LOGIN_SUCCESS",
      category: "auth",
      details: "Console session established via 1-click credential token. IP: 103.21.244.18",
      severity: "info",
    },
    {
      id: "LOG-9920",
      timestamp: "2026-09-06 14:15:02 IST",
      actor: "system_escrow_worker",
      action: "ESCROW_VAULT_FUNDED",
      category: "escrow",
      details: "Locked ₹1,80,000 for BeastLife brief #BRF-201. Transaction: TXN_884920",
      severity: "success",
    },
    {
      id: "LOG-9919",
      timestamp: "2026-09-06 13:50:44 IST",
      actor: "admin@creatorz.internal",
      action: "CREATOR_TIER_APPROVED",
      category: "moderation",
      details: "Elevated creator @aanya_visuals to Alpha Tier following pitch audit.",
      severity: "info",
    },
    {
      id: "LOG-9918",
      timestamp: "2026-09-06 12:40:19 IST",
      actor: "gateway_firewall",
      action: "SUSPICIOUS_PROBE_BLOCKED",
      category: "security",
      details: "Unauthorized probe to /admin/* rejected with 404 Cloak. IP: 194.26.29.11",
      severity: "warning",
    },
    {
      id: "LOG-9917",
      timestamp: "2026-09-06 11:12:33 IST",
      actor: "system_kyc_processor",
      action: "GSTIN_VERIFIED",
      category: "compliance",
      details: "GSTIN 27AAACB2212P1ZA verified against National Tax Portal API.",
      severity: "success",
    },
    {
      id: "LOG-9916",
      timestamp: "2026-09-06 10:04:12 IST",
      actor: "admin@creatorz.internal",
      action: "DISPUTE_MEDIATED",
      category: "moderation",
      details: "Resolved deliverable milestone dispute #DSP-402 in favor of Creator with 50% payout.",
      severity: "info",
    },
    {
      id: "LOG-9915",
      timestamp: "2026-09-06 09:30:00 IST",
      actor: "daily_reconciliation_cron",
      action: "AUDIT_BLOCK_SEALED",
      category: "security",
      details: "Merkle root block hash #BLK-771829 committed to immutable archival vault.",
      severity: "success",
    },
  ];

  const filtered = logs.filter((l) => {
    const matchesSearch =
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.actor.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === "all" || l.category === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner Header */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#181314] font-heading">
              Immutable System Audit Logs
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EBF7EE] text-[#166534] border border-[#C6E7CE]">
              Append-Only Ledger
            </span>
          </div>
          <p className="text-xs text-[#6C635B] mt-0.5">
            Cryptographically sealed audit trail recording all administrative mutations, security events, and escrow transactions.
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
              placeholder="Search logs, actions, actors..."
              className="pl-9 pr-3 py-2 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-mono text-[#181314] placeholder:text-[#8C5D64]/60 focus:outline-none focus:border-[#7A1C28]"
            />
          </div>

          <div className="flex flex-wrap rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] p-0.5 text-xs font-mono">
            {["all", "auth", "escrow", "moderation", "security", "compliance"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterType(cat)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer font-bold ${
                  filterType === cat
                    ? "bg-[#7A1C28] text-white shadow-2xs"
                    : "text-[#6C635B] hover:text-[#181314]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ledger Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#6C635B] block mb-1">Total Block Events</span>
          <span className="text-lg font-bold text-[#181314]">142,891</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#6C635B] block mb-1">Integrity Verification</span>
          <span className="text-lg font-bold text-[#166534] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-[#166534]" /> 100% Intact
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#6C635B] block mb-1">Active Ledger Node</span>
          <span className="text-lg font-bold text-[#7A1C28]">BOM-01 Primary</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#6C635B] block mb-1">Hash Algorithm</span>
          <span className="text-lg font-bold text-[#181314]">SHA-256 Merkle</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl overflow-hidden shadow-sm font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAF6EE] border-b border-[#E8DEC8] text-[11px] font-mono text-[#6C635B] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Event ID & Timestamp</th>
                <th className="px-6 py-4 font-bold">Action Type</th>
                <th className="px-6 py-4 font-bold">Actor</th>
                <th className="px-6 py-4 font-bold">Audit Details</th>
                <th className="px-6 py-4 font-bold text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E8D8]">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-[#FAF6EE]/50 transition-colors">
                  
                  {/* Event ID & Time */}
                  <td className="px-6 py-4 text-[#181314]">
                    <span className="text-[#7A1C28] font-bold block text-xs">{l.id}</span>
                    <span className="text-[10.5px] text-[#6C635B] font-mono">{l.timestamp}</span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase border font-mono ${
                        l.severity === "warning"
                          ? "bg-[#FFF0F0] text-[#B91C1C] border-[#FCA5A5]"
                          : l.severity === "success"
                          ? "bg-[#EBF7EE] text-[#166534] border-[#C6E7CE]"
                          : "bg-[#FAF6EE] text-[#7A1C28] border-[#E8DEC8]"
                      }`}
                    >
                      {l.action}
                    </span>
                  </td>

                  {/* Actor */}
                  <td className="px-6 py-4 text-[#181314] text-[11px] font-mono">
                    {l.actor}
                  </td>

                  {/* Details */}
                  <td className="px-6 py-4 text-[#6C635B] text-xs font-sans max-w-md">
                    {l.details}
                  </td>

                  {/* Integrity */}
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#166534] bg-[#EBF7EE] border border-[#C6E7CE] px-2.5 py-1 rounded-full">
                      <Lock className="w-3 h-3 text-[#166534]" />
                      SHA-256 Valid
                    </span>
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
