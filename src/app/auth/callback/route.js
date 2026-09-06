import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const role = searchParams.get("role") || "creator";
  let next = role === "brand" ? "/onboarding/brand" : "/creator/dashboard";

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        await supabase.auth.exchangeCodeForSession(code);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email) {
          // Check if email already registered with opposite role
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", user.email)
            .maybeSingle();

          if (profile && profile.role && profile.role !== role) {
            const oppositeRole = profile.role === "brand" ? "Brand" : "Creator";
            await supabase.auth.signOut();
            const errorMsg = `This email is already registered as a ${oppositeRole} account. Please use a separate email address.`;
            return NextResponse.redirect(
              `${origin}/login?error=${encodeURIComponent(errorMsg)}`
            );
          }

          if (!profile) {
            // New user registration via Google OAuth
            await supabase.from("profiles").insert({
              email: user.email,
              role: role,
              name:
                user.user_metadata?.full_name ||
                (role === "brand" ? "Brand Partner" : "New Creator"),
              avatar_url: user.user_metadata?.avatar_url || null,
            });

            if (role === "brand") {
              next = "/onboarding/brand";
            }
          } else if (role === "brand") {
            // Check brand onboarding completion
            const { data: brandProfile } = await supabase
              .from("brand_profiles")
              .select("*")
              .eq("user_id", profile.id)
              .maybeSingle();

            if (!brandProfile || !brandProfile.company_name) {
              next = "/onboarding/brand";
            } else {
              next = "/brand/dashboard";
            }
          }
        }
      } catch (err) {
        console.error("[CreatorZ OAuth Callback] Auth error:", err);
      }
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
