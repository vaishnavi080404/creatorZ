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
  X
} from "lucide-react";

export default function VerificationQueuePage() {
  const [activeTab, setActiveTab] = useState("brands"); // "brands" | "creators"
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState("");
  const [docPreviewModal, setDocPreviewModal] = useState(null);

  // Baseline Enterprise Brands Queue (Includes live Pilgrim Skincare from onboarding)
  const initialBrands = [
    {
      id: "br-pilgrim",
      name: "Pilgrim Skincare & Cosmetics",
      company: "pilgrim",
      representative: "Vaishnavi",
      email: "vaishnavi@pilgrim.in",
      role: "brand",
      category: "skincare",
      gstin: "27AABCP9912K1Z3",
      govIdType: "Corporate PAN",
      govIdNumber: "AABCP9912K",
      budget: "₹50k - ₹2,00,000",
      objective: "UGC Video Reels",
      kycDoc: "pilgrim_incorporation_proof.pdf",
      status: "pending",
      submittedDate: "Live Onboarding Submission",
    },
    {
      id: "br-01",
      name: "Drums Food International",
      company: "Epigamia Foods",
      representative: "Rohan Varma",
      email: "rohan@epigamia.com",
      role: "brand",
      category: "FMCG & Beverages",
      gstin: "27AAACD4928L1Z9",
      govIdType: "Corporate PAN",
      govIdNumber: "AAACD4928L",
      budget: "₹2L - ₹10,00,000",
      objective: "UGC Video Reels",
      kycDoc: "epigamia_incorporation_certificate.pdf",
      status: "pending",
      submittedDate: "Today, 10:15 AM",
    },
    {
      id: "br-02",
      name: "Pureplay Skin Sciences",
      company: "Plum Goodness",
      representative: "Ananya Sen",
      email: "ananya@plumgoodness.com",
      role: "brand",
      category: "Skincare & Beauty",
      gstin: "27AABCP8831G1ZF",
      govIdType: "Certificate of Incorporation",
      govIdNumber: "U24230MH2013PTC245671",
      budget: "₹10,00,000+",
      objective: "Sponsored Posts & UGC",
      kycDoc: "plum_cin_signatory_proof.pdf",
      status: "approved",
      submittedDate: "03 Sep 2026",
    },
    {
      id: "br-03",
      name: "PEP Technologies Pvt Ltd",
      company: "mCaffeine Skincare",
      representative: "Tarun Sharma",
      email: "tarun@mcaffeine.com",
      role: "brand",
      category: "Personal Care",
      gstin: "27AAGCP1124M1Z2",
      govIdType: "Corporate PAN",
      govIdNumber: "AAGCP1124M",
      budget: "₹2L - ₹10,00,000",
      objective: "Affiliate & UGC Performance",
      kycDoc: "mcaffeine_gst_registration.pdf",
      status: "pending",
      submittedDate: "Yesterday, 04:30 PM",
    },
    {
      id: "br-04",
      name: "Redwolf Apparel Pvt Ltd",
      company: "The Souled Store",
      representative: "Vedang Patel",
      email: "vedang@thesouledstore.com",
      role: "brand",
      category: "Apparel & Merch",
      gstin: "27AABCT4112R1ZU",
      govIdType: "Aadhaar / Director PAN",
      govIdNumber: "AABCT4112R",
      budget: "₹10,00,000+",
      objective: "Local Store Launches & UGC",
      kycDoc: "tss_authorized_signatory.pdf",
      status: "approved",
      submittedDate: "01 Sep 2026",
    },
  ];

  const [brands, setBrands] = useState(initialBrands);

  // Sync with dynamic users registered locally across all queues
  useEffect(() => {
    try {
      const dynamicBrands = [];

      // 1. Check dedicated creatorz_brand_verifications queue
      const queueStr = localStorage.getItem("creatorz_brand_verifications");
      if (queueStr) {
        try {
          const parsedQueue = JSON.parse(queueStr);
          const queueArray = Array.isArray(parsedQueue) ? parsedQueue : Object.values(parsedQueue);
          queueArray.forEach((b) => {
            if (b) {
              const companyName = b.company || b.companyName || b.name || "Enterprise Brand";
              const email = b.email && !/^\d+$/.test(b.email) ? b.email : `${companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}@creatorz.io`;
              dynamicBrands.push({
                id: b.id || `br-q-${email.replace(/[^a-zA-Z0-9]/g, "")}`,
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
                objective: b.objective || "UGC",
                kycDoc: b.kycDoc ? "uploaded_signatory_document.png" : null,
                status: b.is_verified || b.verified ? "approved" : (b.kyc_status === "flagged" ? "flagged" : "pending"),
                submittedDate: b.submittedDate || "Live Submitted Profile",
              });
            }
          });
        } catch (e) {
          console.error("Failed to parse brand verifications queue", e);
        }
      }

      // 2. Check creatorz_users_registry
      const regStr = localStorage.getItem("creatorz_users_registry");
      if (regStr) {
        try {
          const registry = JSON.parse(regStr);
          const regArray = Array.isArray(registry) ? registry : Object.values(registry);
          regArray.forEach((user) => {
            if (user && (user.role === "brand" || user.company || user.companyName)) {
              const companyName = user.company || user.companyName || user.name || "Enterprise Brand";
              const email = user.email && !/^\d+$/.test(user.email) ? user.email : `${companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}@creatorz.io`;
              dynamicBrands.push({
                id: user.id || `br-dyn-${email.replace(/[^a-zA-Z0-9]/g, "")}`,
                name: companyName,
                company: companyName,
                representative: user.representativeName || user.name || "Brand Lead",
                email: email,
                role: "brand",
                category: user.category || "D2C Brand",
                gstin: user.gstin || "NOT PROVIDED",
                govIdType: user.govIdType || "Corporate PAN",
                govIdNumber: user.govIdNumber || "NOT PROVIDED",
                budget: user.monthlyBudget || "₹50k - ₹2,00,000",
                objective: user.objective || "UGC",
                kycDoc: user.kycDoc ? "uploaded_signatory_document.png" : null,
                status: user.is_verified || user.verified ? "approved" : (user.kyc_status === "flagged" ? "flagged" : "pending"),
                submittedDate: "Registered Account",
              });
            }
          });
        } catch (e) {
          console.error("Failed to parse users registry", e);
        }
      }

      // 3. Check current/previous auth session if brand
      const sessStr = localStorage.getItem("creatorz_auth_session");
      if (sessStr) {
        try {
          const session = JSON.parse(sessStr);
          const sessUser = session.user || session;
          if (sessUser && (sessUser.role === "brand" || sessUser.company || sessUser.companyName)) {
            const companyName = sessUser.company || sessUser.companyName || sessUser.name || "Enterprise Brand";
            const email = sessUser.email && !/^\d+$/.test(sessUser.email) ? sessUser.email : `${companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}@creatorz.io`;
            dynamicBrands.push({
              id: sessUser.id || `br-sess-${email.replace(/[^a-zA-Z0-9]/g, "")}`,
              name: companyName,
              company: companyName,
              representative: sessUser.representativeName || sessUser.name || "Brand Lead",
              email: email,
              role: "brand",
              category: sessUser.category || "D2C Brand",
              gstin: sessUser.gstin || "NOT PROVIDED",
              govIdType: sessUser.govIdType || "Corporate PAN",
              govIdNumber: sessUser.govIdNumber || "NOT PROVIDED",
              budget: sessUser.monthlyBudget || "₹50k - ₹2,00,000",
              objective: sessUser.objective || "UGC",
              kycDoc: sessUser.kycDoc ? "uploaded_signatory_document.png" : null,
              status: sessUser.is_verified || sessUser.verified ? "approved" : (sessUser.kyc_status === "flagged" ? "flagged" : "pending"),
              submittedDate: "Active Brand Session",
            });
          }
        } catch (e) {
          console.error("Failed to parse auth session", e);
        }
      }

      // Merge avoiding duplicate entries by company or email
      setBrands((prev) => {
        const map = new Map();
        // Priority 1: Newly discovered dynamic/live brands
        dynamicBrands.forEach((b) => {
          const key = (b.company || b.email || b.id).toLowerCase().trim();
          map.set(key, b);
        });
        // Priority 2: Initial pre-seeded brands
        prev.forEach((b) => {
          const key = (b.company || b.email || b.id).toLowerCase().trim();
          if (!map.has(key)) {
            map.set(key, b);
          }
        });
        return Array.from(map.values());
      });
    } catch (err) {
      console.error("Failed to load local brand registrations", err);
    }
  }, []);

  // Initial Creators Queue
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

  // Brand Approval Ops Action
  const updateBrandStatus = (brandId, brandEmail, brandCompany, newStatus, message) => {
    setBrands((prev) =>
      prev.map((b) => 
        (b.id === brandId || (brandCompany && b.company?.toLowerCase() === brandCompany?.toLowerCase()) || (brandEmail && b.email?.toLowerCase() === brandEmail?.toLowerCase()))
          ? { ...b, status: newStatus } 
          : b
      )
    );

    try {
      const isApproved = newStatus === "approved";
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
      console.error("Failed to persist brand verification status", err);
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
      b.company.toLowerCase().includes(search.toLowerCase()) ||
      b.representative.toLowerCase().includes(search.toLowerCase()) ||
      b.gstin.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.handle.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
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
                {filteredBrands.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-[#6C635B] font-mono text-xs">
                      No brands found matching the current filter.
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
                              {b.company.slice(0, 2).toUpperCase()}
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
                {filteredCreators.map((c) => (
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
                            onClick={() => updateCreatorStatus(c.id, "approved", `✓ Verified & elevated ${c.name}`)}
                            className="px-3 py-1.5 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white text-[11px] font-bold transition-colors cursor-pointer shadow-2xs"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => updateCreatorStatus(c.id, "flagged", `⚠ Flagged KYC for ${c.name}`)}
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

            <div className="h-44 rounded-2xl border border-dashed border-[#D8CEBD] bg-[#FAF3EB] flex flex-col items-center justify-center text-center p-4">
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
