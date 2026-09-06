import Link from "next/link";
import { ArrowUpRight, Building2, UserCheck, ShieldCheck } from "lucide-react";
export default function CtaBanner() {
    return (<section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="bg-[#66101b] rounded-3xl p-8 sm:p-16 text-[#faf3eb] text-center space-y-8 shadow-2xl relative overflow-hidden border border-[#851825]">
        
        {/* Subtle Warm Glow Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight tracking-tight text-[#faf3eb]">
            Start closing creator deals <br />
            <span className="italic font-normal opacity-90">
              the modern way.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#faf3eb]/80 leading-relaxed max-w-xl mx-auto font-normal">
            Zero agency commission. 30-second video audition hooks. 100% milestone contract certainty. Frame-accurate review studio.
          </p>
        </div>

        {/* Dual Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
          <Link href="/brand/dashboard" className="px-8 py-4 rounded-xl bg-[#faf3eb] text-[#66101b] font-bold text-sm shadow-lg hover:bg-white transition flex items-center gap-2.5 transform active:scale-98">
            <Building2 className="w-4 h-4 text-[#66101b]"/>
            <span>Open Brand Portal</span>
            <ArrowUpRight className="w-4 h-4 text-[#66101b]"/>
          </Link>

          <Link href="/creator/dashboard" className="px-8 py-4 rounded-xl bg-white/10 border border-[#faf3eb]/30 text-[#faf3eb] font-bold text-sm hover:bg-white/20 transition flex items-center gap-2.5 transform active:scale-98 backdrop-blur-sm">
            <UserCheck className="w-4 h-4 text-[#faf3eb]"/>
            <span>Open Creator Portal</span>
            <ArrowUpRight className="w-4 h-4 text-[#faf3eb]"/>
          </Link>
        </div>

        {/* Bottom Trust Line */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#faf3eb]/70 relative z-10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#faf3eb]"/>
            Direct Contract Protected
          </span>
          <span className="text-[#faf3eb]/30 hidden sm:inline">•</span>
          <span>Instant GST/TDS Compliant Invoices</span>
          <span className="text-[#faf3eb]/30 hidden sm:inline">•</span>
          <span>No Credit Card Required to Browse</span>
        </div>

      </div>
    </section>);
}
