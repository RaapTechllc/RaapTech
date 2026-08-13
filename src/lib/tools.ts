export const TOOLS = [
  {
    slug: "ductulator",
    name: "Duct sizing calculator",
    href: "/tools/ductulator",
    eyebrow: "Airside",
    summary:
      "Size round duct by airflow and friction rate, check existing round or rectangular duct, and compare practical rectangular equivalents.",
    cta: "Open duct calculator",
  },
  {
    slug: "offset-calculator",
    name: "Field offset calculator",
    href: "/tools/offset-calculator",
    eyebrow: "Layout",
    summary:
      "Lay out two-elbow offsets or solve the bend angle, centerline radius, and straight spool required to fit a known run.",
    cta: "Open offset calculator",
  },
] as const;

export type Tool = (typeof TOOLS)[number];
export type ToolSlug = Tool["slug"];

export function getTool(slug: ToolSlug): Tool {
  const tool = TOOLS.find((item) => item.slug === slug);
  if (!tool) {
    throw new Error(`Unknown tool: ${slug}`);
  }
  return tool;
}
