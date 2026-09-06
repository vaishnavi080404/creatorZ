import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function detectRoleFromEmail(email) {
  if (!email) return "creator";
  const normalized = email.trim().toLowerCase();
  if (
    normalized === "admin@creatorz.internal" ||
    normalized.endsWith("@creatorz.internal") ||
    normalized.startsWith("admin@")
  ) {
    return "admin";
  }
  if (
    normalized.includes("brand") ||
    normalized.includes("beastlife") ||
    normalized.includes("kalyan") ||
    normalized.includes("organics") ||
    normalized.includes("corp") ||
    normalized.includes("agency")
  ) {
    return "brand";
  }
  const domain = normalized.split("@")[1] || "";
  const freeMail = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "mail.com",
    "proton.me",
    "protonmail.com",
  ];
  if (domain && !freeMail.includes(domain)) {
    return "brand";
  }
  return "creator";
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedRole = searchParams.get("role") || "auto";

  let next = "/creator/dashboard";
  let resolvedRole = "creator";
  let sessionUser = null;

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase.auth.exchangeCodeForSession(code);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email) {
          const email = user.email.toLowerCase().trim();

          // 1. Check if profile already exists
          let { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", email)
            .maybeSingle();

          // If explicit signup from /brand/signup or /creator/signup with conflicting role
          if (
            requestedRole !== "auto" &&
            profile &&
            profile.role &&
            profile.role !== requestedRole
          ) {
            const oppositeRole = profile.role === "brand" ? "Brand" : "Creator";
            await supabase.auth.signOut();
            const errorMsg = `This email is already registered as a ${oppositeRole} account. Please use a separate email address.`;
            return NextResponse.redirect(
              `${origin}/login?error=${encodeURIComponent(errorMsg)}`
            );
          }

          if (profile) {
            resolvedRole = profile.role || "creator";
            if (resolvedRole === "brand") {
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

              sessionUser = {
                id: profile.id,
                email: email,
                name: profile.name || user.user_metadata?.full_name || "Brand Partner",
                role: "brand",
                avatar: profile.avatar_url || user.user_metadata?.avatar_url || null,
                avatar_url: profile.avatar_url || user.user_metadata?.avatar_url || null,
                company: brandProfile?.company_name || "",
                companyName: brandProfile?.company_name || "",
                category: brandProfile?.category || "D2C Brand",
                is_verified: Boolean(brandProfile?.verified),
                onboarding_completed: Boolean(brandProfile?.company_name),
              };
            } else if (resolvedRole === "admin") {
              next = "/admin/dashboard";
              sessionUser = {
                id: profile.id,
                email: email,
                name: profile.name || "Ops Director",
                role: "admin",
                avatar: profile.avatar_url || null,
                is_verified: true,
                onboarding_completed: true,
              };
            } else {
              next = "/creator/dashboard";
              sessionUser = {
                id: profile.id,
                email: email,
                name: profile.name || user.user_metadata?.full_name || "Creator",
                role: "creator",
                avatar: profile.avatar_url || user.user_metadata?.avatar_url || null,
                avatar_url: profile.avatar_url || user.user_metadata?.avatar_url || null,
                is_verified: true,
                onboarding_completed: true,
              };
            }
          } else {
            // New user registration via Google OAuth
            resolvedRole =
              requestedRole !== "auto"
                ? requestedRole
                : user.user_metadata?.role || detectRoleFromEmail(email);

            const displayName =
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              (resolvedRole === "brand" ? "Brand Partner" : "New Creator");

            const { data: newProfile } = await supabase
              .from("profiles")
              .insert({
                id: user.id,
                email: email,
                role: resolvedRole,
                name: displayName,
                avatar_url: user.user_metadata?.avatar_url || null,
                updated_at: new Date().toISOString(),
              })
              .select()
              .single();

            if (resolvedRole === "brand") {
              next = "/onboarding/brand";
              sessionUser = {
                id: user.id,
                email: email,
                name: displayName,
                role: "brand",
                avatar: user.user_metadata?.avatar_url || null,
                avatar_url: user.user_metadata?.avatar_url || null,
                company: "",
                companyName: "",
                category: "D2C Brand",
                is_verified: false,
                onboarding_completed: false,
              };
            } else {
              next = "/creator/dashboard";
              sessionUser = {
                id: user.id,
                email: email,
                name: displayName,
                role: "creator",
                avatar: user.user_metadata?.avatar_url || null,
                avatar_url: user.user_metadata?.avatar_url || null,
                is_verified: true,
                onboarding_completed: true,
              };
            }
          }
        }
      } catch (err) {
        console.error("[CreatorZ OAuth Callback] Auth error:", err);
      }
    }
  }

  const response = NextResponse.redirect(`${origin}${next}`);

  if (sessionUser) {
    response.cookies.set("creatorz_auth_role", resolvedRole, {
      path: "/",
      sameSite: "lax",
      maxAge: 86400,
    });
    response.cookies.set(
      "creatorz_auth_session",
      encodeURIComponent(JSON.stringify(sessionUser)),
      {
        path: "/",
        sameSite: "lax",
        maxAge: 86400,
      }
    );
  }

  return response;
}
