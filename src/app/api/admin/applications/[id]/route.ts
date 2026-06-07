import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminToken } from "@/lib/auth";

function getAdminToken(req: NextRequest): string | undefined {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return req.cookies.get("admin_token")?.value;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getAdminToken(req);
  if (!checkAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const updateData: { status?: string; notes?: string } = {};

  if (typeof body.status === "string" && body.status.trim() !== "") {
    updateData.status = body.status.trim();
  }
  if (typeof body.notes === "string") {
    updateData.notes = body.notes;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update" },
      { status: 400 }
    );
  }

  try {
    const application = await prisma.application.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(application);
  } catch {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }
}
