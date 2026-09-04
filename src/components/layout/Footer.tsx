import Link from "next/link";
import { ShieldCheck, FileCheck, Landmark, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f3e8dc] border-t border-[#e4d0c0] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Trust Pillars Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-[#e4d0c0]">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#eddcd0] text-[#66101b]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#66101b] uppercase tracking-wider font-mono">Direct Milestone Protection</h4>
              <p className="text-xs text-[#82575c] mt-0.5">Milestone terms locked prior to script; payout released upon final video approval.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#eddcd0] text-[#66101b]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#66101b] uppercase tracking-wider font-mono">Auto Tax Compliance</h4>
              <p className="text-xs text-[#82575c] mt-0.5">Instant GST/Tax compliant invoices and creator payout ledgers.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#eddcd0] text-[#66101b]">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#66101b] uppercase tracking-wider font-mono">Fair Milestone Matrix</h4>
              <p className="text-xs text-[#82575c] mt-0.5">Contractual cancellation protection (0% to 100% sliding refund scale).</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#eddcd0] text-[#66101b]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#66101b] uppercase tracking-wider font-mono">Verified Portfolios</h4>
              <p className="text-xs text-[#82575c] mt-0.5">Every completed delivery auto-compounds into a proven case study.</p>
            </div>
          </div>
        </div>

        {/* Links & Brand Footer */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#82575c]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#66101b] text-[#faf3eb] flex items-center justify-center font-bold text-xs">C</div>
            <span className="font-bold text-[#66101b] font-heading">CreatorZ Commercial Operating System</span>
            <span>•</span>
            <span>Pan-India & Global Creator Marketplace</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/creators" className="hover:text-[#66101b] transition">Creator Directory</Link>
            <Link href="/briefs" className="hover:text-[#66101b] transition">Open Briefs</Link>
            <Link href="/campaigns/brief-1/applicants" className="hover:text-[#66101b] transition">Pitch Reels Auditions</Link>
            <Link href="/campaigns/ord-8492/room" className="hover:text-[#66101b] transition">Campaign Order Room</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
