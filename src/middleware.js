import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin")) {
    // 1. Allow public unauthenticated access to the hidden /admin/login portal
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // 2. Check for active session with role: "admin"
    const authRoleCookie = request.cookies.get("creatorz_auth_role")?.value;
    const authSessionCookie = request.cookies.get("creatorz_auth_session")?.value;

    let isAdmin = authRoleCookie === "admin";
    if (!isAdmin && authSessionCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(authSessionCookie));
        if (parsed?.role === "admin") {
          isAdmin = true;
        }
      } catch {
        // Invalid session cookie
      }
    }

    // 3. 404 Cloaking: If user is not authenticated or not an admin,
    // rewrite request to /not-found so the route appears completely non-existent
    if (!isAdmin) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
