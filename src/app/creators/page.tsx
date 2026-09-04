"use client";

import { useState } from "react";
import { MOCK_CREATORS } from "@/lib/mockData";
import CreatorCard from "@/components/discovery/CreatorCard";
import { Search, Filter, Sparkles, SlidersHorizontal } from "lucide-react";

export default function CreatorsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Tech & Consumer Goods", "Skincare & Wellness", "Fitness & Nutrition", "Food & D2C FMCG", "UGC Ad Specialist"];
  const tiers = ["All", "Alpha", "Beta", "Gamma"];

  const filteredCreators = MOCK_CREATORS.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTier = selectedTier === "All" || creator.tier === selectedTier;
    const matchesCategory = selectedCategory === "All" || creator.category === selectedCategory;

    return matchesSearch && matchesTier && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8DEC8]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-1 text-[#7A1C28] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Marketplace</span>
          </div>
          <h1 className="text-3xl font-bold text-[#181314] font-heading">
            Creator Directory
          </h1>
          <p className="text-xs text-[#6C635B] mt-1">
            Discover verified creators with auto-audited engagement metrics and transparent starting rates.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white border border-[#E8DEC8] text-[#6C635B] self-start md:self-auto font-semibold">
          Showing {filteredCreators.length} of {MOCK_CREATORS.length} Creators
        </span>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-[#E8DEC8] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#6C635B]" />
          <input
            type="text"
            placeholder="Search by creator name, niche, language (Hindi, Tamil, English)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-[#181314] placeholder:text-[#6C635B] focus:outline-none focus:border-[#7A1C28]"
          />
        </div>

        {/* Tier Filter Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-[#6C635B] mr-1 hidden sm:inline">Tier:</span>
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTier === tier
                  ? "bg-[#7A1C28] text-white shadow-sm"
                  : "bg-[#FAF6EE] text-[#6C635B] hover:bg-[#F2EAE0] hover:text-[#181314]"
              }`}
            >
              {tier} {tier !== "All" && "Tier"}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full text-xs px-3 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] text-[#181314] font-semibold focus:outline-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Niches" : cat}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Creator Grid */}
      {filteredCreators.length === 0 ? (
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-12 text-center">
          <p className="text-sm font-bold text-[#181314]">No creators matched your criteria</p>
          <p className="text-xs text-[#6C635B] mt-1">Try broadening your search or resetting filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}

    </div>
  );
}
