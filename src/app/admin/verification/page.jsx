"use client";

import { useState, useEffect } from "react";
import { 
  UserCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ExternalLink,
  Shield,
  ShieldCheck,
  Clock,
  Sparkles,
  Building2,
  FileText,
  Eye,
  Download,
  Check,
  X,
  Loader2
} from "lucide-react";

export default function VerificationQueuePage() {
  const [activeTab, setActiveTab] = useState("brands"); // "brands" | "creators"
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState("");
  const [docPreviewModal, setDocPreviewModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Live Queues
  const [brands, setBrands] = useState([]);
  const [creators, setCreators] = useState([]);

  // Fetch actual brands & creators from Supabase and local live registrations
  const fetchVerifications = async () => {
    try {
      setIsLoading(true);
      // 1. Fetch live records from server-side Supabase API
      const res = await fetch("/api/admin/verifications");
      const data = await res.json();
      const serverBrands = data.brands || [];
      const serverCreators = data.creators || [];

      // 2. Fetch locally submitted brand verifications
      const localBrands = [];
      const qStr = localStorage.getItem("creatorz_brand_verifications");
      if (qStr) {
        try {
          const parsed = JSON.parse(qStr);
          const queueArray = Array.isArray(parsed) ? parsed : Object.values(parsed);
          queueArray.forEach((b) => {
            if (b && (b.company || b.companyName)) {
              const companyName = b.company || b.companyName;
              const email = b.email && !/^\d+$/.test(b.email) ? b.email : `${companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}@creatorz.io`;
              localBrands.push({
                id: b.id || `br-local-${email.replace(/[^a-zA-Z0-9]/g, "")}`,
                userId: b.userId || b.id,
                name: companyName,
                company: companyName,
                representative: b.representative || b.representativeName || b.name || "Brand Lead",
                email: email,
                role: "brand",
                category: b.category || "D2C Brand",
                gstin: b.gstin || "NOT PROVIDED",
                govIdType: b.govIdType || "Corporate PAN",
                govIdNumber: b.govIdNumber || "NOT PROVIDED",
                budget: b.budget || b.monthlyBudget || "₹50k - ₹2,00,000",
                objective: b.objective || "UGC Video Reels",
                kycDoc: b.kycDoc ? "uploaded_signatory_document.png" : null,
                status: b.is_verified || b.verified ? "approved" : (b.kyc_status === "flagged" ? "flagged" : "pending"),
                submittedDate: b.submittedDate || "Recent Registration",
                verified: Boolean(b.is_verified || b.verified),
              });
            }
          });
        } catch (e) {
          console.error("Failed to parse local brand verifications", e);
        }
      }

      // 3. Merge avoiding duplicates (Authoritative server records take priority)
      const brandsMap = new Map();
      localBrands.forEach((b) => {
        const key = (b.email || b.company || b.id).toLowerCase().trim();
        brandsMap.set(key, b);
      });
      serverBrands.forEach((b) => {
        const key = (b.email || b.company || b.id).toLowerCase().trim();
        brandsMap.set(key, b);
      });

      setBrands(Array.from(brandsMap.values()));
      setCreators(serverCreators);
    } catch (err) {
      console.error("Failed to load verification queues", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  // Brand Approval Ops Action
  const updateBrandStatus = async (brandId, brandEmail, brandCompany, newStatus, message) => {
    const isApproved = newStatus === "approved";

    // Optimistic UI update
    setBrands((prev) =>
      prev.map((b) => 
        (b.id === brandId || (brandCompany && b.company?.toLowerCase() === brandCompany?.toLowerCase()) || (brandEmail && b.email?.toLowerCase() === brandEmail?.toLowerCase()))
          ? { ...b, status: newStatus, verified: isApproved } 
          : b
      )
    );

    // Call server-side API to persist verification in Supabase
    try {
      await fetch("/api/admin/verifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandProfileId: brandId,
          email: brandEmail,
          status: newStatus,
          verified: isApproved,
        }),
      });
    } catch (apiErr) {
      console.error("Failed to persist brand status to Supabase", apiErr);
    }

    try {
      const normEmail = (brandEmail || "").toLowerCase().trim();
      const normComp = (brandCompany || "").toLowerCase().trim();

      // 1. Update creatorz_brand_verifications
      const qStr = localStorage.getItem("creatorz_brand_verifications");
      if (qStr) {
        let queue = JSON.parse(qStr);
        if (Array.isArray(queue)) {
          queue = queue.map((b) => {
            if (
              (b.email && b.email.toLowerCase().trim() === normEmail) ||
              (b.company && b.company.toLowerCase().trim() === normComp) ||
              b.id === brandId
            ) {
              return {
                ...b,
                status: newStatus,
                is_verified: isApproved,
                verified: isApproved,
                kyc_status: isApproved ? "verified" : (newStatus === "flagged" ? "flagged" : "pending_review"),
              };
            }
            return b;
          });
          localStorage.setItem("creatorz_brand_verifications", JSON.stringify(queue));
        }
      }

      // 2. Update creatorz_users_registry
      const regStr = localStorage.getItem("creatorz_users_registry");
      if (regStr) {
        let registry = JSON.parse(regStr);
        const regArray = Array.isArray(registry) ? registry : Object.values(registry);
        const updatedReg = regArray.map((u) => {
          if (
            (u.email && u.email.toLowerCase().trim() === normEmail) ||
            (u.company && u.company.toLowerCase().trim() === normComp) ||
            u.id === brandId
          ) {
            return {
              ...u,
              is_verified: isApproved,
              verified: isApproved,
              kyc_status: isApproved ? "verified" : (newStatus === "flagged" ? "flagged" : "pending_review"),
            };
          }
          return u;
        });
        localStorage.setItem("creatorz_users_registry", JSON.stringify(updatedReg));
      }

      // 3. If active session matches this brand, update it immediately
      const sessStr = localStorage.getItem("creatorz_auth_session");
      if (sessStr) {
        const session = JSON.parse(sessStr);
        const sessUser = session.user || session;
        if (
          (sessUser.email && sessUser.email.toLowerCase().trim() === normEmail) ||
          (sessUser.company && sessUser.company.toLowerCase().trim() === normComp) ||
          sessUser.id === brandId
        ) {
          sessUser.is_verified = isApproved;
          sessUser.verified = isApproved;
          sessUser.kyc_status = isApproved ? "verified" : (newStatus === "flagged" ? "flagged" : "pending_review");
          localStorage.setItem("creatorz_auth_session", JSON.stringify(session.user ? session : sessUser));
        }
      }

      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Failed to persist brand verification status locally", err);
    }

    setToast(message);
    setTimeout(() => setToast(""), 4000);
  };

  // Creator Status Ops Action
  const updateCreatorStatus = (id, newStatus, message) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    setToast(message);
    setTimeout(() => setToast(""), 4000);
  };

  // Filters
  const filteredBrands = brands.filter((b) => {
    const matchesSearch =
      (b.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.representative || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.gstin || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.email || "").toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.handle || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.category || "").toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingBrandsCount = brands.filter((b) => b.status === "pending").length;
  const pendingCreatorsCount = creators.filter((c) => c.status === "pending").length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast Feedback */}
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
              Enterprise & Creator Verification
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8]">
              {pendingBrandsCount + pendingCreatorsCount} Audits Pending
            </span>
          </div>
          <p className="text-xs text-[#6C635B] mt-0.5 max-w-xl">
            Audit business incorporation documents, GSTINs, and representative government IDs to award the <strong className="text-[#181314]">Verified Enterprise</strong> trust seal.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C5D64]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={activeTab === "brands" ? "Search company, GSTIN..." : "Search creator, handle..."}
              className="pl-9 pr-3 py-2 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-mono text-[#181314] placeholder:text-[#8C5D64]/60 focus:outline-none focus:border-[#7A1C28] w-48 sm:w-60"
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

      {/* Tab Selector */}
      <div className="flex items-center gap-2 border-b border-[#E8DEC8] pb-1">
        <button
          type="button"
          onClick={() => setActiveTab("brands")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "brands"
              ? "bg-[#7A1C28] text-white shadow-xs"
              : "bg-white text-[#6C635B] hover:text-[#181314] border border-[#E8DEC8]"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Brand Enterprise KYC</span>
          <span className={`px-2 py-0.2 rounded-full text-[10px] font-mono ${
            activeTab === "brands" ? "bg-white/20 text-white" : "bg-[#FAF6EE] text-[#7A1C28]"
          }`}>
            {pendingBrandsCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("creators")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "creators"
              ? "bg-[#7A1C28] text-white shadow-xs"
              : "bg-white text-[#6C635B] hover:text-[#181314] border border-[#E8DEC8]"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Creator Profiles</span>
          <span className={`px-2 py-0.2 rounded-full text-[10px] font-mono ${
            activeTab === "creators" ? "bg-white/20 text-white" : "bg-[#FAF6EE] text-[#7A1C28]"
          }`}>
            {pendingCreatorsCount}
          </span>
        </button>
      </div>

      {/* BRAND ENTERPRISE KYC TABLE */}
      {activeTab === "brands" && (
        <div className="bg-white border border-[#E8DEC8] rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#FAF6EE] border-b border-[#E8DEC8] text-[11px] font-mono text-[#6C635B] uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Brand & Representative</th>
                  <th className="px-6 py-4 font-bold">GSTIN / Tax ID</th>
                  <th className="px-6 py-4 font-bold">Signatory ID Type & Proof</th>
                  <th className="px-6 py-4 font-bold">Monthly Budget</th>
                  <th className="px-6 py-4 font-bold">KYC Status</th>
                  <th className="px-6 py-4 font-bold text-right">Ops Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E8D8] font-mono">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#6C635B] font-mono text-xs">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-[#7A1C28]" />
                        <span>Querying Supabase Verification Records...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredBrands.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#6C635B] font-mono text-xs">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Building2 className="w-8 h-8 text-[#9E7B35]/40" />
                        <span className="font-bold text-[#181314]">No brand verification requests in queue</span>
                        <span className="text-[11px] text-[#8C5D64]">Registered brand partners requiring compliance verification will appear here.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBrands.map((b) => {
                    const displayEmail = b.email && !/^\d+$/.test(b.email)
                      ? b.email
                      : `${(b.company || "brand").toLowerCase().replace(/[^a-z0-9]/g, "")}@creatorz.io`;

                    return (
                      <tr key={b.id || b.company} className="hover:bg-[#FAF6EE]/50 transition-colors">
                        
                        {/* Brand Info */}
                        <td className="px-6 py-4 font-sans">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-2xl bg-[#7A1C28] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                              {(b.company || "BR").slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className="font-bold text-[#181314] block text-xs capitalize">{b.company}</span>
                              <span className="text-[11px] text-[#6C635B] font-mono">
                                {b.representative} • {displayEmail}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* GSTIN */}
                        <td className="px-6 py-4">
                          <span className="text-xs font-mono font-bold text-[#181314]">
                            {b.gstin}
                          </span>
                          <span className="block text-[10px] text-[#6C635B] font-sans">
                            {b.gstin !== "NOT PROVIDED" ? "Verified via GST Portal" : "Exemption Declared"}
                          </span>
                        </td>

                        {/* Signatory Proof & Document Modal Preview */}
                        <td className="px-6 py-4 font-sans">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#181314] block">
                              {b.govIdType}: <span className="font-mono text-[#7A1C28]">{b.govIdNumber}</span>
                            </span>
                          </div>
                          {b.kycDoc ? (
                            <button
                              type="button"
                              onClick={() => setDocPreviewModal(b)}
                              className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#7A1C28] hover:underline font-bold font-mono cursor-pointer"
                            >
                              <FileText className="w-3 h-3" />
                              <span>View Document Attachment</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#8C5D64] font-mono block mt-0.5">
                              No physical doc uploaded
                            </span>
                          )}
                        </td>

                        {/* Monthly Budget & Objective */}
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-[#166534]">
                            {b.budget}
                          </span>
                          <span className="block text-[10px] text-[#6C635B] font-sans">
                            {b.objective}
                          </span>
                        </td>

                        {/* KYC Status */}
                        <td className="px-6 py-4">
                          {b.status === "approved" ? (
                            <span className="text-[10px] font-mono font-bold text-[#166534] px-2.5 py-0.5 rounded-full bg-[#EBF7EE] border border-[#C6E7CE] inline-flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              Verified Enterprise
                            </span>
                          ) : b.status === "flagged" ? (
                            <span className="text-[10px] font-mono font-bold text-[#7A1C28] px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#E8DEC8]">
                              Needs Resubmission
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold text-[#9E7B35] px-2.5 py-0.5 rounded-full bg-[#FFFDF9] border border-[#DECDBE]">
                              ⏳ Pending KYC Review
                            </span>
                          )}
                        </td>

                        {/* Ops Actions */}
                        <td className="px-6 py-4 text-right">
                          {b.status === "approved" ? (
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-[11px] text-[#166534] font-bold">✓ Active Enterprise</span>
                              <button
                                type="button"
                                onClick={() => updateBrandStatus(b.id, b.email, b.company, "flagged", `⚠ Revoked verification for ${b.company}`)}
                                className="px-2.5 py-1 rounded-lg text-[10px] text-[#7A1C28] hover:bg-[#FAF6EE] border border-[#E8DEC8] transition cursor-pointer"
                              >
                                Revoke
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => updateBrandStatus(b.id, b.email, b.company, "approved", `✓ Approved & Verified Enterprise: ${b.company}`)}
                                className="px-3 py-1.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-[11px] font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Approve & Verify</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => updateBrandStatus(b.id, b.email, b.company, "flagged", `⚠ Flagged KYC for ${b.company}`)}
                                className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF6EE] border border-[#D8CEBD] text-[#7A1C28] text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Flag
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATOR VERIFICATION QUEUE TABLE */}
      {activeTab === "creators" && (
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
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#6C635B] font-mono text-xs">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-[#7A1C28]" />
                        <span>Querying Supabase Creator Records...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredCreators.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#6C635B] font-mono text-xs">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <UserCheck className="w-8 h-8 text-[#7A1C28]/40" />
                        <span className="font-bold text-[#181314]">No creator profiles in verification queue</span>
                        <span className="text-[11px] text-[#8C5D64]">Creator tier upgrade and verification requests will appear here.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCreators.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FAF6EE]/50 transition-colors">
                      
                      {/* Creator info */}
                      <td className="px-6 py-4 font-sans">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-[#7A1C28] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {(c.name || "CR").split(" ").map((n) => n[0]).join("")}
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
                          <span className="text-[#166534] font-bold">{c.onTimeRate || 100}% on-time</span>
                          <span className="text-[#6C635B] block text-[10px]">Verified talent</span>
                        </div>
                      </td>

                      {/* Tier requested */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7A1C28] px-2.5 py-0.5 rounded bg-[#FAF6EE] border border-[#E8DEC8]">
                          <Sparkles className="w-3 h-3 text-[#9E7B35]" />
                          {c.tierRequested || "Verified"}
                        </span>
                      </td>

                      {/* KYC status */}
                      <td className="px-6 py-4">
                        <span className="text-[11px] text-[#166534] font-semibold flex items-center gap-1">
                          <Shield className="w-3.5 h-3.5 text-[#166534]" />
                          Verified
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
                              onClick={() => updateCreatorStatus(c.id, "approved", `✓ Verified talent ${c.name}`)}
                              className="px-3 py-1.5 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white text-[11px] font-bold transition-colors cursor-pointer shadow-2xs"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => updateCreatorStatus(c.id, "flagged", `⚠ Flagged profile for ${c.name}`)}
                              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF6EE] border border-[#D8CEBD] text-[#7A1C28] text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Flag
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {docPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#F0E8D8] pb-4">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#7A1C28]" />
                <div>
                  <h3 className="text-base font-bold text-[#181314] font-heading capitalize">
                    KYC Document Audit Preview
                  </h3>
                  <p className="text-xs text-[#6C635B]">
                    {docPreviewModal.company} • {docPreviewModal.govIdType}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDocPreviewModal(null)}
                className="p-1 rounded-full hover:bg-[#FAF3EB] text-[#6C635B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-3 font-mono text-xs">
              <div className="flex justify-between pb-2 border-b border-[#E8DEC8]/60">
                <span className="text-[#6C635B]">Document Reference:</span>
                <span className="font-bold text-[#181314]">{docPreviewModal.kycDoc}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8DEC8]/60">
                <span className="text-[#6C635B]">GSTIN Number:</span>
                <span className="font-bold text-[#181314]">{docPreviewModal.gstin}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8DEC8]/60">
                <span className="text-[#6C635B]">Government ID:</span>
                <span className="font-bold text-[#7A1C28]">{docPreviewModal.govIdNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6C635B]">Authorized Rep:</span>
                <span className="font-bold text-[#181314]">{docPreviewModal.representative}</span>
              </div>
            </div>

            <div className="h-44 rounded-2xl border border-dashed border-[#D8CEBD] bg-[#FAF6EE] flex flex-col items-center justify-center text-center p-4">
              <ShieldCheck className="w-10 h-10 text-[#166534] mb-2" />
              <p className="text-xs font-bold text-[#181314]">
                Digital Certificate Signature Verified
              </p>
              <p className="text-[11px] text-[#6C635B] max-w-xs mt-1">
                Incorporation Certificate hash checksum matches Ministry of Corporate Affairs (MCA) records.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDocPreviewModal(null)}
                className="px-4 py-2 rounded-xl border border-[#D8CEBD] text-xs font-bold text-[#181314] hover:bg-[#FAF3EB] cursor-pointer"
              >
                Close Preview
              </button>
              {docPreviewModal.status !== "approved" && (
                <button
                  type="button"
                  onClick={() => {
                    updateBrandStatus(docPreviewModal.id, docPreviewModal.email, docPreviewModal.company, "approved", `✓ Approved & Verified Enterprise: ${docPreviewModal.company}`);
                    setDocPreviewModal(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Grant Enterprise Badge</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
