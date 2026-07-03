import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // For now, in Phase 6.1, we only protect API routes that aren't auth
  if (
    pathname.startsWith("/api") &&
    !pathname.startsWith("/api/auth") &&
    pathname !== "/api/health"
  ) {
    // This is a placeholder for better-auth middleware check
    // In actual better-auth setup, we can fetch session from cookie
    const sessionCookie = request.cookies.get("better-auth.session_token");
    if (!sessionCookie && process.env.NODE_ENV === "production") {
      // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      // Leaving commented out for local development until auth flow is completely connected on UI
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
