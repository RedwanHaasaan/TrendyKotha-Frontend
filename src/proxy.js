import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export function proxy(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  const isAuthPage =
    path === "/login" || path === "/register";

  const isProtectedPage =
    path.startsWith("/dashboard");

  // Not logged in
  if (!token) {
    if (isProtectedPage) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    return NextResponse.next();
  }

  try {
    const payload = jwtDecode(token);

    // Logged in user shouldn't access login/register
    if (isAuthPage) {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    // Profile completed
    if (
      payload.isProfileCompleted &&
      path === "/dashboard/create-profile"
    ) {
      return NextResponse.redirect(
        new URL(
          "/dashboard/edit-profile",
          request.url
        )
      );
    }

    // Profile not completed
    if (
      !payload.isProfileCompleted &&
      path.startsWith("/dashboard") &&
      path !== "/dashboard/create-profile"
    ) {
      return NextResponse.redirect(
        new URL(
          "/dashboard/create-profile",
          request.url
        )
      );
    }

    return NextResponse.next();

  } catch (error) {
    // Invalid JWT
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    response.cookies.delete("token");

    return response;
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
  ],
};