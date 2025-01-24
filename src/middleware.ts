import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL("https://froggsmp.vercel.app/multi"));
}
