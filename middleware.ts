import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Not logged in — redirect to login
  if (!session) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/dashboard")
    ) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const role = session.user?.role;

  // Logged in but not ADMIN — block /admin
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Logged in ADMIN trying to access /dashboard — redirect to admin
  if (pathname.startsWith("/dashboard") && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};