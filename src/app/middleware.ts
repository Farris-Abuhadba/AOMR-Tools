import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Add your secret key here
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not set in the environment variables");
  }

  // Fetch token with the required secret
  const token = await getToken({ req, secret });

  // Only protect the /buildguide route
  if (req.nextUrl.pathname.startsWith("/buildguide")) {
    if (!token) {
      const loginUrl = new URL("/auth/signin", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware only to the GuideBuilder route
export const config = {
  matcher: ["/buildguide"],
};
