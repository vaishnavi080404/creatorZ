"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Terminal, 
  Zap, 
  AlertTriangle,
  ArrowRight,
  Fingerprint
} from "lucide-react";
import { useAuth, SEED_ADMIN } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await adminLogin(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid authentication token. Access denied.");
      setIsLoading(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    setError("");
    setEmail(SEED_ADMIN.email);
    setPassword(SEED_ADMIN.password);
    setIsLoading(true);

    try {
      await adminLogin(SEED_ADMIN.email, SEED_ADMIN.password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Demo login failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF3EB] text-[#181314] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-[#7A1C28]/20 selection:text-[#7A1C28]">
      
      {/* Ambient background glows matching Creator & Brand pages */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[radial-gradient(circle,rgba(158,123,53,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[radial-gradient(circle,rgba(102,16,27,0.08),transparent_70%)] pointer-events-none" />

      {/* Center Console Container */}
      <div className="w-full max-w-[460px] relative z-10">
        
        {/* Top Ops Indicator Bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8DEC8] text-[11px] font-mono text-[#6C635B] shadow-2xs">
            <Terminal className="w-3.5 h-3.5 text-[#7A1C28]" />
            <span>SEC-GATEWAY // 01</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] border border-[#C6E7CE] text-[11px] font-mono text-[#166534] shadow-2xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>INTERNAL OPS CONSOLE</span>
          </div>
        </div>

        {/* Console Box Card */}
        <div className="bg-[#FFFDF9]/95 border border-[#DECDBE] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_12px_28px_rgba(77,10,19,0.06),0_0_0_1px_rgba(255,255,255,0.7)_inset]">
          
          {/* Header */}
          <div className="mb-6 pb-5 border-b border-[#E8DEC8]">
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-11 h-11 rounded-2xl bg-[#7A1C28] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                <Fingerprint className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-heading text-[#4A0711] tracking-tight">
                  CreatorZ Operations Command
                </h1>
                <p className="text-xs font-mono text-[#7D5358]">
                  Restricted Access • Clearance Level 4
                </p>
              </div>
            </div>
            <p className="text-xs text-[#6C635B] font-serif leading-relaxed mt-2">
              Administrative terminal for creator identity verification, open brief moderation, escrow arbitration, and immutable audit inspection.
            </p>
          </div>

          {/* Quick 1-Click Demo Admin Login */}
          <div className="mb-5">
            <button
              type="button"
              onClick={handleDemoAdminLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EAE0] border border-[#DECDBE] text-[#7A1C28] font-mono text-xs font-bold flex items-center justify-between transition-all duration-200 group cursor-pointer shadow-2xs disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#9E7B35] group-hover:scale-110 transition-transform" />
                <span>1-Click Demo Admin Login</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#7A1C28]/10 text-[#7A1C28] border border-[#7A1C28]/20">
                auto-fill
              </span>
            </button>
          </div>

          <div className="relative flex py-1 items-center mb-5">
            <div className="flex-grow border-t border-[#E8DEC8]" />
            <span className="shrink-0 mx-3 text-[10px] font-mono uppercase tracking-widest text-[#8C5D64]">
              or manual credentials
            </span>
            <div className="flex-grow border-t border-[#E8DEC8]" />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <p className="font-semibold">Authentication Failed</p>
                <p className="text-[11px] text-red-600/90">{error}</p>
              </div>
            </div>
          )}

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6C635B] font-bold mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C5D64]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@creatorz.internal"
                  required
                  disabled={isLoading}
                  className="w-full pl-9.5 pr-4 py-2.5 bg-white border border-[#DECDBE] rounded-xl text-xs text-[#181314] placeholder:text-[#8C5D64]/60 focus:outline-none focus:border-[#7A1C28] focus:ring-1 focus:ring-[#7A1C28]/20 font-mono transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#6C635B] font-bold">
                  Master Key
                </label>
                <span className="text-[10px] font-mono text-[#8C5D64]">
                  SHA-256 Encrypted
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C5D64]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  required
                  disabled={isLoading}
                  className="w-full pl-9.5 pr-10 py-2.5 bg-white border border-[#DECDBE] rounded-xl text-xs text-[#181314] placeholder:text-[#8C5D64]/60 focus:outline-none focus:border-[#7A1C28] focus:ring-1 focus:ring-[#7A1C28]/20 font-mono transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8C5D64] hover:text-[#4A0711] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-md disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate Console Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

          </form>

          {/* Footer Security Notice */}
          <div className="mt-5 pt-4 border-t border-[#E8DEC8] text-center">
            <p className="text-[10px] font-mono text-[#8C5D64] leading-relaxed">
              CONFIDENTIAL // UNLAWFUL ACCESS WILL BE PROSECUTED UNDER IT ACT 2000. ALL ACCESS LOGS ARE PERMANENTLY RECORDED.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
