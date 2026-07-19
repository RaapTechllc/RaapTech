import { NextResponse } from "next/server";

/**
 * Contact form endpoint — deliberately decoupled from any CRM/email vendor.
 * Set CONTACT_FORM_ENDPOINT to a Formspree/Resend/webhook URL and submissions
 * are forwarded there as JSON. Without it, submissions are accepted and
 * logged server-side so the site works before a vendor is picked.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = data;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream form service failed." },
        { status: 502 },
      );
    }
  } else {
    console.log("[contact] submission (no CONTACT_FORM_ENDPOINT set):", data);
  }

  return NextResponse.json({ ok: true });
}
