import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
const sourceSerif = Source_Serif_4({
    variable: "--font-source-serif",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal", "italic"],
});
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "CreatorZ — Creator Commerce. Without The Middlemen.",
  description: "Discover artists and creators, launch campaigns, negotiate directly, and review video drafts with verified milestone approvals and auto-compounding portfolios.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", sourceSerif.variable, inter.variable)}>
      <body className="min-h-full flex flex-col font-serif bg-[#faf3eb] text-[#66101b] w-full max-w-full overflow-x-hidden">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

