import { SITE } from "@/lib/site";

const subject = encodeURIComponent("RaapTech project inquiry");
const body = encodeURIComponent(
  "Company:\n\nFabrication platform (CADmep, CAMduct, or ESTmep):\n\nWhat is not working:\n\nBest way to follow up:",
);

export default function ContactForm() {
  return (
    <div className="space-y-6">
      <p className="max-w-xl text-base leading-relaxed text-gray-1">
        Start by email with a short project outline. Calls are scheduled after
        we review your email so the direct line stays reserved for active
        clients and qualified projects.
      </p>
      <div className="max-w-xl">
        <a
          href={`mailto:${SITE.email}?subject=${subject}&body=${body}`}
          className="block border-2 border-ink bg-ink p-6 text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          <span className="block font-mono text-xs uppercase tracking-label">
            Email
          </span>
          <span className="mt-3 block font-display text-xl font-bold">
            Write an email
          </span>
          <span className="mt-2 block font-mono text-xs">{SITE.email}</span>
        </a>
      </div>
      <p className="border-l-2 border-ink pl-4 font-mono text-xs uppercase leading-relaxed tracking-label text-gray-2">
        Nothing is submitted or stored on this site.
      </p>
    </div>
  );
}
