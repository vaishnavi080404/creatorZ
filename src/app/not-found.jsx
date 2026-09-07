import Link from "next/link";

export const metadata = {
  title: "404: This page could not be found — CreatorZ",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#4A0711] pr-4 border-r border-[#DECDBE]">
          404
        </h1>
        <p className="text-sm sm:text-base text-[#7D5358] font-sans">
          This page could not be found.
        </p>
      </div>
      <p className="text-xs text-[#9E7B35] max-w-sm mb-6 font-serif">
        The requested URL was not found on this server. Please check the address or return to the main portal.
      </p>
      <Link
        href="/"
        className="px-5 py-2 rounded-full bg-[#66101B] hover:bg-[#4A0711] text-[#FAF3EB] text-xs font-semibold shadow-xs transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
