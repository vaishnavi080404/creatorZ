"use client";
import { MOCK_CREATORS } from "@/lib/mockData";
import AutoPortfolioGrid from "@/components/portfolio/AutoPortfolioGrid";
import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
export default function CreatorPortfolioPage() {
    const creator = MOCK_CREATORS[0];
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      <div className="flex items-center justify-between">
        <Link href="/creator/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C635B] hover:text-[#181314]">
          <ArrowLeft className="w-4 h-4"/>
          <span>Back to Creator Dashboard</span>
        </Link>

        <Link href={`/creators/${creator.username}`} className="text-xs font-bold px-4 py-2 rounded-full border border-[#D8CEBD] bg-white text-[#181314] hover:bg-[#FAF6EE] transition">
          View Public Profile Link ↗
        </Link>
      </div>

      <div className="pb-6 border-b border-[#E8DEC8] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-1 text-[#7A1C28] uppercase font-bold">
            <Award className="w-3.5 h-3.5"/>
            <span>Portfolio-From-Delivery™ Hub</span>
          </div>
          <h1 className="text-3xl font-bold text-[#181314] font-heading">
            My Auto-Compounding Portfolio
          </h1>
          <p className="text-xs text-[#6C635B] mt-1">
            Zero manual curation. Every approved campaign deliverable is automatically published here with verified view metrics and brand endorsements.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#FAF6EE] border border-[#E8DEC8] text-[#7A1C28] font-bold">
          {creator.autoPortfolio.length} Verified Deliverables
        </span>
      </div>

      <AutoPortfolioGrid items={creator.autoPortfolio} creatorName={creator.name}/>

    </div>);
}
