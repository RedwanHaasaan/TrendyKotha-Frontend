import { NextResponse } from "next/server";

// Decode JWT payload without verification (sufficient for routing decisions).
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtected = pathname.startsWith("/dashboard");

  // Not logged in
  if (!token) {
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  const payload = parseJwt(token);
  if (!payload) {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("token");
    return res;
  }

  // Logged in user shouldn't access login/register
  if (isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Profile completed -> redirect create -> edit
  if (payload.isProfileCompleted && pathname === "/dashboard/create-profile") {
    return NextResponse.redirect(new URL("/dashboard/edit-profile", request.url));
  }

  // Profile not completed -> redirect any dashboard route -> create-profile
  if (!payload.isProfileCompleted && isProtected && pathname !== "/dashboard/create-profile") {
    return NextResponse.redirect(new URL("/dashboard/create-profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
