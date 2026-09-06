import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Health Check & Keep-Alive Ping Endpoint
 * Use with a free cron ping service (e.g. Cron-Job.org or UptimeRobot) every 2-3 days
 * to send database activity to Supabase and permanently prevent the 7-day auto-pause.
 */
export async function GET() {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp,
      database: "unconfigured",
      message: "CreatorZ API is operational. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local to link live Supabase database ping.",
    });
  }

  try {
    // Perform a lightweight database query to register real DB traffic on Supabase
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const latencyMs = Date.now() - startTime;

    if (error) {
      return NextResponse.json(
        {
          status: "degraded",
          database: "error",
          error: error.message,
          latencyMs,
          timestamp,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "ok",
      database: "connected",
      latencyMs: `${latencyMs}ms`,
      totalProfiles: count ?? 0,
      timestamp,
      keepAlive: "Active (Supabase 7-day auto-pause prevented)",
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        database: "unreachable",
        error: err.message,
        timestamp,
      },
      { status: 500 }
    );
  }
}
