import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin/login", req.url));

  response.cookies.set("admin_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
