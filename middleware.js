import { NextResponse } from "next/server";

// Edge runtime me Node crypto nahi hai, is liye yahan sirf cookie ki
// maujoodgi check hoti hai. Asli signature verification har admin page
// aur API route me server par hoti hai (lib/auth.js).

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("pt_session")?.value;
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
