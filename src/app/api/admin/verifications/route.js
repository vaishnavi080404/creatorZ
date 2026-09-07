import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    if (!supabase) {
      return NextResponse.json({ brands: [], creators: [] });
    }

    // 1. Fetch live brand profiles joined with profiles
    const { data: brandRows, error: bErr } = await supabase
      .from("brand_profiles")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false });

    if (bErr) {
      console.error("[admin/verifications] Error fetching brand_profiles:", bErr);
    }

    const brands = (brandRows || []).map((bp) => {
      const isApproved = Boolean(bp.verified);
      const email = bp.profiles?.email || "";
      const company = bp.company_name || bp.profiles?.name || "Enterprise Brand";
      const representative = bp.profiles?.name || "Brand Lead";
      const submittedDate = bp.created_at
        ? new Date(bp.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Live Profile";

      return {
        id: bp.id,
        userId: bp.user_id,
        name: company,
        company: company,
        representative: representative,
        email: email,
        role: "brand",
        category: bp.category || "D2C Brand",
        gstin: bp.gstin || "NOT PROVIDED",
        govIdType: "Corporate PAN / GST",
        govIdNumber: bp.gstin ? bp.gstin.slice(2, 12) : "NOT PROVIDED",
        budget: "₹50k - ₹2,00,000",
        objective: "UGC Video Reels & Direct Auditions",
        kycDoc: bp.gstin ? "corporate_verification_proof.pdf" : null,
        status: isApproved ? "approved" : "pending",
        submittedDate: submittedDate,
        verified: isApproved,
      };
    });

    // 2. Fetch live creator profiles
    const { data: creatorRows, error: cErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "creator")
      .order("created_at", { ascending: false });

    if (cErr) {
      console.error("[admin/verifications] Error fetching creator profiles:", cErr);
    }

    const creators = (creatorRows || []).map((cp) => ({
      id: cp.id,
      name: cp.name || "Creative Partner",
      email: cp.email,
      handle: `@${(cp.name || "creator").toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
      category: "Content Creator",
      tierRequested: "Rising Tier",
      onTimeRate: "100%",
      status: "approved",
      submittedDate: cp.created_at
        ? new Date(cp.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Registered Talent",
    }));

    return NextResponse.json({ brands, creators });
  } catch (err) {
    console.error("[admin/verifications] Internal error:", err);
    return NextResponse.json({ brands: [], creators: [] }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { brandProfileId, userId, email, verified, status } = body;

    const supabase = getServiceSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase service client not available." },
        { status: 500 }
      );
    }

    const isApproved = status === "approved" || verified === true;

    // Update by userId if provided
    if (userId) {
      const { data, error } = await supabase
        .from("brand_profiles")
        .update({ verified: isApproved })
        .eq("user_id", userId)
        .select();

      if (error) {
        console.error("[admin/verifications] Update by user_id error:", error);
      }
    }

    // Update by brandProfileId if provided
    if (brandProfileId) {
      const { data, error } = await supabase
        .from("brand_profiles")
        .update({ verified: isApproved })
        .eq("id", brandProfileId)
        .select();

      if (error) {
        console.error("[admin/verifications] Update by id error:", error);
      }
    }

    // Update by email via profiles join if provided
    if (email && !userId && !brandProfileId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (profile?.id) {
        await supabase
          .from("brand_profiles")
          .update({ verified: isApproved })
          .eq("user_id", profile.id);
      }
    }

    return NextResponse.json({ success: true, verified: isApproved });
  } catch (err) {
    console.error("[admin/verifications] Error updating status:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
