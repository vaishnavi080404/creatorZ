import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const role = searchParams.get("role") || "creator";
  const next = role === "brand" ? "/brand/dashboard" : "/creator/dashboard";

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        await supabase.auth.exchangeCodeForSession(code);
      } catch (err) {
        console.error("[CreatorZ OAuth Callback] Code exchange error:", err);
      }
    }
  }

  // Redirect to the appropriate dashboard
  return NextResponse.redirect(`${origin}${next}`);
}
