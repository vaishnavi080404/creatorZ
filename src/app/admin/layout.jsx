"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  Building2,
  AlertTriangle,
  ShieldCheck,
  LogOut,
  Terminal,
  Menu,
  X,
  Radio,
  Clock,
  ArrowUpRight,
  Shield
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Update live ops clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // If on /admin/login, render children cleanly without admin shell
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#FAF3EB] text-[#181314]">{children}</div>;
  }

  // Loading state skeleton matching cream/maroon theme
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF3EB] flex flex-col items-center justify-center text-[#7D5358] font-mono gap-3">
        <div className="w-8 h-8 border-2 border-[#7A1C28]/20 border-t-[#7A1C28] rounded-full animate-spin" />
        <span className="text-xs text-[#7A1C28] font-bold tracking-wider">INITIALIZING OPS CONSOLE...</span>
      </div>
    );
  }

  // 404 Cloaking Auth Guard: If not logged in as admin, cloak route completely!
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FAF3EB] flex flex-col items-center justify-center text-[#7D5358] font-sans p-6 text-center">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold font-mono text-[#4A0711] pr-4 border-r border-[#DECDBE]">
            404
          </h1>
          <p className="text-base text-[#7D5358]">
            This page could not be found.
          </p>
        </div>
        <p className="text-xs text-[#9E7B35] max-w-sm mb-6 font-serif">
          The requested URL was not found on this server. Please check the address or return to the main portal.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-[#7A1C28] hover:bg-[#63141E] text-white text-xs font-bold transition-colors shadow-sm"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navLinks = [
    {
      label: "Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Verification Queue",
      href: "/admin/verification",
      icon: UserCheck,
      badge: "14",
      badgeColor: "bg-[#7A1C28]/10 text-[#7A1C28] border-[#7A1C28]/20",
    },
    {
      label: "Brand Moderation",
      href: "/admin/moderation",
      icon: Building2,
      badge: "3",
      badgeColor: "bg-[#9E7B35]/15 text-[#9E7B35] border-[#9E7B35]/30",
    },
    {
      label: "Disputes & Escrow",
      href: "/admin/disputes",
      icon: AlertTriangle,
      badge: "2",
      badgeColor: "bg-[#EBF7EE] text-[#166534] border-[#C6E7CE]",
    },
    {
      label: "Audit Logs",
      href: "/admin/audit-logs",
      icon: ShieldCheck,
      badge: "Live",
      badgeColor: "bg-[#FAF6EE] text-[#7A1C28] border-[#E8DEC8]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF3EB] text-[#181314] font-sans flex flex-col selection:bg-[#7A1C28]/20 selection:text-[#7A1C28]">
      
      {/* Top Ops Command Header in Warm Brand Theme */}
      <header className="sticky top-0 z-40 h-16 bg-white/95 border-b border-[#E8DEC8] backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shadow-2xs">
        
        {/* Left: Brand Logo & Internal Console Indicator */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-[#7A1C28] hover:bg-[#F2EAE0] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#7A1C28] text-white flex items-center justify-center font-bold text-base shadow-sm">
              C
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#181314] text-sm tracking-tight font-heading">
                  CreatorZ
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] border border-[#7A1C28]/20 font-mono font-bold">
                  OPS CONSOLE
                </span>
              </div>
              <span className="text-[10px] text-[#6C635B] font-mono tracking-tight hidden sm:block">
                Internal Ops Core // v2.4-SECURE
              </span>
            </div>
          </Link>
        </div>

        {/* Center: System Status Beacon */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-mono text-[#6C635B]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#166534] font-bold">ALL SYSTEMS NOMINAL</span>
          <span className="text-[#D8CEBD]">•</span>
          <span>ESCROW VAULT SECURED</span>
          <span className="text-[#D8CEBD]">•</span>
          <span className="text-[#7A1C28] font-semibold">{currentTime}</span>
        </div>

        {/* Right: Admin Profile & Logout */}
        <div className="flex items-center gap-3">
          
          {/* Admin Identity Pill */}
          <div className="flex items-center gap-2.5 pl-3 pr-2 py-1 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
            <div className="w-7 h-7 rounded-xl bg-[#7A1C28] text-white font-bold font-mono text-xs flex items-center justify-center shadow-xs">
              OD
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#181314] leading-tight">
                  Ops Director
                </span>
                <span className="text-[9px] px-1.5 py-0.2 font-mono font-bold uppercase rounded bg-[#7A1C28]/10 text-[#7A1C28] border border-[#7A1C28]/20">
                  SUPER ADMIN
                </span>
              </div>
              <span className="text-[10px] text-[#6C635B] font-mono hidden sm:block">
                admin@creatorz.internal
              </span>
            </div>
          </div>

          {/* Exit Console Button */}
          <button
            type="button"
            onClick={handleLogout}
            title="Disconnect Console"
            className="p-2.5 rounded-xl bg-white hover:bg-[#FAF6EE] border border-[#E8DEC8] text-[#7A1C28] hover:text-[#63141E] transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-2xs"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden lg:inline">Exit Console</span>
          </button>

        </div>

      </header>

      {/* Main Workspace Frame: Sidebar + Viewport */}
      <div className="flex-1 flex w-full relative">
        
        {/* Left Internal Sidebar in Warm Brand Theme */}
        <aside
          className={`fixed lg:sticky top-16 left-0 z-30 w-64 h-[calc(100vh-4rem)] bg-white/95 border-r border-[#E8DEC8] flex flex-col justify-between p-4 sm:p-5 transition-transform duration-200 backdrop-blur-md shadow-xs overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Navigation Links */}
          <div className="space-y-4">
            
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#6C635B] px-3 mb-2 font-bold">
                Operations Command
              </p>
              <nav className="space-y-1">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-[#FAF6EE] text-[#7A1C28] border border-[#E8DEC8] font-bold shadow-2xs"
                          : "text-[#6C635B] hover:text-[#181314] hover:bg-[#FAF6EE]/60 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#7A1C28]" : "text-[#8C5D64]"}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold font-mono ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick System Telemetry Widget */}
            <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8] text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[#6C635B] text-[10px] uppercase font-mono font-bold">Node Telemetry</span>
                <span className="text-[#166534] flex items-center gap-1 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  99.98%
                </span>
              </div>
              <div className="space-y-1 text-[10.5px] font-mono">
                <div className="flex justify-between text-[#6C635B]">
                  <span>Action Items</span>
                  <span className="text-[#181314] font-bold">19 Pending</span>
                </div>
                <div className="flex justify-between text-[#6C635B]">
                  <span>Locked Escrow</span>
                  <span className="text-[#166534] font-bold">₹48,20,000</span>
                </div>
                <div className="flex justify-between text-[#6C635B]">
                  <span>Gateway Latency</span>
                  <span className="text-[#181314]">14 ms (MUM)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Footer Security Seal */}
          <div className="pt-3 pb-8 mt-4 shrink-0 border-t border-[#E8DEC8] font-mono text-[10px] text-[#6C635B]">
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-bold">SECURITY: LEVEL-4</span>
              <span className="text-[#7A1C28] font-bold">TLS 1.3</span>
            </div>
            <p className="text-[9px] text-[#8C5D64]">
              Auto-lock timeout active (30m idle).
            </p>
          </div>

        </aside>

        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* Dynamic Viewport Area in Warm Ivory Theme */}
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#FAF3EB]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
