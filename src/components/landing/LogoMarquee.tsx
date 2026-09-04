export default function LogoMarquee() {
  const brands = [
    { name: "Boat Audio", category: "Audio & Wearables", dealVolume: "₹18.4L Settled" },
    { name: "Plum Goodness", category: "Clean Skincare", dealVolume: "₹12.2L Settled" },
    { name: "BeastLife", category: "Sports Nutrition", dealVolume: "₹24.0L Settled" },
    { name: "Be Minimalist", category: "Active Science Skincare", dealVolume: "₹16.5L Settled" },
    { name: "Keychron India", category: "Tech & Workstation", dealVolume: "₹9.8L Settled" },
    { name: "Prime Hydration", category: "Beverages & FMCG", dealVolume: "₹14.1L Settled" }
  ];

  return (
    <section className="border-y border-[#E8DEC8] bg-[#F5E6C0]/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#6C635B] font-bold">
          Trusted by 850+ D2C Brands & 12,000+ Verified Creators Across India
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
          {brands.map((brand, i) => (
            <div key={i} className="p-3 rounded-xl hover:bg-white/60 transition group text-center">
              <span className="text-sm sm:text-base font-extrabold text-[#181314] font-heading group-hover:text-[#7B1F5C] transition block">
                {brand.name}
              </span>
              <span className="block text-[10px] text-[#6C635B] font-mono mt-0.5">
                {brand.category}
              </span>
              <span className="inline-block mt-1 text-[9px] font-mono font-bold text-[#7B1F5C] bg-[#FAF6EE] px-1.5 py-0.5 rounded border border-[#E8DEC8]">
                {brand.dealVolume}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
