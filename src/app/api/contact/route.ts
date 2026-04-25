import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const payload = {
    name: clean((body as Record<string, unknown>).name, 120),
    email: clean((body as Record<string, unknown>).email, 160).toLowerCase(),
    company: clean((body as Record<string, unknown>).company, 160),
    subject: clean((body as Record<string, unknown>).subject, 120),
    message: clean((body as Record<string, unknown>).message, 4000),
  };

  if (!payload.name || !payload.email || !payload.subject || !payload.message) {
    return NextResponse.json(
      { success: false, message: "Please complete all required fields." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.RAAPTECH_CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Contact intake is temporarily unavailable. Please email tim@raaptech.com instead.",
      },
      { status: 503 }
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null;
  const userAgent = request.headers.get("user-agent") || null;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "raaptech-website/1.0",
      },
      body: JSON.stringify({
        ...payload,
        source: "raaptech-website",
        page: "/contact",
        submitted_at: new Date().toISOString(),
        ip_address: ipAddress,
        user_agent: userAgent,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    const data = (await response.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    if (!response.ok || data?.success === false) {
      return NextResponse.json(
        {
          success: false,
          message:
            data?.message ||
            "We couldn’t deliver your message right now. Please email tim@raaptech.com instead.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn’t deliver your message right now. Please email tim@raaptech.com instead.",
      },
      { status: 502 }
    );
  }
}
