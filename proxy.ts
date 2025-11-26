import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./lib/auth/authOptions"; // make sure path is correct

export async function proxy(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const pathname = new URL(request.url).pathname;

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
