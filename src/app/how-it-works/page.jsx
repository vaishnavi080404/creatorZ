import HowItWorks from "@/components/landing/HowItWorks";
import ProblemSolution from "@/components/landing/ProblemSolution";
import CtaBanner from "@/components/landing/CtaBanner";
export default function HowItWorksPage() {
    const lifecycle = [
        {
            stage: 1,
            title: "Milestone Agreement Locked",
            desc: "Both parties agree to milestone deliverables and timelines. Creator starts work knowing project terms are legally locked."
        },
        {
            stage: 2,
            title: "Script & Concept Approved",
            desc: "Creator submits outline and 3-second hook. Brand signs off before production begins (25% creator protection locked)."
        },
        {
            stage: 3,
            title: "Video Draft in Review",
            desc: "Creator uploads video draft. Brand scrubs the video and adds timestamped feedback pins (e.g. 0:08)."
        },
        {
            stage: 4,
            title: "Revisions Resolution",
            desc: "Creator addresses the pinned notes and uploads the adjusted cut for final check."
        },
        {
            stage: 5,
            title: "Final Delivery Approved",
            desc: "Brand greenlights the final video. Deliverable files and caption assets are transferred."
        },
        {
            stage: 6,
            title: "Direct Payout & Auto-Portfolio",
            desc: "Funds transfer directly to creator's bank account, and the campaign is auto-published to creator's verified portfolio."
        }
    ];
    return (<div className="space-y-16 pb-16">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 text-center space-y-4">
        <span className="text-xs font-bold font-mono text-[#7A1C28] uppercase tracking-wider">
          The Milestone-Driven Workflow
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-[#181314]">
          How CreatorZ Powers <br />
          <span className="font-serif-editorial italic font-normal text-[#7A1C28]">
            Frictionless Creator Deals
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-[#6C635B] max-w-xl mx-auto">
          From the first 30-second Pitch Reel audition to instant payout settlement, discover how our automated commercial milestones work.
        </p>
      </section>

      {/* 3-Step Process */}
      <HowItWorks />

      {/* 6-Stage Lifecycle Deep Dive */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase text-[#7A1C28] font-bold">End-To-End Security</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#181314]">
            The 6-Stage Milestone Progress Lifecycle
          </h2>
          <p className="text-xs text-[#6C635B]">
            Automated at every stage to prevent non-payment, ghosting, and scope disputes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifecycle.map((step) => (<div key={step.stage} className="bg-white border border-[#E8DEC8] rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold font-mono text-[#7A1C28]">
                  0{step.stage}
                </span>
                <span className="text-[10px] font-mono font-bold bg-[#FAF6EE] text-[#181314] px-2.5 py-0.5 rounded border border-[#E8DEC8]">
                  Stage {step.stage}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#181314]">{step.title}</h3>
              <p className="text-xs text-[#6C635B] leading-relaxed">{step.desc}</p>
            </div>))}
        </div>
      </section>

      {/* Problem Solution */}
      <ProblemSolution />

      {/* CTA */}
      <CtaBanner />

    </div>);
}
