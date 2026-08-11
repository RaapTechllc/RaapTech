import { SITE } from "@/lib/site";

const subject = encodeURIComponent("RaapTech project inquiry");
const body = encodeURIComponent(
  "Company:\n\nFabrication platform (CADmep, CAMduct, or ESTmep):\n\nWhat is not working:\n\nBest way to follow up:",
);

export default function ContactForm() {
  return (
    <div className="space-y-6">
      <p className="max-w-xl text-base leading-relaxed text-gray-1">
        Until a verified delivery provider is connected, use either direct
        action below. Your email app will open with a short project outline.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${SITE.email}?subject=${subject}&body=${body}`}
          className="border-2 border-ink bg-ink p-6 text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          <span className="block font-mono text-xs uppercase tracking-label">
            Email
          </span>
          <span className="mt-3 block font-display text-xl font-bold">
            Write an email
          </span>
          <span className="mt-2 block font-mono text-xs">{SITE.email}</span>
        </a>
        <a
          href={SITE.phoneHref}
          aria-label={`Call ${SITE.phone}`}
          className="border-2 border-ink bg-paper p-6 text-ink transition-colors hover:bg-gray-4"
        >
          <span className="block font-mono text-xs uppercase tracking-label">
            Phone
          </span>
          <span className="mt-3 block font-display text-xl font-bold">Call {SITE.phone}</span>
          <span className="mt-2 block font-mono text-xs">Direct conversation</span>
        </a>
      </div>
      <p className="border-l-2 border-ink pl-4 font-mono text-xs uppercase leading-relaxed tracking-label text-gray-2">
        Nothing is submitted or stored on this site.
      </p>
    </div>
  );
}
