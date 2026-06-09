import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { applicationReceivedHtml } from "@/lib/emails/application-received";

const REQUIRED_STRING_FIELDS = [
  "fullName",
  "email",
  "phone",
  "streetAddress",
  "city",
  "state",
  "zip",
  "propertyType",
  "propertySize",
  "roomCount",
  "smartHomeSetup",
  "productInterest",
  "usageIntent",
  "discoverySource",
  "incomeRange",
] as const;

type RequiredField = (typeof REQUIRED_STRING_FIELDS)[number];

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate required string fields
  const missing: string[] = [];
  for (const field of REQUIRED_STRING_FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || value.trim() === "") {
      missing.push(field);
    }
  }

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", fields: missing },
      { status: 400 }
    );
  }

  if (typeof body.agreedToTerms !== "boolean") {
    return NextResponse.json(
      { error: "agreedToTerms must be a boolean" },
      { status: 400 }
    );
  }

  const data = body as Record<RequiredField, string> & {
    agreedToTerms: boolean;
  };

  const application = await prisma.application.create({
    data: {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      streetAddress: data.streetAddress.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      zip: data.zip.trim(),
      propertyType: data.propertyType.trim(),
      propertySize: data.propertySize.trim(),
      roomCount: data.roomCount.trim(),
      smartHomeSetup: data.smartHomeSetup.trim(),
      productInterest: data.productInterest.trim(),
      usageIntent: data.usageIntent.trim(),
      discoverySource: data.discoverySource.trim(),
      incomeRange: data.incomeRange.trim(),
      agreedToTerms: data.agreedToTerms,
      paymentStatus: "pending",
      status: "pending",
    },
    select: { id: true, status: true },
  });

  // Send confirmation email — non-blocking, failure doesn't affect the response
  const firstName = data.fullName.trim().split(" ")[0];
  const resend = new Resend(process.env.RESEND_API_KEY);
  resend.emails.send({
    from: "Candace AI <support@candaceai.homes>",
    to: data.email.trim(),
    subject: "Application received.",
    html: applicationReceivedHtml(firstName),
  }).catch(() => {});

  return NextResponse.json(application, { status: 201 });
}
