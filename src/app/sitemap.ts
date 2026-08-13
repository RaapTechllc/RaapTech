import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const marketingRoutes = [
  "",
  "/about",
  "/services",
  "/results",
  "/contact",
  "/tools",
] as const;

const routes = [...marketingRoutes, ...TOOLS.map((tool) => tool.href)];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route, index) => ({
    url: `https://raaptech.com${route}`,
    lastModified,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route.startsWith("/tools/") ? 0.8 : 0.7,
  }));
}
