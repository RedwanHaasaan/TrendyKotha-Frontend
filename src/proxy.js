import { NextResponse } from "next/server";

export function proxy(request) {
  const sessionCookie = request.cookies.get("connect.sid");

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(

      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};