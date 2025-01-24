import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('https://froggsmp.vercel.app/multi'))
}
