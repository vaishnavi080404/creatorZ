import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      email,
      name,
      representativeName,
      companyName,
      company,
      companyType,
      category,
      website,
      gstin,
      verified,
      avatarUrl,
      avatar,
      userId,
    } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const resolvedCompany = (companyName || company || "").trim();
    const resolvedName = (representativeName || name || resolvedCompany || "Brand Partner").trim();
    const resolvedAvatar = avatarUrl || avatar || null;

    const supabase = getServiceSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase service client not available." },
        { status: 500 }
      );
    }

    // 1. Check if profile exists in profiles table
    let { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", normalizedEmail)
      .maybeSingle();

    let profileId = profile?.id;

    if (!profile) {
      // Check auth.users for UUID matching this email
      try {
        const { data: authData } = await supabase.auth.admin.listUsers();
        const authMatch = authData?.users?.find(
          (u) => (u.email || "").toLowerCase().trim() === normalizedEmail
        );
        if (authMatch) {
          profileId = authMatch.id;
        }
      } catch (authErr) {
        console.warn("[sync-brand-profile] listUsers fallback", authErr);
      }

      // If still no valid UUID, check provided userId or generate fresh UUID
      const isUuid = (str) =>
        typeof str === "string" &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

      if (!profileId || !isUuid(profileId)) {
        profileId = isUuid(userId) ? userId : crypto.randomUUID();
      }

      const { data: newProfile, error: pInsertErr } = await supabase
        .from("profiles")
        .insert({
          id: profileId,
          email: normalizedEmail,
          name: resolvedName,
          role: "brand",
          avatar_url: resolvedAvatar,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (pInsertErr) {
        console.error("[sync-brand-profile] profile insert error:", pInsertErr);
        // If conflict on ID or email, fetch again
        const { data: refetched } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", normalizedEmail)
          .maybeSingle();
        if (refetched) {
          profileId = refetched.id;
          profile = refetched;
        } else {
          return NextResponse.json({ error: pInsertErr.message }, { status: 500 });
        }
      } else {
        profile = newProfile;
      }
    } else {
      // Profile exists: update name, role, avatar
      profileId = profile.id;
      const { data: updatedProfile } = await supabase
        .from("profiles")
        .update({
          name: resolvedName,
          role: "brand",
          avatar_url: resolvedAvatar || profile.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profileId)
        .select()
        .single();
      if (updatedProfile) profile = updatedProfile;
    }

    // 2. Upsert into brand_profiles
    const brandData = {
      user_id: profileId,
      company_name: resolvedCompany || profile.name || "Enterprise Brand",
      company_type: companyType || "D2C Brand",
      category: category || "Skincare & Beauty",
      website: website || null,
      gstin: gstin ? gstin.trim().toUpperCase() : null,
    };

    if (typeof verified === "boolean") {
      brandData.verified = verified;
    }

    const { data: brandProfile, error: bpErr } = await supabase
      .from("brand_profiles")
      .upsert(brandData, { onConflict: "user_id" })
      .select()
      .single();

    if (bpErr) {
      console.error("[sync-brand-profile] brand_profiles upsert error:", bpErr);
      return NextResponse.json({ error: bpErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      profile,
      brandProfile,
    });
  } catch (err) {
    console.error("[sync-brand-profile] internal error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
