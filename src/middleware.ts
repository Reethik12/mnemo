import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isApiRoute = pathname.startsWith("/api");
  const isAuthRoute = pathname.startsWith("/api/auth");
  const isHealthRoute = pathname.startsWith("/api/health");
  
  // Protect dashboard/workspace routes - in Mnemo, these don't all start with /workspace, 
  // they are grouped in (workspace). Common ones:
  const isProtectedUiRoute = 
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/agents") ||
    pathname.startsWith("/ai") ||
    pathname.startsWith("/autonomous") ||
    pathname.startsWith("/conversation") ||
    pathname.startsWith("/fabric") ||
    pathname.startsWith("/intelligence") ||
    pathname.startsWith("/knowledge") ||
    pathname.startsWith("/memory") ||
    pathname.startsWith("/notifications") ||
    pathname.startsWith("/planner") ||
    pathname.startsWith("/plugins") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/prompt") ||
    pathname.startsWith("/providers") ||
    pathname.startsWith("/relationships") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/workflows");

  // Auth pages should not be accessible if logged in
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Using simple cookie check for middleware (actual validation should happen in API routes)
  const sessionCookie = request.cookies.get("better-auth.session_token") || request.cookies.get("__Secure-better-auth.session_token");
  
  if (isApiRoute && !isAuthRoute && !isHealthRoute) {
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (isProtectedUiRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
