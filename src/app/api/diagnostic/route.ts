import { NextResponse } from "next/server";

/**
 * Free Database Diagnostic email capture — decoupled from the email/CRM
 * vendor. Set DIAGNOSTIC_CAPTURE_ENDPOINT (Formspree, Mailchimp webhook,
 * ConvertKit form, etc.) and signups are forwarded there. Without it,
 * signups are logged server-side. Always redirects back to the home page
 * lead-magnet section with a confirmation flag.
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email === "string" && email.includes("@")) {
    const endpoint = process.env.DIAGNOSTIC_CAPTURE_ENDPOINT;
    if (endpoint) {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch((err) => console.error("[diagnostic] forward failed:", err));
    } else {
      console.log("[diagnostic] signup (no DIAGNOSTIC_CAPTURE_ENDPOINT set):", email);
    }
  }

  return NextResponse.redirect(new URL("/?diagnostic=sent#diagnostic", request.url), 303);
}
