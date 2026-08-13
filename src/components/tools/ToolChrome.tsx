import type { ReactNode } from "react";
import Link from "next/link";
import { TOOLS, getTool, type ToolSlug } from "@/lib/tools";

const chromeClass =
  "inline-flex border-2 border-ink px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-label sm:text-xs";

export function ToolBreadcrumb({ slug }: { slug: ToolSlug }) {
  const current = getTool(slug);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-label text-gray-1">
        <li>
          <Link href="/tools" className="text-ink underline underline-offset-4">
            Tools
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-2">
          /
        </li>
        <li aria-current="page" className="text-ink">
          {current.name}
        </li>
      </ol>
    </nav>
  );
}

export function ToolSwitcher({ slug }: { slug: ToolSlug }) {
  return (
    <nav aria-label="Field tools" className="mt-8">
      <ul className="flex flex-wrap gap-2">
        {TOOLS.map((tool) => {
          const current = tool.slug === slug;
          return (
            <li key={tool.slug}>
              {current ? (
                <span aria-current="page" className={`${chromeClass} bg-ink text-paper`}>
                  {tool.name}
                </span>
              ) : (
                <Link
                  href={tool.href}
                  className={`${chromeClass} bg-paper text-ink hover:bg-ink hover:text-paper`}
                >
                  {tool.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ToolPageHeader({
  slug,
  eyebrow,
  children,
}: {
  slug: ToolSlug;
  eyebrow: string;
  children: ReactNode;
}) {
  const current = getTool(slug);

  return (
    <section className="bg-paper pb-12 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <ToolBreadcrumb slug={slug} />
        <div className="eyebrow mb-4">{eyebrow}</div>
        <h1 className="max-w-4xl font-display text-display-xl font-bold text-ink">
          {current.name}
        </h1>
        <div className="mt-8 max-w-xs border-t-2 border-ink" />
        <p className="mt-8 max-w-3xl font-sans text-body-lg text-gray-1">{children}</p>
        <ToolSwitcher slug={slug} />
      </div>
    </section>
  );
}
