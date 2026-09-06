"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MOCK_OPEN_BRIEFS, MOCK_ORDER_ROOM } from "@/lib/mockData";
import {
  Video,
  Plus,
  ArrowRight,
  ShieldCheck,
  Clock,
  Briefcase,
  Users,
  Edit3,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function BrandDashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [customBriefs, setCustomBriefs] = useState([]);

  // Auth Protection and Onboarding check
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login?redirect=/brand/dashboard");
        return;
      }
      if (user?.role === "brand" && user.onboarding_completed === false) {
        router.push("/onboarding/brand");
        return;
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  // Load custom briefs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("creatorz_custom_briefs");
      if (stored) {
        setCustomBriefs(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read custom briefs", e);
    }
  }, []);

  // Compute Brand Briefs dynamically
  const brandBriefs = useMemo(() => {
    if (!user) return [];

    const userEmail = (user.email || "").toLowerCase().trim();
    const userCompany = (user.company || user.companyName || user.name || "").toLowerCase().trim();

    // 1. Briefs created in localStorage by this user
    const userCustom = customBriefs.filter(
      (b) =>
        (b.brandEmail && b.brandEmail.toLowerCase().trim() === userEmail) ||
        (b.brandName && b.brandName.toLowerCase().trim() === userCompany)
    );

    // 2. If this is BeastLife demo account or user company matches BeastLife
    const isBeastLife =
      userEmail.includes("beastlife") ||
      userCompany.includes("beastlife") ||
      userEmail === "priya@beastlife.com";

    if (isBeastLife) {
      const matchingMock = MOCK_OPEN_BRIEFS.filter((b) =>
        b.brandName.toLowerCase().includes("beastlife")
      );
      return [...userCustom, ...matchingMock];
    }

    // Otherwise return custom briefs created by this brand
    return userCustom;
  }, [user, customBriefs]);

  // Compute Brand Orders dynamically
  const brandOrders = useMemo(() => {
    if (!user) return [];

    const userEmail = (user.email || "").toLowerCase().trim();
    const userCompany = (user.company || user.companyName || user.name || "").toLowerCase().trim();

    const isBeastLife =
      userEmail.includes("beastlife") ||
      userCompany.includes("beastlife") ||
      userEmail === "priya@beastlife.com";

    if (isBeastLife) {
      return [MOCK_ORDER_ROOM];
    }

    // Check custom orders in localStorage if any
    try {
      const storedOrders = localStorage.getItem("creatorz_custom_orders");
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        return parsed.filter(
          (o) =>
            (o.brandEmail && o.brandEmail.toLowerCase().trim() === userEmail) ||
            (o.brandName && o.brandName.toLowerCase().trim() === userCompany)
        );
      }
    } catch (e) {
      // ignore
    }

    return [];
  }, [user]);

  // Dynamic Metrics
  const metrics = useMemo(() => {
    const totalBriefs = brandBriefs.length;
    const totalAuditions = brandBriefs.reduce(
      (acc, b) => acc + (b.applicantsCount || 0),
      0
    );
    const committedBudget = brandOrders.reduce(
      (acc, o) => acc + (o.contractTotal || 0),
      0
    );
    const ordersCount = brandOrders.length;
    const avgAuditionTime = totalBriefs > 0 ? "42 Sec" : "0 Sec";

    return {
      totalBriefs,
      totalAuditions,
      committedBudget,
      ordersCount,
      avgAuditionTime,
    };
  }, [brandBriefs, brandOrders]);

  if (authLoading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#7A1C28]" />
          <p className="text-xs font-mono text-[#82575c]">Loading Brand Portal...</p>
        </div>
      </div>
    );
  }

  const brandDisplayName =
    user.company || user.companyName || user.name || "My Brand";
  const isVerified = Boolean(user.is_verified || user.verified);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Brand Account Header */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#7A1C28] text-white flex items-center justify-center font-bold text-xl shadow-md overflow-hidden border border-[#E8DEC8]">
            {user.avatar || user.avatar_url ? (
              <img
                src={user.avatar || user.avatar_url}
                alt={brandDisplayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{user.initials || brandDisplayName.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-[#181314] font-heading">
                {brandDisplayName}
              </h1>
              {isVerified ? (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EBF7EE] text-[#166534] border border-[#C6E7CE]">
                  ✓ Verified Enterprise
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]">
                  ⏳ Pending Verification
                </span>
              )}
            </div>
            <p className="text-xs text-[#6C635B] mt-1 max-w-xl">
              {user.bio ||
                user.description ||
                "Manage open briefs, audition pitch reels, milestone order rooms, and creator collaborations."}
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#82575c]">
              {user.location && <span>📍 {user.location}</span>}
              {user.category && <span>🏷️ {user.category}</span>}
              {user.objective && <span>🎯 Goal: {user.objective}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <Link
            href="/onboarding/brand"
            className="px-4 py-3 rounded-full bg-white hover:bg-[#FAF3EB] border border-[#D8CEBD] text-[#181314] text-xs font-bold transition flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#7A1C28]" />
            <span>Edit Profile</span>
          </Link>

          <Link
            href="/brand/briefs/new"
            className="px-5 py-3 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white text-xs font-bold shadow-md transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Open Brief</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">
            Active Briefs
          </span>
          <span className="text-2xl font-bold font-mono text-[#181314] block mt-1">
            {metrics.totalBriefs} {metrics.totalBriefs === 1 ? "Brief" : "Briefs"}
          </span>
          <span className="text-[11px] text-[#7A1C28] font-semibold mt-0.5 block">
            {metrics.totalAuditions} Total Auditions
          </span>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">
            Pending Pitch Reels
          </span>
          <span className="text-2xl font-bold font-mono text-[#7A1C28] block mt-1">
            {metrics.totalAuditions} Videos
          </span>
          {metrics.totalAuditions > 0 ? (
            <Link
              href="/brand/auditions"
              className="text-[11px] text-[#7A1C28] font-bold hover:underline block mt-0.5"
            >
              Launch Swipe Deck →
            </Link>
          ) : (
            <span className="text-[11px] text-[#6C635B] block mt-0.5">
              Awaiting Submissions
            </span>
          )}
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">
            Committed Budget
          </span>
          <span className="text-2xl font-bold font-mono text-[#166534] block mt-1">
            ₹{metrics.committedBudget.toLocaleString()}
          </span>
          <span className="text-[10px] text-[#6C635B] block mt-0.5">
            {metrics.ordersCount} Orders in Production
          </span>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#6C635B] font-bold block">
            Avg Audition Time
          </span>
          <span className="text-2xl font-bold font-mono text-[#181314] block mt-1">
            {metrics.avgAuditionTime}
          </span>
          <span className="text-[10px] text-[#166534] font-medium block mt-0.5">
            100% Video Auditions
          </span>
        </div>
      </div>

      {/* Main Grid: Active Auditions & Active Order Rooms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Briefs & Audition Decks (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
            <div>
              <h2 className="text-base font-bold font-heading text-[#181314]">
                Your Active Open Briefs
              </h2>
              <p className="text-xs text-[#6C635B]">
                Review candidate pitch reels and shortlist creators
              </p>
            </div>
            {brandBriefs.length > 0 && (
              <Link
                href="/brand/briefs/new"
                className="text-xs font-bold text-[#7A1C28] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Brief</span>
              </Link>
            )}
          </div>

          {/* Briefs List or Empty State */}
          {brandBriefs.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#181314]">
                No Active Open Briefs Yet
              </h3>
              <p className="text-xs text-[#6C635B] max-w-sm mx-auto">
                Publish an open brief to let verified creators submit targeted 30–60s video pitch hooks. You only pay when you approve and hire.
              </p>
              <div className="pt-2">
                <Link
                  href="/brand/briefs/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white text-xs font-bold shadow-sm transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Your First Brief</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {brandBriefs.map((brief) => (
                <div
                  key={brief.id}
                  className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-[#181314]">
                        {brief.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold bg-white text-[#7A1C28] px-2 py-0.5 rounded border border-[#E8DEC8]">
                        ₹{(brief.budget || 0).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6C635B] mt-1">
                      {brief.deliverablesRequired || "Video Deliverables"} • Deadline:{" "}
                      {brief.deadline || "Flexible"}
                    </p>
                  </div>

                  <Link
                    href="/brand/auditions"
                    className="px-4 py-2 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 flex-shrink-0"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Review Auditions ({brief.applicantsCount || 0})</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Active Order Rooms (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D8]">
            <div>
              <h2 className="text-base font-bold font-heading text-[#181314]">
                Active Order Rooms
              </h2>
              <p className="text-xs text-[#6C635B]">
                Milestone progress & video revision review
              </p>
            </div>
          </div>

          {/* Orders List or Empty State */}
          {brandOrders.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#9E7B35]/15 text-[#9E7B35] flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#181314]">
                No Active Order Rooms
              </h3>
              <p className="text-xs text-[#6C635B]">
                Accepted pitch reels and booked creators will appear here with escrow milestone tracking and video review studios.
              </p>
              <div className="pt-2">
                <Link
                  href="/creators"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#F2EAE0] border border-[#D8CEBD] text-[#181314] font-bold text-xs transition shadow-xs"
                >
                  <span>Browse Verified Creators</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {brandOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#7A1C28]">
                      Stage 3 Active
                    </span>
                    <span className="text-xs font-mono font-bold text-[#166534]">
                      ₹{(order.contractTotal || 0).toLocaleString()} Committed
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-[#181314]">
                      {order.campaignTitle}
                    </h3>
                    <p className="text-[11px] text-[#6C635B]">
                      Creator: {order.creatorName} (@{order.creatorUsername})
                    </p>
                  </div>

                  <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#E8DEC8]">
                    <div className="bg-[#7A1C28] h-full w-1/2"></div>
                  </div>

                  <Link
                    href={`/brand/orders/${order.id}`}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F2EAE0] border border-[#D8CEBD] text-[#181314] font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Open Video Review Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
